import { useCallback, useEffect, useState } from "react";
import { LIVE_REFRESH_MS, MATCH_FETCHERS } from "../constants";

export default function useMatches(activeTab, selectedMatch) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const loadMatches = useCallback(() => {
    setLoading(true);
    setError(null);

    return MATCH_FETCHERS[activeTab]()
      .then((data) => {
        setMatches(data);
        setLastUpdated(new Date());
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [activeTab]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    MATCH_FETCHERS[activeTab]()
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

  useEffect(() => {
    if (activeTab !== "live" || selectedMatch) return undefined;

    const id = setInterval(() => {
      MATCH_FETCHERS.live()
        .then((data) => {
          setMatches(data);
          setLastUpdated(new Date());
        })
        .catch(() => {});
    }, LIVE_REFRESH_MS);

    return () => clearInterval(id);
  }, [activeTab, selectedMatch]);

  return {
    matches,
    loading,
    error,
    lastUpdated,
    refresh: loadMatches,
  };
}
