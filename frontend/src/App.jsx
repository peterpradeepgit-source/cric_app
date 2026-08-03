import { useState, useEffect } from "react";
import {
  getLiveMatches,
  getUpcomingMatches,
  getRecentMatches,
  getMatchById,
} from "./api";
import MatchCard from "./components/MatchCard";
import MatchDetail from "./components/MatchDetail";

const FETCHERS = {
  live: getLiveMatches,
  upcoming: getUpcomingMatches,
  recent: getRecentMatches,
};

const TABS = [
  { key: "live", label: "Live" },
  { key: "upcoming", label: "Upcoming" },
  { key: "recent", label: "Recent" },
];

const LIVE_REFRESH_MS = 30000;

function Spinner() {
  return (
    <div className="flex justify-center py-16">
      <div className="w-8 h-8 border-2 border-cbaccent/30 border-t-cbaccent rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("live");
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const [selectedMatch, setSelectedMatch] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  // Fetch matches for the active tab
  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    FETCHERS[activeTab]()
      .then((data) => {
        if (!active) return;
        setMatches(data);
        setLastUpdated(new Date());
      })
      .catch((e) => {
        if (active) setError(e.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [activeTab]);

  // Auto-refresh live matches every 30s
  useEffect(() => {
    if (activeTab !== "live" || selectedMatch) return;
    const id = setInterval(() => {
      FETCHERS.live()
        .then((data) => {
          setMatches(data);
          setLastUpdated(new Date());
        })
        .catch(() => {});
    }, LIVE_REFRESH_MS);
    return () => clearInterval(id);
  }, [activeTab, selectedMatch]);

  const handleRefresh = () => {
    setLoading(true);
    setError(null);
    FETCHERS[activeTab]()
      .then((data) => {
        setMatches(data);
        setLastUpdated(new Date());
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  const handleCardClick = (match) => {
    setSelectedMatch(match);
    setDetailLoading(true);
    getMatchById(match.id)
      .then((full) => setSelectedMatch(full))
      .catch(() => {})
      .finally(() => setDetailLoading(false));
  };

  // Match detail view
  if (selectedMatch) {
    return (
      <div className="min-h-screen bg-cbdark">
        {detailLoading && (
          <div className="fixed top-0 left-0 right-0 h-0.5 bg-cbaccent animate-pulse z-50" />
        )}
        <MatchDetail
          match={selectedMatch}
          onBack={() => setSelectedMatch(null)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cbdark">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-cbdark/95 backdrop-blur border-b border-gray-800/60">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-bold text-white">
            <span className="text-cbgreen">●</span> Cric App
          </h1>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="text-xs text-gray-400 hover:text-white disabled:opacity-40 transition-colors flex items-center gap-1"
          >
            <span className={loading ? "animate-spin" : ""}>⟳</span> Refresh
          </button>
        </div>
      </header>

      {/* Tabs */}
      <nav className="sticky top-[52px] z-30 bg-cbdark/95 backdrop-blur border-b border-gray-800/60">
        <div className="max-w-5xl mx-auto px-4 flex gap-1">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? "text-cbaccent"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cbaccent rounded-t" />
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 py-6">
        {lastUpdated && (
          <p className="text-xs text-gray-600 mb-4">
            Updated{" "}
            {lastUpdated.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
            {activeTab === "live" && " · auto-refreshing"}
          </p>
        )}

        {loading ? (
          <Spinner />
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-sm text-gray-400 mb-3">Failed to load matches</p>
            <p className="text-xs text-gray-600 mb-4">{error}</p>
            <button
              onClick={handleRefresh}
              className="text-sm text-cbaccent border border-cbaccent/30 rounded-lg px-4 py-2 hover:bg-cbaccent/10 transition-colors"
            >
              Try again
            </button>
          </div>
        ) : matches.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-sm text-gray-500">
              No {activeTab} matches at the moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {matches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                onClick={handleCardClick}
              />
            ))}
          </div>
        )}
      </main>

      <footer className="max-w-5xl mx-auto px-4 py-8 text-center">
        <p className="text-xs text-gray-700">
          Data via Cricbuzz · mock fallback when scraping fails
        </p>
      </footer>
    </div>
  );
}
