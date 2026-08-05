import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  getLiveMatches,
  getMatchById,
  getRecentMatches,
  getUpcomingMatches,
} from "./api";
import App from "./App";
import { ThemeProvider } from "./theme/ThemeContext";

vi.mock("./api", () => ({
  getLiveMatches: vi.fn(),
  getUpcomingMatches: vi.fn(),
  getRecentMatches: vi.fn(),
  getMatchById: vi.fn(),
}));

const listMatch = {
  id: "match-1",
  series: "List Series",
  match_type: "T20",
  status: "live",
  status_text: "Live now",
  teams: ["India", "England"],
  scores: [
    { runs: 120, wickets: 3, overs: 14 },
    { runs: 0, wickets: 0, overs: 0 },
  ],
};

const detailMatch = {
  ...listMatch,
  series: "Detail Series",
  venue: "Lord's",
  scorecard: {
    toss: "England chose to bowl",
    innings: [],
  },
};

describe("App routing integration", () => {
  beforeEach(() => {
    window.history.pushState(null, "", "/");
    getLiveMatches.mockResolvedValue([listMatch]);
    getUpcomingMatches.mockResolvedValue([]);
    getRecentMatches.mockResolvedValue([]);
    getMatchById.mockResolvedValue(detailMatch);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  function renderApp() {
    return render(
      <ThemeProvider>
        <App />
      </ThemeProvider>,
    );
  }

  it("opens a match detail route from the main list and returns to the list", async () => {
    renderApp();

    await screen.findByText("India");
    await userEvent.click(screen.getByText("India"));

    expect(window.location.pathname).toBe("/matches/match-1");
    await screen.findByText("Detail Series");
    expect(getMatchById).toHaveBeenCalledWith("match-1");

    await userEvent.click(screen.getByText("Back"));
    expect(window.location.pathname).toBe("/");
    await screen.findByText("India");
  });

  it("renders a direct detail URL without visiting the main page first", async () => {
    window.history.pushState(null, "", "/matches/match-1");

    renderApp();

    expect(
      screen.getByRole("status", { name: "Loading match details" }),
    ).toBeInTheDocument();
    await screen.findByText("Detail Series");
    expect(screen.queryByText("List Series")).not.toBeInTheDocument();
  });

  it("switches tabs on the list page and fetches the selected tab", async () => {
    renderApp();

    await screen.findByText("India");
    await userEvent.click(screen.getAllByText("Recent")[0]);

    await waitFor(() => expect(getRecentMatches).toHaveBeenCalledTimes(1));
    expect(
      screen.getByText("No recent matches at the moment."),
    ).toBeInTheDocument();
  });
});
