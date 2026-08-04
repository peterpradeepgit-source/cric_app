import EmptyState from "../../../shared/ui/EmptyState";
import ErrorState from "../../../shared/ui/ErrorState";
import { MatchCardGridSkeleton } from "../../../shared/ui/Skeleton";
import AppHeader from "./AppHeader";
import LastUpdatedLabel from "./LastUpdatedLabel";
import MatchGrid from "./MatchGrid";
import MatchTabs from "./MatchTabs";

export default function MatchListPage({
  activeTab,
  error,
  lastUpdated,
  loading,
  matches,
  onMatchClick,
  onRefresh,
  onTabChange,
}) {
  return (
    <div className="min-h-screen bg-cbdark">
      <AppHeader loading={loading} onRefresh={onRefresh} />
      <MatchTabs activeTab={activeTab} onTabChange={onTabChange} />

      <main className="max-w-5xl mx-auto px-4 py-6">
        <LastUpdatedLabel activeTab={activeTab} lastUpdated={lastUpdated} />

        {loading ? (
          <MatchCardGridSkeleton />
        ) : error ? (
          <ErrorState message={error} onRetry={onRefresh} />
        ) : matches.length === 0 ? (
          <EmptyState label={`No ${activeTab} matches at the moment.`} />
        ) : (
          <MatchGrid matches={matches} onMatchClick={onMatchClick} />
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
