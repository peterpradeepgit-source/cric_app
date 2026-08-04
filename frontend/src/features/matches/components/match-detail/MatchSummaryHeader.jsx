import MatchBadge from "../match-card/MatchBadge";
import MatchStatusDot from "../match-card/MatchStatusDot";

export default function MatchSummaryHeader({ match }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <MatchStatusDot status={match.status} />
        <span className="text-xs text-gray-400 uppercase tracking-wide">
          {match.series}
        </span>
      </div>
      <MatchBadge type={match.match_type} />
    </div>
  );
}
