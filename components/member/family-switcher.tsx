"use client";

import { useTranslations } from "next-intl";

import { useFamily } from "@/components/providers/family-provider";

export function FamilySwitcher() {
  const t = useTranslations("dashboard");
  const { profiles, activeProfileId, setActiveProfileId } = useFamily();

  return (
    <label className="block space-y-2">
      <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
        {t("familyLabel")}
      </span>
      <select
        className="w-full rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/60"
        value={activeProfileId}
        onChange={(event) => setActiveProfileId(event.target.value)}
      >
        {profiles.map((profile) => (
          <option className="bg-slate-950" key={profile.id} value={profile.id}>
            {profile.firstName} {profile.lastName}
          </option>
        ))}
      </select>
    </label>
  );
}
