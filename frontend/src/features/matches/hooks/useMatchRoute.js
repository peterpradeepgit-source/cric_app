import { useCallback, useEffect, useState } from "react";

const MATCH_ROUTE_PATTERN = /^\/matches\/([^/]+)\/?$/;

function getRouteFromLocation() {
  const match = window.location.pathname.match(MATCH_ROUTE_PATTERN);

  return {
    matchId: match ? decodeURIComponent(match[1]) : null,
    previewMatch: window.history.state?.match || null,
  };
}

export default function useMatchRoute() {
  const [route, setRoute] = useState(() => getRouteFromLocation());

  useEffect(() => {
    const handlePopState = () => setRoute(getRouteFromLocation());

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const openMatch = useCallback((match) => {
    const path = `/matches/${encodeURIComponent(match.id)}`;
    window.history.pushState({ match }, "", path);
    setRoute({ matchId: match.id, previewMatch: match });
  }, []);

  const openMatchList = useCallback(() => {
    window.history.pushState(null, "", "/");
    setRoute({ matchId: null, previewMatch: null });
  }, []);

  return {
    matchId: route.matchId,
    openMatch,
    openMatchList,
    previewMatch: route.previewMatch,
  };
}
