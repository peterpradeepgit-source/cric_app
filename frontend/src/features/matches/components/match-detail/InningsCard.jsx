import { formatScore } from "../../../../utils";
import BattingTable from "./BattingTable";
import BowlingTable from "./BowlingTable";

export default function InningsCard({ innings, score }) {
  const displayScore = score || innings;

  return (
    <div className="bg-cbcard rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-bold text-sm">{innings.batting_team}</h3>
        <span className="text-cblive font-bold text-sm">
          {formatScore(
            displayScore.runs,
            displayScore.wickets,
            displayScore.overs,
          )}
        </span>
      </div>

      {innings.batting?.length > 0 && (
        <>
          <p className="text-xs text-gray-500 uppercase tracking-wide mt-4 mb-1">
            Batting
          </p>
          <BattingTable rows={innings.batting} />
        </>
      )}

      {innings.extras && (
        <p className="text-xs text-gray-400 mt-2">Extras: {innings.extras}</p>
      )}

      {innings.yet_to_bat?.length > 0 && (
        <p className="text-xs text-gray-400 mt-1">
          Yet to bat: {innings.yet_to_bat.join(", ")}
        </p>
      )}

      {innings.fall_of_wickets?.length > 0 && (
        <div className="mt-2">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            Fall of Wickets
          </p>
          <p className="text-xs text-gray-400">
            {innings.fall_of_wickets
              .map((f) => `${f.score} (${f.batter})`)
              .join("  ")}
          </p>
        </div>
      )}

      {innings.bowling?.length > 0 && (
        <>
          <p className="text-xs text-gray-500 uppercase tracking-wide mt-4 mb-1">
            Bowling
          </p>
          <BowlingTable rows={innings.bowling} />
        </>
      )}
    </div>
  );
}
