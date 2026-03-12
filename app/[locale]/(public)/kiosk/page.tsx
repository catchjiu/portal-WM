import { getTranslations } from "next-intl/server";

import { KioskLivePanel } from "@/components/kiosk/kiosk-live-panel";
import { ScanDemoButtons } from "@/components/kiosk/scan-demo-buttons";
import { getCurrentFamilyProfiles, getLatestKioskEvent } from "@/lib/mock/queries";

export default async function KioskPage() {
  const t = await getTranslations("kiosk");
  const familyProfiles = getCurrentFamilyProfiles();
  const initialEvent = getLatestKioskEvent();

  return (
    <main className="flex min-h-screen flex-col justify-center gap-8 px-4 py-8">
      <div className="space-y-3 text-center">
        <p className="font-heading text-5xl uppercase tracking-[0.2em] text-white">
          {t("title")}
        </p>
        <p className="text-slate-400">{t("scanPrompt")}</p>
      </div>

      <KioskLivePanel initialEvent={initialEvent} />
      <ScanDemoButtons profiles={familyProfiles} />
    </main>
  );
}
