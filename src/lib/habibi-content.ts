/** Only assets sharp enough to show small. No full-bleed with these files. */

/** Best file size / detail — shashlik service shot */
export const heroImage = "/photos/photo-2.jpg";

/** Shown at ~280px wide max in the menu row */
export const dishThumbs = [
  { src: "/photos/owner/khinkali.jpg", alt: "Khinkali", name: "Khinkali", price: "60,000₫ / piece" },
  { src: "/photos/owner/meze-platter.jpg", alt: "Meze platter", name: "Meze", price: null },
  { src: "/photos/photo-2.jpg", alt: "Lamb shashlik", name: "Lamb Shashlik", price: "280,000₫" },
] as const;
