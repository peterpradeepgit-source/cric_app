import { formatScore } from "../../../../utils";

export default function TeamScoreSummary({ scores, teams }) {
  return (
    <div className="space-y-2 mb-4">
      {teams.map((team, index) => (
        <div key={`${team}-${index}`} className="flex items-center justify-between">
          <span className="text-lg font-bold text-white">{team}</span>
          {scores[index] && (
            <span className="text-lg font-bold text-cbaccent">
              {formatScore(
                scores[index].runs,
                scores[index].wickets,
                scores[index].overs,
              )}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
