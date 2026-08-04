import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ScorecardSection from "./ScorecardSection";

describe("ScorecardSection", () => {
  it("shows a scorecard skeleton while scorecard data is loading", () => {
    render(<ScorecardSection loading match={{ status: "live" }} />);

    expect(
      screen.getByRole("status", { name: "Loading scorecard" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Scorecard not available for this match."),
    ).not.toBeInTheDocument();
  });

  it("shows upcoming scorecard availability copy", () => {
    render(<ScorecardSection match={{ status: "upcoming" }} />);

    expect(
      screen.getByText("Scorecard will be available once the match begins."),
    ).toBeInTheDocument();
  });

  it("renders innings details when scorecard data exists", () => {
    render(
      <ScorecardSection
        match={{
          status: "live",
          scorecard: {
            innings: [
              {
                batting_team: "India",
                runs: 180,
                wickets: 6,
                overs: 20,
                batting: [],
                bowling: [],
              },
            ],
          },
        }}
      />,
    );

    expect(screen.getByText("India")).toBeInTheDocument();
    expect(screen.getByText("180-6 (20)")).toBeInTheDocument();
  });

  it("renders the second innings first for live scorecards", () => {
    render(
      <ScorecardSection
        match={{
          status: "live",
          scorecard: {
            innings: [
              {
                batting_team: "India",
                runs: 180,
                wickets: 6,
                overs: 20,
                batting: [],
                bowling: [],
              },
              {
                batting_team: "Australia",
                runs: 90,
                wickets: 2,
                overs: 10,
                batting: [],
                bowling: [],
              },
            ],
          },
        }}
      />,
    );

    const inningsHeadings = screen.getAllByRole("heading", { level: 3 });
    expect(inningsHeadings.map((heading) => heading.textContent)).toEqual([
      "Australia",
      "India",
    ]);
  });

  it("keeps innings order for non-live scorecards", () => {
    render(
      <ScorecardSection
        match={{
          status: "completed",
          scorecard: {
            innings: [
              {
                batting_team: "India",
                runs: 180,
                wickets: 6,
                overs: 20,
                batting: [],
                bowling: [],
              },
              {
                batting_team: "Australia",
                runs: 160,
                wickets: 10,
                overs: 18.4,
                batting: [],
                bowling: [],
              },
            ],
          },
        }}
      />,
    );

    const inningsHeadings = screen.getAllByRole("heading", { level: 3 });
    expect(inningsHeadings.map((heading) => heading.textContent)).toEqual([
      "India",
      "Australia",
    ]);
  });
});
