"use client";

import { addDays, format, isSameDay, startOfWeek } from "date-fns";

import { cn } from "@/lib/utils";

interface WeeklyScrollerProps {
  selectedDate: Date;
  onSelect: (date: Date) => void;
}

export function WeeklyScroller({
  selectedDate,
  onSelect,
}: WeeklyScrollerProps) {
  const start = startOfWeek(selectedDate, { weekStartsOn: 1 });

  return (
    <div className="no-scrollbar flex gap-3 overflow-x-auto pb-2">
      {Array.from({ length: 7 }, (_, index) => {
        const date = addDays(start, index);
        const active = isSameDay(date, selectedDate);

        return (
          <button
            className={cn(
              "min-w-[72px] rounded-2xl border px-4 py-3 text-left transition-colors",
              active
                ? "border-cyan-400 bg-cyan-400/15 text-cyan-100"
                : "border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-white",
            )}
            key={date.toISOString()}
            onClick={() => onSelect(date)}
            type="button"
          >
            <p className="text-xs uppercase tracking-[0.2em]">{format(date, "EEE")}</p>
            <p className="mt-1 text-lg font-semibold">{format(date, "d")}</p>
          </button>
        );
      })}
    </div>
  );
}
