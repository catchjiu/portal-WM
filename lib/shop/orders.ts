import { products } from "@/lib/mock/data";
import { addOrder, addPayment } from "@/lib/mock/store";

export function createPendingOrder(userId: string, productId: string, quantity = 1) {
  const product = products.find((item) => item.id === productId);

  if (!product) {
    throw new Error("Product not found.");
  }

  const order = addOrder({
    id: `order-${crypto.randomUUID()}`,
    userId,
    productId,
    quantity,
    subtotalTwd: product.priceTwd * quantity,
    isPreorder: product.isPreorder,
    status: "PendingPayment",
    createdAt: new Date().toISOString(),
  });

  const payment = addPayment({
    id: `payment-${crypto.randomUUID()}`,
    userId,
    orderId: order.id,
    amount: order.subtotalTwd,
    status: "Pending",
    proofUrl: null,
    createdAt: new Date().toISOString(),
  });

  return { order, payment, product };
}
