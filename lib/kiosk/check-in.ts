import { isSameDay } from "date-fns";

import { profiles } from "@/lib/mock/data";
import { getStore, setBookings, setKioskEvent } from "@/lib/mock/store";
import type { KioskEvent } from "@/lib/types/domain";

export function processKioskCheckIn(profileId: string) {
  const profile = profiles.find((item) => item.id === profileId);

  if (!profile) {
    return {
      success: false,
      checkedInCount: 0,
      event: null,
    };
  }

  const { bookings, classSessions } = getStore();
  let checkedInCount = 0;

  const nextBookings = bookings.map((booking) => {
    const session = classSessions.find((item) => item.id === booking.classId);

    if (
      booking.userId === profileId &&
      booking.status === "Booked" &&
      session &&
      isSameDay(new Date(session.startTime), new Date())
    ) {
      checkedInCount += 1;
      return { ...booking, status: "Checked-in" as const };
    }

    return booking;
  });

  setBookings(nextBookings);

  const event: KioskEvent = {
    profileId,
    fullName: `${profile.firstName} ${profile.lastName}`,
    rank: profile.rank,
    matHours: profile.matHours,
    scannedAt: new Date().toISOString(),
  };

  setKioskEvent(event);

  return {
    success: true,
    checkedInCount,
    event,
  };
}
