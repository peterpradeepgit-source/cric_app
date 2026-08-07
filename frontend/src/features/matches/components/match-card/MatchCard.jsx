import { formatMatchType, formatScore } from "../../../../utils";
import { normalizeMatchStatus } from "../../utils/matchStatus";

function statusLabel(status) {
  const normalizedStatus = normalizeMatchStatus(status);
  if (normalizedStatus === "live") return "LIVE";
  if (normalizedStatus === "completed") return "COMPLETED";
  return "UPCOMING";
}

function statusClasses(status) {
  const normalizedStatus = normalizeMatchStatus(status);
  if (normalizedStatus === "live") return "bg-cblive text-cbonlive";
  if (normalizedStatus === "completed")
    return "bg-cbcompleted/20 text-cbcompleted";
  return "bg-cbupcoming/15 text-cbupcoming";
}

function ScoreColumn({ compact = false, scores }) {
  if (!scores?.length) return null;

  return (
    <div className={`shrink-0 text-right ${compact ? "mt-4" : ""}`}>
      <div className="space-y-1">
        {scores.map((score, index) => (
          <p
            key={`${score.team || "score"}-${index}`}
            className={`font-bold ${
              index === 0
                ? `${compact ? "text-xl" : "text-2xl"} text-cblive`
                : `${compact ? "text-lg" : "text-xl"} text-cbcompleted`
            }`}
          >
            {formatScore(score.runs, score.wickets, score.overs)}
          </p>
        ))}
      </div>
      {scores.length === 1 && scores[0].overs > 0 && (
        <p className="mt-1 text-sm text-cbmuted">{scores[0].overs} overs</p>
      )}
    </div>
  );
}

function TeamNames({ match }) {
  return (
    <div className="space-y-1">
      {match.teams.map((team, index) => (
        <h3
          key={`${team}-${index}`}
          className="text-lg font-bold leading-tight text-cbtext sm:text-xl"
        >
          {team}
        </h3>
      ))}
    </div>
  );
}

export default function MatchCard({ layout = "list", match, onClick }) {
  const firstScore = match.scores?.[0];
  const compact = layout === "cards";
  const matchStatus = normalizeMatchStatus(match.status);

  return (
    <button
      onClick={() => onClick(match)}
      className={`group w-full rounded-xl border bg-cbcard p-4 text-left shadow-lg shadow-black/10 transition-all hover:border-cbaccent/40 hover:bg-cbsurface ${
        matchStatus === "live"
          ? "border-l-4 border-l-cblive border-cbborder"
          : "border-cbborder"
      }`}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded px-2 py-1 text-xs font-bold ${statusClasses(
                match.status,
              )}`}
            >
              {statusLabel(match.status)}
            </span>
            {matchStatus === "live" && firstScore?.overs > 0 && (
              <span className="rounded bg-cblive/10 px-2 py-1 text-xs font-semibold text-cblive">
                {firstScore.overs} ov
              </span>
            )}
          </div>
          <p className="truncate text-xs font-semibold uppercase tracking-wide text-cbmuted">
            {match.series}
          </p>
        </div>

        <span className="rounded bg-cbupcoming/10 px-2.5 py-1 text-xs font-semibold text-cbupcoming">
          {formatMatchType(match.match_type)}
        </span>
      </div>

      <div
        className={`${
          compact
            ? "block"
            : "flex items-center justify-between gap-4"
        }`}
      >
        <div className="min-w-0">
          <TeamNames match={match} />
          {match.status_text && (
            <p className="mt-4 text-sm text-cbmuted">{match.status_text}</p>
          )}
          {match.result && (
            <p className="mt-4 text-sm text-cbmuted">{match.result}</p>
          )}
          {match.venue && (
            <p className="mt-2 text-sm text-cbmuted">{match.venue}</p>
          )}
        </div>
        <ScoreColumn compact={compact} scores={match.scores} />
      </div>
    </button>
  );
}
