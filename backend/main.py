from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import analyze

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analyze.router,     prefix="/api")
#app.include_router(upload_url.router, prefix="/api")
#app.include_router(upload.router,     prefix="/api")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8080)
