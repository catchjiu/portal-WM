import { NextRequest, NextResponse } from "next/server";

import { getLatestKioskEvent } from "@/lib/mock/queries";
import { logError, logEvent } from "@/lib/observability/logger";
import { processKioskCheckIn } from "@/lib/kiosk/check-in";

export async function GET() {
  return NextResponse.json({ event: getLatestKioskEvent() });
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") ?? "";
    let profileId = "";

    if (contentType.includes("application/json")) {
      const body = (await request.json()) as { profileId?: string };
      profileId = body.profileId ?? "";
    } else {
      const formData = await request.formData();
      profileId = String(formData.get("profileId") ?? "");
    }

    if (!profileId) {
      return NextResponse.json({ error: "Missing profileId." }, { status: 400 });
    }

    const result = processKioskCheckIn(profileId);
    if (!result.success) {
      return NextResponse.json({ error: "Profile not found." }, { status: 404 });
    }

    logEvent("kiosk.scan.processed", {
      profileId,
      checkedInCount: result.checkedInCount,
    });

    return NextResponse.json(result);
  } catch (error) {
    logError("kiosk.scan.failed", {
      message: error instanceof Error ? error.message : "Unknown kiosk error",
    });
    return NextResponse.json({ error: "Scan processing failed." }, { status: 500 });
  }
}
