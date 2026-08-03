#!/bin/bash

# Test script for Cric App API
# Run server first: python3 main.py
# Then run: chmod +x test_api.sh && ./test_api.sh

BASE_URL="http://127.0.0.1:8000"

echo "=== Health Check ==="
curl -s "$BASE_URL/health" | jq . 2>/dev/null || curl -s "$BASE_URL/health"
echo

# echo "=== All Matches ==="
# curl -s "$BASE_URL/matches/" | jq . 2>/dev/null || curl -s "$BASE_URL/matches/"
# echo

# echo "=== Live Matches ==="
# curl -s "$BASE_URL/matches/live" | jq . 2>/dev/null || curl -s "$BASE_URL/matches/live"
# echo

# echo "=== Upcoming Matches ==="
# curl -s "$BASE_URL/matches/upcoming" | jq . 2>/dev/null || curl -s "$BASE_URL/matches/upcoming"
# echo

# echo "=== Recent Matches ==="
# curl -s "$BASE_URL/matches/recent" | jq . 2>/dev/null || curl -s "$BASE_URL/matches/recent"
# echo

echo "=== Match by ID ==="
curl -s "$BASE_URL/matches/cb-144827" | jq . 2>/dev/null || curl -s "$BASE_URL/matches/match-001"
echo

# echo "=== Match by ID (not found) ==="
# curl -s "$BASE_URL/matches/not-found" | jq . 2>/dev/null || curl -s "$BASE_URL/matches/not-found"
# echo
