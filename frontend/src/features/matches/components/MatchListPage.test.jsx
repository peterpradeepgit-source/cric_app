import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import MatchListPage from "./MatchListPage";

const match = {
  id: "match-1",
  series: "Asia Cup",
  match_type: "ODI",
  status: "upcoming",
  teams: ["India", "Sri Lanka"],
  scores: [],
  date: "2026-08-05T14:00:00Z",
};

describe("MatchListPage", () => {
  it("renders the loading state", () => {
    render(
      <MatchListPage
        activeTab="live"
        loading
        matches={[]}
        onMatchClick={vi.fn()}
        onRefresh={vi.fn()}
        onTabChange={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("status", { name: "Loading matches" }),
    ).toBeInTheDocument();
  });

  it("renders errors and retries", async () => {
    const onRefresh = vi.fn();

    render(
      <MatchListPage
        activeTab="live"
        error="Network failed"
        loading={false}
        matches={[]}
        onMatchClick={vi.fn()}
        onRefresh={onRefresh}
        onTabChange={vi.fn()}
      />,
    );

    expect(screen.getByText("Network failed")).toBeInTheDocument();
    await userEvent.click(screen.getByText("Try again"));
    expect(onRefresh).toHaveBeenCalledTimes(1);
  });

  it("renders empty, tab, and match-grid interactions", async () => {
    const onMatchClick = vi.fn();
    const onTabChange = vi.fn();

    const { rerender } = render(
      <MatchListPage
        activeTab="recent"
        loading={false}
        matches={[]}
        onMatchClick={onMatchClick}
        onRefresh={vi.fn()}
        onTabChange={onTabChange}
      />,
    );

    expect(screen.getByText("No recent matches at the moment.")).toBeInTheDocument();
    await userEvent.click(screen.getByText("Upcoming"));
    expect(onTabChange).toHaveBeenCalledWith("upcoming");

    rerender(
      <MatchListPage
        activeTab="upcoming"
        lastUpdated={new Date("2026-08-04T10:11:12Z")}
        loading={false}
        matches={[match]}
        onMatchClick={onMatchClick}
        onRefresh={vi.fn()}
        onTabChange={onTabChange}
      />,
    );

    expect(screen.getByText("Asia Cup")).toBeInTheDocument();
    await userEvent.click(screen.getByText("India"));
    expect(onMatchClick).toHaveBeenCalledWith(match);
  });
});
