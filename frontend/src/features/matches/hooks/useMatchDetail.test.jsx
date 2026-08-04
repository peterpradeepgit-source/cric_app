import { act, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { getMatchById } from "../../../api";
import { LIVE_REFRESH_MS } from "../constants";
import useMatchDetail from "./useMatchDetail";

vi.mock("../../../api", () => ({
  getLiveMatches: vi.fn(),
  getMatchById: vi.fn(),
  getRecentMatches: vi.fn(),
  getUpcomingMatches: vi.fn(),
}));

function DetailProbe({ matchId, previewMatch }) {
  const { detailError, detailLoading, selectedMatch } = useMatchDetail(
    matchId,
    previewMatch,
  );

  return (
    <div>
      <p>loading: {String(detailLoading)}</p>
      <p>error: {detailError || "none"}</p>
      <p>match: {selectedMatch?.series || "none"}</p>
    </div>
  );
}

describe("useMatchDetail", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it("hydrates from preview data and replaces it with fetched detail", async () => {
    getMatchById.mockResolvedValue({
      id: "match-1",
      series: "Full Detail Series",
    });

    render(
      <DetailProbe
        matchId="match-1"
        previewMatch={{ id: "match-1", series: "Preview Series" }}
      />,
    );

    expect(screen.getByText("match: Preview Series")).toBeInTheDocument();

    await screen.findByText("match: Full Detail Series");
    expect(getMatchById).toHaveBeenCalledWith("match-1");
    expect(screen.getByText("loading: false")).toBeInTheDocument();
  });

  it("exposes fetch errors for direct detail routes", async () => {
    getMatchById.mockRejectedValue(new Error("API error: 500"));

    render(<DetailProbe matchId="missing-match" />);

    await screen.findByText("error: API error: 500");
    await waitFor(() =>
      expect(screen.getByText("loading: false")).toBeInTheDocument(),
    );
  });

  it("auto-refreshes live match details every refresh interval", async () => {
    vi.useFakeTimers();
    getMatchById
      .mockResolvedValueOnce({
        id: "match-1",
        series: "Initial Live Detail",
        status: "live",
      })
      .mockResolvedValueOnce({
        id: "match-1",
        series: "Refreshed Live Detail",
        status: "live",
      });

    render(<DetailProbe matchId="match-1" />);

    await act(async () => {});
    expect(screen.getByText("match: Initial Live Detail")).toBeInTheDocument();
    expect(getMatchById).toHaveBeenCalledTimes(1);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(LIVE_REFRESH_MS);
    });

    expect(screen.getByText("match: Refreshed Live Detail")).toBeInTheDocument();
    expect(getMatchById).toHaveBeenCalledTimes(2);
  });

  it("does not auto-refresh non-live match details", async () => {
    vi.useFakeTimers();
    getMatchById.mockResolvedValue({
      id: "match-1",
      series: "Completed Detail",
      status: "completed",
    });

    render(<DetailProbe matchId="match-1" />);

    await act(async () => {});
    expect(screen.getByText("match: Completed Detail")).toBeInTheDocument();
    expect(getMatchById).toHaveBeenCalledTimes(1);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(LIVE_REFRESH_MS);
    });

    expect(getMatchById).toHaveBeenCalledTimes(1);
  });
});
