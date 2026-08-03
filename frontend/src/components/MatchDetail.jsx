import {
  formatScore,
  formatMatchType,
  getStatusColor,
  formatDate,
} from "../utils";

function ballsToOvers(balls) {
  const o = Math.floor(balls / 6);
  const b = balls % 6;
  return b ? `${o}.${b}` : `${o}`;
}

function BattingTable({ rows }) {
  const sortedRows = [...rows].sort((a, b) => {
    const priority = (player) => {
      // 1. Out
      if (player.is_out) return 0;

      // 2. Currently batting
      // console.log(player.is_batting, player.is_out, player);
      if (player.is_batting || player.balls > 0) return 1;

      // 3. Not out (but not currently batting)
      return 2;
    };

    return priority(a) - priority(b);
  });
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs sm:text-sm">
        <thead>
          <tr className="text-gray-500 border-b border-gray-700/50">
            <th className="text-left font-medium py-2 pr-2">Batter</th>
            <th className="text-left font-medium py-2 px-2">Dismissal</th>
            <th className="text-right font-medium py-2 px-2">R</th>
            <th className="text-right font-medium py-2 px-2">B</th>
            <th className="text-right font-medium py-2 px-2 hidden sm:table-cell">
              4s
            </th>
            <th className="text-right font-medium py-2 px-2 hidden sm:table-cell">
              6s
            </th>
            <th className="text-right font-medium py-2 pl-2">SR</th>
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((b, i) => (
            <tr
              key={i}
              className="border-b border-gray-800/40 hover:bg-white/5"
            >
              <td className="py-2 pr-2 text-white font-medium">
                {b.batter}
                {b.is_batting && <span className="text-cbaccent"> *</span>}
              </td>
              <td className="py-2 px-2 text-gray-400">
                {b.dismissal || (b.is_batting ? "not out" : "")}
              </td>
              <td className="py-2 px-2 text-right text-white font-bold">
                {b.runs}
              </td>
              <td className="py-2 px-2 text-right text-gray-300">{b.balls}</td>
              <td className="py-2 px-2 text-right text-gray-300 hidden sm:table-cell">
                {b.fours}
              </td>
              <td className="py-2 px-2 text-right text-gray-300 hidden sm:table-cell">
                {b.sixes}
              </td>
              <td className="py-2 pl-2 text-right text-gray-300">
                {b.strike_rate.toFixed(1)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BowlingTable({ rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs sm:text-sm">
        <thead>
          <tr className="text-gray-500 border-b border-gray-700/50">
            <th className="text-left font-medium py-2 pr-2">Bowler</th>
            <th className="text-right font-medium py-2 px-2">O</th>
            <th className="text-right font-medium py-2 px-2 hidden sm:table-cell">
              M
            </th>
            <th className="text-right font-medium py-2 px-2">R</th>
            <th className="text-right font-medium py-2 px-2">W</th>
            <th className="text-right font-medium py-2 pl-2">Econ</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((b, i) => (
            <tr
              key={i}
              className="border-b border-gray-800/40 hover:bg-white/5"
            >
              <td className="py-2 pr-2 text-white font-medium">
                {b.bowler}
                {b.is_bowling && <span className="text-cbaccent"> *</span>}
              </td>
              <td className="py-2 px-2 text-right text-gray-300">
                {ballsToOvers(b.balls)}
              </td>
              <td className="py-2 px-2 text-right text-gray-300 hidden sm:table-cell">
                {b.maidens}
              </td>
              <td className="py-2 px-2 text-right text-gray-300">{b.runs}</td>
              <td className="py-2 px-2 text-right text-white font-bold">
                {b.wickets}
              </td>
              <td className="py-2 pl-2 text-right text-gray-300">
                {b.economy.toFixed(1)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function InningsCard({ innings }) {
  return (
    <div className="bg-cbcard rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-bold text-sm">{innings.batting_team}</h3>
        <span className="text-cbaccent font-bold text-sm">
          {formatScore(innings.runs, innings.wickets, innings.overs)}
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

export default function MatchDetail({ match, onBack }) {
  const [team1, team2] = match.teams;
  const score1 = match.scores[0];
  const score2 = match.scores[1];
  const sc = match.scorecard;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-gray-400 hover:text-white mb-4 transition-colors"
      >
        <span>←</span> Back
      </button>

      {/* Header */}
      <div className="bg-cbcard rounded-xl p-5 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span
              className={`inline-block w-2 h-2 rounded-full ${getStatusColor(match.status)} ${match.status === "live" ? "animate-pulse" : ""}`}
            />
            <span className="text-xs text-gray-400 uppercase tracking-wide">
              {match.series}
            </span>
          </div>
          <span className="text-xs font-bold text-cbaccent bg-cbaccent/10 px-2 py-0.5 rounded">
            {formatMatchType(match.match_type)}
          </span>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-white">{team1}</span>
            {score1 && (
              <span className="text-lg font-bold text-cbaccent">
                {formatScore(score1.runs, score1.wickets, score1.overs)}
              </span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-white">{team2}</span>
            {score2 && (
              <span className="text-lg font-bold text-cbaccent">
                {formatScore(score2.runs, score2.wickets, score2.overs)}
              </span>
            )}
          </div>
        </div>

        {match.status_text && (
          <p className="text-sm text-gray-300 mb-1">{match.status_text}</p>
        )}
        {match.result && (
          <p className="text-sm text-cbgreen font-medium">{match.result}</p>
        )}

        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-gray-500">
          {match.venue && <span>📍 {match.venue}</span>}
          {match.date && <span>📅 {formatDate(match.date)}</span>}
        </div>

        {sc?.toss && (
          <p className="text-xs text-gray-400 mt-2">Toss: {sc.toss}</p>
        )}
      </div>

      {/* Scorecard */}
      {sc?.innings?.length > 0 ? (
        <div className="space-y-4">
          {sc.innings.map((inn, i) => (
            <InningsCard key={i} innings={inn} />
          ))}
        </div>
      ) : (
        <div className="bg-cbcard rounded-xl p-6 text-center">
          <p className="text-sm text-gray-500">
            {match.status === "upcoming"
              ? "Scorecard will be available once the match begins."
              : "Scorecard not available for this match."}
          </p>
        </div>
      )}
    </div>
  );
}
