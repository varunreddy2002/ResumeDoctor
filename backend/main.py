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

@app.get("/")
def read_root():
    return {"message": "✅ FastAPI is running"}

@app.post("/api/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    contents = await file.read()
    print(f"✅ Received file: {file.filename} ({len(contents)} bytes)")
    return {"filename": file.filename, "message": "Resume uploaded successfully"}
