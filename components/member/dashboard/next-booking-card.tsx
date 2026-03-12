"use client";

import { format } from "date-fns";
import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DashboardSnapshot } from "@/lib/types/domain";

export function NextBookingCard({
  snapshot,
}: {
  snapshot: DashboardSnapshot;
}) {
  const t = useTranslations("dashboard");
  const [cancelled, setCancelled] = useState(false);
  const [pending, startTransition] = useTransition();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("nextBookingTitle")}</CardTitle>
      </CardHeader>
      <CardContent>
        {!snapshot.nextBooking || cancelled ? (
          <p className="text-sm text-slate-400">{t("noBooking")}</p>
        ) : (
          <div className="space-y-4">
            <div>
              <p className="font-medium text-white">
                {snapshot.nextBooking.classSession.title}
              </p>
              <p className="text-sm text-slate-400">
                {format(
                  new Date(snapshot.nextBooking.classSession.startTime),
                  "EEE, MMM d • h:mm a",
                )}
              </p>
            </div>
            <Button
              className="w-full"
              disabled={pending}
              variant="outline"
              onClick={() =>
                startTransition(async () => {
                  setCancelled(true);
                })
              }
            >
              {t("cancelBooking")}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
