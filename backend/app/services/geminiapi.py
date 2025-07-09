# app/services/genAI.py
import google.generativeai as genai
from app.config import creds

genai.configure(credentials=creds)
model = genai.GenerativeModel("gemini-1.5-flash")

def ask_gemini(prompt: str, max_output_tokens: int = 256) -> str:
    resp = model.predict(
        prompt,
        max_output_tokens=max_output_tokens,
        temperature=0.2
    )
    return resp.text
