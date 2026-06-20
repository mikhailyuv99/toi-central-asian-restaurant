import type { Lang } from "@/lib/i18n/translations";
import { TOI_MENU } from "@/data/toi-menu";
import {
  ORDER_MENU_RAW,
  type OrderMenuCategory,
  type OrderMenuItem,
} from "@/data/order-menu";
import { getOrderItemImage } from "@/data/order-menu-images";

const CAT_KEYS: Record<
  string,
  | "catSalads"
  | "catSoups"
  | "catMains"
  | "catGrill"
  | "catSides"
  | "catBakery"
  | "catDesserts"
  | "catDrinks"
> = {
  salads: "catSalads",
  soups: "catSoups",
  mains: "catMains",
  grill: "catGrill",
  sides: "catSides",
  bakery: "catBakery",
  desserts: "catDesserts",
  drinks: "catDrinks",
};

type MenuLabels = {
  menu: Record<
    | "catSalads"
    | "catSoups"
    | "catMains"
    | "catGrill"
    | "catSides"
    | "catBakery"
    | "catDesserts"
    | "catDrinks",
    string
  >;
};

function localizedName(
  lang: Lang,
  item: (typeof TOI_MENU)[number]["items"][number],
): string {
  if (lang === "ru" && item.nameRu) return item.nameRu;
  if (lang === "vi" && item.nameVi) return item.nameVi;
  return item.nameEn;
}

function localizedCategoryTitle(
  lang: Lang,
  cat: (typeof TOI_MENU)[number],
): string {
  if (lang === "ru") return cat.titleRu;
  if (lang === "vi") return cat.titleVi;
  return cat.titleEn;
}

export function getLocalizedOrderMenu(lang: Lang, t: MenuLabels): OrderMenuCategory[] {
  return ORDER_MENU_RAW.map((category) => {
    const source = TOI_MENU.find((c) => c.id === category.id);
    const titleKey = CAT_KEYS[category.id];
    const fallbackTitle = titleKey ? t.menu[titleKey] : category.title;

    return {
      id: category.id,
      title: source ? localizedCategoryTitle(lang, source) : fallbackTitle,
      items: category.items.map((item): OrderMenuItem => {
        const sourceItem = source?.items.find((i) => i.id === item.id);
        return {
          id: item.id,
          name: sourceItem ? localizedName(lang, sourceItem) : item.name,
          description: item.description,
          priceVnd: item.priceVnd,
          image: getOrderItemImage(item.id) ?? "",
          popular: item.popular,
        };
      }),
    };
  });
}

export { CAT_KEYS };
