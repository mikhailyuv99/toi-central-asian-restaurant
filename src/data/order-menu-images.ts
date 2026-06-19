/**
 * Order menu thumbnails — each path must match the named dish exactly.
 * Sources: owner/telegram photography, verified table shots, and crops from menu-hd boards.
 */

const DISH = (id: string) => `/photos/dishes/${id}.jpg`;
const STOCK = (id: string) => `/photos/stock/${id}.jpg`;

export const ORDER_ITEM_IMAGES: Record<string, string> = {
  // Appetizers
  olivier: "/photos/owner/olivier-salad.jpg",
  hummus: DISH("hummus"),
  mutabel: DISH("mutabel"),
  fattoush: DISH("fattoush"),

  // Cold plates
  "mixed-cold": DISH("mixed-cold"),
  "green-salad": DISH("green-salad"),
  tabbouleh: DISH("tabbouleh"),
  falafel: DISH("falafel"),

  // Salads & sides
  "shrimp-avocado": "/photos/telegram/dish-11.jpg",
  "seafood-salad": "/photos/owner/seafood-salad.jpg",
  "napa-cabbage": DISH("napa-cabbage"),
  "homemade-potatoes": DISH("homemade-potatoes"),
  "french-fries": STOCK("french-fries"),

  // Soups
  "lamb-soup": STOCK("lamb-soup"),
  "lentil-soup": STOCK("lentil-soup"),
  "borscht-half": "/photos/owner/borscht.jpg",
  "borscht-full": "/photos/owner/borscht.jpg",
  "couscous-chicken": STOCK("couscous-chicken"),

  // Georgian mains
  "steamed-salmon": "/photos/photo-19.jpg",
  "kazan-kebab": "/photos/owner/kazan-chicken.jpg",
  "stuffed-pepper-1": "/photos/owner/stuffed-pepper.jpg",
  "stuffed-pepper-2": "/photos/owner/stuffed-pepper.jpg",
  khinkali: "/photos/owner/khinkali.jpg",

  // Slavic food
  "chebureki-chicken": "/photos/owner/cheburek.jpg",
  "chebureki-beef": "/photos/owner/cheburek.jpg",
  "vareniki-potato": "/photos/owner/pelmeni.jpg",
  "vareniki-cottage": "/photos/owner/pelmeni.jpg",

  // Slavic snacks
  "piroshki-potato": DISH("piroshki-potato"),
  "piroshki-chicken": DISH("piroshki-chicken"),
  "piroshki-cheese": DISH("piroshki-cheese"),
  "falafel-wrap": STOCK("falafel-wrap"),
  "zucchini-rolls": DISH("zucchini-rolls"),

  // Mandi & kabsa
  "mandi-chicken-thigh": DISH("mandi-chicken-thigh"),
  "mandi-half-chicken": DISH("mandi-half-chicken"),
  "mandi-lamb": DISH("mandi-lamb"),

  // Arabic grill
  "mix-grill-l": DISH("mix-grill-l"),
  "mix-grill-xl": DISH("mix-grill-xl"),
  "lamb-shashlik": DISH("lamb-shashlik"),
  "eggplant-kebab": DISH("eggplant-kebab"),

  // Kebabs & grill
  "chicken-shish": DISH("chicken-shish"),
  "lamb-kebab": STOCK("lamb-kebab"),
  "chicken-kebab": DISH("chicken-kebab"),
  "chicken-wings": STOCK("chicken-wings"),

  // Wraps & bites
  "gyros-wrap": STOCK("gyros-wrap"),
  "placinta-apple": STOCK("placinta-apple"),
  "placinta-potato": STOCK("placinta-potato"),
  "placinta-mozzarella": STOCK("placinta-mozzarella"),
  "placinta-cottage": STOCK("placinta-cottage"),

  // Drinks
  "karak-chai": STOCK("karak-chai"),
  cappuccino: STOCK("cappuccino"),
  espresso: STOCK("espresso"),
};

export function getOrderItemImage(itemId: string): string | null {
  return ORDER_ITEM_IMAGES[itemId] ?? null;
}
