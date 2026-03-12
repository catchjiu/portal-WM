import type {
  Booking,
  ClassSession,
  Family,
  MembershipPackage,
  Order,
  Payment,
  Product,
  Profile,
} from "@/lib/types/domain";

const today = new Date();

function isoAt(offsetDays: number, hour: number, minute = 0) {
  const date = new Date(today);
  date.setDate(today.getDate() + offsetDays);
  date.setHours(hour, minute, 0, 0);
  return date.toISOString();
}

export const currentUserId = "profile-alex";

export const families: Family[] = [
  {
    id: "family-catch",
    primaryUserId: "profile-alex",
    displayName: "Lee Family",
    profileIds: ["profile-alex", "profile-mei"],
  },
];

export const profiles: Profile[] = [
  {
    id: "profile-alex",
    firstName: "Alex",
    lastName: "Lee",
    rank: "Blue",
    stripes: 3,
    matHours: 142.5,
    monthlyGoalHours: 16,
    yearlyGoalHours: 180,
    membershipStatus: "Active",
    remainingClasses: 8,
    avatarUrl: null,
    lineId: "line-alex-lee",
    familyId: "family-catch",
    isPrimaryFamilyMember: true,
  },
  {
    id: "profile-mei",
    firstName: "Mei",
    lastName: "Lee",
    rank: "White",
    stripes: 2,
    matHours: 48.75,
    monthlyGoalHours: 12,
    yearlyGoalHours: 120,
    membershipStatus: "Active",
    remainingClasses: 6,
    avatarUrl: null,
    lineId: "line-mei-lee",
    familyId: "family-catch",
    isPrimaryFamilyMember: false,
  },
  {
    id: "coach-marco",
    firstName: "Marco",
    lastName: "Silva",
    rank: "Black",
    stripes: 2,
    matHours: 980,
    monthlyGoalHours: 0,
    yearlyGoalHours: 0,
    membershipStatus: "Gratis",
    remainingClasses: 0,
    avatarUrl: null,
    lineId: null,
    familyId: "family-catch",
    isPrimaryFamilyMember: false,
  },
];

export const membershipPackages: MembershipPackage[] = [
  {
    id: "pkg-unlimited-weekday",
    name: "Unlimited Weekday",
    accessWindow: "Weekday",
    allowedAgeGroup: "Adults",
    weeklyClassLimit: null,
  },
  {
    id: "pkg-family-weekend",
    name: "Family Weekend",
    accessWindow: "Weekend",
    allowedAgeGroup: "Any",
    weeklyClassLimit: 3,
  },
];

export const packageAssignments = [
  {
    profileId: "profile-alex",
    packageId: "pkg-unlimited-weekday",
  },
  {
    profileId: "profile-mei",
    packageId: "pkg-family-weekend",
  },
];

export const classSessions: ClassSession[] = [
  {
    id: "class-1",
    title: "No-Gi Fundamentals",
    instructorId: "coach-marco",
    instructorName: "Marco Silva",
    startTime: isoAt(0, 18, 30),
    durationMinutes: 60,
    ageGroup: "Adults",
    isCancelled: false,
  },
  {
    id: "class-2",
    title: "Competition Team",
    instructorId: "coach-marco",
    instructorName: "Marco Silva",
    startTime: isoAt(1, 19, 30),
    durationMinutes: 90,
    ageGroup: "Adults",
    isCancelled: false,
  },
  {
    id: "class-3",
    title: "Kids BJJ",
    instructorId: "coach-marco",
    instructorName: "Marco Silva",
    startTime: isoAt(2, 17, 0),
    durationMinutes: 60,
    ageGroup: "Kids",
    isCancelled: false,
  },
  {
    id: "class-4",
    title: "Weekend Open Mat",
    instructorId: "coach-marco",
    instructorName: "Marco Silva",
    startTime: isoAt(3, 10, 0),
    durationMinutes: 90,
    ageGroup: "Adults",
    isCancelled: false,
  },
];

export const initialBookings: Booking[] = [
  {
    id: "booking-1",
    userId: "profile-alex",
    classId: "class-1",
    status: "Booked",
    createdAt: new Date().toISOString(),
  },
  {
    id: "booking-2",
    userId: "profile-mei",
    classId: "class-3",
    status: "Booked",
    createdAt: new Date().toISOString(),
  },
];

export const products: Product[] = [
  {
    id: "product-rashguard",
    nameEn: "CATCH Ranked Rashguard",
    nameZh: "CATCH 排名防磨衣",
    priceTwd: 1850,
    isPreorder: true,
    stockQuantity: 0,
    category: "Apparel",
  },
  {
    id: "product-belt",
    nameEn: "CATCH Training Belt",
    nameZh: "CATCH 訓練腰帶",
    priceTwd: 780,
    isPreorder: false,
    stockQuantity: 12,
    category: "Equipment",
  },
  {
    id: "product-patch",
    nameEn: "Academy Patch Set",
    nameZh: "學院布章組",
    priceTwd: 420,
    isPreorder: false,
    stockQuantity: 24,
    category: "Accessories",
  },
];

export const initialOrders: Order[] = [
  {
    id: "order-1",
    userId: "profile-alex",
    productId: "product-belt",
    quantity: 1,
    subtotalTwd: 780,
    isPreorder: false,
    status: "PendingPayment",
    createdAt: new Date().toISOString(),
  },
];

export const initialPayments: Payment[] = [
  {
    id: "payment-1",
    userId: "profile-alex",
    orderId: "order-1",
    amount: 780,
    status: "Pending",
    proofUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f",
    createdAt: new Date().toISOString(),
  },
];
