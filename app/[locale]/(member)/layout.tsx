import { headers } from "next/headers";
import { MessageCircleMore, Shield } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import { BottomNav } from "@/components/member/bottom-nav";
import { FamilySwitcher } from "@/components/member/family-switcher";
import { Link } from "@/i18n/navigation";
import { getCurrentFamilyProfiles } from "@/lib/mock/queries";
import { getLineLinkStatus, isLineInAppBrowser } from "@/lib/line/liff";

export default async function MemberLayout({
  children,
}: {
  children: ReactNode;
}) {
  const t = await getTranslations("app");
  const lineT = await getTranslations("line");
  const userAgent = (await headers()).get("user-agent");
  const lineBrowser = isLineInAppBrowser(userAgent);
  const primaryProfile = getCurrentFamilyProfiles()[0];
  const lineState = getLineLinkStatus(primaryProfile?.lineId ?? null);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[512px] flex-col px-4 pb-4 pt-6">
      <header className="mb-6 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-heading text-4xl uppercase tracking-[0.18em] text-white">
              {t("name")}
            </p>
            <p className="text-sm text-slate-400">{t("tagline")}</p>
          </div>
          <Link
            className="rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-sm text-slate-200"
            href="/admin"
          >
            <span className="inline-flex items-center gap-2">
              <Shield className="size-4" />
              Admin
            </span>
          </Link>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-4">
          <FamilySwitcher />
          <div className="mt-3 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-500">
            <MessageCircleMore className="size-4" />
            <span>
              {lineBrowser && lineState.linked
                ? lineT("statusLinked")
                : lineT("statusFallback")}
            </span>
          </div>
        </div>
      </header>
      <main className="flex-1 space-y-5">{children}</main>
      <div className="mt-6">
        <BottomNav />
      </div>
    </div>
  );
}
