import { notFound } from "next/navigation";

import { ProductDetail } from "@/components/member/shop/product-detail";
import { getShopProduct } from "@/lib/mock/queries";

export default async function ShopProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const product = getShopProduct(productId);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
