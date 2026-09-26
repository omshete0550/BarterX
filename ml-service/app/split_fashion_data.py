import csv
import random
from collections import defaultdict
from pathlib import Path


INPUT_FILE = Path("datasets/fashion-small/processed/fashion_categories.csv")
OUTPUT_FOLDER = Path("datasets/fashion-small/processed")

MINIMUM_CATEGORY_SIZE = 500
TRAIN_RATIO = 0.8
RANDOM_SEED = 42


def split_dataset():
    random.seed(RANDOM_SEED)

    categories = defaultdict(list)

    with INPUT_FILE.open("r", encoding="utf-8", newline="") as file:
        reader = csv.DictReader(file)

        for row in reader:
            categories[row["category"]].append(row)

    eligible_categories = {
        category: rows
        for category, rows in categories.items()
        if len(rows) >= MINIMUM_CATEGORY_SIZE
    }

    train_rows = []
    validation_rows = []

    for category, rows in eligible_categories.items():
        random.shuffle(rows)

        split_index = int(len(rows) * TRAIN_RATIO)

        train_rows.extend(rows[:split_index])
        validation_rows.extend(rows[split_index:])

        print(
            f"{category}: "
            f"{split_index} train, "
            f"{len(rows) - split_index} validation"
        )

    random.shuffle(train_rows)
    random.shuffle(validation_rows)

    for filename, rows in [
        ("train.csv", train_rows),
        ("validation.csv", validation_rows),
    ]:
        output_file = OUTPUT_FOLDER / filename

        with output_file.open("w", encoding="utf-8", newline="") as file:
            writer = csv.DictWriter(
                file,
                fieldnames=["product_id", "image_path", "category"],
            )
            writer.writeheader()
            writer.writerows(rows)

        print(f"\nSaved {len(rows)} rows to: {output_file}")


if __name__ == "__main__":
    split_dataset()