const MAPS = "/photos/maps";

/** Dish name → TOI Maps photo. No SVG placeholders. */
const DISH_PHOTOS: Record<string, string> = {
  Manti: `${MAPS}/photo-12.jpg`,
  Samsa: `${MAPS}/photo-38.jpg`,
  "Lamb Shashlik": `${MAPS}/photo-62.jpg`,
  "Kazan Kebab": `${MAPS}/photo-68.jpg`,
  Laghman: `${MAPS}/photo-5.jpg`,
  Plov: `${MAPS}/photo-32.jpg`,
  Shorpa: `${MAPS}/photo-42.jpg`,
  Baursak: `${MAPS}/photo-52.jpg`,
};

export function getDishPhoto(name: string, fallback?: string): string {
  return DISH_PHOTOS[name] ?? fallback ?? `${MAPS}/photo-1.jpg`;
}
