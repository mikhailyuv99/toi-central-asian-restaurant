const MAPS = "/photos/maps";

/** TOI Google Maps scrape photos only. */
export const heroImage = `${MAPS}/photo-2.jpg`;

export const dishThumbs = [
  { src: `${MAPS}/photo-12.jpg`, alt: "Manti", name: "Manti", price: "60,000₫ / piece" },
  { src: `${MAPS}/photo-38.jpg`, alt: "Samsa", name: "Samsa", price: null },
  { src: `${MAPS}/photo-62.jpg`, alt: "Lamb shashlik", name: "Lamb Shashlik", price: "280,000₫" },
] as const;
