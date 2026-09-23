from pathlib import Path
import numpy as np
import torch
from PIL import Image
from transformers import CLIPProcessor, CLIPModel

MODEL_NAME = "openai/clip-vit-base-patch32"
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

processor = CLIPProcessor.from_pretrained(MODEL_NAME)
model = CLIPModel.from_pretrained(MODEL_NAME).to(DEVICE)
model.eval()

def image_to_embedding(image_path: str | Path) -> np.ndarray:
    image = Image.open(image_path).convert("RGB")

    inputs = processor(images=image, return_tensors="pt")
    inputs = {k: v.to(DEVICE) for k, v in inputs.items()}

    with torch.no_grad():
        vision_output = model.vision_model(
            pixel_values=inputs["pixel_values"],
            return_dict=True,
        )

        vector = model.visual_projection(vision_output.pooler_output)

    vector = vector / vector.norm(dim=-1, keepdim=True)

    return vector.cpu().numpy().flatten()