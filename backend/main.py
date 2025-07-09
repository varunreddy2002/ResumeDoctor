# main.py
import os
import uuid
from pathlib import Path
from fastapi import FastAPI, File, UploadFile, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from google.cloud import storage

# ─── Config ──────────────────────────────────────────────────────────────────
load_dotenv()  # expects .env at project root
#GCS_BUCKET = os.getenv("GCS_BUCKET")
#if not GCS_BUCKET:
#    raise RuntimeError("Environment variable GCS_BUCKET is not set")

# Initialize GCS client
#storage_client = storage.Client()
#bucket = storage_client.bucket(GCS_BUCKET)

ALLOWED_EXT = {".pdf", ".docx"}

# ─── App Setup ────────────────────────────────────────────────────────────────
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],    # tighten this in production!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Routes ───────────────────────────────────────────────────────────────────
@app.get("/api/health")
async def health_check():
    return {"status": "ok"}

@app.post("/api/upload")
async def upload_resume(request: Request, file: UploadFile = File(...)):
    # DEBUG: show what parts FastAPI actually parsed
    form = await request.form()
    print("Received form keys:", list(form.keys()))

    # now the rest of your code…
    suffix = Path(file.filename).suffix.lower()
    if suffix not in ALLOWED_EXT:
        raise HTTPException(400, "Only .pdf and .docx files are allowed")
    contents = await file.read()
    return {"original_filename": file.filename}

# ─── Entry Point ─────────────────────────────────────────────────────────────
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)
