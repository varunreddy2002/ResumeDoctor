# main.py
 
import os
import json
import logging
import shutil
from pathlib import Path
 
import pdfplumber
import docx2txt
import regex as re
 
from fastapi import FastAPI, UploadFile, File, HTTPException
import uvicorn
 
from claude import llm
from langchain.schema import SystemMessage, HumanMessage
 
# ──────────────────────────────────────────────────────────────────────────────
# Config & Constants
 
logging.basicConfig(level=logging.INFO)
 
ALLOWED_EXT = {".pdf", ".docx"}
MAX_SNIPPET_CHARS = 10_000
UPLOAD_DIR = Path("Data")
UPLOAD_DIR.mkdir(exist_ok=True)
 
app = FastAPI()
 
# ──────────────────────────────────────────────────────────────────────────────
# Helpers
 
def is_allowed(filename: str) -> bool:
    return filename.lower().endswith(tuple(ALLOWED_EXT))
 
def parse_pdf(path: Path) -> str:
    text_pages = []
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            text_pages.append(page.extract_text() or "")
    return "\n".join(text_pages)
 
def parse_docx(path: Path) -> str:
    return docx2txt.process(str(path))
 
def parse_resume(path: Path) -> str:
    """
    Try PDF parsing first (if .pdf or PDF header),
    then DOCX. Raise if neither yields text.
    """
    header = path.open("rb").read(5)
    looks_like_pdf = header == b"%PDF-"
    text = ""
 
    # 1) PDF attempt
    if looks_like_pdf or path.suffix.lower() == ".pdf":
        try:
            text = parse_pdf(path)
            if text.strip():
                return text
            logging.warning("PDF parse returned no text, falling back to DOCX")
        except Exception as e:
            logging.warning(f"PDF parse error: {e}; falling back to DOCX")
 
    # 2) DOCX attempt
    try:
        text = parse_docx(path)
        if text.strip():
            return text
        logging.warning("DOCX parse returned no text")
    except Exception as e:
        logging.error(f"DOCX parse error: {e}")
 
    # 3) Nothing worked
    raise ValueError("Unable to extract text from resume")
 
def extract_fields_with_claude(text: str) -> dict:
    """
    Send a snippet to Claude and extract the first {...} JSON block.
    """
    snippet = text[:MAX_SNIPPET_CHARS]
    messages = [
        SystemMessage(content=(
            "You are a strict JSON extractor for resumes. "
            "Given the resume text, output *only* valid JSON with exactly these keys: "
            "name, email, phone, education (list), experience (list), skills (list). "
            "Do NOT output any extra commentary or markdown."
        )),
        HumanMessage(content=f"Resume Text:\n\"\"\"\n{snippet}\n\"\"\"")
    ]
 
    resp = llm.invoke(messages)
    raw = resp.content.strip()
    logging.info(f"🔍 Raw Claude response:\n{raw}")
 
    # find the first balanced JSON object
    match = re.search(r"\{(?:[^{}]|(?R))*\}", raw)
    if not match:
        logging.error("No JSON object found in Claude response")
        raise HTTPException(502, "No JSON found in NLP response")
 
    json_str = match.group(0)
    try:
        return json.loads(json_str)
    except json.JSONDecodeError as e:
        logging.error(f"JSON decode error: {e}\nExtracted JSON:\n{json_str}")
        raise HTTPException(
            502,
            detail=f"Invalid JSON from NLP service:\n{e}\n\n{json_str}"
        )
 
# ──────────────────────────────────────────────────────────────────────────────
# Routes
 
@app.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    # 1) Validate
    if not is_allowed(file.filename):
        raise HTTPException(400, "Only .pdf and .docx files are allowed")
 
    # 2) Save to disk
    safe_name = file.filename
    dest = UPLOAD_DIR / safe_name
    try:
        with dest.open("wb") as out:
            shutil.copyfileobj(file.file, out)
    except Exception as e:
        logging.error(f"Error saving file: {e}")
        raise HTTPException(500, "Could not save upload")
 
    # 3) Extract raw text
    try:
        raw_text = parse_resume(dest)
    except ValueError as e:
        raise HTTPException(400, f"Parse error: {e}")
    except Exception as e:
        logging.error(f"Unexpected parse error: {e}")
        raise HTTPException(500, "Internal parse error")
 
    # 4) Call Claude to extract fields
    try:
        parsed = extract_fields_with_claude(raw_text)
    except HTTPException:
        # re-raise so FastAPI handles it
        raise
    except Exception as e:
        logging.error(f"Claude extraction error: {e}")
        raise HTTPException(502, "Failed to extract fields")
 
    # 5) Return structured JSON
    return {"filename": dest.name, "parsed": parsed}
 
 
@app.get("/")
def root():
    return {"message": "Resume parser is running"}
 
# ──────────────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8888, reload=True)