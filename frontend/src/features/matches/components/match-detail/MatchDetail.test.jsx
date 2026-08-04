import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import MatchDetail from "./MatchDetail";

const match = {
  id: "match-1",
  series: "Champions Trophy",
  match_type: "ODI",
  status: "live",
  status_text: "India lead by 35 runs",
  teams: ["India", "New Zealand"],
  scores: [
    { runs: 245, wickets: 6, overs: 48 },
    { runs: 210, wickets: 8, overs: 45.2 },
  ],
  venue: "Eden Gardens",
  date: "2026-08-04T14:00:00Z",
  scorecard: {
    toss: "India chose to bat",
    innings: [
      {
        batting_team: "India",
        runs: 245,
        wickets: 6,
        overs: 48,
        extras: 12,
        yet_to_bat: ["Kuldeep Yadav"],
        fall_of_wickets: [{ score: "120-3", batter: "Virat Kohli" }],
        batting: [
          {
            batter: "Non Striker",
            dismissal: "",
            runs: 21,
            balls: 18,
            fours: 2,
            sixes: 0,
            strike_rate: 116.666,
            is_batting: false,
            is_out: false,
          },
          {
            batter: "Waiting Batter",
            dismissal: "",
            runs: 0,
            balls: 0,
            fours: 0,
            sixes: 0,
            strike_rate: 0,
            is_batting: false,
            is_out: false,
          },
          {
            batter: "Out Batter",
            dismissal: "c Smith b Starc",
            runs: 45,
            balls: 32,
            fours: 4,
            sixes: 1,
            strike_rate: 140.625,
            is_batting: false,
            is_out: true,
          },
          {
            batter: "Current Batter",
            dismissal: "",
            runs: 68,
            balls: 50,
            fours: 5,
            sixes: 2,
            strike_rate: 136,
            is_batting: true,
            is_out: false,
          },
        ],
        bowling: [
          {
            bowler: "Trent Boult",
            balls: 17,
            maidens: 0,
            runs: 21,
            wickets: 2,
            economy: 7.41,
            is_bowling: true,
          },
        ],
      },
    ],
  },
};

describe("MatchDetail", () => {
  it("renders the composed summary and scorecard sections", async () => {
    const onBack = vi.fn();

    render(<MatchDetail match={match} onBack={onBack} />);
    await userEvent.click(screen.getByText("Back"));

    expect(onBack).toHaveBeenCalledTimes(1);
    expect(screen.getByText("Champions Trophy")).toBeInTheDocument();
    expect(screen.getByText("Now Playing")).toBeInTheDocument();
    expect(screen.getAllByText("245-6 (48)").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Toss: India chose to bat")).toBeInTheDocument();
    expect(screen.getByText("Extras: 12")).toBeInTheDocument();
    expect(screen.getByText("Yet to bat: Kuldeep Yadav")).toBeInTheDocument();
    expect(screen.getByText("120-3 (Virat Kohli)")).toBeInTheDocument();
    expect(screen.getAllByText("Trent Boult").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("68 (50)")).toBeInTheDocument();
    expect(screen.getByText("21 (18)")).toBeInTheDocument();
    expect(screen.getByText("2.5")).toBeInTheDocument();
  });

  it("sorts batting rows into dismissed, active, and waiting order", () => {
    render(<MatchDetail match={match} onBack={vi.fn()} />);

    const rows = screen.getAllByRole("row").slice(1, 4);
    expect(within(rows[0]).getByText("Out Batter")).toBeInTheDocument();
    expect(within(rows[1]).getByText("Current Batter")).toBeInTheDocument();
    expect(within(rows[2]).getByText("Non Striker")).toBeInTheDocument();
  });
});
