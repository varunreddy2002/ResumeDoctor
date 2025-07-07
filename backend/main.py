from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import shutil
import os
import uuid
import time

app = FastAPI()

# CORS config
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Directory to store resumes
UPLOAD_DIR = Path("uploaded_resumes")
UPLOAD_DIR.mkdir(exist_ok=True)

ALLOWED_EXTENSIONS = {".pdf", ".docx"}

def is_allowed_file(filename: str) -> bool:
    return Path(filename).suffix.lower() in ALLOWED_EXTENSIONS

@app.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    if not is_allowed_file(file.filename):
        raise HTTPException(status_code=400, detail="Only .pdf and .docx files are allowed")

    # Deduplication: Check if file with same name already exists
    for existing_file in UPLOAD_DIR.iterdir():
        if existing_file.name == file.filename:
            return {"status": "duplicate", "message": "Resume already uploaded"}

    # Save the file
    timestamp = time.strftime("%Y%m%d%H%M%S")
    safe_filename = f"{timestamp}_{file.filename.replace(' ', '_')}"
    destination = UPLOAD_DIR / safe_filename

    with destination.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {"status": "success", "filename": destination.name}

@app.get("/")
def root():
    return {"message": "Resume Uploader is running"}

