import ErrorState from "../../../shared/ui/ErrorState";
import { MatchDetailSkeleton } from "../../../shared/ui/Skeleton";
import MatchDetail from "./match-detail/MatchDetail";

export default function MatchDetailPage({ error, loading, match, onBack }) {
  if (!match && (loading || !error)) {
    return (
      <div className="min-h-screen bg-cbdark">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-sm text-gray-400 hover:text-white mb-4 transition-colors"
          >
            <span>←</span> Back
          </button>
          <MatchDetailSkeleton />
        </div>
      </div>
    );
  }

  if (!match && error) {
    return (
      <div className="min-h-screen bg-cbdark">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-sm text-gray-400 hover:text-white mb-4 transition-colors"
          >
            <span>←</span> Back
          </button>
          <ErrorState message={error} onRetry={() => window.location.reload()} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cbdark">
      {loading && (
        <div className="fixed top-0 left-0 right-0 h-0.5 bg-cbaccent animate-pulse z-50" />
      )}
      <MatchDetail loading={loading} match={match} onBack={onBack} />
    </div>
  );
}
