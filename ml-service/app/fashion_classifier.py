from pathlib import Path

import torch
from PIL import Image
from torch import nn

from app.embeddings import DEVICE, model, processor


MODEL_FILE = Path(__file__).resolve().parents[1] / "models" / "fashion_category_head.pt"


def load_classifier():
    if not MODEL_FILE.exists():
        raise FileNotFoundError(
            f"Trained classifier not found: {MODEL_FILE}. "
            "Run train_fashion_classifier first."
        )

    checkpoint = torch.load(MODEL_FILE, map_location=DEVICE, weights_only=True)
    classifier = nn.Linear(
        checkpoint["embedding_dimension"],
        len(checkpoint["categories"]),
    ).to(DEVICE)

    classifier.load_state_dict(checkpoint["model_state_dict"])
    classifier.eval()

    return classifier, checkpoint["categories"]


classifier, categories = load_classifier()


def classify_fashion_image(image_path: str | Path):
    with Image.open(image_path) as image:
        image = image.convert("RGB")
        inputs = processor(images=image, return_tensors="pt")

    pixel_values = inputs["pixel_values"].to(DEVICE)

    with torch.inference_mode():
        vision_output = model.vision_model(
            pixel_values=pixel_values,
            return_dict=True,
        )
        features = model.visual_projection(vision_output.pooler_output)
        features = features / features.norm(dim=-1, keepdim=True)

        probabilities = torch.softmax(classifier(features), dim=1)[0]
        category_index = probabilities.argmax().item()

    return {
        "category": categories[category_index],
        "confidence": float(probabilities[category_index].cpu()),
    }
