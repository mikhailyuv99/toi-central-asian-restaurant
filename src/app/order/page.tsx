import type { Metadata } from "next";
import { OrderPageClient } from "@/components/order/OrderPageClient";
import "./order.css";

export const metadata: Metadata = {
  title: "Order Direct | TOI",
  description:
    "Order pickup from TOI Central Asian Restaurant. Halal plov, laghman, manti. Pay on arrival.",
  robots: { index: false, follow: false },
};

export default function OrderPage() {
  return <OrderPageClient />;
}
