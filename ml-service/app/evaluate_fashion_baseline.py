import argparse
import csv
import random
from pathlib import Path

import torch
from PIL import Image

from app.embeddings import DEVICE, model, processor


CATEGORIES = [
    "Apparel",
    "Accessories",
    "Footwear",
    "Personal Care",
]

PROMPTS = [
    "a product photo of apparel",
    "a product photo of accessories",
    "a product photo of footwear",
    "a product photo of personal care products",
]

DATASET_ROOT = Path("datasets/fashion-small/raw")
VALIDATION_FILE = Path(
    "datasets/fashion-small/processed/validation.csv"
)


def load_validation_rows(limit: int):
    with VALIDATION_FILE.open("r", encoding="utf-8", newline="") as file:
        rows = list(csv.DictReader(file))

    random.seed(42)
    random.shuffle(rows)

    return rows[:limit]


def evaluate(limit: int):
    rows = load_validation_rows(limit)

    correct_predictions = 0

    for index, row in enumerate(rows, start=1):
        image_path = DATASET_ROOT / row["image_path"]
        image = Image.open(image_path).convert("RGB")

        inputs = processor(
            text=PROMPTS,
            images=image,
            return_tensors="pt",
            padding=True,
        )

        inputs = {
            key: value.to(DEVICE)
            for key, value in inputs.items()
        }

        with torch.no_grad():
            output = model(**inputs)

        predicted_index = output.logits_per_image.argmax(dim=1).item()
        predicted_category = CATEGORIES[predicted_index]

        is_correct = predicted_category == row["category"]
        correct_predictions += is_correct

        print(
            f"{index}/{len(rows)} | "
            f"actual: {row['category']} | "
            f"predicted: {predicted_category} | "
            f"{'✓' if is_correct else '✗'}"
        )

    accuracy = correct_predictions / len(rows)

    print("\nBaseline evaluation complete")
    print(f"Images tested: {len(rows)}")
    print(f"Correct predictions: {correct_predictions}")
    print(f"Accuracy: {accuracy:.2%}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()

    parser.add_argument(
        "--limit",
        type=int,
        default=100,
        help="Number of validation images to test",
    )

    args = parser.parse_args()

    evaluate(args.limit)