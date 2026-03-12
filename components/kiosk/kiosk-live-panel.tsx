"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { WelcomeCard } from "@/components/kiosk/welcome-card";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import type { KioskEvent } from "@/lib/types/domain";

interface KioskLivePanelProps {
  initialEvent: KioskEvent | null;
}

export function KioskLivePanel({ initialEvent }: KioskLivePanelProps) {
  const query = useQuery({
    queryKey: ["kiosk-event"],
    queryFn: async () => {
      const response = await fetch("/api/kiosk/scan");
      const data = (await response.json()) as { event: KioskEvent | null };
      return data.event;
    },
    initialData: initialEvent,
    refetchInterval: 3_000,
  });

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      return;
    }

    const channel = supabase
      .channel("kiosk-live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "profiles" },
        () => {
          void query.refetch();
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [query]);

  return <WelcomeCard event={query.data ?? null} />;
}
