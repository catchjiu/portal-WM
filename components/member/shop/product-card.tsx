"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Product } from "@/lib/types/domain";
import { formatCurrency } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations("shop");
  const locale = useLocale();
  const productName = locale === "zh-TW" ? product.nameZh : product.nameEn;
  const previewColor = product.colors[0];

  return (
    <Card className="h-full overflow-hidden p-0">
      <Link className="block h-full" href={`/shop/${product.id}`}>
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            alt={productName}
            className="object-cover"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            src={previewColor.imageUrl}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
          {product.isPreorder ? (
            <Badge className="absolute left-4 top-4 border-amber-400/30 bg-amber-400/90 text-slate-950">
              {t("preorder")}
            </Badge>
          ) : null}
          <div className="absolute inset-x-0 bottom-0 p-4">
            <div className="mb-3 flex gap-2">
              {product.colors.map((color) => (
                <span
                  className="size-4 rounded-full border border-white/30 shadow-sm"
                  key={color.id}
                  style={{ backgroundColor: color.swatch }}
                />
              ))}
            </div>
            <CardTitle className="text-2xl text-white">{productName}</CardTitle>
            <p className="mt-2 text-xl font-semibold text-white">
              {formatCurrency(product.priceTwd)}
            </p>
          </div>
        </div>
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm text-slate-400">{product.category}</p>
            <p className="text-sm text-slate-400">
              {product.colors.length} color{product.colors.length > 1 ? "s" : ""}
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="line-clamp-2 text-sm text-slate-400">
            {locale === "zh-TW" ? product.descriptionZh : product.descriptionEn}
          </p>
          <div className="inline-flex w-full items-center justify-center rounded-2xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-sm font-medium text-white transition-colors hover:border-cyan-400/50 hover:text-cyan-200">
            {t("viewDetails")}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
