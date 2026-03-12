import { getLocale, getTranslations } from "next-intl/server";

import { ProductCard } from "@/components/member/shop/product-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { getShopCatalog } from "@/lib/mock/queries";

export default async function ShopPage() {
  const locale = (await getLocale()) as "en" | "zh-TW";
  const t = await getTranslations("shop");
  const products = getShopCatalog(locale);

  return (
    <div className="space-y-5">
      <Card>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
        </CardHeader>
      </Card>
      <div className="grid gap-4 sm:grid-cols-2">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
