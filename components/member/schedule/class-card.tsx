"use client";

import { format } from "date-fns";
import { Clock3, ShieldAlert } from "lucide-react";
import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Booking, BookingEligibility, ClassSession } from "@/lib/types/domain";

export interface ScheduleItem {
  session: ClassSession;
  booking: Booking | null;
  eligibility: BookingEligibility;
}

interface ClassCardProps {
  item: ScheduleItem;
  pending: boolean;
  onBook: (classId: string) => void;
  onCancel: (classId: string) => void;
}

export function ClassCard({
  item,
  pending,
  onBook,
  onCancel,
}: ClassCardProps) {
  const t = useTranslations("schedule");
  const isBooked = item.booking?.status === "Booked";
  const isCheckedIn = item.booking?.status === "Checked-in";

  return (
    <Card className="p-4">
      <CardContent className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-semibold text-white">{item.session.title}</p>
            <div className="mt-2 flex items-center gap-2 text-sm text-slate-400">
              <Clock3 className="size-4" />
              <span>{format(new Date(item.session.startTime), "h:mm a")}</span>
              <span>•</span>
              <span>{item.session.durationMinutes} min</span>
            </div>
          </div>
          <Badge>{item.session.ageGroup}</Badge>
        </div>

        {!item.eligibility.allowed && !isBooked && !isCheckedIn ? (
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-3 text-sm text-amber-100">
            <div className="mb-2 flex items-center gap-2">
              <ShieldAlert className="size-4" />
              <span>{t("blocked")}</span>
            </div>
            <p>{item.eligibility.reasons.join(" ")}</p>
          </div>
        ) : null}

        {isCheckedIn ? (
          <Button className="w-full" disabled variant="secondary">
            {t("checkedIn")}
          </Button>
        ) : isBooked ? (
          <Button
            className="w-full"
            disabled={pending}
            variant="outline"
            onClick={() => onCancel(item.session.id)}
          >
            {t("cancel")}
          </Button>
        ) : (
          <Button
            className="w-full"
            disabled={pending || !item.eligibility.allowed}
            onClick={() => onBook(item.session.id)}
          >
            {t("book")}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
