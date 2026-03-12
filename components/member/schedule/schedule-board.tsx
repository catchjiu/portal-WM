"use client";

import { useMutation } from "@tanstack/react-query";
import { isSameDay } from "date-fns";
import { useMemo, useOptimistic, useState } from "react";

import { ClassCard, type ScheduleItem } from "@/components/member/schedule/class-card";
import { WeeklyScroller } from "@/components/member/schedule/weekly-scroller";
import { useFamily } from "@/components/providers/family-provider";

interface ScheduleBoardProps {
  itemsByProfile: Record<string, ScheduleItem[]>;
}

function applyBookingMutation(
  current: ScheduleItem[],
  payload: { classId: string; mode: "book" | "cancel" },
) {
  return current.map((item) => {
    if (item.session.id !== payload.classId) {
      return item;
    }

    if (payload.mode === "book") {
      return {
        ...item,
        booking: {
          id: `booking-${payload.classId}`,
          userId: "optimistic-user",
          classId: payload.classId,
          status: "Booked" as const,
          createdAt: new Date().toISOString(),
        },
      };
    }

    return {
      ...item,
      booking: null,
    };
  });
}

export function ScheduleBoard({
  itemsByProfile,
}: ScheduleBoardProps) {
  const { activeProfileId } = useFamily();
  const initialItems = useMemo(
    () => itemsByProfile[activeProfileId] ?? Object.values(itemsByProfile)[0] ?? [],
    [activeProfileId, itemsByProfile],
  );
  const [selectedDate, setSelectedDate] = useState(
    new Date(initialItems[0]?.session.startTime ?? new Date()),
  );
  const [optimisticItems, updateOptimisticItems] = useOptimistic(
    initialItems,
    applyBookingMutation,
  );

  const mutation = useMutation({
    mutationFn: async ({
      classId,
      mode,
    }: {
      classId: string;
      mode: "book" | "cancel";
    }) => {
      updateOptimisticItems({ classId, mode });
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profileId: activeProfileId,
          classId,
          mode,
        }),
      });

      if (!response.ok) {
        throw new Error("Booking request failed.");
      }

      return (await response.json()) as { ok: true };
    },
  });

  const resolvedSelectedDate =
    optimisticItems.some((item) => isSameDay(new Date(item.session.startTime), selectedDate))
      ? selectedDate
      : new Date(optimisticItems[0]?.session.startTime ?? new Date());

  const itemsForDay = optimisticItems.filter((item) =>
    isSameDay(new Date(item.session.startTime), resolvedSelectedDate),
  );

  return (
    <div className="space-y-5">
      <WeeklyScroller
        selectedDate={resolvedSelectedDate}
        onSelect={setSelectedDate}
      />
      <div className="space-y-4">
        {itemsForDay.map((item) => (
          <ClassCard
            item={item}
            key={item.session.id}
            pending={mutation.isPending}
            onBook={(classId) => mutation.mutate({ classId, mode: "book" })}
            onCancel={(classId) => mutation.mutate({ classId, mode: "cancel" })}
          />
        ))}
      </div>
    </div>
  );
}
