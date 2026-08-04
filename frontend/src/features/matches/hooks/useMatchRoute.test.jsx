import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import useMatchRoute from "./useMatchRoute";

function RouteProbe() {
  const { matchId, openMatch, openMatchList, previewMatch } = useMatchRoute();

  return (
    <div>
      <p>match: {matchId || "none"}</p>
      <p>preview: {previewMatch?.series || "none"}</p>
      <button
        onClick={() => openMatch({ id: "match-42", series: "Border Trophy" })}
      >
        Open match
      </button>
      <button onClick={openMatchList}>Open list</button>
    </div>
  );
}

describe("useMatchRoute", () => {
  beforeEach(() => {
    window.history.pushState(null, "", "/");
  });

  it("reads a direct match detail URL", () => {
    window.history.pushState(
      { match: { id: "direct-1", series: "Direct Series" } },
      "",
      "/matches/direct-1",
    );

    render(<RouteProbe />);

    expect(screen.getByText("match: direct-1")).toBeInTheDocument();
    expect(screen.getByText("preview: Direct Series")).toBeInTheDocument();
  });

  it("pushes match and list routes", async () => {
    render(<RouteProbe />);

    await userEvent.click(screen.getByText("Open match"));
    expect(window.location.pathname).toBe("/matches/match-42");
    expect(screen.getByText("match: match-42")).toBeInTheDocument();

    await userEvent.click(screen.getByText("Open list"));
    expect(window.location.pathname).toBe("/");
    expect(screen.getByText("match: none")).toBeInTheDocument();
  });
});
