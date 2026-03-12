"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import { useFamily } from "@/components/providers/family-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Order, Payment } from "@/lib/types/domain";
import { formatCurrency } from "@/lib/utils";

interface PaymentsPanelProps {
  ordersByProfile: Record<string, Order[]>;
  paymentsByProfile: Record<string, Payment[]>;
}

export function PaymentsPanel({
  ordersByProfile,
  paymentsByProfile,
}: PaymentsPanelProps) {
  const { activeProfileId } = useFamily();
  const router = useRouter();
  const t = useTranslations("payments");
  const [reference, setReference] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedPaymentId, setSelectedPaymentId] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const orders = ordersByProfile[activeProfileId] ?? [];
  const payments = useMemo(
    () => paymentsByProfile[activeProfileId] ?? [],
    [activeProfileId, paymentsByProfile],
  );
  const pendingPayments = useMemo(
    () => payments.filter((payment) => payment.status === "Pending"),
    [payments],
  );
  const currentSelectedPaymentId =
    selectedPaymentId || pendingPayments[0]?.id || "";

  async function handleUpload() {
    if (!currentSelectedPaymentId || !selectedFile) {
      setMessage("Choose a pending payment and file first.");
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("paymentId", currentSelectedPaymentId);
      formData.append("profileId", activeProfileId);
      formData.append("reference", reference);
      formData.append("notes", notes);
      formData.append("file", selectedFile);

      const response = await fetch("/api/payments/upload", {
        method: "POST",
        body: formData,
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setMessage(data.error ?? "Upload failed.");
        return;
      }

      setMessage("Proof uploaded to Supabase Storage.");
      setSelectedFile(null);
      setReference("");
      setNotes("");
      setSelectedPaymentId("");
      router.refresh();
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="space-y-5">
      <Card>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {orders.map((order) => (
              <div
                className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4"
                key={order.id}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium text-white">{order.productId}</p>
                    <p className="text-sm text-slate-400">
                      Qty {order.quantity} • {order.status}
                    </p>
                  </div>
                  <span className="font-semibold text-cyan-300">
                    {formatCurrency(order.subtotalTwd)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("uploadProof")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <label className="block space-y-2">
            <span className="text-xs uppercase tracking-[0.18em] text-slate-500">
              Pending payment
            </span>
            <select
              className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/60"
              value={currentSelectedPaymentId}
              onChange={(event) => setSelectedPaymentId(event.target.value)}
            >
              {pendingPayments.length === 0 ? (
                <option value="">No pending payments</option>
              ) : (
                pendingPayments.map((payment) => (
                  <option className="bg-slate-950" key={payment.id} value={payment.id}>
                    {payment.id} - {formatCurrency(payment.amount)}
                  </option>
                ))
              )}
            </select>
          </label>
          <Input
            placeholder="Bank transfer reference"
            value={reference}
            onChange={(event) => setReference(event.target.value)}
          />
          <Textarea
            placeholder="Optional payment notes"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
          />
          <input
            accept="image/*,.pdf"
            className="block w-full rounded-xl border border-dashed border-slate-700 bg-slate-950/60 px-3 py-3 text-sm text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-cyan-400 file:px-3 file:py-2 file:text-sm file:font-medium file:text-slate-950"
            onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)}
            type="file"
          />
          <Button
            className="w-full"
            disabled={isUploading || pendingPayments.length === 0}
            variant="outline"
            onClick={() => void handleUpload()}
          >
            {t("uploadProof")}
          </Button>
          <p className="text-xs text-slate-500">
            Files upload to the private `payment-proofs` bucket and save the storage path on the payment record.
          </p>
          {message ? <p className="text-xs text-cyan-300">{message}</p> : null}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("pending")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {payments.map((payment) => (
            <div
              className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/50 p-4"
              key={payment.id}
            >
              <div>
                <p className="font-medium text-white">{payment.id}</p>
                <p className="text-sm text-slate-400">{formatCurrency(payment.amount)}</p>
                <p className="text-xs text-slate-500">
                  {payment.proofUrl ? "Proof attached" : "Awaiting upload"}
                </p>
              </div>
              <Badge>{payment.status}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
