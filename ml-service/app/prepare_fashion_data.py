import argparse
import csv
from collections import Counter
from pathlib import Path


def prepare_dataset(dataset_folder: Path):
    raw_folder = dataset_folder / "raw"
    images_folder = raw_folder / "images"
    styles_file = raw_folder / "styles.csv"

    output_folder = dataset_folder / "processed"
    output_folder.mkdir(parents=True, exist_ok=True)

    output_file = output_folder / "fashion_categories.csv"

    if not styles_file.exists():
        raise FileNotFoundError(f"Missing metadata file: {styles_file}")

    if not images_folder.exists():
        raise FileNotFoundError(f"Missing images folder: {images_folder}")

    valid_rows = []
    missing_images = 0

    with styles_file.open("r", encoding="utf-8", newline="") as file:
        reader = csv.DictReader(file)

        for row in reader:
            product_id = row["id"].strip()
            category = row["masterCategory"].strip()

            image_path = images_folder / f"{product_id}.jpg"

            if not image_path.exists():
                missing_images += 1
                continue

            valid_rows.append({
                "product_id": product_id,
                "image_path": image_path.relative_to(raw_folder).as_posix(),
                "category": category,
            })

    with output_file.open("w", encoding="utf-8", newline="") as file:
        writer = csv.DictWriter(
            file,
            fieldnames=["product_id", "image_path", "category"],
        )

        writer.writeheader()
        writer.writerows(valid_rows)

    category_counts = Counter(row["category"] for row in valid_rows)

    print(f"Valid image-label pairs: {len(valid_rows)}")
    print(f"Missing image files: {missing_images}")
    print(f"Saved clean data to: {output_file}")

    print("\nCategory counts:")
    for category, count in category_counts.most_common():
        print(f"- {category}: {count}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()

    parser.add_argument(
        "--dataset",
        default="datasets/fashion-small",
        help="Path to the fashion-small dataset folder",
    )

    args = parser.parse_args()

    prepare_dataset(Path(args.dataset))