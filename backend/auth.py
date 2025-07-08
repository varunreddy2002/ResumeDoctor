from fastapi import APIRouter, Request, Depends, HTTPException, status
from fastapi.responses import RedirectResponse
from pydantic import BaseModel, EmailStr
from starlette.responses import JSONResponse
from authlib.integrations.starlette_client import OAuth
from dotenv import load_dotenv
from starlette.config import Config
import os
import sqlite3

# Load environment variables
load_dotenv()

router = APIRouter()

# OAuth setup
config_data = {
    "GOOGLE_CLIENT_ID": os.getenv("GOOGLE_CLIENT_ID"),
    "GOOGLE_CLIENT_SECRET": os.getenv("GOOGLE_CLIENT_SECRET"),
}
if not config_data["GOOGLE_CLIENT_ID"] or not config_data["GOOGLE_CLIENT_SECRET"]:
    raise RuntimeError("Missing Google OAuth credentials")

config = Config(environ=config_data)

oauth = OAuth(config)
oauth.register(
    name='google',
    client_id=config_data["GOOGLE_CLIENT_ID"],
    client_secret=config_data["GOOGLE_CLIENT_SECRET"],
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={'scope': 'openid email profile'}
)
def get_user_by_email(email: str):
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
    user = cursor.fetchone()
    conn.close()
    return user

# Models
class SignupRequest(BaseModel):
    email: EmailStr
    password: str

# Sample signup route
@router.post("/signup")
async def signup_user(payload: SignupRequest):
    # In production, store user to database
    return {"message": "User registered successfully", "email": payload.email}
@router.post("/login")
async def login(payload: SignupRequest):
    user = get_user_by_email(payload.email)
    if not user or user[2] != payload.password:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    return {"message": "Login successful", "email": payload.email}
# Redirect user to Google OAuth
@router.get("/auth/google/login")
async def login_with_google(request: Request):
    redirect_uri = "http://localhost:8000/auth/google/callback"
    return await oauth.google.authorize_redirect(request, redirect_uri)

# Google OAuth callback
@router.get("/auth/google/callback")
async def auth_google_callback(request: Request):
    try:
        token = await oauth.google.authorize_access_token(request)
        user_info = await oauth.google.parse_id_token(request, token)
        return JSONResponse({"message": "Login successful", "user": user_info})
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
