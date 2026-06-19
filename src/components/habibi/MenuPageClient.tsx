"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { MENU_GROUPS, MENU_CATEGORIES, type MenuCategory } from "@/data/menu-categories";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const GROUP_LABELS: Record<string, "groupToStart" | "groupSlavic" | "groupArabic" | "groupQuick"> = {
  "To start": "groupToStart",
  Slavic: "groupSlavic",
  Arabic: "groupArabic",
  "Quick & drinks": "groupQuick",
};

const CAT_LABELS: Record<
  string,
  | "catAppetizers"
  | "catColdPlates"
  | "catSalads"
  | "catSoups"
  | "catGeorgian"
  | "catSlavicFood"
  | "catSlavicSnacks"
  | "catMandi"
  | "catArabicGrill"
  | "catKebabs"
  | "catWraps"
  | "catDrinks"
> = {
  appetizers: "catAppetizers",
  "cold-plates": "catColdPlates",
  salads: "catSalads",
  soups: "catSoups",
  georgian: "catGeorgian",
  slavic: "catSlavicFood",
  "slavic-snacks": "catSlavicSnacks",
  mandi: "catMandi",
  "arabic-grill": "catArabicGrill",
  kebabs: "catKebabs",
  "fast-bites": "catWraps",
  drinks: "catDrinks",
};

function boardsFor(category: MenuCategory): string[] {
  return category.boards?.length ? category.boards : [category.board];
}

export function MenuSection() {
  const { t } = useLanguage();
  const categories = useMemo(() => MENU_CATEGORIES, []);
  const [activeId, setActiveId] = useState(categories[0]?.id ?? "appetizers");
  const viewerRef = useRef<HTMLElement>(null);
  const active = categories.find((c) => c.id === activeId) ?? categories[0];
  const activeBoards = active ? boardsFor(active) : [];
  const activeLabel = active ? t.menu[CAT_LABELS[active.id] ?? "catAppetizers"] : "";

  const scrollToViewer = useCallback(() => {
    if (typeof window === "undefined" || window.innerWidth >= 768) return;
    requestAnimationFrame(() => {
      viewerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  const selectCategory = useCallback(
    (id: string) => {
      setActiveId(id);
      scrollToViewer();
    },
    [scrollToViewer],
  );

  return (
    <section className="habibi-menu-section" id="menu" aria-labelledby="menu-heading">
      <div className="habibi-page__inner habibi-page__inner--menu-wide">
        <header className="habibi-page__header">
          <p className="habibi-page__eyebrow">{t.menu.eyebrow}</p>
          <h2 id="menu-heading" className="habibi-page__title">
            {t.menu.title}
          </h2>
          <p className="habibi-page__lead">{t.menu.lead}</p>
        </header>

        <div className="habibi-menu-browser">
          <nav className="habibi-menu-cats" aria-label="Menu categories">
            {MENU_GROUPS.map((group) => {
              const groupKey = GROUP_LABELS[group.label];
              const groupLabel = groupKey ? t.menu[groupKey] : group.label;
              return (
                <div key={group.label} className="habibi-menu-cats__group">
                  <p className="habibi-menu-cats__label">{groupLabel}</p>
                  <ul className="habibi-menu-cats__list">
                    {group.categories.map((cat) => (
                      <li key={cat.id}>
                        <CategoryButton
                          category={cat}
                          label={t.menu[CAT_LABELS[cat.id] ?? "catAppetizers"]}
                          active={cat.id === activeId}
                          onSelect={() => selectCategory(cat.id)}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </nav>

          {active && (
            <figure
              ref={viewerRef}
              className="habibi-menu-viewer"
              id="menu-viewer"
              aria-labelledby="menu-viewer-title"
            >
              <figcaption className="habibi-menu-viewer__title" id="menu-viewer-title">
                {activeLabel}
              </figcaption>
              <div
                className={`habibi-menu-viewer__frame${
                  activeBoards.length > 1 ? " habibi-menu-viewer__frame--stack" : ""
                }`}
              >
                {activeBoards.map((board, index) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={board}
                    src={board}
                    alt={
                      activeBoards.length > 1
                        ? `${activeLabel} (${index + 1}/${activeBoards.length})`
                        : activeLabel
                    }
                    className="habibi-menu-viewer__img"
                    decoding="async"
                  />
                ))}
              </div>
            </figure>
          )}
        </div>
      </div>
    </section>
  );
}

function CategoryButton({
  category,
  label,
  active,
  onSelect,
}: {
  category: MenuCategory;
  label: string;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      className={`habibi-menu-cats__btn${active ? " habibi-menu-cats__btn--active" : ""}`}
      onClick={onSelect}
      aria-current={active ? "true" : undefined}
    >
      {label}
    </button>
  );
}

/** @deprecated Use MenuSection on homepage */
export const MenuPageClient = MenuSection;
