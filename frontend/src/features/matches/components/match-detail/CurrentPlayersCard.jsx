import { ballsToOvers, getLiveCurrentPlayers } from "../../utils/scorecard";

function BatterRow({ batter, isPrimary }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="min-w-0 flex items-center gap-2">
        <span
          className={`h-2 w-2 shrink-0 rounded-full ${
            isPrimary ? "bg-cbaccent" : "bg-gray-600"
          }`}
        />
        <span className="truncate text-sm font-semibold text-white">
          {batter.batter}
        </span>
      </div>
      <span className="shrink-0 text-sm font-bold text-cbaccent">
        {batter.runs} ({batter.balls})
      </span>
    </div>
  );
}

function BowlerRow({ bowler }) {
  if (!bowler) return null;

  return (
    <div className="flex items-center justify-between gap-3">
      <span className="truncate text-sm font-semibold text-white">
        {bowler.bowler}
      </span>
      <span className="shrink-0 text-sm font-bold text-cbaccent">
        {ballsToOvers(bowler.balls)}-{bowler.maidens}-{bowler.runs}-
        {bowler.wickets}
      </span>
    </div>
  );
}

export default function CurrentPlayersCard({ match }) {
  const { batters, bowler } = getLiveCurrentPlayers(match);

  if (!batters.length && !bowler) return null;

  return (
    <section className="bg-cbcard rounded-xl p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold text-white">Current Players</h2>
        <span className="text-xs font-bold uppercase tracking-wide text-red-400">
          Live
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-[1fr_0.8fr]">
        {batters.length > 0 && (
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
              Batting
            </p>
            <div className="space-y-2">
              {batters.map((batter, index) => (
                <BatterRow
                  key={`${batter.batter}-${index}`}
                  batter={batter}
                  isPrimary={index === 0}
                />
              ))}
            </div>
          </div>
        )}

        {bowler && (
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
              Bowling
            </p>
            <BowlerRow bowler={bowler} />
          </div>
        )}
      </div>
    </section>
  );
}
