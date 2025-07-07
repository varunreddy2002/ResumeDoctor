import os
import requests

# Set your Claude API key in the environment or paste it directly here (not recommended for prod)
CLAUDE_API_KEY = os.getenv("CLAUDE_API_KEY")
CLAUDE_API_URL = "https://api.anthropic.com/v1/messages"

def ask_claude(prompt):
    headers = {
        "x-api-key": CLAUDE_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
    }

    data = {
        "model": "claude-3-haiku-20240307",  # or use "opus" or "sonnet" if available
        "max_tokens": 1024,
        "temperature": 0.2,
        "messages": [
            {
                "role": "user",
                "content": prompt
            }
        ]
    }

    response = requests.post(CLAUDE_API_URL, headers=headers, json=data)
    response.raise_for_status()
    return response.json()["content"][0]["text"]

def build_resume_prompt(resume_text):
    return f"""
You are an AI resume parser. Extract the following information clearly from this resume:

- Full Name
- Email Address
- Phone Number
- Education: Institution, Degree, Dates
- Work Experience: Company, Role, Dates
- Skills

Respond in clean JSON format.

Resume Content:
\"\"\"
{resume_text}
\"\"\"
"""
