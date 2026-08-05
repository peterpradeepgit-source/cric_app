import { MatchSummarySkeleton } from "../../../../shared/ui/Skeleton";
import MatchMetadata from "./MatchMetadata";
import MatchSummaryHeader from "./MatchSummaryHeader";
import TeamScoreSummary from "./TeamScoreSummary";

export default function MatchSummaryCard({ loading = false, match }) {
  if (loading) {
    return <MatchSummarySkeleton />;
  }

  return (
    <div className="bg-cbcard rounded-xl p-5 mb-4">
      <MatchSummaryHeader match={match} />
      <TeamScoreSummary teams={match.teams} scores={match.scores} />

      {match.status_text && (
        <p className="text-sm text-gray-300 mb-1">{match.status_text}</p>
      )}
      {match.result && (
        <p className="text-sm text-cbcompleted font-medium">{match.result}</p>
      )}

      <MatchMetadata match={match} />
    </div>
  );
}
