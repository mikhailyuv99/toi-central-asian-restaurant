/** Server-side order notification providers. CallMeBot is slow (minutes); prefer Telegram or WhatsApp Cloud API. */

function orderInboxDigits(): string {
  const raw = process.env.ORDER_WHATSAPP_TO?.trim() || "33677231846";
  const digits = raw.replace(/\D/g, "");
  if (!digits) throw new Error("ORDER_WHATSAPP_TO is missing on the server.");
  return digits;
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export type NotifyChannel = "whatsapp_cloud" | "telegram" | "callmebot";

export type NotifyResult = {
  channel: NotifyChannel;
  instant: boolean;
  detail?: string;
};

function hasWhatsAppCloud(): boolean {
  return Boolean(
    process.env.WHATSAPP_CLOUD_TOKEN?.trim() &&
      process.env.WHATSAPP_PHONE_NUMBER_ID?.trim(),
  );
}

function hasTelegram(): boolean {
  return Boolean(
    process.env.TELEGRAM_BOT_TOKEN?.trim() && process.env.TELEGRAM_ORDER_CHAT_ID?.trim(),
  );
}

function hasCallMeBot(): boolean {
  return Boolean(process.env.CALLMEBOT_API_KEY?.trim());
}

async function sendViaWhatsAppCloud(message: string): Promise<NotifyResult> {
  const token = process.env.WHATSAPP_CLOUD_TOKEN?.trim();
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID?.trim();
  if (!token || !phoneNumberId) {
    throw new Error("WhatsApp Cloud API is not configured.");
  }

  const response = await fetch(`https://graph.facebook.com/v21.0/${phoneNumberId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: orderInboxDigits(),
      type: "text",
      text: { body: message },
    }),
    cache: "no-store",
  });

  const data = (await response.json().catch(() => ({}))) as {
    error?: { message?: string };
  };

  if (!response.ok) {
    throw new Error(data.error?.message ?? "WhatsApp Cloud API request failed.");
  }

  return { channel: "whatsapp_cloud", instant: true };
}

async function sendViaTelegram(message: string): Promise<NotifyResult> {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatIdRaw = process.env.TELEGRAM_ORDER_CHAT_ID?.trim().replace(/^["']|["']$/g, "");
  if (!token || !chatIdRaw) {
    throw new Error("Telegram is not configured.");
  }

  const chatId = /^-?\d+$/.test(chatIdRaw) ? Number(chatIdRaw) : chatIdRaw;

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      disable_web_page_preview: true,
    }),
    cache: "no-store",
  });

  const data = (await response.json()) as { ok?: boolean; description?: string };
  if (!response.ok || !data.ok) {
    const description = data.description ?? "Telegram request failed.";
    if (description.toLowerCase().includes("chat not found")) {
      throw new Error(
        "Telegram chat not found. Open @habibidanangbot, tap Start, send hello, then set TELEGRAM_ORDER_CHAT_ID to the numeric id from getUpdates (not your phone number).",
      );
    }
    throw new Error(description);
  }

  return { channel: "telegram", instant: true };
}

async function sendViaCallMeBot(message: string): Promise<NotifyResult> {
  const apiKey = process.env.CALLMEBOT_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("CALLMEBOT_API_KEY is not configured.");
  }

  const phone = `+${orderInboxDigits()}`;
  const params = new URLSearchParams({
    phone,
    text: message,
    apikey: apiKey,
    source: "habibi-order",
  });
  const url = `https://api.callmebot.com/whatsapp.php?${params.toString()}`;

  const response = await fetch(url, { method: "GET", cache: "no-store" });
  const body = (await response.text()).trim();
  const text = stripHtml(body);
  const lower = text.toLowerCase();

  if (response.status !== 200) {
    throw new Error(text || `CallMeBot HTTP ${response.status}.`);
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
    throw new Error(text || "CallMeBot did not confirm the order.");
  }

  return { channel: "callmebot", instant: false, detail: text };
}

export async function dispatchOrderNotification(message: string): Promise<NotifyResult[]> {
  const instantTasks: Promise<NotifyResult>[] = [];

  if (hasWhatsAppCloud()) {
    instantTasks.push(sendViaWhatsAppCloud(message));
  }
  if (hasTelegram()) {
    instantTasks.push(sendViaTelegram(message));
  }

  if (instantTasks.length > 0) {
    const results = await Promise.allSettled(instantTasks);
    const delivered = results
      .filter((r): r is PromiseFulfilledResult<NotifyResult> => r.status === "fulfilled")
      .map((r) => r.value);

    if (delivered.length > 0) {
      return delivered;
    }

    const firstError = results.find((r) => r.status === "rejected") as
      | PromiseRejectedResult
      | undefined;
    throw firstError?.reason ?? new Error("Instant notification failed.");
  }

  if (hasCallMeBot()) {
    return [await sendViaCallMeBot(message)];
  }

  throw new Error(
    "No order inbox configured. Add TELEGRAM_BOT_TOKEN + TELEGRAM_ORDER_CHAT_ID (instant) or WhatsApp Cloud API keys on the server.",
  );
}

export function isInstantDelivery(channels: NotifyResult[]): boolean {
  return channels.some((c) => c.instant);
}
