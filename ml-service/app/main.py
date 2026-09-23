from pathlib import Path
from tempfile import NamedTemporaryFile
from fastapi import FastAPI, File, HTTPException, UploadFile
from app.similarity import find_similar_images
from app.embeddings import image_to_embedding

app = FastAPI(title="BarterX Visual Search API")

INDEX_FILE = Path("data/product_embeddings.json")
SUPPORTED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/embed")
async def create_image_embedding(
    image: UploadFile = File(...),
):
    file_extension = Path(image.filename or "").suffix.lower()

    if file_extension not in SUPPORTED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail="Upload a JPG, JPEG, PNG, or WEBP image.",
        )

    temporary_image_path = None

    try:
        with NamedTemporaryFile(
            suffix=file_extension,
            delete=False,
        ) as temporary_file:
            temporary_file.write(await image.read())
            temporary_image_path = Path(temporary_file.name)

        embedding = image_to_embedding(temporary_image_path)

        return {
            "success": True,
            "embedding": embedding.tolist(),
        }

    finally:
        if temporary_image_path and temporary_image_path.exists():
            temporary_image_path.unlink()

@app.post("/search")
async def search_by_image(
    image: UploadFile = File(...),
    limit: int = 5,
):
    file_extension = Path(image.filename or "").suffix.lower()

    if file_extension not in SUPPORTED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail="Upload a JPG, JPEG, PNG, or WEBP image.",
        )

    if not INDEX_FILE.exists():
        raise HTTPException(
            status_code=500,
            detail="Product image index does not exist. Run index_products first.",
        )

    temporary_image_path = None

    try:
        # Camera/search photo exists only temporarily; it is not stored permanently.
        with NamedTemporaryFile(
            suffix=file_extension,
            delete=False,
        ) as temporary_file:
            temporary_file.write(await image.read())
            temporary_image_path = Path(temporary_file.name)

        results = find_similar_images(
            query_image=temporary_image_path,
            index_file=INDEX_FILE,
            limit=limit,
        )

        return {
            "success": True,
            "results": results,
        }

    finally:
        if temporary_image_path and temporary_image_path.exists():
            temporary_image_path.unlink()