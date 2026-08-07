from fastapi import APIRouter, HTTPException

from app.data import MOCK_MATCHES
from app.models import Match
from app.services.cricbuzz import fetch_live_matches, fetch_upcoming_matches, fetch_recent_matches, fetch_scorecard


router = APIRouter(prefix="/matches", tags=["matches"])


@router.get("/live", response_model=list[Match])
async def get_live_matches() -> list[Match]:
    try:
        live = await fetch_live_matches()
        if live:
            return live
    except Exception:
        pass
    return [m for m in MOCK_MATCHES if m.status == "live"]


@router.get("/upcoming", response_model=list[Match])
async def get_upcoming_matches() -> list[Match]:
    try:
        upcoming = await fetch_upcoming_matches()
        if upcoming:
            return upcoming
    except Exception:
        pass
    return [m for m in MOCK_MATCHES if m.status == "upcoming"]


@router.get("/recent", response_model=list[Match])
async def get_recent_matches() -> list[Match]:
    try:
        recent = await fetch_recent_matches()
        if recent:
            return recent
    except Exception:
        pass
    return [m for m in MOCK_MATCHES if m.status == "completed"]


@router.get("/{match_id}", response_model=Match)
async def get_match_by_id(match_id: str) -> Match:
    try:
        live = await fetch_live_matches()
        for m in live:
            if m.id == match_id:
                try:
                    m.scorecard = await fetch_scorecard(match_id)
                except Exception:
                    pass
                return m
    except Exception:
        pass

    for m in MOCK_MATCHES:
        if m.id == match_id:
            return m

    raise HTTPException(status_code=404, detail="Match not found")


@router.get("/", response_model=list[Match])
async def get_all_matches() -> list[Match]:
    try:
        live = await fetch_live_matches()
        upcoming = await fetch_upcoming_matches()
        combined = live + upcoming
        if combined:
            recent = [m for m in MOCK_MATCHES if m.status == "completed"]
            return combined + recent
    except Exception:
        pass
    return MOCK_MATCHES
