import { formatScore, formatMatchType, getStatusColor, formatDate } from '../utils';

export default function MatchCard({ match, onClick }) {
  const [team1, team2] = match.teams;
  const score1 = match.scores[0];
  const score2 = match.scores[1];
  const dateLabel = formatDate(match.date);

  return (
    <div
      onClick={() => onClick(match)}
      className="bg-cbcard rounded-xl p-4 hover:bg-[#243042] transition-all cursor-pointer border border-transparent hover:border-cbaccent/30 hover:shadow-lg hover:shadow-cbaccent/5"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`inline-block w-2 h-2 rounded-full ${getStatusColor(match.status)} ${match.status === 'live' ? 'animate-pulse' : ''}`} />
          <span className="text-xs text-gray-400 uppercase tracking-wide">{match.series}</span>
        </div>
        <span className="text-xs font-bold text-cbaccent bg-cbaccent/10 px-2 py-0.5 rounded">
          {formatMatchType(match.match_type)}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-white">{team1}</span>
          {score1 && (
            <span className={`text-sm font-bold ${score1.overs > 0 ? 'text-cbaccent' : 'text-gray-600'}`}>
              {formatScore(score1.runs, score1.wickets, score1.overs)}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-white">{team2}</span>
          {score2 && (
            <span className={`text-sm font-bold ${score2.overs > 0 ? 'text-cbaccent' : 'text-gray-600'}`}>
              {formatScore(score2.runs, score2.wickets, score2.overs)}
            </span>
          )}
        </div>
      </div>

      {match.status_text && (
        <div className="mt-3 pt-3 border-t border-gray-700/50">
          <p className="text-xs text-gray-400">{match.status_text}</p>
        </div>
      )}

      {match.status === 'completed' && match.result && !match.status_text && (
        <div className="mt-3 pt-3 border-t border-gray-700/50">
          <p className="text-xs text-cbgreen font-medium">{match.result}</p>
        </div>
      )}

      {match.status === 'upcoming' && dateLabel && (
        <div className="mt-3 pt-3 border-t border-gray-700/50">
          <p className="text-xs text-gray-300">{dateLabel}</p>
        </div>
      )}

      {match.venue && (
        <div className="mt-1">
          <p className="text-xs text-gray-600">{match.venue}</p>
        </div>
      )}
    </div>
  );
}
