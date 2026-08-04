import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BowlingTable from "./BowlingTable";

describe("BowlingTable", () => {
  it("shows only bowlers with overs greater than zero", () => {
    render(
      <BowlingTable
        rows={[
          {
            bowler: "Opening Bowler",
            balls: 12,
            maidens: 0,
            runs: 18,
            wickets: 1,
            economy: 9,
          },
          {
            bowler: "Zero Over Bowler",
            balls: 0,
            maidens: 0,
            runs: 0,
            wickets: 0,
            economy: 0,
          },
          {
            bowler: "Partial Over Bowler",
            balls: 2,
            maidens: 0,
            runs: 5,
            wickets: 0,
            economy: 15,
          },
        ]}
      />,
    );

    expect(screen.getByText("Opening Bowler")).toBeInTheDocument();
    expect(screen.getByText("Partial Over Bowler")).toBeInTheDocument();
    expect(screen.queryByText("Zero Over Bowler")).not.toBeInTheDocument();
  });
});
