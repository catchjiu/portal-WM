import { NextRequest, NextResponse } from "next/server";

import { currentUserId, profiles } from "@/lib/mock/data";
import { logError, logEvent } from "@/lib/observability/logger";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const lineId = searchParams.get("line_id");
    const profile =
      profiles.find((item) => item.lineId === lineId) ??
      profiles.find((item) => item.id === currentUserId);

    logEvent("line.callback.received", {
      lineId,
      matchedProfileId: profile?.id ?? null,
    });

    return NextResponse.json({
      linked: Boolean(profile?.lineId),
      profileId: profile?.id ?? null,
      mode: profile?.lineId ? "line-linked" : "fallback-auth",
    });
  } catch (error) {
    logError("line.callback.failed", {
      message: error instanceof Error ? error.message : "Unknown LINE auth error",
    });
    return NextResponse.json({ error: "LINE callback failed." }, { status: 500 });
  }
}
