from datetime import datetime, timezone
from typing import List, Optional
from pydantic import BaseModel, Field


class TeamScore(BaseModel):
    team: str
    runs: int = 0
    wickets: int = 0
    overs: float = 0.0


class BattingScore(BaseModel):
    batter: str
    dismissal: str = ""
    runs: int = 0
    balls: int = 0
    fours: int = 0
    sixes: int = 0
    strike_rate: float = 0.0
    is_out: bool = False
    is_batting: bool = False


class BowlingScore(BaseModel):
    bowler: str
    balls: int = 0
    maidens: int = 0
    runs: int = 0
    wickets: int = 0
    noballs: int = 0
    wides: int = 0
    economy: float = 0.0
    is_bowling: bool = False


class FallOfWicket(BaseModel):
    score: str = ""
    wicket_ball: str = ""
    batter: str = ""


class Innings(BaseModel):
    innings_label: str = ""
    batting_team: str = ""
    bowling_team: str = ""
    runs: int = 0
    wickets: int = 0
    overs: float = 0.0
    batting: list[BattingScore] = []
    bowling: list[BowlingScore] = []
    fall_of_wickets: list[FallOfWicket] = []
    extras: str = ""
    yet_to_bat: list[str] = []


class Scorecard(BaseModel):
    innings: list[Innings] = []
    toss: str = ""
    result: str = ""
    match_info: str = ""


class Match(BaseModel):
    id: str
    teams: List[str]
    scores: List[TeamScore] = []
    status: str = Field(default="live", pattern="^(live|upcoming|completed)$")
    status_text: str = ""
    result: Optional[str] = None
    venue: str = ""
    date: Optional[int] = None
    series: str = ""
    match_type: str = Field(default="T20", pattern="^(T20|ODI|Test)$")
    summary: Optional[str] = None
    scorecard: Optional[Scorecard] = None
