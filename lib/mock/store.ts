import {
  classSessions,
  currentUserId,
  families,
  initialBookings,
  initialOrders,
  initialPayments,
  products,
  profiles,
} from "@/lib/mock/data";
import type { Booking, KioskEvent, Order, Payment } from "@/lib/types/domain";

let bookings: Booking[] = [...initialBookings];
let orders: Order[] = [...initialOrders];
let payments: Payment[] = [...initialPayments];
let kioskEvent: KioskEvent | null = {
  profileId: currentUserId,
  fullName: "Alex Lee",
  rank: "Blue",
  matHours: 142.5,
  scannedAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
};

export function getStore() {
  return {
    families,
    profiles,
    products,
    classSessions,
    bookings,
    orders,
    payments,
    kioskEvent,
  };
}

export function setBookings(nextBookings: Booking[]) {
  bookings = nextBookings;
}

export function addOrder(order: Order) {
  orders = [order, ...orders];
  return order;
}

export function addPayment(payment: Payment) {
  payments = [payment, ...payments];
  return payment;
}

export function updatePaymentStatus(paymentId: string, status: Payment["status"]) {
  payments = payments.map((payment) =>
    payment.id === paymentId ? { ...payment, status } : payment,
  );
}

export function updatePaymentProof(paymentId: string, proofUrl: string) {
  payments = payments.map((payment) =>
    payment.id === paymentId ? { ...payment, proofUrl } : payment,
  );
}

export function setKioskEvent(nextEvent: KioskEvent) {
  kioskEvent = nextEvent;
}

export function resetStore() {
  bookings = [...initialBookings];
  orders = [...initialOrders];
  payments = [...initialPayments];
  kioskEvent = {
    profileId: currentUserId,
    fullName: "Alex Lee",
    rank: "Blue",
    matHours: 142.5,
    scannedAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
  };
}
