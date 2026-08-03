from datetime import datetime, timedelta, timezone
from app.models import Match, TeamScore


def _dt(hours_offset: float = 0) -> datetime:
    return datetime.now(timezone.utc) + timedelta(hours=hours_offset)


MOCK_MATCHES: list[Match] = [
    Match(
        id="match-001",
        teams=["India", "Australia"],
        scores=[
            TeamScore(team="India", runs=187, wickets=5, overs=20.0),
            TeamScore(team="Australia", runs=142, wickets=3, overs=14.2),
        ],
        status="live",
        status_text="Live - Australia needs 46 runs in 34 balls",
        venue="M. Chinnaswamy Stadium, Bengaluru",
        date=_dt(-2),
        series="India vs Australia T20I Series",
        match_type="T20",
        summary="AUS need 46 runs in 34 balls",
    ),
    Match(
        id="match-002",
        teams=["England", "South Africa"],
        scores=[
            TeamScore(team="England", runs=312, wickets=8, overs=50.0),
            TeamScore(team="South Africa", runs=289, wickets=9, overs=48.5),
        ],
        status="live",
        status_text="Live - England won by 23 runs",
        venue="Lord's, London",
        date=_dt(-5),
        series="England vs South Africa ODI Series",
        match_type="ODI",
        summary="ENG won by 23 runs",
    ),
    Match(
        id="match-003",
        teams=["Pakistan", "New Zealand"],
        scores=[
            TeamScore(team="Pakistan", runs=0, wickets=0, overs=0.0),
            TeamScore(team="New Zealand", runs=0, wickets=0, overs=0.0),
        ],
        status="upcoming",
        status_text="Upcoming - Tomorrow",
        venue="Rawalpindi Cricket Stadium",
        date=_dt(24),
        series="Pakistan vs New Zealand Test Series",
        match_type="Test",
        summary="Starts in 24 hours",
    ),
    Match(
        id="match-004",
        teams=["Sri Lanka", "Bangladesh"],
        scores=[
            TeamScore(team="Sri Lanka", runs=0, wickets=0, overs=0.0),
            TeamScore(team="Bangladesh", runs=0, wickets=0, overs=0.0),
        ],
        status="upcoming",
        status_text="Upcoming - In 2 days",
        venue="R. Premadasa Stadium, Colombo",
        date=_dt(48),
        series="Sri Lanka vs Bangladesh T20I Series",
        match_type="T20",
        summary="Starts in 2 days",
    ),
    Match(
        id="match-005",
        teams=["West Indies", "Afghanistan"],
        scores=[
            TeamScore(team="West Indies", runs=156, wickets=7, overs=20.0),
            TeamScore(team="Afghanistan", runs=157, wickets=4, overs=18.3),
        ],
        status="completed",
        status_text="Completed",
        result="Afghanistan won by 6 wickets",
        venue="Daren Sammy Cricket Ground, St Lucia",
        date=_dt(-48),
        series="West Indies vs Afghanistan T20I Series",
        match_type="T20",
        summary="AFG won by 6 wickets",
    ),
    Match(
        id="match-006",
        teams=["New Zealand", "India"],
        scores=[
            TeamScore(team="New Zealand", runs=295, wickets=6, overs=50.0),
            TeamScore(team="India", runs=296, wickets=4, overs=47.2),
        ],
        status="completed",
        status_text="Completed",
        result="India won by 6 wickets",
        venue="Eden Park, Auckland",
        date=_dt(-72),
        series="India vs New Zealand ODI Series",
        match_type="ODI",
        summary="IND won by 6 wickets",
    ),
]
