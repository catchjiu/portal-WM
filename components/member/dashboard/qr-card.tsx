"use client";

import QRCode from "qrcode";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { QrCode } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface QrCardProps {
  profileId: string;
}

export function QrCard({ profileId }: QrCardProps) {
  const [qrDataUrl, setQrDataUrl] = useState("");
  const t = useTranslations("dashboard");

  useEffect(() => {
    QRCode.toDataURL(profileId, {
      color: {
        dark: "#f8fafc",
        light: "#020617",
      },
      margin: 1,
      width: 180,
    }).then(setQrDataUrl);
  }, [profileId]);

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div>
          <CardTitle>{t("qrTitle")}</CardTitle>
        </div>
        <QrCode className="size-5 text-cyan-300" />
      </CardHeader>
      <CardContent className="items-center">
        <div className="flex justify-center rounded-3xl border border-slate-800 bg-slate-950/80 p-4">
          {qrDataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img alt="Kiosk QR code" className="rounded-2xl" src={qrDataUrl} />
          ) : (
            <div className="flex size-[180px] items-center justify-center rounded-2xl bg-slate-900 text-slate-500">
              Loading...
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
