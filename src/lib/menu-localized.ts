import type { ToiMenuItem } from "@/data/toi-menu";
import { TOI_MENU_DESCRIPTIONS } from "@/data/toi-menu-localized-text";
import type { Lang } from "@/lib/i18n/translations";

export function localizedMenuName(lang: Lang, item: ToiMenuItem): string {
  if (lang === "ru" && item.nameRu) return item.nameRu;
  if (lang === "vi" && item.nameVi) return item.nameVi;
  return item.nameEn;
}

export function localizedMenuDescription(lang: Lang, item: ToiMenuItem): string | undefined {
  if (lang === "en") return item.description;
  const map = TOI_MENU_DESCRIPTIONS[lang as "ru" | "vi" | "fr"] as Record<string, string>;
  return map[item.id] ?? undefined;
}

export function localizedMenuAltNames(lang: Lang, item: ToiMenuItem): string | undefined {
  if (lang === "en" || lang === "fr") {
    const parts = [item.nameRu, item.nameVi].filter(Boolean);
    return parts.length ? parts.join(" · ") : undefined;
  }
  if (lang === "ru") {
    const parts = [item.nameEn, item.nameVi].filter(Boolean);
    return parts.length ? parts.join(" · ") : undefined;
  }
  if (lang === "vi") {
    const parts = [item.nameEn, item.nameRu].filter(Boolean);
    return parts.length ? parts.join(" · ") : undefined;
  }
  const parts = [item.nameRu, item.nameVi].filter(Boolean);
  return parts.length ? parts.join(" · ") : undefined;
}
