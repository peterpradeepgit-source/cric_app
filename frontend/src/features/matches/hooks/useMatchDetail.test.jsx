import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { getMatchById } from "../../../api";
import useMatchDetail from "./useMatchDetail";

vi.mock("../../../api", () => ({
  getMatchById: vi.fn(),
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
});
