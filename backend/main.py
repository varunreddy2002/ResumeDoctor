from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from auth import router as auth_router
from starlette.middleware.sessions import SessionMiddleware

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(SessionMiddleware, secret_key="37e5409ffc36a5a4e7f44305884cb5079db7e8b14b71a1c7510988b2a1508f46")

# Mount the auth routes
app.include_router(auth_router, prefix="/auth")

@app.get("/")
def read_root():
    return {"message": "ResumeDoctor API is running"}
