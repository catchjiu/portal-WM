"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import { useFamily } from "@/components/providers/family-provider";
import { PreorderConfirmDialog } from "@/components/member/shop/preorder-confirm-dialog";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Product } from "@/lib/types/domain";
import { formatCurrency } from "@/lib/utils";

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const t = useTranslations("shop");
  const locale = useLocale();
  const router = useRouter();
  const { activeProfileId } = useFamily();
  const [selectedColorId, setSelectedColorId] = useState(product.colors[0]?.id ?? "");
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] ?? "");
  const [modalOpen, setModalOpen] = useState(false);

  const productName = locale === "zh-TW" ? product.nameZh : product.nameEn;
  const productDescription =
    locale === "zh-TW" ? product.descriptionZh : product.descriptionEn;
  const selectedColor = useMemo(
    () =>
      product.colors.find((color) => color.id === selectedColorId) ?? product.colors[0],
    [product.colors, selectedColorId],
  );

  async function handleQuickBuy() {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        profileId: activeProfileId,
        productId: product.id,
        selectedColorId,
        selectedSize,
      }),
    });

    if (response.ok) {
      router.push(`/${locale}/payments`);
    }
  }

  return (
    <div className="space-y-5">
      <Link
        className="inline-flex items-center text-sm text-slate-400 transition-colors hover:text-white"
        href="/shop"
      >
        {t("backToShop")}
      </Link>

      <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <Card className="overflow-hidden p-0">
          <div className="relative aspect-[4/5]">
            <Image
              alt={`${productName} ${selectedColor?.nameEn ?? ""}`}
              className="object-cover"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              src={selectedColor.imageUrl}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/5 to-transparent" />
            {product.isPreorder ? (
              <Badge className="absolute left-4 top-4 border-amber-400/30 bg-amber-400/90 text-slate-950">
                {t("preorder")}
              </Badge>
            ) : null}
          </div>
        </Card>

        <div className="space-y-5">
          <Card className="space-y-5">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.16em] text-slate-500">
                    {product.category}
                  </p>
                  <h1 className="font-heading text-5xl uppercase tracking-[0.08em] text-white">
                    {productName}
                  </h1>
                </div>
                <p className="text-3xl font-semibold text-white">
                  {formatCurrency(product.priceTwd)}
                </p>
              </div>
              <p className="text-base leading-7 text-slate-400">{productDescription}</p>
            </div>

            <div className="grid gap-3 rounded-3xl border border-slate-800 bg-slate-950/50 p-4 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                  {t("price")}
                </p>
                <p className="mt-2 text-lg font-semibold text-white">
                  {formatCurrency(product.priceTwd)}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                  {t("stock")}
                </p>
                <p className="mt-2 text-lg font-semibold text-white">
                  {product.isPreorder ? t("madeToOrder") : product.stockQuantity}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-white">{t("selectColor")}</p>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => {
                  const active = color.id === selectedColorId;
                  const label = locale === "zh-TW" ? color.nameZh : color.nameEn;

                  return (
                    <button
                      className={`flex items-center gap-3 rounded-2xl border px-3 py-2 text-sm transition-colors ${
                        active
                          ? "border-cyan-400 bg-cyan-400/10 text-white"
                          : "border-slate-800 bg-slate-950/50 text-slate-300 hover:border-slate-700"
                      }`}
                      key={color.id}
                      onClick={() => setSelectedColorId(color.id)}
                      type="button"
                    >
                      <span
                        className="size-5 rounded-full border border-white/20"
                        style={{ backgroundColor: color.swatch }}
                      />
                      <span>{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-white">{t("selectSize")}</p>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => {
                  const active = size === selectedSize;

                  return (
                    <button
                      className={`min-w-14 rounded-2xl border px-4 py-3 text-sm font-medium transition-colors ${
                        active
                          ? "border-cyan-400 bg-cyan-400/10 text-white"
                          : "border-slate-800 bg-slate-950/50 text-slate-300 hover:border-slate-700"
                      }`}
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      type="button"
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            <Button
              className="h-14 w-full text-lg"
              onClick={() =>
                product.isPreorder ? setModalOpen(true) : void handleQuickBuy()
              }
              size="lg"
            >
              {t("addToCart")}
            </Button>
          </Card>
        </div>
      </div>

      <PreorderConfirmDialog
        message={t("preorderMessage")}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => {
          setModalOpen(false);
          void handleQuickBuy();
        }}
      />
    </div>
  );
}
