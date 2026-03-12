import { describe, expect, it } from "vitest";

import { evaluateBookingEligibility } from "@/lib/booking/eligibility";
import { profiles } from "@/lib/mock/data";

describe("evaluateBookingEligibility", () => {
  it("blocks weekend-only packages from weekday classes", () => {
    const profile = profiles.find((item) => item.id === "profile-mei");
    if (!profile) {
      throw new Error("Expected test profile to exist.");
    }

    const result = evaluateBookingEligibility(profile, "class-1", []);

    expect(result.allowed).toBe(false);
    expect(result.reasons.join(" ")).toContain("weekend");
  });

  it("allows an active eligible member to book a weekday class", () => {
    const profile = profiles.find((item) => item.id === "profile-alex");
    if (!profile) {
      throw new Error("Expected test profile to exist.");
    }

    const result = evaluateBookingEligibility(profile, "class-2", []);

    expect(result.allowed).toBe(true);
    expect(result.reasons).toHaveLength(0);
  });
});
