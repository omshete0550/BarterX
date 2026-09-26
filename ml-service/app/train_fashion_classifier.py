import argparse
import csv
import random
from collections import defaultdict
from pathlib import Path

import torch
from PIL import Image
from torch import nn
from torch.utils.data import DataLoader, TensorDataset

from app.embeddings import DEVICE, MODEL_NAME, model, processor


CATEGORIES = [
    "Apparel",
    "Accessories",
    "Footwear",
    "Personal Care",
]

DATASET_ROOT = Path("datasets/fashion-small/raw")
TRAIN_FILE = Path("datasets/fashion-small/processed/train.csv")
VALIDATION_FILE = Path("datasets/fashion-small/processed/validation.csv")
MODEL_FILE = Path("models/fashion_category_head.pt")


def load_rows(csv_file: Path):
    with csv_file.open("r", encoding="utf-8", newline="") as file:
        return [
            row
            for row in csv.DictReader(file)
            if row["category"] in CATEGORIES
        ]


def sample_balanced_rows(rows, per_category: int, seed: int):
    grouped_rows = defaultdict(list)

    for row in rows:
        grouped_rows[row["category"]].append(row)

    random_generator = random.Random(seed)
    selected_rows = []

    for category in CATEGORIES:
        category_rows = grouped_rows[category]
        random_generator.shuffle(category_rows)

        if len(category_rows) < per_category:
            raise ValueError(
                f"{category} has only {len(category_rows)} rows; "
                f"cannot select {per_category}."
            )

        selected_rows.extend(category_rows[:per_category])

    random_generator.shuffle(selected_rows)
    return selected_rows


def create_embeddings(rows, batch_size: int):
    feature_batches = []
    label_batches = []
    category_to_index = {category: index for index, category in enumerate(CATEGORIES)}

    for start_index in range(0, len(rows), batch_size):
        batch_rows = rows[start_index:start_index + batch_size]
        images = []
        labels = []

        for row in batch_rows:
            image_path = DATASET_ROOT / row["image_path"]

            try:
                with Image.open(image_path) as image:
                    images.append(image.convert("RGB"))
                labels.append(category_to_index[row["category"]])
            except OSError:
                print(f"Skipping unreadable image: {image_path}")

        if not images:
            continue

        inputs = processor(images=images, return_tensors="pt")
        pixel_values = inputs["pixel_values"].to(DEVICE)

        with torch.no_grad():
            vision_output = model.vision_model(
                pixel_values=pixel_values,
                return_dict=True,
            )
            features = model.visual_projection(vision_output.pooler_output)
            features = features / features.norm(dim=-1, keepdim=True)

        feature_batches.append(features.cpu())
        label_batches.append(torch.tensor(labels, dtype=torch.long))

        completed = min(start_index + len(batch_rows), len(rows))
        print(f"Created embeddings: {completed}/{len(rows)}")

    return torch.cat(feature_batches), torch.cat(label_batches)


def evaluate(classifier, data_loader):
    classifier.eval()
    correct_predictions = 0
    total_predictions = 0

    with torch.no_grad():
        for features, labels in data_loader:
            logits = classifier(features.to(DEVICE))
            predictions = logits.argmax(dim=1).cpu()

            correct_predictions += (predictions == labels).sum().item()
            total_predictions += labels.size(0)

    return correct_predictions / total_predictions


def train(args):
    torch.manual_seed(args.seed)

    train_rows = sample_balanced_rows(
        load_rows(TRAIN_FILE),
        args.train_per_category,
        args.seed,
    )
    validation_rows = sample_balanced_rows(
        load_rows(VALIDATION_FILE),
        args.validation_per_category,
        args.seed + 1,
    )

    print(f"\nUsing device: {DEVICE}")
    print(f"Training images: {len(train_rows)}")
    print(f"Validation images: {len(validation_rows)}\n")

    train_features, train_labels = create_embeddings(train_rows, args.embedding_batch_size)
    validation_features, validation_labels = create_embeddings(
        validation_rows,
        args.embedding_batch_size,
    )

    classifier = nn.Linear(train_features.shape[1], len(CATEGORIES)).to(DEVICE)
    optimizer = torch.optim.AdamW(classifier.parameters(), lr=args.learning_rate)
    loss_function = nn.CrossEntropyLoss()

    train_loader = DataLoader(
        TensorDataset(train_features, train_labels),
        batch_size=args.training_batch_size,
        shuffle=True,
    )
    validation_loader = DataLoader(
        TensorDataset(validation_features, validation_labels),
        batch_size=args.training_batch_size,
    )

    for epoch in range(1, args.epochs + 1):
        classifier.train()
        total_loss = 0.0

        for features, labels in train_loader:
            optimizer.zero_grad()

            logits = classifier(features.to(DEVICE))
            loss = loss_function(logits, labels.to(DEVICE))

            loss.backward()
            optimizer.step()

            total_loss += loss.item() * labels.size(0)

        validation_accuracy = evaluate(classifier, validation_loader)
        average_loss = total_loss / len(train_labels)

        print(
            f"Epoch {epoch}/{args.epochs} | "
            f"loss: {average_loss:.4f} | "
            f"validation accuracy: {validation_accuracy:.2%}"
        )

    MODEL_FILE.parent.mkdir(parents=True, exist_ok=True)
    torch.save(
        {
            "model_state_dict": classifier.state_dict(),
            "categories": CATEGORIES,
            "embedding_dimension": train_features.shape[1],
            "clip_model": MODEL_NAME,
        },
        MODEL_FILE,
    )

    print(f"\nSaved trained classifier to: {MODEL_FILE}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Train a category classifier on frozen CLIP image embeddings.",
    )

    parser.add_argument("--train-per-category", type=int, default=1000)
    parser.add_argument("--validation-per-category", type=int, default=250)
    parser.add_argument("--embedding-batch-size", type=int, default=32)
    parser.add_argument("--training-batch-size", type=int, default=64)
    parser.add_argument("--epochs", type=int, default=10)
    parser.add_argument("--learning-rate", type=float, default=0.001)
    parser.add_argument("--seed", type=int, default=42)

    train(parser.parse_args())
