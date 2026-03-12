import { getTranslations } from "next-intl/server";

import { ScheduleBoard } from "@/components/member/schedule/schedule-board";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentFamilyProfiles, getScheduleView } from "@/lib/mock/queries";

export default async function SchedulePage() {
  const t = await getTranslations("schedule");
  const itemsByProfile = Object.fromEntries(
    getCurrentFamilyProfiles().map((profile) => [
      profile.id,
      getScheduleView(profile.id),
    ]),
  );

  return (
    <div className="space-y-5">
      <Card>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
        </CardHeader>
      </Card>
      <ScheduleBoard itemsByProfile={itemsByProfile} />
    </div>
  );
}
