# Cric App

A full-stack cricket match tracker with a FastAPI backend and a React + Vite frontend.

## Overview

- Backend provides match data endpoints for live, upcoming, recent, and specific matches.
- Frontend shows match cards, details, and a live refresh experience.
- The backend scrapes Cricbuzz for match data and falls back to local mock data when needed.

## Repository structure

- `backend/` — FastAPI server and data services
- `frontend/` — React app built with Vite

## Prerequisites

- Python 3.12+ (or compatible Python 3.x)
- Node.js 18+ and npm

## Backend setup

1. Navigate to the backend folder:

   ```bash
   cd backend
   ```

2. Install Python dependencies:

   ```bash
   python -m pip install -r requirements.txt
   ```

3. Create a `.env` file if you want to use the CricAPI integration:

   ```env
   CRIC_API_KEY=your_cricapi_key_here
   APP_HOST=127.0.0.1
   APP_PORT=8000
   ```

4. Start the backend:

   ```bash
   python main.py
   ```

5. Verify the server is running:

   ```bash
   curl http://127.0.0.1:8000/health
   ```

## Frontend setup

1. Navigate to the frontend folder:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend development server:

   ```bash
   npm run dev
   ```

4. Open the app in your browser at the URL shown by Vite (typically `http://localhost:5173`).

## Local development workflow

- Run the backend on `http://127.0.0.1:8000`
- Run the frontend on `http://localhost:5173`
- The frontend is configured to proxy `/api` requests to the backend

## Features

- live match list with auto-refresh
- upcoming matches schedule
- recent/completed matches
- match detail view
- fallback to mock match data when scraping or API data is unavailable

## Notes

- The backend uses `httpx` and BeautifulSoup to fetch and parse Cricbuzz match data.
- The frontend uses a Vite proxy to forward requests to the backend API.
- If `CRIC_API_KEY` is not set, the backend will still serve mock data.
