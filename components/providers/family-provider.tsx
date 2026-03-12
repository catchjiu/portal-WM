"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { Profile } from "@/lib/types/domain";

interface FamilyContextValue {
  profiles: Profile[];
  activeProfile: Profile;
  activeProfileId: string;
  setActiveProfileId: (profileId: string) => void;
}

const FamilyContext = createContext<FamilyContextValue | null>(null);

interface FamilyProviderProps {
  profiles: Profile[];
  children: ReactNode;
}

export function FamilyProvider({ profiles, children }: FamilyProviderProps) {
  const [activeProfileId, setActiveProfileId] = useState(profiles[0]?.id ?? "");

  const activeProfile =
    profiles.find((profile) => profile.id === activeProfileId) ?? profiles[0];

  const value = useMemo(
    () => ({
      profiles,
      activeProfile,
      activeProfileId: activeProfile.id,
      setActiveProfileId,
    }),
    [activeProfile, profiles],
  );

  return <FamilyContext.Provider value={value}>{children}</FamilyContext.Provider>;
}

export function useFamily() {
  const context = useContext(FamilyContext);

  if (!context) {
    throw new Error("useFamily must be used within FamilyProvider.");
  }

  return context;
}
