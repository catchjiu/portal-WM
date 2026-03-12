import { getTranslations } from "next-intl/server";

import { AttendanceChart } from "@/components/admin/charts/attendance-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAdminOverview } from "@/lib/mock/queries";
import { formatCurrency } from "@/lib/utils";

export default async function AdminOverviewPage() {
  const t = await getTranslations("admin");
  const overview = getAdminOverview();

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {[
          ["Active Members", overview.totalActiveMembers.toString()],
          ["Pending Payments", overview.pendingPayments.toString()],
          ["Today Check-ins", overview.todayCheckIns.toString()],
          [t("expiring"), overview.expiringMemberships.toString()],
          ["Revenue", formatCurrency(overview.revenueTwd)],
        ].map(([label, value]) => (
          <Card key={label}>
            <CardHeader>
              <CardTitle className="text-base">{label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-heading text-4xl uppercase tracking-[0.14em] text-cyan-200">
                {value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <AttendanceChart data={overview.attendanceSeries} />
        </CardContent>
      </Card>
    </div>
  );
}
