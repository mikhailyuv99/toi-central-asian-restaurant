import { client } from "./client";
import { getMenuMax, getMenuMode } from "./sections";
import { allMenuItems } from "./copy";

export type HighlightItem = {
  name: string;
  description: string;
  price?: string;
  photo?: string;
  category?: string;
};

export function getMenuHighlights(): HighlightItem[] {
  const mode = getMenuMode();
  const max = getMenuMax();

  if (mode === "menu") {
    return allMenuItems().slice(0, max).map((item) => ({
      name: item.name,
      description: item.description ?? "",
      price: item.price,
      photo: item.photo,
      category: item.category,
    }));
  }

  if (mode === "categories") {
    return client.services_or_menu.slice(0, max).map((entry) => {
      const [name, ...rest] = entry.split("—").map((s) => s.trim());
      return {
        name: name ?? entry,
        description: rest.join(" — ") || "",
      };
    });
  }

  if (mode === "review-led") {
    return client.review_themes.slice(0, max).map((theme) => ({
      name: theme.name,
      description: theme.note,
    }));
  }

  return [];
}

export function menuSectionTitle(): string {
  const mode = getMenuMode();
  if (mode === "review-led") return "What to order";
  if (mode === "categories") return "On the menu";
  if (mode === "sparse") return "Menu";
  return "Highlights";
}

export function menuSectionNote(): string | null {
  if (getMenuMode() !== "sparse") return null;
  return "No written menu on file — call for today's options.";
}
