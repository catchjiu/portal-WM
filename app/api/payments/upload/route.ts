import { NextRequest, NextResponse } from "next/server";

import { getPaymentsForProfile } from "@/lib/mock/queries";
import { updatePaymentProof } from "@/lib/mock/store";
import { logError, logEvent } from "@/lib/observability/logger";
import { uploadPaymentProof } from "@/lib/storage/payment-proofs";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const paymentId = String(formData.get("paymentId") ?? "");
    const profileId = String(formData.get("profileId") ?? "");
    const reference = String(formData.get("reference") ?? "");
    const notes = String(formData.get("notes") ?? "");
    const file = formData.get("file");

    if (!paymentId || !profileId || !(file instanceof File)) {
      return NextResponse.json(
        { error: "Missing payment upload payload." },
        { status: 400 },
      );
    }

    const payments = getPaymentsForProfile(profileId);
    const payment = payments.find((item) => item.id === paymentId);

    if (!payment) {
      return NextResponse.json({ error: "Payment not found." }, { status: 404 });
    }

    const path = await uploadPaymentProof({
      ownerId: profileId,
      paymentId,
      file,
    });

    updatePaymentProof(paymentId, path);

    logEvent("payment.proof.uploaded", {
      paymentId,
      profileId,
      path,
      reference,
      notes,
    });

    return NextResponse.json({
      ok: true,
      paymentId,
      proofPath: path,
    });
  } catch (error) {
    logError("payment.proof.upload_failed", {
      message: error instanceof Error ? error.message : "Unknown payment upload error",
    });

    return NextResponse.json(
      { error: "Unable to upload payment proof." },
      { status: 500 },
    );
  }
}
