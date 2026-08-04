import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { getLiveMatches, getRecentMatches } from "../../../api";
import { LIVE_REFRESH_MS } from "../constants";
import useMatches from "./useMatches";

vi.mock("../../../api", () => ({
  getLiveMatches: vi.fn(),
  getUpcomingMatches: vi.fn(),
  getRecentMatches: vi.fn(),
}));

function MatchesProbe({ activeTab = "live", selectedMatch = null }) {
  const { error, lastUpdated, loading, matches, refresh } = useMatches(
    activeTab,
    selectedMatch,
  );

  return (
    <div>
      <p>loading: {String(loading)}</p>
      <p>error: {error || "none"}</p>
      <p>count: {matches.length}</p>
      <p>updated: {lastUpdated ? "yes" : "no"}</p>
      <button onClick={refresh}>Refresh</button>
    </div>
  );
}

describe("useMatches", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it("loads matches for the active tab", async () => {
    getRecentMatches.mockResolvedValue([{ id: "recent-1" }]);

    render(<MatchesProbe activeTab="recent" />);

    await screen.findByText("count: 1");
    expect(getRecentMatches).toHaveBeenCalledTimes(1);
    expect(screen.getByText("updated: yes")).toBeInTheDocument();
  });

  it("surfaces load errors", async () => {
    getRecentMatches.mockRejectedValue(new Error("API error: 503"));

    render(<MatchesProbe activeTab="recent" />);

    await screen.findByText("error: API error: 503");
    expect(screen.getByText("loading: false")).toBeInTheDocument();
  });

  it("auto-refreshes live matches only when no detail route is selected", async () => {
    vi.useFakeTimers();
    getLiveMatches.mockResolvedValue([]);

    const { rerender } = render(<MatchesProbe activeTab="live" />);
    await act(async () => {});
    expect(getLiveMatches).toHaveBeenCalledTimes(1);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(LIVE_REFRESH_MS);
    });
    expect(getLiveMatches).toHaveBeenCalledTimes(2);

    rerender(<MatchesProbe activeTab="live" selectedMatch="match-1" />);
    await act(async () => {});
    expect(getLiveMatches).toHaveBeenCalledTimes(2);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(LIVE_REFRESH_MS);
    });
    expect(getLiveMatches).toHaveBeenCalledTimes(2);
  });
});
