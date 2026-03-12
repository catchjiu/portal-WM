import { DashboardScreen } from "@/components/member/dashboard/dashboard-screen";
import { getCurrentFamilyProfiles, getDashboardSnapshot } from "@/lib/mock/queries";

export default function DashboardPage() {
  const snapshots = Object.fromEntries(
    getCurrentFamilyProfiles().map((profile) => [
      profile.id,
      getDashboardSnapshot(profile.id),
    ]),
  );

  return <DashboardScreen snapshots={snapshots} />;
}
