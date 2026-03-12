import { formatDistanceToNow } from "date-fns";
import { ScanLine } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { KioskEvent } from "@/lib/types/domain";

export function WelcomeCard({ event }: { event: KioskEvent | null }) {
  return (
    <Card className="mx-auto max-w-2xl border-cyan-500/20 bg-slate-900/70 p-6">
      <CardHeader>
        <CardTitle className="text-center">Live Check-In Feed</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 text-center">
        {event ? (
          <>
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-300">
              <ScanLine className="size-8" />
            </div>
            <div>
              <p className="font-heading text-4xl uppercase tracking-[0.16em] text-white">
                {event.fullName}
              </p>
              <p className="mt-2 text-lg text-slate-300">
                {event.rank} belt • {event.matHours.toFixed(1)} mat hours
              </p>
            </div>
            <p className="text-sm text-slate-400">
              Updated {formatDistanceToNow(new Date(event.scannedAt), { addSuffix: true })}
            </p>
          </>
        ) : (
          <p className="text-slate-400">Waiting for the next member scan...</p>
        )}
      </CardContent>
    </Card>
  );
}
