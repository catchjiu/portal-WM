import { products } from "@/lib/mock/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function AdminInventoryPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.9fr]">
      <Card>
        <CardHeader>
          <CardTitle>Shop inventory</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {products.map((product) => (
            <div
              className="grid gap-2 rounded-2xl border border-slate-800 bg-slate-950/40 p-4 md:grid-cols-4"
              key={product.id}
            >
              <p className="font-medium text-white">{product.nameEn}</p>
              <p className="text-sm text-slate-300">{product.category}</p>
              <p className="text-sm text-slate-300">
                {product.isPreorder ? "Preorder" : `${product.stockQuantity} in stock`}
              </p>
              <p className="text-sm text-slate-300">TWD {product.priceTwd}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add inventory item</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input placeholder="Product name (EN)" />
          <Input placeholder="Product name (ZH)" />
          <Input placeholder="Price TWD" />
          <Input placeholder="Stock quantity" />
          <button className="h-10 rounded-xl bg-cyan-400 px-4 text-sm font-medium text-slate-950" type="button">
            Save product
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
