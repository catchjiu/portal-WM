import { describe, expect, it, beforeEach } from "vitest";

import { processKioskCheckIn } from "@/lib/kiosk/check-in";
import { getStore, resetStore } from "@/lib/mock/store";

describe("processKioskCheckIn", () => {
  beforeEach(() => {
    resetStore();
  });

  it("marks same-day booked classes as checked in", () => {
    const result = processKioskCheckIn("profile-alex");

    expect(result.success).toBe(true);
    expect(result.checkedInCount).toBeGreaterThanOrEqual(1);

    const booking = getStore().bookings.find(
      (item) => item.userId === "profile-alex" && item.classId === "class-1",
    );

    expect(booking?.status).toBe("Checked-in");
  });

  it("returns an error shape for unknown profiles", () => {
    const result = processKioskCheckIn("missing-profile");

    expect(result.success).toBe(false);
    expect(result.event).toBeNull();
  });
});
