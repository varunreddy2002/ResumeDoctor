import requests

API_KEY = "AIzaSyC7wKywRl94y89kMWkBvnWM6_Mth9AYgjU"
url = f"https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key={API_KEY}"

headers = {
    "Content-Type": "application/json"
}

data = {
    "contents": [
        {
            "parts": [{"text": "Say hello from Gemini Flash!"}]
        }
    ]
}

response = requests.post(url, headers=headers, json=data)
print(response.json())

