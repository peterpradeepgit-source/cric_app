import { describe, expect, it } from "vitest";
import {
  ballsToOvers,
  getDisplayInnings,
  getLiveCurrentPlayers,
  sortBattersByState,
} from "./scorecard";

describe("scorecard helpers", () => {
  it("formats completed balls as cricket overs", () => {
    expect(ballsToOvers(0)).toBe("0");
    expect(ballsToOvers(6)).toBe("1");
    expect(ballsToOvers(17)).toBe("2.5");
  });

  it("orders dismissed, active, and waiting batters consistently", () => {
    const rows = [
      { batter: "Waiting Batter", balls: 0, is_batting: false, is_out: false },
      { batter: "Current Batter", balls: 8, is_batting: true, is_out: false },
      { batter: "Dismissed Batter", balls: 12, is_batting: false, is_out: true },
    ];

    expect(sortBattersByState(rows).map((row) => row.batter)).toEqual([
      "Dismissed Batter",
      "Current Batter",
      "Waiting Batter",
    ]);
  });

  it("shows the second innings first for live matches", () => {
    const innings = [
      { batting_team: "First Innings Team" },
      { batting_team: "Chasing Team" },
      { batting_team: "Third Innings Team" },
    ];

    expect(getDisplayInnings(innings, "live").map((inn) => inn.batting_team)).toEqual([
      "Chasing Team",
      "First Innings Team",
      "Third Innings Team",
    ]);
  });

  it("keeps innings in source order for non-live matches", () => {
    const innings = [
      { batting_team: "First Innings Team" },
      { batting_team: "Second Innings Team" },
    ];

    expect(
      getDisplayInnings(innings, "completed").map((inn) => inn.batting_team),
    ).toEqual(["First Innings Team", "Second Innings Team"]);
  });

  it("extracts current live batters and bowler from the displayed innings", () => {
    const match = {
      status: "live",
      scorecard: {
        innings: [
          {
            batting_team: "First Innings Team",
            batting: [{ batter: "First Innings Batter", balls: 20 }],
            bowling: [{ bowler: "First Innings Bowler", is_bowling: true }],
          },
          {
            batting_team: "Chasing Team",
            batting: [
              {
                batter: "Non Striker",
                balls: 12,
                is_batting: false,
                is_out: false,
              },
              {
                batter: "Striker",
                balls: 18,
                is_batting: true,
                is_out: false,
              },
              {
                batter: "Dismissed Batter",
                balls: 8,
                is_batting: false,
                is_out: true,
              },
            ],
            bowling: [
              { bowler: "Previous Bowler", is_bowling: false },
              { bowler: "Current Bowler", is_bowling: true },
            ],
          },
        ],
      },
    };

    const currentPlayers = getLiveCurrentPlayers(match);

    expect(currentPlayers.batters.map((batter) => batter.batter)).toEqual([
      "Striker",
      "Non Striker",
    ]);
    expect(currentPlayers.bowler.bowler).toBe("Current Bowler");
  });

  it("does not expose current players for non-live matches", () => {
    expect(
      getLiveCurrentPlayers({
        status: "completed",
        scorecard: {
          innings: [
            {
              batting: [{ batter: "Finished Batter", is_batting: true }],
              bowling: [{ bowler: "Finished Bowler", is_bowling: true }],
            },
          ],
        },
      }),
    ).toEqual({ batters: [], bowler: null });
  });
});
