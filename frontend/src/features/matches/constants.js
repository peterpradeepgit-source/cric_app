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

export const MATCH_TYPE_FILTERS = [
  { key: "all", label: "All" },
  { key: "T20", label: "T20" },
  { key: "ODI", label: "ODI" },
  { key: "Test", label: "Test" },
];

export const MATCH_LAYOUTS = [
  { key: "list", label: "List" },
  { key: "cards", label: "Cards" },
];

export const MATCH_FETCHERS = {
  live: getLiveMatches,
  upcoming: getUpcomingMatches,
  recent: getRecentMatches,
};

export const LIVE_REFRESH_MS = 30000;
