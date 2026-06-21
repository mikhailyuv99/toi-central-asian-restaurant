/**
 * TOI printed menu — deduplicated from owner photos (Jun 2026).
 * When two prices differed, kept the dark-board / most recent listing.
 * Menu board images are NOT used on site — data only.
 */

export type ToiMenuItem = {
  id: string;
  nameEn: string;
  nameRu?: string;
  nameVi?: string;
  description: string;
  priceVnd: number;
  popular?: boolean;
};

export type ToiMenuCategory = {
  id: string;
  titleEn: string;
  titleRu: string;
  titleVi: string;
  items: ToiMenuItem[];
};

function k(n: number): number {
  return n * 1000;
}

export const TOI_MENU: ToiMenuCategory[] = [
  {
    id: "salads",
    titleEn: "Salads",
    titleRu: "Салаты",
    titleVi: "Salad",
    items: [
      {
        id: "salad-fresh",
        nameEn: "Fresh salad",
        nameRu: "Салат свежий с кунжутной заправкой",
        nameVi: "Salad tươi với nước sốt mè rang",
        description: "Tomatoes, cucumber, napa cabbage, sesame dressing. Light and clean.",
        priceVnd: k(60),
      },
      {
        id: "salad-achichuk",
        nameEn: "Achichuk",
        nameRu: "Салат аччик-чучук",
        nameVi: "Salad Achichuk",
        description: "Sliced tomato and onion with Central Asian spices. The classic side, and it earns it.",
        priceVnd: k(35),
      },
      {
        id: "salad-warm-beef",
        nameEn: "Warm beef salad",
        nameRu: "Салат тёплый с говядиной",
        nameVi: "Salad bò xào ấm",
        description: "Stir-fried beef with bell pepper, iceberg, arugula, balsamic. Closer to a small main.",
        priceVnd: k(180),
        popular: true,
      },
      {
        id: "salad-shirin",
        nameEn: "Shirin",
        nameRu: "Ширин",
        nameVi: "Shirin",
        description: "Crispy eggplant, cream cheese, cherry tomato, cilantro, sweet chili. The one vegetarians come back for.",
        priceVnd: k(120),
      },
      {
        id: "salad-caesar-shrimp",
        nameEn: "Caesar with shrimp",
        nameRu: "Цезарь с креветками",
        nameVi: "Salad Caesar với tôm",
        description: "Iceberg, cherry tomato, parmesan, shrimp, croutons, house Caesar. Familiar done properly.",
        priceVnd: k(130),
      },
    ],
  },
  {
    id: "soups",
    titleEn: "Soups",
    titleRu: "Супы",
    titleVi: "Súp",
    items: [
      {
        id: "soup-borscht",
        nameEn: "Borscht",
        nameRu: "Борщ",
        nameVi: "Súp củ cải đỏ",
        description: "The Slavic classic. Deep red beet soup, full and warming.",
        priceVnd: k(140),
      },
      {
        id: "soup-shorpa",
        nameEn: "Shorpa",
        nameRu: "Шорпа",
        nameVi: "Súp thịt cừu và rau củ kiểu Trung Á",
        description: "Lamb broth with vegetables, Central Asian style. The soup people order twice in one sitting.",
        priceVnd: k(150),
        popular: true,
      },
      {
        id: "soup-chicken-noodle",
        nameEn: "Chicken noodle soup",
        nameRu: "Суп куриный с лапшой",
        nameVi: "Súp gà với mì sợi",
        description: "Clear chicken broth with noodles. Simple, honest, exactly what it sounds like.",
        priceVnd: k(100),
      },
    ],
  },
  {
    id: "mains",
    titleEn: "Main dishes",
    titleRu: "Горячие блюда",
    titleVi: "Món chính",
    items: [
      {
        id: "manti-beef",
        nameEn: "Beef manti (5 pcs)",
        nameRu: "Манты с говядиной (5 шт)",
        nameVi: "Há cảo nhân bò (5 cái)",
        description: "Steamed dumplings, beef and onion. Served with sour cream. These are the ones people keep talking about.",
        priceVnd: k(170),
        popular: true,
      },
      {
        id: "laghman-guyru",
        nameEn: "Guyru lagman",
        nameRu: "Лагман гуйру",
        nameVi: "Mì Lagman truyền thống",
        description: "Traditional hand-pulled noodles with beef and vegetables. The dish that made Central Asia famous for noodles.",
        priceVnd: k(175),
        popular: true,
      },
      {
        id: "laghman-tsomyan",
        nameEn: "Guyru tsomyan",
        nameRu: "Лагман гуйру цомян",
        nameVi: "Mì Lagman kéo tay kiểu Uyghur",
        description: "Hand-pulled Uyghur-style noodles, stir-fried with beef and peppers. Same base, different character — drier, with more wok heat.",
        priceVnd: k(175),
      },
      {
        id: "laghman-lazru",
        nameEn: "Lazru lagman",
        nameRu: "Лазру лагман",
        nameVi: "Lazru lagman",
        description: "Lagman noodles with beef, bell pepper, onion, spices. The everyday version, still very good.",
        priceVnd: k(130),
      },
      {
        id: "laghman-ganban",
        nameEn: "Ganban tsomyan",
        nameRu: "Ганбан цомян",
        nameVi: "Ganban tsomyan",
        description: "Spicy fried noodles with beef and chili. Order this if you want something with some heat.",
        priceVnd: k(135),
      },
      {
        id: "laghman-moshuru",
        nameEn: "Moshuru tsomyan",
        nameRu: "Мошуру цомян",
        nameVi: "Moshuru tsomyan",
        description: "Noodles with beef, wood ear mushroom, celery, cabbage. The quiet one on the menu. Worth trying.",
        priceVnd: k(140),
      },
      {
        id: "ganfan-beef",
        nameEn: "Ganfan with beef",
        nameRu: "Ганфан с говядиной и рисом",
        nameVi: "Ganphan cơm trắng với thịt bò",
        description: "White rice with stir-fried beef and Central Asian vegetables. Simple, filling, underrated.",
        priceVnd: k(175),
      },
      {
        id: "plov-lamb",
        nameEn: "Lamb plov",
        nameRu: "Плов с ягненком",
        nameVi: "Cơm chiên với thịt cừu",
        description: "The rice dish Central Asia built its reputation on. Lamb, carrot, chickpeas, spices. Not greasy, not dry.",
        priceVnd: k(180),
        popular: true,
      },
      {
        id: "kazan-lamb",
        nameEn: "Kazan kebab (lamb)",
        nameRu: "Казан кебаб",
        nameVi: "Kazan kebab cừu",
        description: "Lamb, potato, onion, and herbs cooked in a clay pot. The kind of dish that makes the table go quiet.",
        priceVnd: k(170),
      },
      {
        id: "kazan-chicken",
        nameEn: "Kazan kebab (chicken)",
        nameRu: "Казан кебаб с курицей",
        nameVi: "Kazan kebab gà",
        description: "Same clay pot treatment, chicken. Slightly lighter, just as good.",
        priceVnd: k(140),
      },
      {
        id: "griddle-beef",
        nameEn: "Beef on the griddle",
        nameRu: "Говядина на жаровне",
        nameVi: "Thịt bò trên chảo nóng",
        description: "Beef and vegetables on a hot griddle, served sizzling.",
        priceVnd: k(145),
      },
      {
        id: "griddle-chicken",
        nameEn: "Chicken on the griddle",
        nameRu: "Курица на жаровне",
        nameVi: "Thịt gà trên chảo nóng",
        description: "Chicken version. Quick, clean, satisfying.",
        priceVnd: k(130),
      },
    ],
  },
  {
    id: "grill",
    titleEn: "Grill",
    titleRu: "Гриль",
    titleVi: "Món nướng",
    items: [
      {
        id: "shashlik-lamb-200",
        nameEn: "Lamb shashlik 200g",
        nameRu: "Шашлык из ягненка, 200г",
        nameVi: "Thịt cừu xiên 200g",
        description: "Marinated lamb skewers with achichuk salad, flatbread, adjika. The full portion.",
        priceVnd: k(270),
        popular: true,
      },
      {
        id: "shashlik-lamb-150",
        nameEn: "Lamb shashlik 150g",
        nameRu: "Шашлык из ягненка, 150г",
        nameVi: "Thịt cừu xiên 150g",
        description: "Same lamb, smaller plate. Comes with marinated onion and adjika.",
        priceVnd: k(190),
      },
      {
        id: "shashlik-chicken-200",
        nameEn: "Chicken breast shashlik 200g",
        nameRu: "Шашлык из куриного филе, 200г",
        nameVi: "Thịt ức gà xiên 200g",
        description: "Grilled chicken fillet, marinated, served with onion and adjika.",
        priceVnd: k(155),
      },
    ],
  },
  {
    id: "sides",
    titleEn: "Sides",
    titleRu: "Гарниры",
    titleVi: "Món phụ",
    items: [
      {
        id: "side-rice",
        nameEn: "Rice",
        nameRu: "Рис",
        nameVi: "Cơm",
        description: "Steamed portion.",
        priceVnd: k(50),
      },
      {
        id: "side-laghman-noodles",
        nameEn: "Lagman noodles",
        nameRu: "Лагманная лапша",
        nameVi: "Mì lagman",
        description: "Plain lagman noodles, good alongside most mains.",
        priceVnd: k(50),
      },
      {
        id: "side-potato",
        nameEn: "Potato wedges",
        nameRu: "Картофельные дольки",
        nameVi: "Khoai tây cắt miếng",
        description: "Crispy wedges. The kids' table favourite and the adults' secret order.",
        priceVnd: k(70),
      },
    ],
  },
  {
    id: "bakery",
    titleEn: "Bakery",
    titleRu: "Выпечка",
    titleVi: "Bánh",
    items: [
      {
        id: "lepyoshka",
        nameEn: "Lepyoshka",
        nameRu: "Лепешка",
        nameVi: "Bánh mì dẹt nướng",
        description: "Flatbread from the tandoor. Comes out warm. Get one with your soup.",
        priceVnd: k(30),
      },
      {
        id: "samsa-beef",
        nameEn: "Beef samsa",
        nameRu: "Самса с говядиной",
        nameVi: "Samsa nhân bò",
        description: "Baked pastry filled with seasoned beef. Sesame on top, flaky through and through.",
        priceVnd: k(60),
        popular: true,
      },
      {
        id: "baursak",
        nameEn: "Baursak (5–6 pcs)",
        nameRu: "Баурсаки (5–6шт)",
        nameVi: "Bánh Baursak (5–6 cái)",
        description: "Fried dough balls, soft inside, golden out. A Central Asian tea table staple. Order with kaymak if it's available.",
        priceVnd: k(40),
      },
    ],
  },
  {
    id: "desserts",
    titleEn: "Desserts",
    titleRu: "Десерты",
    titleVi: "Tráng miệng",
    items: [
      {
        id: "medovik",
        nameEn: "Medovik",
        nameRu: "Медовик",
        nameVi: "Bánh mật ong",
        description: "Russian honey layer cake. Slice by slice it disappears. The table ordered it twice, in Aigerim's words.",
        priceVnd: k(100),
      },
      {
        id: "cheesecake",
        nameEn: "Cheesecake",
        nameRu: "Чизкейк",
        nameVi: "Bánh phô mai",
        description: "House-made slice. Clean finish to a heavy meal.",
        priceVnd: k(120),
      },
    ],
  },
  {
    id: "drinks",
    titleEn: "Drinks",
    titleRu: "Напитки",
    titleVi: "Đồ uống",
    items: [
      {
        id: "tea-black",
        nameEn: "Black tea",
        nameRu: "Чай черный",
        nameVi: "Trà đen",
        description: "Pot for the table.",
        priceVnd: k(95),
      },
      {
        id: "tea-green",
        nameEn: "Green tea",
        nameRu: "Чай зеленый",
        nameVi: "Trà xanh",
        description: "Pot for the table.",
        priceVnd: k(95),
      },
      {
        id: "tea-tashkent",
        nameEn: "Tashkent tea",
        nameRu: "Чай Ташкентский",
        nameVi: "Trà Tashkent",
        description: "House blend. The one to try if you're asking.",
        priceVnd: k(105),
      },
      {
        id: "tea-ginger",
        nameEn: "Ginger tea",
        nameRu: "Чай имбирный с медом",
        nameVi: "Trà gừng",
        description: "Ginger and honey. Order this if the AC got to you.",
        priceVnd: k(105),
      },
      {
        id: "ayran",
        nameEn: "Ayran",
        nameRu: "Айран",
        nameVi: "Sữa chua mặn kiểu Trung Á",
        description: "Savory yogurt drink. Cold, tangy, pairs with everything on this menu.",
        priceVnd: k(50),
      },
      {
        id: "kompot",
        nameEn: "Kompot",
        nameRu: "Компот",
        nameVi: "Nước trái cây hầm",
        description: "Stewed fruit drink. Cold. The right answer in Đà Nẵng heat.",
        priceVnd: k(50),
      },
    ],
  },
];

/** Flat list for order page */
export const TOI_ORDER_CATEGORIES = TOI_MENU.map((cat) => ({
  id: cat.id,
  title: cat.titleEn,
  items: cat.items.map((item) => ({
    id: item.id,
    name: item.nameEn,
    description: item.description,
    priceVnd: item.priceVnd,
    popular: item.popular,
  })),
}));

export const TOI_MENU_ITEM_COUNT = TOI_MENU.reduce((n, c) => n + c.items.length, 0);
