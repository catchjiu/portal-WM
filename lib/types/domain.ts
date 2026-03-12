export type Locale = "en" | "zh-TW";

export type Rank =
  | "White"
  | "Blue"
  | "Purple"
  | "Brown"
  | "Black";

export type MembershipStatus = "Active" | "Pending" | "Expired" | "Gratis";

export type BookingStatus = "Booked" | "Checked-in" | "No-show" | "Cancelled";

export type PaymentStatus = "Pending" | "Approved" | "Rejected";

export type AgeGroup = "Adults" | "Kids";

export type AccessWindow = "Any" | "Weekday" | "Weekend";

export interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  rank: Rank;
  stripes: number;
  matHours: number;
  monthlyGoalHours: number;
  yearlyGoalHours: number;
  membershipStatus: MembershipStatus;
  remainingClasses: number;
  avatarUrl: string | null;
  lineId: string | null;
  familyId: string;
  isPrimaryFamilyMember: boolean;
}

export interface Family {
  id: string;
  primaryUserId: string;
  displayName: string;
  profileIds: string[];
}

export interface MembershipPackage {
  id: string;
  name: string;
  accessWindow: AccessWindow;
  allowedAgeGroup: AgeGroup | "Any";
  weeklyClassLimit: number | null;
}

export interface ClassSession {
  id: string;
  title: string;
  instructorId: string;
  instructorName: string;
  startTime: string;
  durationMinutes: number;
  ageGroup: AgeGroup;
  isCancelled: boolean;
}

export interface Booking {
  id: string;
  userId: string;
  classId: string;
  status: BookingStatus;
  createdAt: string;
}

export interface Product {
  id: string;
  nameEn: string;
  nameZh: string;
  descriptionEn: string;
  descriptionZh: string;
  priceTwd: number;
  isPreorder: boolean;
  stockQuantity: number;
  category: "Apparel" | "Equipment" | "Accessories";
  sizes: string[];
  colors: Array<{
    id: string;
    nameEn: string;
    nameZh: string;
    swatch: string;
    imageUrl: string;
  }>;
}

export interface Order {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  subtotalTwd: number;
  isPreorder: boolean;
  status: "PendingPayment" | "Paid" | "Cancelled";
  createdAt: string;
}

export interface Payment {
  id: string;
  userId: string;
  orderId: string;
  amount: number;
  status: PaymentStatus;
  proofUrl: string | null;
  createdAt: string;
}

export interface DashboardSnapshot {
  profile: Profile;
  family: Family;
  nextBooking: {
    booking: Booking;
    classSession: ClassSession;
  } | null;
}

export interface BookingEligibility {
  allowed: boolean;
  reasons: string[];
}

export interface KioskEvent {
  profileId: string;
  fullName: string;
  rank: Rank;
  matHours: number;
  scannedAt: string;
}

export interface AdminOverview {
  totalActiveMembers: number;
  pendingPayments: number;
  todayCheckIns: number;
  expiringMemberships: number;
  revenueTwd: number;
  attendanceSeries: Array<{
    label: string;
    attendance: number;
  }>;
}
