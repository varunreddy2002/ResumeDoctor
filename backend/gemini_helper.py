import requests
import os

# Use the working Gemini Flash model
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY") or "AIzaSyC7wKywRl94y89kMWkBvnWM6_Mth9AYgjU"
GEMINI_URL = f"https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}"

def get_resume_analysis(resume_text: str, job_description: str) -> str:
    try:
        headers = {
            "Content-Type": "application/json"
        }

        prompt = f"""
You are a recruitment AI assistant.

Here is the job description:
\"\"\"
{job_description}
\"\"\"

Here is the candidate's resume:
\"\"\"
{resume_text}
\"\"\"

Please analyze the resume based on the job description. Provide:
- Matched skills
- Missing skills
- Education/Experience fit
- Overall compatibility score (out of 100)
- A one-paragraph summary for the recruiter
"""

        data = {
            "contents": [
                {
                    "parts": [{"text": prompt}]
                }
            ]
        }

        response = requests.post(GEMINI_URL, headers=headers, json=data)

        if response.status_code == 200:
            result = response.json()
            generated_text = result["candidates"][0]["content"]["parts"][0]["text"]
            return generated_text
        else:
            return f"[Gemini API Error] {response.status_code}: {response.text}"

    except Exception as e:
        return f"[Internal Error] {str(e)}"
