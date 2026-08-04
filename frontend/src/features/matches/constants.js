import {
  getLiveMatches,
  getRecentMatches,
  getUpcomingMatches,
} from "../../api";

export const MATCH_TABS = [
  { key: "live", label: "Live" },
  { key: "upcoming", label: "Upcoming" },
  { key: "recent", label: "Recent" },
];

export const MATCH_FETCHERS = {
  live: getLiveMatches,
  upcoming: getUpcomingMatches,
  recent: getRecentMatches,
};

export const LIVE_REFRESH_MS = 30000;
