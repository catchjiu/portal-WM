import { compareAsc, format, isAfter } from "date-fns";

import { evaluateBookingEligibility, getProfileById } from "@/lib/booking/eligibility";
import { currentUserId, families, membershipPackages, products, profiles } from "@/lib/mock/data";
import { getStore } from "@/lib/mock/store";
import { createPaymentProofSignedUrl } from "@/lib/storage/payment-proofs";
import type { AdminOverview, DashboardSnapshot, Locale } from "@/lib/types/domain";

export function getCurrentFamilyProfiles() {
  const currentProfile = getProfileById(currentUserId);

  if (!currentProfile) {
    return [];
  }

  return profiles.filter((profile) => profile.familyId === currentProfile.familyId);
}

export function getDashboardSnapshot(profileId = currentUserId): DashboardSnapshot {
  const store = getStore();
  const profile = getProfileById(profileId) ?? profiles[0];
  const family = families.find((item) => item.id === profile.familyId) ?? families[0];

  const nextBooking = store.bookings
    .filter((booking) => booking.userId === profile.id && booking.status === "Booked")
    .map((booking) => ({
      booking,
      classSession: store.classSessions.find((item) => item.id === booking.classId)!,
    }))
    .filter((item) => item.classSession && isAfter(new Date(item.classSession.startTime), new Date(Date.now() - 1000 * 60 * 60 * 3)))
    .sort((a, b) =>
      compareAsc(new Date(a.classSession.startTime), new Date(b.classSession.startTime)),
    )[0] ?? null;

  return {
    profile,
    family,
    nextBooking,
  };
}

export function getScheduleView(profileId = currentUserId) {
  const store = getStore();
  const profile = getProfileById(profileId) ?? profiles[0];
  const memberBookings = store.bookings.filter((booking) => booking.userId === profile.id);
  const existingClassIds = memberBookings
    .filter((booking) => booking.status === "Booked" || booking.status === "Checked-in")
    .map((booking) => booking.classId);

  return store.classSessions
    .map((session) => ({
      session,
      booking:
        memberBookings.find((booking) => booking.classId === session.id && booking.status !== "Cancelled") ??
        null,
      eligibility: evaluateBookingEligibility(profile, session.id, existingClassIds),
    }))
    .sort((a, b) => compareAsc(new Date(a.session.startTime), new Date(b.session.startTime)));
}

export function getShopCatalog(locale: Locale) {
  return products.map((product) => ({
    ...product,
    displayName: locale === "zh-TW" ? product.nameZh : product.nameEn,
  }));
}

export function getPackageForProfile(profileId = currentUserId) {
  const profile = getProfileById(profileId);
  if (!profile) {
    return null;
  }

  return membershipPackages.find((item) =>
    profile.id === currentUserId ? item.id === "pkg-unlimited-weekday" : item.id === "pkg-family-weekend",
  );
}

export function getPaymentsForProfile(profileId = currentUserId) {
  const store = getStore();
  return store.payments.filter((payment) => payment.userId === profileId);
}

export function getOrdersForProfile(profileId = currentUserId) {
  const store = getStore();
  return store.orders.filter((order) => order.userId === profileId);
}

export function getAdminOverview(): AdminOverview {
  const store = getStore();
  const pendingPayments = store.payments.filter((payment) => payment.status === "Pending").length;
  const approvedRevenue = store.payments
    .filter((payment) => payment.status === "Approved")
    .reduce((total, payment) => total + payment.amount, 0);
  const todayCheckIns = store.bookings.filter((booking) => booking.status === "Checked-in").length;

  return {
    totalActiveMembers: store.profiles.filter((profile) => profile.membershipStatus === "Active").length,
    pendingPayments,
    todayCheckIns,
    expiringMemberships: 3,
    revenueTwd: approvedRevenue,
    attendanceSeries: Array.from({ length: 7 }, (_, index) => ({
      label: format(new Date(Date.now() - (6 - index) * 86400000), "EEE"),
      attendance: 16 + index * 2,
    })),
  };
}

export function getAdminMembers() {
  return profiles.filter((profile) => !profile.id.startsWith("coach-"));
}

export async function getAdminPayments() {
  return Promise.all(
    getStore().payments.map(async (payment) => {
      const profile = getProfileById(payment.userId);
      const proofPreviewUrl = await createPaymentProofSignedUrl(payment.proofUrl);

      return {
        ...payment,
        memberName: profile ? `${profile.firstName} ${profile.lastName}` : "Unknown Member",
        proofPreviewUrl,
      };
    }),
  );
}

export function getLatestKioskEvent() {
  return getStore().kioskEvent;
}
