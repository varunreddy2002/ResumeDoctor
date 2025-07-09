import os
from pathlib import Path
from dotenv import load_dotenv
from google.cloud import storage
import firebase_admin
from firebase_admin import auth as fb_auth
from google.oauth2 import service_account

# load .env
load_dotenv()

# allowed file extensions
ALLOWED_EXT = {".pdf", ".docx"}

# Firebase Admin + GCS creds
KEY_PATH = Path(__file__).resolve().parent.parent / "resumedoctor-keys.json"
creds    = service_account.Credentials.from_service_account_file(KEY_PATH)
firebase_admin.initialize_app()
storage_client = storage.Client(credentials=creds, project=creds.project_id)
BUCKET_NAME    = os.getenv("GCS_BUCKET")
bucket         = storage_client.bucket(BUCKET_NAME)
