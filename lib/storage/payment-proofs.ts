import { getSupabaseServiceRoleClient } from "@/lib/supabase/service-role";

const PAYMENT_PROOFS_BUCKET = "payment-proofs";

function sanitizeFilename(filename: string) {
  return filename
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function buildPaymentProofPath(
  ownerId: string,
  paymentId: string,
  filename: string,
) {
  const safeFilename = sanitizeFilename(filename || "proof-upload");
  return `${ownerId}/${paymentId}/${safeFilename}`;
}

export async function uploadPaymentProof(params: {
  ownerId: string;
  paymentId: string;
  file: File;
}) {
  const supabase = getSupabaseServiceRoleClient();

  if (!supabase) {
    throw new Error("Supabase service role credentials are missing.");
  }

  const path = buildPaymentProofPath(
    params.ownerId,
    params.paymentId,
    params.file.name,
  );

  const { error } = await supabase.storage
    .from(PAYMENT_PROOFS_BUCKET)
    .upload(path, params.file, {
      cacheControl: "3600",
      upsert: true,
      contentType: params.file.type || "application/octet-stream",
    });

  if (error) {
    throw error;
  }

  return path;
}

export async function createPaymentProofSignedUrl(path: string | null) {
  if (!path) {
    return null;
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const supabase = getSupabaseServiceRoleClient();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase.storage
    .from(PAYMENT_PROOFS_BUCKET)
    .createSignedUrl(path, 60 * 60);

  if (error) {
    return null;
  }

  return data.signedUrl;
}
