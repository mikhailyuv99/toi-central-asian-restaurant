import { NextResponse } from "next/server";
import { ORDER_MENU_BY_ID } from "@/data/order-menu";
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

function getOrderInboxPhone(): string {
  const raw = process.env.ORDER_WHATSAPP_TO?.trim() || "33677231846";
  const digits = raw.replace(/\D/g, "");
  if (!digits) {
    throw new Error("ORDER_WHATSAPP_TO is missing on the server.");
  }
  return `+${digits}`;
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function assertCallMeBotSuccess(status: number, body: string): void {
  const text = stripHtml(body);
  const lower = text.toLowerCase();

  if (status !== 200) {
    throw new Error(text || `CallMeBot returned HTTP ${status}.`);
  }

  if (
    lower.includes("invalid") ||
    lower.includes("not allowed") ||
    lower.includes("error") ||
    lower.includes("apikey is")
  ) {
    throw new Error(text || "CallMeBot rejected the order.");
  }

  if (!lower.includes("queued") && !lower.includes("message sent")) {
    throw new Error(
      text ||
        "CallMeBot did not confirm delivery. Check that CALLMEBOT_API_KEY and ORDER_WHATSAPP_TO use the same phone number you activated.",
    );
  }
}

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

async function sendViaCallMeBot(message: string): Promise<string> {
  const apiKey = process.env.CALLMEBOT_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("CALLMEBOT_API_KEY is not configured on the server.");
  }

  const phone = getOrderInboxPhone();
  const params = new URLSearchParams({
    phone,
    text: message,
    apikey: apiKey,
    source: "habibi-order",
  });
  const url = `https://api.callmebot.com/whatsapp.php?${params.toString()}`;

  const response = await fetch(url, { method: "GET", cache: "no-store" });
  const body = (await response.text()).trim();

  assertCallMeBotSuccess(response.status, body);
  return stripHtml(body);
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
    const confirmation = await sendViaCallMeBot(message);
    return NextResponse.json({ ok: true, confirmation });
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Could not send order.";
    console.error("[send-order]", detail);
    return NextResponse.json({ error: detail }, { status: 502 });
  }
}
