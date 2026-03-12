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
    descriptionEn:
      "Competition-ready long sleeve rashguard with reinforced seams and a smooth compression fit.",
    descriptionZh:
      "適合比賽與訓練的長袖防磨衣，使用加強車線與貼身剪裁。",
    priceTwd: 1850,
    isPreorder: true,
    stockQuantity: 0,
    category: "Apparel",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      {
        id: "purple",
        nameEn: "Purple",
        nameZh: "紫色",
        swatch: "#7c3aed",
        imageUrl:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "black",
        nameEn: "Black",
        nameZh: "黑色",
        swatch: "#0f172a",
        imageUrl:
          "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "white",
        nameEn: "White",
        nameZh: "白色",
        swatch: "#e2e8f0",
        imageUrl:
          "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
  {
    id: "product-gi",
    nameEn: "CATCH BJJ Gi",
    nameZh: "CATCH 柔術道服",
    descriptionEn:
      "Pearl weave training gi with contrast embroidery, built for daily academy rounds.",
    descriptionZh:
      "珍珠織道服，帶有對比刺繡，適合日常館內訓練使用。",
    priceTwd: 3499,
    isPreorder: true,
    stockQuantity: 0,
    category: "Apparel",
    sizes: ["A0", "A1", "A2", "A3", "A4", "F1", "F2", "F3"],
    colors: [
      {
        id: "white",
        nameEn: "White",
        nameZh: "白色",
        swatch: "#f8fafc",
        imageUrl:
          "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "blue",
        nameEn: "Blue",
        nameZh: "藍色",
        swatch: "#1d4ed8",
        imageUrl:
          "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "black",
        nameEn: "Black",
        nameZh: "黑色",
        swatch: "#111827",
        imageUrl:
          "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
  {
    id: "product-patch",
    nameEn: "Academy Patch Set",
    nameZh: "學院布章組",
    descriptionEn:
      "Heat-press and sew-on patch bundle for gis, rashguards, and academy bags.",
    descriptionZh:
      "可燙可縫的學院布章組，適合道服、防磨衣與裝備袋。",
    priceTwd: 420,
    isPreorder: false,
    stockQuantity: 24,
    category: "Accessories",
    sizes: ["One Size"],
    colors: [
      {
        id: "standard",
        nameEn: "Standard",
        nameZh: "標準色",
        swatch: "#f59e0b",
        imageUrl:
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
];

export const initialOrders: Order[] = [
  {
    id: "order-1",
    userId: "profile-alex",
    productId: "product-gi",
    quantity: 1,
    subtotalTwd: 3499,
    isPreorder: true,
    status: "PendingPayment",
    createdAt: new Date().toISOString(),
  },
];

export const initialPayments: Payment[] = [
  {
    id: "payment-1",
    userId: "profile-alex",
    orderId: "order-1",
    amount: 3499,
    status: "Pending",
    proofUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f",
    createdAt: new Date().toISOString(),
  },
];
