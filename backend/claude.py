# manager_llm.py
"""
Singleton ChatBedrock model for Claude-3 Sonnet on Bedrock.
Import `llm` anywhere you need a LangChain-compatible LLM.
"""

import boto3
from langchain_aws.chat_models.bedrock import ChatBedrock

# ─── Bedrock settings ─────────────────────────────────────────────
_PROFILE  = "iff_aws_crtveapps_aitools_user-889166750058"   # ← your profile
_REGION   = "us-east-1"
_MODEL_ID = "us.anthropic.claude-3-7-sonnet-20250219-v1:0"
# ──────────────────────────────────────────────────────────────────

# Use the credentials stored in that AWS profile
_session = boto3.Session(profile_name=_PROFILE, region_name=_REGION)
_client  = _session.client("bedrock-runtime")

llm = ChatBedrock(
    client=_client,
    model_id=_MODEL_ID,
    model_kwargs={
        "max_tokens": 800,
        "temperature": 0.0,
        # Add/override fields (e.g. "system") at call-time if needed.
    },
)

__all__ = ["llm"]