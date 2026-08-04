import { formatDate } from "../../../../utils";

export default function MatchMetadata({ match }) {
  return (
    <>
      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-gray-500">
        {match.venue && <span>📍 {match.venue}</span>}
        {match.date && <span>📅 {formatDate(match.date)}</span>}
      </div>

      {match.scorecard?.toss && (
        <p className="text-xs text-gray-400 mt-2">
          Toss: {match.scorecard.toss}
        </p>
      )}
    </>
  );
}
