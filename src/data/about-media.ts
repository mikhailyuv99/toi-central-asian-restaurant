/** 18 verified TOI Google Maps photos — storefront, KZ interior, food only. No avatars. */
export type AboutPhoto = { src: string; alt: string };

const MAPS = "/photos/maps";

export const ABOUT_CAROUSEL_ROWS: {
  id: string;
  direction: "ltr" | "rtl";
  items: AboutPhoto[];
}[] = [
  {
    id: "row-storefront",
    direction: "ltr",
    items: [
      { src: `${MAPS}/photo-22.jpg`, alt: "TOI storefront at night" },
      { src: `${MAPS}/photo-35.jpg`, alt: "TOI dining room with Kazakhstan flag" },
      { src: `${MAPS}/photo-15.jpg`, alt: "Plov, laghman, manti and baursak" },
      { src: `${MAPS}/photo-2.jpg`, alt: "Lagman, shorpa and manti" },
      { src: `${MAPS}/photo-10.jpg`, alt: "Samsa pastry" },
      { src: `${MAPS}/photo-20.jpg`, alt: "Baursak and tea" },
    ],
  },
  {
    id: "row-food-b",
    direction: "rtl",
    items: [
      { src: `${MAPS}/photo-50.jpg`, alt: "Shorpa with non bread" },
      { src: `${MAPS}/photo-90.jpg`, alt: "Plov with achichuk salad" },
      { src: `${MAPS}/photo-4.jpg`, alt: "Table spread" },
      { src: `${MAPS}/photo-7.jpg`, alt: "Grilled skewers" },
      { src: `${MAPS}/photo-8.jpg`, alt: "Shared plates" },
      { src: `${MAPS}/photo-11.jpg`, alt: "House specialties" },
    ],
  },
  {
    id: "row-room",
    direction: "ltr",
    items: [
      { src: `${MAPS}/photo-14.jpg`, alt: "Guest table" },
      { src: `${MAPS}/photo-16.jpg`, alt: "Dining room" },
      { src: `${MAPS}/photo-17.jpg`, alt: "Interior detail" },
      { src: `${MAPS}/photo-19.jpg`, alt: "Evening atmosphere" },
      { src: `${MAPS}/photo-23.jpg`, alt: "Counter service" },
      { src: `${MAPS}/photo-21.jpg`, alt: "Restaurant interior" },
    ],
  },
];

export function assertAboutPhotosUnique(rows = ABOUT_CAROUSEL_ROWS) {
  const paths = rows.flatMap((row) => row.items.map((item) => item.src));
  const seen = new Set<string>();
  for (const path of paths) {
    if (!path.startsWith(`${MAPS}/`)) {
      throw new Error(`About photo must be from TOI Maps scrape: ${path}`);
    }
    if (seen.has(path)) throw new Error(`Duplicate about photo path: ${path}`);
    seen.add(path);
  }
  if (paths.length !== 18) throw new Error(`Expected 18 about photos, got ${paths.length}`);
}

assertAboutPhotosUnique();
