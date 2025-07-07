import os
import shutil
from datetime import datetime

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

def save_uploaded_file(file):
    file_ext = file.filename.split('.')[-1].lower()
    if file_ext not in ["pdf", "docx"]:
        raise ValueError("Only PDF and DOCX files are supported.")

    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    new_filename = f"{timestamp}_{file.filename}"
    file_path = os.path.join(UPLOAD_DIR, new_filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return new_filename, file_path
