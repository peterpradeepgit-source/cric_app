import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import MatchDetailPage from "./MatchDetailPage";

const match = {
  id: "match-1",
  series: "Border Trophy",
  match_type: "Test",
  status: "completed",
  teams: ["India", "Australia"],
  scores: [
    { runs: 320, wickets: 8, overs: 90 },
    { runs: 280, wickets: 10, overs: 82.4 },
  ],
  result: "India won by 40 runs",
  scorecard: { innings: [] },
};

describe("MatchDetailPage", () => {
  it("shows a direct-load skeleton while the match is fetched", () => {
    render(<MatchDetailPage loading match={null} onBack={vi.fn()} />);

    expect(
      screen.getByRole("status", { name: "Loading match details" }),
    ).toBeInTheDocument();
  });

  it("shows a scorecard skeleton while refreshing a match without innings", () => {
    render(<MatchDetailPage loading match={match} onBack={vi.fn()} />);

    expect(
      screen.getByRole("status", { name: "Loading scorecard" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Scorecard not available for this match."),
    ).not.toBeInTheDocument();
  });

  it("shows an error state for a failed direct load", async () => {
    const onBack = vi.fn();

    render(
      <MatchDetailPage
        error="API error: 404"
        loading={false}
        match={null}
        onBack={onBack}
      />,
    );

    expect(screen.getByText("API error: 404")).toBeInTheDocument();
    await userEvent.click(screen.getByText("Back"));
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it("renders match details when match data is available", () => {
    render(<MatchDetailPage loading={false} match={match} onBack={vi.fn()} />);

    expect(screen.getByText("Border Trophy")).toBeInTheDocument();
    expect(screen.getByText("India won by 40 runs")).toBeInTheDocument();
    expect(screen.getByText("Scorecard not available for this match.")).toBeInTheDocument();
  });
});
