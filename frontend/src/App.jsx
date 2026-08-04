import { useState } from "react";
import MatchDetailPage from "./features/matches/components/MatchDetailPage";
import MatchListPage from "./features/matches/components/MatchListPage";
import useMatchDetail from "./features/matches/hooks/useMatchDetail";
import useMatchRoute from "./features/matches/hooks/useMatchRoute";
import useMatches from "./features/matches/hooks/useMatches";

export default function App() {
  const [activeTab, setActiveTab] = useState("live");
  const { matchId, openMatch, openMatchList, previewMatch } = useMatchRoute();
  const { detailError, detailLoading, selectedMatch } = useMatchDetail(
    matchId,
    previewMatch,
  );
  const { error, lastUpdated, loading, matches, refresh } = useMatches(
    activeTab,
    matchId,
  );

  if (matchId) {
    return (
      <MatchDetailPage
        error={detailError}
        loading={detailLoading}
        match={selectedMatch}
        onBack={openMatchList}
      />
    );
  }

  return (
    <MatchListPage
      activeTab={activeTab}
      error={error}
      lastUpdated={lastUpdated}
      loading={loading}
      matches={matches}
      onMatchClick={openMatch}
      onRefresh={refresh}
      onTabChange={setActiveTab}
    />
  );
}
