import os
from typing import Any
import httpx


CRIC_API_KEY = os.getenv("CRIC_API_KEY")
CRIC_API_BASE_URL = "https://api.cricapi.com/v1"


async def fetch_current_matches() -> list[dict[str, Any]]:
    """Fetch live/upcoming matches from CricAPI.

    Returns empty list if no API key is configured.
    """
    if not CRIC_API_KEY:
        return []

    url = f"{CRIC_API_BASE_URL}/currentMatches"
    params = {"apikey": CRIC_API_KEY, "offset": 0}

    async with httpx.AsyncClient() as client:
        response = await client.get(url, params=params, timeout=10.0)
        response.raise_for_status()
        data = response.json()
        return data.get("data", [])
