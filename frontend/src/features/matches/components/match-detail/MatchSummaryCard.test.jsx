import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import MatchSummaryCard from "./MatchSummaryCard";

const match = {
  series: "Border Trophy",
  match_type: "Test",
  status: "live",
  teams: ["India", "Australia"],
  scores: [
    { runs: 120, wickets: 3, overs: 28 },
    { runs: 90, wickets: 2, overs: 20 },
  ],
  status_text: "India lead by 30 runs",
};

describe("MatchSummaryCard", () => {
  it("renders match summary when not loading", () => {
    render(<MatchSummaryCard match={match} />);

    expect(screen.getByText("Border Trophy")).toBeInTheDocument();
    expect(screen.getByText("120-3 (28)")).toBeInTheDocument();
  });

  it("renders a skeleton instead of fallback score data while loading", () => {
    render(<MatchSummaryCard loading match={match} />);

    expect(
      screen.getByRole("status", { name: "Loading match summary" }),
    ).toBeInTheDocument();
    expect(screen.queryByText("Border Trophy")).not.toBeInTheDocument();
    expect(screen.queryByText("120-3 (28)")).not.toBeInTheDocument();
  });
});
