import MatchBadge from "./MatchBadge";
import MatchStatusDot from "./MatchStatusDot";

export default function MatchCardHeader({ match }) {
  return (
    <div className="flex items-center justify-between mb-3">
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
