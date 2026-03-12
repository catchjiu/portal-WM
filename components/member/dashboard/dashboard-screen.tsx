"use client";

import { useTranslations } from "next-intl";

import { NextBookingCard } from "@/components/member/dashboard/next-booking-card";
import { ProgressCard } from "@/components/member/dashboard/progress-card";
import { QrCard } from "@/components/member/dashboard/qr-card";
import { RankBadge } from "@/components/member/dashboard/rank-badge";
import { useFamily } from "@/components/providers/family-provider";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { DashboardSnapshot } from "@/lib/types/domain";

interface DashboardScreenProps {
  snapshots: Record<string, DashboardSnapshot>;
}

export function DashboardScreen({ snapshots }: DashboardScreenProps) {
  const { activeProfileId } = useFamily();
  const t = useTranslations("dashboard");
  const snapshot = snapshots[activeProfileId] ?? Object.values(snapshots)[0];

  return (
    <div className="space-y-5">
      <Card>
        <CardHeader className="block">
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription className="mt-2">
            {snapshot.family.displayName} • {snapshot.profile.firstName}{" "}
            {snapshot.profile.lastName}
          </CardDescription>
        </CardHeader>
      </Card>
      <QrCard profileId={snapshot.profile.id} />
      <RankBadge profile={snapshot.profile} />
      <ProgressCard profile={snapshot.profile} />
      <NextBookingCard snapshot={snapshot} />
    </div>
  );
}
