import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "./ThemeContext";
import ThemeSelector from "./ThemeSelector";

describe("ThemeSelector", () => {
  const storage = new Map();

  beforeEach(() => {
    storage.clear();
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      value: {
        getItem: vi.fn((key) => storage.get(key) || null),
        setItem: vi.fn((key, value) => storage.set(key, value)),
      },
    });
    delete document.documentElement.dataset.theme;
  });

  it("defaults to dark theme", () => {
    render(
      <ThemeProvider>
        <ThemeSelector />
      </ThemeProvider>,
    );

    expect(
      screen.getByRole("button", {
        name: "Theme: Dark. Switch to Light",
      }),
    ).toBeInTheDocument();
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(document.body.dataset.theme).toBe("dark");
  });

  it("cycles and persists the selected theme", async () => {
    render(
      <ThemeProvider>
        <ThemeSelector />
      </ThemeProvider>,
    );

    await userEvent.click(
      screen.getByRole("button", {
        name: "Theme: Dark. Switch to Light",
      }),
    );

    expect(document.documentElement.dataset.theme).toBe("light");
    expect(document.body.dataset.theme).toBe("light");
    expect(storage.get("cric-app-theme")).toBe("light");

    await userEvent.click(
      screen.getByRole("button", {
        name: "Theme: Light. Switch to High contrast",
      }),
    );

    expect(document.documentElement.dataset.theme).toBe("contrast");
    expect(storage.get("cric-app-theme")).toBe("contrast");
  });
});
