import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CurrentPlayersCard from "./CurrentPlayersCard";

const liveMatch = {
  status: "live",
  scorecard: {
    innings: [
      {
        batting_team: "India",
        batting: [
          {
            batter: "First Innings Batter",
            runs: 45,
            balls: 32,
            is_batting: true,
            is_out: false,
          },
        ],
        bowling: [{ bowler: "First Innings Bowler", is_bowling: true }],
      },
      {
        batting_team: "Australia",
        batting: [
          {
            batter: "Non Striker",
            runs: 22,
            balls: 19,
            is_batting: false,
            is_out: false,
          },
          {
            batter: "Striker",
            runs: 38,
            balls: 24,
            is_batting: true,
            is_out: false,
          },
          {
            batter: "Out Batter",
            runs: 10,
            balls: 9,
            is_batting: false,
            is_out: true,
          },
        ],
        bowling: [
          {
            bowler: "Current Bowler",
            balls: 17,
            maidens: 0,
            runs: 21,
            wickets: 2,
            is_bowling: true,
          },
        ],
      },
    ],
  },
};

describe("CurrentPlayersCard", () => {
  it("shows current live batters with the active batter first", () => {
    render(<CurrentPlayersCard match={liveMatch} />);

    const card = screen.getByText("Now Playing").closest("section");
    const batterNames = within(card).getAllByText(/Striker|Non Striker/);

    expect(batterNames.map((node) => node.textContent)).toEqual([
      "Striker",
      "Non Striker",
    ]);
    expect(screen.getByText("38 (24)")).toBeInTheDocument();
    expect(screen.getByText("22 (19)")).toBeInTheDocument();
  });

  it("shows the current bowler figures", () => {
    render(<CurrentPlayersCard match={liveMatch} />);

    expect(screen.getByText("Current Bowler")).toBeInTheDocument();
    expect(screen.getByText("2.5-0-21-2")).toBeInTheDocument();
  });

  it("shows the current bowler even before they complete an over", () => {
    render(
      <CurrentPlayersCard
        match={{
          ...liveMatch,
          scorecard: {
            innings: [
              liveMatch.scorecard.innings[0],
              {
                ...liveMatch.scorecard.innings[1],
                bowling: [
                  {
                    bowler: "New Spell Bowler",
                    balls: 0,
                    maidens: 0,
                    runs: 0,
                    wickets: 0,
                    is_bowling: true,
                  },
                ],
              },
            ],
          },
        }}
      />,
    );

    expect(screen.getByText("New Spell Bowler")).toBeInTheDocument();
    expect(screen.getByText("0-0-0-0")).toBeInTheDocument();
  });

  it("does not render for non-live matches", () => {
    const { container } = render(
      <CurrentPlayersCard match={{ ...liveMatch, status: "completed" }} />,
    );

    expect(container).toBeEmptyDOMElement();
  });
});
