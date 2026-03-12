"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import type { Profile } from "@/lib/types/domain";

export function ScanDemoButtons({ profiles }: { profiles: Profile[] }) {
  const [pendingId, setPendingId] = useState<string | null>(null);

  async function triggerScan(profileId: string) {
    setPendingId(profileId);
    await fetch("/api/kiosk/scan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ profileId }),
    });
    setPendingId(null);
  }

  return (
    <div className="mx-auto grid w-full max-w-2xl gap-3 sm:grid-cols-2">
      {profiles.map((profile) => (
        <Button
          className="w-full"
          disabled={pendingId === profile.id}
          key={profile.id}
          variant="outline"
          onClick={() => void triggerScan(profile.id)}
        >
          Trigger {profile.firstName} check-in
        </Button>
      ))}
    </div>
  );
}
