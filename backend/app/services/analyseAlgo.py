import io
import fitz
from .geminiapi import model

def resumeAnalyze(resume_bytes: bytes, job_description: str) -> dict:
    """
    1) Parse the incoming PDF bytes into raw text.
    2) Send a prompt combining resume text and job description to Gemini.
    3) Return a dict with the analysis result.
    """
    # Wrap bytes in a fresh in-memory stream so fitz.open can read it
    stream = io.BytesIO(resume_bytes)
    text = ""
    with fitz.open(stream=stream, filetype="pdf") as doc:
        for page in doc:
            text += page.get_text() or ""

    prompt = f"""
You are a resume analyzer. Compare the resume below with the job description and give:
1. Skills Match %
2. Missing Skills
3. Top Match Highlights
4. Final Verdict (Short text)

Resume:
{text}

Job Description:
{job_description}
"""

    # Call the Gemini model
    response = model.generate_content(prompt)
    # Return a plain dict (FastAPI will serialize to JSON)
    return {"analysis": response.text}
