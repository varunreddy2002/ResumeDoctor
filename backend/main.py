from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# ✅ Correct CORS middleware config
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # your frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
from pathlib import Path
UPLOAD_DIR = Path("uploaded_resumes")
UPLOAD_DIR.mkdir(exist_ok=True)
@app.get("/")
def read_root():
    return {"message": "✅ FastAPI is running"}

@app.post("/api/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    contents = await file.read()

    # ✅ Save to disk
    save_path = UPLOAD_DIR / file.filename
    with open(save_path, "wb") as f:
        f.write(contents)

    print(f"✅ Saved: {save_path.resolve()}")
    return {"filename": file.filename, "message": "Resume saved successfully"}
