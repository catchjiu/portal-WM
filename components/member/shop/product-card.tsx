"use client";

import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import { useFamily } from "@/components/providers/family-provider";
import { PreorderConfirmDialog } from "@/components/member/shop/preorder-confirm-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Product } from "@/lib/types/domain";
import { formatCurrency } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations("shop");
  const locale = useLocale();
  const router = useRouter();
  const { activeProfileId } = useFamily();
  const [modalOpen, setModalOpen] = useState(false);

  const productName = locale === "zh-TW" ? product.nameZh : product.nameEn;

  async function handleQuickBuy() {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        profileId: activeProfileId,
        productId: product.id,
      }),
    });

    if (response.ok) {
      router.push(`/${locale}/payments`);
    }
  }

  return (
    <>
      <Card className="h-full">
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <CardTitle className="text-lg">{productName}</CardTitle>
            {product.isPreorder ? (
              <Badge className="border-amber-400/30 text-amber-200">
                {t("preorder")}
              </Badge>
            ) : null}
          </div>
        </CardHeader>
        <CardContent className="flex h-full flex-col justify-between">
          <div className="space-y-3">
            <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6 text-center">
              <ShoppingBag className="mx-auto mb-3 size-8 text-cyan-300" />
              <p className="text-sm text-slate-400">{product.category}</p>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Price</span>
              <span className="font-semibold text-white">
                {formatCurrency(product.priceTwd)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Stock</span>
              <span className="text-slate-200">
                {product.isPreorder ? "Made to order" : product.stockQuantity}
              </span>
            </div>
          </div>
          <Button
            className="mt-5 w-full"
            onClick={() =>
              product.isPreorder ? setModalOpen(true) : void handleQuickBuy()
            }
          >
            {t("quickBuy")}
          </Button>
        </CardContent>
      </Card>
      <PreorderConfirmDialog
        message={t("preorderMessage")}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => {
          setModalOpen(false);
          void handleQuickBuy();
        }}
      />
    </>
  );
}
