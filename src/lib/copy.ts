import { client } from "./client";

export function locationShort(): string {
  const parts = client.address.split(",").map((s) => s.trim());
  if (parts.length >= 2) return parts.slice(-2).join(", ");
  return client.address;
}

export function cityForTitle(): string {
  const parts = client.address.split(",").map((s) => s.trim());
  return parts.length >= 2 ? parts[parts.length - 2]! : locationShort();
}

export function headline(): string {
  return client.headline ?? client.name;
}

export function metaDescription(): string {
  const selling = client.owner_provided_notes?.trim();
  if (selling) return `${client.name}. ${selling}`.slice(0, 160);
  return `${client.name} in ${locationShort()}`.slice(0, 160);
}

export function hoursToday(): string {
  if (!client.hours?.length) return "See Google Maps";
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const match = client.hours.find((h) => h.toLowerCase().startsWith(today.toLowerCase()));
  return match ?? client.hours[0]!;
}

export function ratingLabel(): string | null {
  if (client.rating == null) return null;
  const count =
    client.review_count != null
      ? `${client.review_count.toLocaleString()} Google reviews`
      : "Google reviews";
  return `${client.rating.toFixed(1)} · ${count}`;
}

export function truncateReview(text: string, max = 220): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trim()}…`;
}

export function allMenuItems() {
  return client.menu.flatMap((group) =>
    group.items.map((item) => ({ ...item, category: group.category }))
  );
}

export function hasStructuredMenu(): boolean {
  return client.menu.some((g) => g.items.length > 0);
}

export function hasServicesList(): boolean {
  return client.services_or_menu.length > 0;
}

export function hasReviewThemes(): boolean {
  return client.review_themes.length > 0;
}
