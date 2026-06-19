/** Dish name → photo path. Swap .svg for .jpg when real photos are in /public/photos/ */
export const DISH_PHOTOS: Record<string, string> = {
  "Lamb Shashlik": "/photos/photo-2.svg",
  "Kazan Kebab": "/photos/photo-5.svg",
  "Steamed Salmon Filled": "/photos/photo-3.svg",
  "Stuffed Bell Pepper": "/photos/photo-4.svg",
  Khinkali: "/photos/photo-1.svg",
  Pelmeni: "/photos/photo-2.svg",
  Borscht: "/photos/photo-3.svg",
  Khachapuri: "/photos/photo-4.svg",
  Cheburek: "/photos/photo-5.svg",
  "Eggplant Rolls": "/photos/photo-1.svg",
  "Chicken Kebab Platter": "/photos/photo-2.svg",
  "Meze Platter": "/photos/photo-3.svg",
  "Chicken Shawarma Wrap": "/photos/photo-4.svg",
  "Mixed Grill": "/photos/photo-5.svg",
  "Olivier Salad": "/photos/photo-1.svg",
  "Seafood Salad": "/photos/photo-3.svg",
};

export function dishPhoto(name: string, fallback?: string): string {
  return DISH_PHOTOS[name] ?? fallback ?? "/photos/photo-1.svg";
}
