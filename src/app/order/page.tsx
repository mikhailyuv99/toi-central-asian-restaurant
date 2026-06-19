import type { Metadata } from "next";
import { OrderPageClient } from "@/components/order/OrderPageClient";
import "./order.css";

export const metadata: Metadata = {
  title: "Order Direct | Habibi",
  description:
    "Order pickup directly from Habibi — no app, no Grab commission. Pay on arrival.",
  robots: { index: false, follow: false },
};

export default function OrderPage() {
  return <OrderPageClient />;
}
