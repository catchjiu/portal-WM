"use client";

import { useTranslations } from "next-intl";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Profile } from "@/lib/types/domain";
import { formatMatHours } from "@/lib/utils";

export function ProgressCard({ profile }: { profile: Profile }) {
  const t = useTranslations("dashboard");
  const monthlyProgress = (profile.matHours / profile.monthlyGoalHours) * 100;
  const yearlyProgress = (profile.matHours / profile.yearlyGoalHours) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("progressTitle")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span>{t("monthlyGoal")}</span>
              <span>
                {formatMatHours(profile.matHours)} / {formatMatHours(profile.monthlyGoalHours)}
              </span>
            </div>
            <Progress value={monthlyProgress} />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span>{t("yearlyGoal")}</span>
              <span>
                {formatMatHours(profile.matHours)} / {formatMatHours(profile.yearlyGoalHours)}
              </span>
            </div>
            <Progress value={yearlyProgress} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
