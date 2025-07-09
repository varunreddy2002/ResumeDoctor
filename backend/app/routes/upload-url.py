from fastapi import APIRouter, Query, Depends
from app.services.auth import verify_firebase_token
from app.services.storage import generate_upload_url

router = APIRouter()

@router.get("/upload-url")
async def get_upload_url(
    filename: str = Query(...),
    uid: str = Depends(verify_firebase_token)
):
    url = generate_upload_url(uid, filename)
    return {"url": url}
