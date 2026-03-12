"use client";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

import { FamilyProvider } from "@/components/providers/family-provider";
import type { Profile } from "@/lib/types/domain";

interface AppProvidersProps {
  profiles: Profile[];
  children: ReactNode;
}

export function AppProviders({ profiles, children }: AppProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <FamilyProvider profiles={profiles}>{children}</FamilyProvider>
    </QueryClientProvider>
  );
}
