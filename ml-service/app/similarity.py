import argparse
from pathlib import Path
import numpy as np
import json
from app.embeddings import image_to_embedding

def load_product_embeddings(index_file: Path):
    data = json.loads(index_file.read_text(encoding="utf-8"))
    return data["products"]


def find_similar_images(query_image: Path, index_file: Path, limit: int = 5):
    query_vector = image_to_embedding(query_image)
    indexed_products = load_product_embeddings(index_file)
    matches = []

    for product in indexed_products:
        product_vector = np.array(product["embedding"], dtype=np.float32)
        similarity_score = float(np.dot(query_vector, product_vector))

        matches.append({
            "image": product["image"],
            "similarity": similarity_score
        }) 

    return sorted(
        matches,
        key=lambda match: match["similarity"],
        reverse=True,
    )[:limit]

if __name__ == "__main__":
    parser = argparse.ArgumentParser()

    parser.add_argument(
        "query_image",
        help="Image used to find similar products",
    )

    parser.add_argument(
        "--index",
        default="data/product_embeddings.json",
        help="JSON file containing precomputed product embeddings",
    )

    parser.add_argument(
        "--limit",
        type=int,
        default=5,
        help="Maximum number of matching products to return",
    )

    args = parser.parse_args()

    results = find_similar_images(
        query_image=Path(args.query_image),
        index_file=Path(args.index),
        limit=args.limit,
    )

    print("\nMost visually similar products:\n")

    for index, result in enumerate(results, start=1):
        print(f"{index}. {result['image']} — similarity: {result['similarity']:.4f}")