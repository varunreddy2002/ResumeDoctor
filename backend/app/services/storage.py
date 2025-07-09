from datetime import timedelta
from fastapi import HTTPException
from app.config import bucket, ALLOWED_EXT
from pathlib import Path

def assert_allowed(filename: str):
    ext = Path(filename).suffix.lower()
    if ext not in ALLOWED_EXT:
        raise HTTPException(400, "Only .pdf and .docx files are allowed")

def generate_upload_url(uid: str, filename: str) -> str:
    assert_allowed(filename)
    blob = bucket.blob(f"resumes/{uid}/{filename}")
    try:
        return blob.generate_signed_url(
            version="v4",
            expiration=timedelta(minutes=10),
            method="PUT",
            content_type="application/octet-stream",
        )
    except Exception as e:
        raise HTTPException(500, f"Could not generate upload URL: {e}")

async def upload_file(file, destination_path: str) -> str:
    assert_allowed(file.filename)
    blob = bucket.blob(destination_path)
    data = await file.read()
    try:
        blob.upload_from_string(data, content_type=file.content_type)
    except Exception as e:
        raise HTTPException(500, f"Failed to upload file: {e}")
    return blob.public_url
