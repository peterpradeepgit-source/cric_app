# Cricbuzz-like Site — v1 Spec

## Goal
Build a simple, single-page web app that displays cricket matches in three sections: **In Progress**, **Upcoming**, and **Recent**.

## Core Features

### 1. In-Progress Matches Window
- List all currently live matches.
- Each card shows:
  - Teams playing (Team A vs Team B)
  - Current score (runs/wickets) for each team
  - Overs
  - Match status (e.g., "Live — Day 2", "Innings break", "Rain delay")
  - Short summary line (e.g., "Team A needs 42 runs in 18 balls")
- Auto-refresh every 30–60 seconds.
- Click card to open match detail view.

### 2. Upcoming Matches Window
- List scheduled matches for the next 7 days.
- Each card shows:
  - Teams
  - Date and time (local + GMT)
  - Venue / Series name
- Filter by date or series.

### 3. Recent Matches Window
- List completed matches from the last 7 days.
- Each card shows:
  - Teams and final scores
  - Result summary (e.g., "India won by 5 wickets")
  - Match date
- Sort by most recent first.

## Tech Stack (v1)
- **Frontend:** React + Vite
- **Styling:** Tailwind CSS
- **Data Source:** Free cricket API (e.g., CricAPI, CricketData) or mock data for v1
- **State:** React hooks; no backend needed initially

## Pages / Views
1. **Home** — shows three windows/tabs side by side or as tabs.
2. **Match Detail** — expanded scorecard for selected match.

## Data Model (per match)
```json
{
  "id": "string",
  "teams": ["Team A", "Team B"],
  "scores": [{"runs": 0, "wickets": 0, "overs": 0}],
  "status": "live | upcoming | completed",
  "result": "string",
  "venue": "string",
  "date": "ISO timestamp",
  "series": "string"
}
```

## v1 Scope Limits
- No user accounts or authentication.
- No admin panel; data comes from API/mock.
- No push notifications.
- No video streaming.
- Mobile-responsive layout required.

## Next Steps
1. Set up React + Vite project.
2. Create mock match data.
3. Build the three window components.
4. Integrate a live cricket API.
5. Add match detail view.
6. Deploy (Vercel/Netlify).
