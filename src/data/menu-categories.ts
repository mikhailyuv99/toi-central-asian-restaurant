export type MenuCategory = {
  id: string;
  title: string;
  board: string;
  boards?: string[];
};

export type MenuGroup = {
  label: string;
  categories: MenuCategory[];
};

const MAPS = "/photos/maps";

/** TOI Google Maps scrape photos only. */
export const MENU_GROUPS: MenuGroup[] = [
  {
    label: "Mains",
    categories: [
      { id: "laghman", title: "Laghman", board: `${MAPS}/photo-5.jpg` },
      { id: "plov", title: "Plov", board: `${MAPS}/photo-50.jpg` },
    ],
  },
  {
    label: "Dumplings & pastry",
    categories: [
      { id: "manti", title: "Manti", board: `${MAPS}/photo-40.jpg` },
      { id: "samsa", title: "Samsa", board: `${MAPS}/photo-35.jpg` },
    ],
  },
  {
    label: "Soups & tea",
    categories: [
      { id: "shorpa", title: "Shorpa", board: `${MAPS}/photo-10.jpg` },
      { id: "baursak", title: "Baursak & tea", board: `${MAPS}/photo-30.jpg` },
    ],
  },
];

export const MENU_CATEGORIES: MenuCategory[] = MENU_GROUPS.flatMap((g) => g.categories);
