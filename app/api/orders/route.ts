import { NextRequest, NextResponse } from "next/server";

import { currentUserId } from "@/lib/mock/data";
import { logError, logEvent } from "@/lib/observability/logger";
import { createPendingOrder } from "@/lib/shop/orders";

export async function POST(request: NextRequest) {
  try {
    const { profileId, productId } = (await request.json()) as {
      profileId?: string;
      productId?: string;
    };

    if (!productId) {
      return NextResponse.json({ error: "Missing productId." }, { status: 400 });
    }

    const result = createPendingOrder(profileId ?? currentUserId, productId);
    logEvent("order.created", {
      orderId: result.order.id,
      productId,
      profileId: profileId ?? currentUserId,
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    logError("order.failed", {
      message: error instanceof Error ? error.message : "Unknown order error",
    });
    return NextResponse.json({ error: "Unable to create order." }, { status: 500 });
  }
}
