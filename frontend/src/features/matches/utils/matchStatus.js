export function normalizeMatchStatus(status) {
  return String(status || "").trim().toLowerCase();
}

export function isLiveMatch(match) {
  return normalizeMatchStatus(match?.status) === "live";
}

export function getMatchesForTab(activeTab, matches = []) {
  if (activeTab !== "live") return matches;
  return matches.filter(isLiveMatch);
}
