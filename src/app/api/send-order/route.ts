import { NextResponse } from "next/server";
import { ORDER_MENU_BY_ID } from "@/data/order-menu";
import { dispatchOrderNotification, isInstantDelivery } from "@/lib/order-notify";
import {
  PICKUP_OPTIONS,
  buildOrderWhatsAppMessage,
  type PickupTime,
} from "@/lib/order-whatsapp";

type OrderPayload = {
  customer?: { firstName?: string; phone?: string };
  cart?: Record<string, number>;
  pickup?: PickupTime;
};

function sanitizeCart(raw: Record<string, number> | undefined): Record<string, number> {
  if (!raw || typeof raw !== "object") return {};
  const cart: Record<string, number> = {};
  for (const [id, qty] of Object.entries(raw)) {
    if (!ORDER_MENU_BY_ID.has(id)) continue;
    const quantity = Math.floor(Number(qty));
    if (quantity > 0 && quantity <= 99) cart[id] = quantity;
  }
  return cart;
}

export async function POST(request: Request) {
  let payload: OrderPayload;

  try {
    payload = (await request.json()) as OrderPayload;
  } catch {
    return NextResponse.json({ error: "Invalid order payload." }, { status: 400 });
  }

  const firstName = payload.customer?.firstName?.trim() ?? "";
  const phone = payload.customer?.phone?.trim() ?? "";
  const pickup = payload.pickup ?? "ASAP";
  const cart = sanitizeCart(payload.cart);

  if (!firstName || !phone) {
    return NextResponse.json({ error: "Name and phone are required." }, { status: 400 });
  }

  if (!PICKUP_OPTIONS.includes(pickup)) {
    return NextResponse.json({ error: "Invalid pickup time." }, { status: 400 });
  }

  if (Object.keys(cart).length === 0) {
    return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
  }

  const message = buildOrderWhatsAppMessage({ firstName, phone }, cart, pickup);

  try {
    const channels = await dispatchOrderNotification(message);
    return NextResponse.json({
      ok: true,
      instant: isInstantDelivery(channels),
      channels: channels.map((c) => c.channel),
    });
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Could not send order.";
    console.error("[send-order]", detail);
    return NextResponse.json({ error: detail }, { status: 502 });
  }
}
