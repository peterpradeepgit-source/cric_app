import { describe, expect, it } from "vitest";
import { formatDate, formatMatchType, formatScore, getStatusColor } from "./utils";

describe("formatting utilities", () => {
  it("formats scores and yet-to-bat innings", () => {
    expect(formatScore(0, 0, 0)).toBe("Yet to bat");
    expect(formatScore(187, 5, 20)).toBe("187-5 (20)");
  });

  it("formats known match types and falls back to the raw value", () => {
    expect(formatMatchType("Test")).toBe("TEST");
    expect(formatMatchType("The Hundred")).toBe("The Hundred");
  });

  it("maps match status to theme classes", () => {
    expect(getStatusColor("live")).toBe("bg-red-500");
    expect(getStatusColor("upcoming")).toBe("bg-blue-500");
    expect(getStatusColor("completed")).toBe("bg-gray-500");
  });

  it("returns an empty date label for missing or invalid dates", () => {
    expect(formatDate()).toBe("");
    expect(formatDate("not-a-date")).toBe("");
  });
});
