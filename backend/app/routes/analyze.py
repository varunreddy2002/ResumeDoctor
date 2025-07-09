from fastapi import APIRouter, UploadFile, File, Form, HTTPException
import traceback
from app.services import analyseAlgo

router = APIRouter()

@router.post("/analyze")
async def analyze_resume_gemini(
    resume_file: UploadFile = File(...),
    job_description: str    = Form(...)
):
    # 1) Read the uploaded file into bytes
    data = await resume_file.read()

    # 2) Call your analysis function
    try:
        return analyseAlgo.resumeAnalyze(data, job_description)
    except Exception as e:
        # Log full traceback to console
        traceback.print_exc()
        # Return a 500 with the error message
        raise HTTPException(status_code=500, detail=str(e))
