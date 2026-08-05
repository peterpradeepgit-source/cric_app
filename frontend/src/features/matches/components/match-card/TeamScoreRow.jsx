import { formatScore } from "../../../../utils";

export default function TeamScoreRow({ score, team }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-semibold text-white">{team}</span>
      {score && (
        <span
          className={`text-sm font-bold ${
            score.overs > 0 ? "text-cblive" : "text-gray-600"
          }`}
        >
          {formatScore(score.runs, score.wickets, score.overs)}
        </span>
      )}
    </div>
  );
}
