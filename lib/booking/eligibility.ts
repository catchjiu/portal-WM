import { isWeekend, startOfWeek } from "date-fns";

import { classSessions, membershipPackages, packageAssignments, profiles } from "@/lib/mock/data";
import type { BookingEligibility, Profile } from "@/lib/types/domain";

function getProfilePackage(profileId: string) {
  const assignment = packageAssignments.find((item) => item.profileId === profileId);
  if (!assignment) {
    return null;
  }

  return membershipPackages.find((item) => item.id === assignment.packageId) ?? null;
}

function getWeeklyBookings(profileId: string, bookingDates: string[]) {
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 }).getTime();

  return bookingDates.filter((date) => new Date(date).getTime() >= weekStart).length;
}

export function evaluateBookingEligibility(
  profile: Profile,
  classId: string,
  existingClassIds: string[],
): BookingEligibility {
  const session = classSessions.find((item) => item.id === classId);
  const membershipPackage = getProfilePackage(profile.id);
  const reasons: string[] = [];

  if (!session) {
    return { allowed: false, reasons: ["Class not found."] };
  }

  if (profile.membershipStatus !== "Active") {
    reasons.push("Membership is not active.");
  }

  if (profile.remainingClasses <= 0) {
    reasons.push("No remaining classes available.");
  }

  if (existingClassIds.includes(classId)) {
    reasons.push("Class is already booked.");
  }

  if (membershipPackage) {
    const sessionDate = new Date(session.startTime);

    if (
      membershipPackage.accessWindow === "Weekday" &&
      isWeekend(sessionDate)
    ) {
      reasons.push("Current package does not allow weekend bookings.");
    }

    if (
      membershipPackage.accessWindow === "Weekend" &&
      !isWeekend(sessionDate)
    ) {
      reasons.push("Current package only allows weekend bookings.");
    }

    if (
      membershipPackage.allowedAgeGroup !== "Any" &&
      membershipPackage.allowedAgeGroup !== session.ageGroup
    ) {
      reasons.push("Class age group is not included in this package.");
    }

    if (membershipPackage.weeklyClassLimit !== null) {
      const existingDates = existingClassIds
        .map((id) => classSessions.find((item) => item.id === id)?.startTime)
        .filter(Boolean) as string[];

      if (
        getWeeklyBookings(profile.id, existingDates) >=
        membershipPackage.weeklyClassLimit
      ) {
        reasons.push("Weekly class limit reached.");
      }
    }
  }

  return {
    allowed: reasons.length === 0,
    reasons,
  };
}

export function getProfileById(profileId: string) {
  return profiles.find((profile) => profile.id === profileId) ?? null;
}
