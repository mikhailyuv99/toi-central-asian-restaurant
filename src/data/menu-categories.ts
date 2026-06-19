export type MenuCategory = {
  id: string;
  title: string;
  /** Primary board (also used when `boards` is set). */
  board: string;
  /** Extra boards for categories split across multiple pages (e.g. drinks). */
  boards?: string[];
};

export type MenuGroup = {
  label: string;
  categories: MenuCategory[];
};

/** Full-resolution sources only — no upscaled thumbnails. */
export const MENU_GROUPS: MenuGroup[] = [
  {
    label: "To start",
    categories: [
      { id: "appetizers", title: "Appetizers", board: "/menu-hd/appetizers.jpg" },
      { id: "cold-plates", title: "Cold Plates", board: "/menu-hd/cold-plates.jpg" },
      { id: "salads", title: "Salads & Sides", board: "/menu-hd/salads.jpg" },
      { id: "soups", title: "Soups", board: "/menu-hd/soups.jpg" },
    ],
  },
  {
    label: "Slavic",
    categories: [
      { id: "georgian", title: "Georgian Mains", board: "/menu-hd/georgian.jpg" },
      { id: "slavic", title: "Slavic Food", board: "/menu-hd/slavic-food.jpg" },
      { id: "slavic-snacks", title: "Slavic Snacks", board: "/menu-hd/slavic-snacks.jpg" },
    ],
  },
  {
    label: "Arabic",
    categories: [
      { id: "mandi", title: "Mandi & Kabsa", board: "/menu-hd/mandi.jpg" },
      { id: "arabic-grill", title: "Arabic Grill", board: "/menu-hd/arabic-grill.jpg" },
      { id: "kebabs", title: "Kebabs & Grill", board: "/menu-hd/kebabs.jpg" },
    ],
  },
  {
    label: "Quick & drinks",
    categories: [
      { id: "fast-bites", title: "Wraps & Bites", board: "/menu-hd/wraps.jpg" },
      { id: "drinks", title: "Drinks", board: "/menu-hd/drinks.jpg" },
    ],
  },
];

export const MENU_CATEGORIES: MenuCategory[] = MENU_GROUPS.flatMap((g) => g.categories);
