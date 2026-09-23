import argparse
import json
from pathlib import Path
from app.embeddings import image_to_embedding

SUPPORTED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}

def index_product_images(products_folder: Path, output_file: Path):
    indexed_products = []

    for image_path in products_folder.iterdir():
        if not image_path.is_file():
            continue
        if image_path.suffix.lower() not in SUPPORTED_EXTENSIONS:
            continue

        print(f"Creating embedding: {image_path.name}")

        vector = image_to_embedding(image_path)

        indexed_products.append({
            "image": image_path.name,
            "embedding": vector.tolist()
        })

    data = {
        "total_products": len(indexed_products),
        "products": indexed_products
    }

    output_file.write_text(json.dumps(data, indent=2), encoding="utf-8")

    print(f"\nIndexed {len(indexed_products)} product images.")
    print(f"Saved embeddings to: {output_file}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser()

    parser.add_argument(
        "products_folder",
        help="Folder containing product images",
    )

    parser.add_argument(
        "--output",
        default="data/product_embeddings.json",
        help="JSON file where generated embeddings are saved",
    )

    args = parser.parse_args()

    products_folder = Path(args.products_folder)
    output_file = Path(args.output)

    output_file.parent.mkdir(parents=True, exist_ok=True)

    index_product_images(products_folder, output_file)