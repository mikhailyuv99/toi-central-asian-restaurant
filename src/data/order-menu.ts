/** Structured menu for direct ordering — sourced from owner printed menus (Jun 2026). */

import { TOI_MENU } from "./toi-menu";
import { getOrderItemImage } from "./order-menu-images";

export type OrderMenuItem = {
  id: string;
  name: string;
  description?: string;
  priceVnd: number;
  image: string;
  popular?: boolean;
};

export type OrderMenuCategory = {
  id: string;
  title: string;
  items: OrderMenuItem[];
};

export const ORDER_MENU_RAW = TOI_MENU.map((category) => ({
  id: category.id,
  title: category.titleEn,
  items: category.items.map((item) => ({
    id: item.id,
    name: item.nameEn,
    description: item.description,
    priceVnd: item.priceVnd,
    popular: item.popular,
  })),
}));

export const ORDER_MENU: OrderMenuCategory[] = ORDER_MENU_RAW.map((category) => ({
  ...category,
  items: category.items.map((menuItem) => ({
    ...menuItem,
    image: getOrderItemImage(menuItem.id) ?? "",
  })),
}));

export const ORDER_MENU_BY_ID = new Map(
  ORDER_MENU.flatMap((cat) => cat.items.map((item) => [item.id, item] as const)),
);

export function formatOrderVnd(amount: number): string {
  if (amount <= 0) return "Price on request";
  return `${amount.toLocaleString("en-US")}VND`;
}

export function formatOrderPriceDisplay(amount: number): string {
  if (amount <= 0) return "—";
  return `${amount.toLocaleString("en-US")}₫`;
}

export function hasPricedItems(cart: Record<string, number>): boolean {
  return ORDER_MENU.flatMap((c) => c.items).some(
    (item) => (cart[item.id] ?? 0) > 0 && item.priceVnd > 0,
  );
}
