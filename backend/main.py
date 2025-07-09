from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import fitz  # PyMuPDF
import os
from dotenv import load_dotenv
from gemini_helper import get_resume_analysis
import google.generativeai as genai

# Load API key from .env
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
model = genai.GenerativeModel("gemini-1.5-flash")
# Configure Gemini
genai.configure(api_key=api_key)



app = Flask(__name__)
CORS(app)
@app.route("/")
def home():
    return "ResumeDoctor Gemini API is running."

UPLOAD_FOLDER = 'temp'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def extract_text_from_pdf(path):
    doc = fitz.open(path)
    return "\n".join([page.get_text() for page in doc])
@app.route("/analyze_resume_gemini", methods=["POST"])
def analyze_resume_gemini():
    resume_file = request.files.get("resume")
    job_description = request.form.get("jd")

    if not resume_file or not job_description:
        return jsonify({"error": "Missing resume or job description"}), 400

    # Read PDF using PyMuPDF
    text = ""
    import fitz
    with fitz.open(stream=resume_file.read(), filetype="pdf") as doc:
        for page in doc:
            text += page.get_text()

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

    try:
        response = model.generate_content(prompt)
        return jsonify({"analysis": response.text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
if __name__ == "__main__":
    app.run(debug=True)
