"use client";

import { useMemo, useState } from "react";
import { TOI_MENU } from "@/data/toi-menu";
import { formatOrderPriceDisplay } from "@/data/order-menu";
import type { Lang } from "@/lib/i18n/translations";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { ScrollReveal } from "@/components/habibi/ScrollReveal";

function itemName(
  lang: Lang,
  item: (typeof TOI_MENU)[number]["items"][number],
): string {
  if (lang === "ru" && item.nameRu) return item.nameRu;
  if (lang === "vi" && item.nameVi) return item.nameVi;
  return item.nameEn;
}

function categoryTitle(
  lang: Lang,
  cat: (typeof TOI_MENU)[number],
): string {
  if (lang === "ru") return cat.titleRu;
  if (lang === "vi") return cat.titleVi;
  return cat.titleEn;
}

export function ToiMenuGallery() {
  const { lang, t } = useLanguage();
  const [activeId, setActiveId] = useState<string | null>(null);

  const categories = useMemo(
    () =>
      TOI_MENU.map((cat) => ({
        ...cat,
        title: categoryTitle(lang, cat),
        items: cat.items.map((item) => ({
          ...item,
          displayName: itemName(lang, item),
        })),
      })),
    [lang],
  );

  function scrollToCategory(id: string) {
    setActiveId(id);
    document.getElementById(`menu-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section className="toi-menu" id="menu" aria-labelledby="menu-heading">
      <div className="toi-menu__inner">
        <ScrollReveal>
          <header className="toi-menu__header">
            <p className="toi-menu__eyebrow">{t.menu.eyebrow}</p>
            <h2 id="menu-heading" className="toi-menu__title">
              {t.menu.title}
            </h2>
            <p className="toi-menu__lead">{t.menu.lead}</p>
          </header>
        </ScrollReveal>

        <nav className="toi-menu__nav" aria-label={t.menu.title}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`toi-menu__nav-btn${activeId === cat.id ? " toi-menu__nav-btn--active" : ""}`}
              onClick={() => scrollToCategory(cat.id)}
            >
              {cat.title}
            </button>
          ))}
        </nav>

        {categories.map((cat, ci) => (
          <ScrollReveal key={cat.id} delay={ci * 30}>
            <article className="toi-menu__category" id={`menu-${cat.id}`}>
              <header className="toi-menu__category-head">
                <h3 className="toi-menu__category-title">{cat.title}</h3>
                <span className="toi-menu__category-count">
                  {cat.items.length} {cat.items.length === 1 ? t.menu.itemSingular : t.menu.itemPlural}
                </span>
              </header>
              <ul className="toi-menu__list">
                {cat.items.map((item) => (
                  <li key={item.id} className="toi-menu__row">
                    <div className="toi-menu__item-main">
                      <p
                        className={`toi-menu__item-name${item.popular ? " toi-menu__item-name--popular" : ""}`}
                      >
                        {item.displayName}
                      </p>
                      {lang === "en" && (item.nameRu || item.nameVi) && (
                        <p className="toi-menu__item-alt">
                          {[item.nameRu, item.nameVi].filter(Boolean).join(" · ")}
                        </p>
                      )}
                      {item.description && (
                        <p className="toi-menu__item-desc">{item.description}</p>
                      )}
                    </div>
                    <span className="toi-menu__item-price">{formatOrderPriceDisplay(item.priceVnd)}</span>
                  </li>
                ))}
              </ul>
            </article>
          </ScrollReveal>
        ))}

        <footer className="toi-menu__footer">
          <a href="/order" className="toi-menu__order-link">
            {t.menu.orderCta}
          </a>
          <p className="toi-menu__note">{t.menu.priceNote}</p>
        </footer>
      </div>
    </section>
  );
}
