import { NextRequest, NextResponse } from "next/server";

import { evaluateBookingEligibility, getProfileById } from "@/lib/booking/eligibility";
import { getStore, setBookings } from "@/lib/mock/store";
import { logError, logEvent } from "@/lib/observability/logger";

export async function POST(request: NextRequest) {
  try {
    const { profileId, classId, mode } = (await request.json()) as {
      profileId?: string;
      classId?: string;
      mode?: "book" | "cancel";
    };

    if (!profileId || !classId || !mode) {
      return NextResponse.json({ error: "Missing booking payload." }, { status: 400 });
    }

    const profile = getProfileById(profileId);
    if (!profile) {
      return NextResponse.json({ error: "Profile not found." }, { status: 404 });
    }

    const store = getStore();
    const existingClassIds = store.bookings
      .filter(
        (booking) =>
          booking.userId === profileId &&
          (booking.status === "Booked" || booking.status === "Checked-in"),
      )
      .map((booking) => booking.classId);

    if (mode === "book") {
      const eligibility = evaluateBookingEligibility(profile, classId, existingClassIds);

      if (!eligibility.allowed) {
        return NextResponse.json(
          { error: eligibility.reasons.join(" ") },
          { status: 400 },
        );
      }

      setBookings([
        {
          id: `booking-${crypto.randomUUID()}`,
          userId: profileId,
          classId,
          status: "Booked",
          createdAt: new Date().toISOString(),
        },
        ...store.bookings,
      ]);

      logEvent("booking.created", { profileId, classId });
      return NextResponse.json({ ok: true });
    }

    setBookings(
      store.bookings.filter(
        (booking) => !(booking.userId === profileId && booking.classId === classId),
      ),
    );

    logEvent("booking.cancelled", { profileId, classId });
    return NextResponse.json({ ok: true });
  } catch (error) {
    logError("booking.failed", {
      message: error instanceof Error ? error.message : "Unknown booking error",
    });
    return NextResponse.json({ error: "Booking request failed." }, { status: 500 });
  }
}
