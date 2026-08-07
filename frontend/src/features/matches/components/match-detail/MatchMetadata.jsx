import { formatDate, formatDateWithoutTime } from "../../../../utils";
import { normalizeMatchStatus } from "../../utils/matchStatus";

export default function MatchMetadata({ match }) {
  const showDate = normalizeMatchStatus(match.status) !== "live";

  return (
    <>
      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-gray-500">
        {match.venue && <span>📍 {match.venue}</span>}
        {showDate && match.date && <span>📅 {match.status==='completed' ? formatDateWithoutTime(match.date) : formatDate(match.date)}</span>}
      </div>

      {match.scorecard?.toss && (
        <p className="text-xs text-gray-400 mt-2">
          Toss: {match.scorecard.toss}
        </p>
      )}
    </>
  );
}
