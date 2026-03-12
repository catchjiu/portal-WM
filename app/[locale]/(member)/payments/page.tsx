import { PaymentsPanel } from "@/components/member/payments/payments-panel";
import {
  getCurrentFamilyProfiles,
  getOrdersForProfile,
  getPaymentsForProfile,
} from "@/lib/mock/queries";

export default function PaymentsPage() {
  const ordersByProfile = Object.fromEntries(
    getCurrentFamilyProfiles().map((profile) => [
      profile.id,
      getOrdersForProfile(profile.id),
    ]),
  );

  const paymentsByProfile = Object.fromEntries(
    getCurrentFamilyProfiles().map((profile) => [
      profile.id,
      getPaymentsForProfile(profile.id),
    ]),
  );

  return (
    <PaymentsPanel
      ordersByProfile={ordersByProfile}
      paymentsByProfile={paymentsByProfile}
    />
  );
}
