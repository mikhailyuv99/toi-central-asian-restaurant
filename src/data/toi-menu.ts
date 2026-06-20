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
        description: "Tomato, cucumber, napa cabbage, sesame dressing.",
        priceVnd: k(60),
      },
      {
        id: "salad-achichuk",
        nameEn: "Achichuk",
        nameRu: "Салат аччик-чучук",
        nameVi: "Salad Achichuk",
        description: "Tomato, onion, Central Asian spices.",
        priceVnd: k(35),
      },
      {
        id: "salad-warm-beef",
        nameEn: "Warm beef salad",
        nameRu: "Салат тёплый с говядиной",
        nameVi: "Salad bò xào ấm",
        description: "Beef, bell pepper, iceberg, arugula, balsamic.",
        priceVnd: k(180),
        popular: true,
      },
      {
        id: "salad-shirin",
        nameEn: "Shirin",
        nameRu: "Ширин",
        nameVi: "Shirin",
        description: "Eggplant, cream cheese, cherry tomato, cilantro, sweet chili.",
        priceVnd: k(120),
      },
      {
        id: "salad-caesar-shrimp",
        nameEn: "Caesar with shrimp",
        nameRu: "Цезарь с креветками",
        nameVi: "Salad Caesar với tôm",
        description: "Iceberg, cherry tomato, parmesan, shrimp, croutons, Caesar sauce.",
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
        description: "Beet soup, classic Slavic bowl.",
        priceVnd: k(140),
      },
      {
        id: "soup-shorpa",
        nameEn: "Shorpa",
        nameRu: "Шорпа",
        nameVi: "Súp thịt cừu và rau củ kiểu Trung Á",
        description: "Lamb and vegetable broth, Central Asian style.",
        priceVnd: k(150),
        popular: true,
      },
      {
        id: "soup-chicken-noodle",
        nameEn: "Chicken noodle soup",
        nameRu: "Суп куриный с лапшой",
        nameVi: "Súp gà với mì sợi",
        description: "Clear chicken broth with noodles.",
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
        description: "Steamed dumplings, beef and onion filling.",
        priceVnd: k(170),
        popular: true,
      },
      {
        id: "laghman-guyru",
        nameEn: "Guyru lagman",
        nameRu: "Лагман гуйру",
        nameVi: "Mì Lagman truyền thống",
        description: "Traditional pulled noodles with beef and vegetables.",
        priceVnd: k(175),
        popular: true,
      },
      {
        id: "laghman-tsomyan",
        nameEn: "Guyru tsomyan",
        nameRu: "Лагман гуйру цомян",
        nameVi: "Mì Lagman kéo tay kiểu Uyghur",
        description: "Hand-pulled Uyghur-style noodles, beef, peppers.",
        priceVnd: k(175),
      },
      {
        id: "laghman-lazru",
        nameEn: "Lazru lagman",
        nameRu: "Лазру лагман",
        nameVi: "Lazru lagman",
        description: "Lagman noodles, beef, bell pepper, onion, spices.",
        priceVnd: k(130),
      },
      {
        id: "laghman-ganban",
        nameEn: "Ganban tsomyan",
        nameRu: "Ганбан цомян",
        nameVi: "Ganban tsomyan",
        description: "Spicy fried noodles with beef, chili, vegetables.",
        priceVnd: k(135),
      },
      {
        id: "laghman-moshuru",
        nameEn: "Moshuru tsomyan",
        nameRu: "Мошуру цомян",
        nameVi: "Moshuru tsomyan",
        description: "Noodles with beef, wood ear mushroom, celery, cabbage.",
        priceVnd: k(140),
      },
      {
        id: "ganfan-beef",
        nameEn: "Ganfan with beef",
        nameRu: "Ганфан с говядиной и рисом",
        nameVi: "Ganphan cơm trắng với thịt bò",
        description: "White rice with stir-fried beef and Central Asian vegetables.",
        priceVnd: k(175),
      },
      {
        id: "plov-lamb",
        nameEn: "Lamb plov",
        nameRu: "Плов с ягненком",
        nameVi: "Cơm chiên với thịt cừu",
        description: "Central Asian rice with lamb, carrot, chickpeas, spices.",
        priceVnd: k(180),
        popular: true,
      },
      {
        id: "kazan-lamb",
        nameEn: "Kazan kebab (lamb)",
        nameRu: "Казан кебаб",
        nameVi: "Kazan kebab cừu",
        description: "Lamb, potato, onion, herbs in a clay pot.",
        priceVnd: k(170),
      },
      {
        id: "kazan-chicken",
        nameEn: "Kazan kebab (chicken)",
        nameRu: "Казан кебаб с курицей",
        nameVi: "Kazan kebab gà",
        description: "Chicken, potato, onion, herbs in a clay pot.",
        priceVnd: k(140),
      },
      {
        id: "griddle-beef",
        nameEn: "Beef on the griddle",
        nameRu: "Говядина на жаровне",
        nameVi: "Thịt bò trên chảo nóng",
        description: "Beef with vegetables on a hot griddle.",
        priceVnd: k(145),
      },
      {
        id: "griddle-chicken",
        nameEn: "Chicken on the griddle",
        nameRu: "Курица на жаровне",
        nameVi: "Thịt gà trên chảo nóng",
        description: "Chicken with vegetables on a hot griddle.",
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
        description: "Achichuk salad, flatbread, adjika.",
        priceVnd: k(270),
        popular: true,
      },
      {
        id: "shashlik-lamb-150",
        nameEn: "Lamb shashlik 150g",
        nameRu: "Шашлык из ягненка, 150г",
        nameVi: "Thịt cừu xiên 150g",
        description: "Marinated onion, adjika.",
        priceVnd: k(190),
      },
      {
        id: "shashlik-chicken-200",
        nameEn: "Chicken breast shashlik 200g",
        nameRu: "Шашлык из куриного филе, 200г",
        nameVi: "Thịt ức gà xiên 200g",
        description: "Marinated onion, adjika.",
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
        description: "Steamed rice portion.",
        priceVnd: k(50),
      },
      {
        id: "side-laghman-noodles",
        nameEn: "Lagman noodles",
        nameRu: "Лагманная лапша",
        nameVi: "Mì lagman",
        description: "Plain lagman noodle portion.",
        priceVnd: k(50),
      },
      {
        id: "side-potato",
        nameEn: "Potato wedges",
        nameRu: "Картофельные дольки",
        nameVi: "Khoai tây cắt miếng",
        description: "Crispy potato wedges.",
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
        description: "Traditional flatbread from the tandoor.",
        priceVnd: k(30),
      },
      {
        id: "samsa-beef",
        nameEn: "Beef samsa",
        nameRu: "Самса с говядиной",
        nameVi: "Samsa nhân bò",
        description: "Baked pastry with seasoned beef.",
        priceVnd: k(60),
        popular: true,
      },
      {
        id: "baursak",
        nameEn: "Baursak (5–6 pcs)",
        nameRu: "Баурсаки (5–6шт)",
        nameVi: "Bánh Baursak (5–6 cái)",
        description: "Fried dough balls, Central Asian tea snack.",
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
        description: "Honey layer cake.",
        priceVnd: k(100),
      },
      {
        id: "cheesecake",
        nameEn: "Cheesecake",
        nameRu: "Чизкейк",
        nameVi: "Bánh phô mai",
        description: "House cheesecake slice.",
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
        description: "House blend.",
        priceVnd: k(105),
      },
      {
        id: "tea-ginger",
        nameEn: "Ginger tea",
        nameRu: "Чай имбирный с медом",
        nameVi: "Trà gừng",
        description: "Ginger and honey.",
        priceVnd: k(105),
      },
      {
        id: "ayran",
        nameEn: "Ayran",
        nameRu: "Айран",
        nameVi: "Sữa chua mặn kiểu Trung Á",
        description: "Savory yogurt drink.",
        priceVnd: k(50),
      },
      {
        id: "kompot",
        nameEn: "Kompot",
        nameRu: "Компот",
        nameVi: "Nước trái cây hầm",
        description: "Stewed fruit drink.",
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
