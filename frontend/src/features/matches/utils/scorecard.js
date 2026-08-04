export function ballsToOvers(balls) {
  const overs = Math.floor(balls / 6);
  const remainingBalls = balls % 6;
  return remainingBalls ? `${overs}.${remainingBalls}` : `${overs}`;
}

export function sortBattersByState(rows) {
  return [...rows].sort((a, b) => batterPriority(a) - batterPriority(b));
}

export function getDisplayInnings(innings = [], status) {
  if (status !== "live" || innings.length < 2) return innings;

  return [innings[1], innings[0], ...innings.slice(2)];
}

export function getLiveCurrentPlayers(match) {
  if (match.status !== "live") {
    return {
      batters: [],
      bowler: null,
    };
  }

  const activeInnings = getDisplayInnings(
    match.scorecard?.innings || [],
    match.status,
  )[0];

  if (!activeInnings) {
    return {
      batters: [],
      bowler: null,
    };
  }

  return {
    batters: getCurrentBatters(activeInnings.batting || []),
    bowler: getCurrentBowler(activeInnings.bowling || []),
  };
}

function getCurrentBatters(rows) {
  const activeBatters = rows
    .filter((player) => !player.is_out && (player.is_batting || player.balls > 0))
    .sort((a, b) => Number(b.is_batting) - Number(a.is_batting));

  return activeBatters.slice(0, 2);
}

function getCurrentBowler(rows) {
  return rows.find((player) => player.is_bowling) || null;
}

function batterPriority(player) {
  if (player.is_out) return 0;
  if (player.is_batting) return 1;
  if (player.balls > 0) return 2;
  return 3;
}
