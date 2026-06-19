export type MenuDish = {
  id: string;
  name: string;
  description: string;
  price: string;
  board: string;
};

export type MenuCategory = {
  id: string;
  title: string;
  board: string;
  dishes: MenuDish[];
};

export const FULL_MENU: MenuCategory[] = [
  {
    id: "georgian",
    title: "Georgian & Slavic Mains",
    board: "/menu/board-24.webp",
    dishes: [
      {
        id: "steamed-salmon",
        name: "Steamed Salmon Fillet",
        description:
          "Salmon fillet with green salad, egg, and mayonnaise.",
        price: "150K",
        board: "/menu/board-24.webp",
      },
      {
        id: "kazan-kebab",
        name: "Kazan Kebab",
        description:
          "Tender meat and golden fried potatoes slow-cooked with onion and eggplant in a clay pot. Seasoned with salt, black pepper, cumin, coriander, and bell pepper.",
        price: "190K",
        board: "/menu/board-24.webp",
      },
      {
        id: "stuffed-bell-pepper",
        name: "Stuffed Bell Pepper",
        description:
          "Minced meat mixed with basmati rice, onion, tomato, and black pepper.",
        price: "100K (1 pc) · 190K (2 pc)",
        board: "/menu/board-24.webp",
      },
      {
        id: "khinkali",
        name: "Khinkali",
        description:
          "Traditional Georgian dumplings with pleated dough. Fillings: meat and herbs; chicken, mushroom and cream; mushroom with cream; salmon with cream; spinach, cheese and cream.",
        price: "60K / piece",
        board: "/menu/board-24.webp",
      },
    ],
  },
  {
    id: "slavic",
    title: "Slavic Food",
    board: "/menu/board-04.webp",
    dishes: [
      {
        id: "chebureki",
        name: "Chebureki Chicken / Beef",
        description: "Golden fried pockets. Choose chicken or beef filling.",
        price: "50K chicken · 60K beef / pc",
        board: "/menu/board-04.webp",
      },
      {
        id: "vareniki",
        name: "Vareniki Potato / Cottage Cheese",
        description: "Tender dumplings with creamy potato or cottage cheese. Served with yoghurt.",
        price: "75K potato · 100K cottage cheese",
        board: "/menu/board-04.webp",
      },
      {
        id: "borscht",
        name: "Borscht Soup with Beef",
        description:
          "Hearty beetroot soup simmered with vegetables and stew beef. Served with bread.",
        price: "80K half · 120K full",
        board: "/menu/board-04.webp",
      },
    ],
  },
  {
    id: "slavic-snacks",
    title: "Slavic Snacks",
    board: "/menu/board-18.webp",
    dishes: [
      {
        id: "piroshki",
        name: "Piroshki",
        description: "Golden fried pockets. Potato, cheese, or chicken filling.",
        price: "45K potato · 55K chicken · 65K cheese",
        board: "/menu/board-18.webp",
      },
      {
        id: "falafel-wrap",
        name: "Falafel Vegan Wrap",
        description: "Falafel fritters with fries and pickles in a grilled wrap.",
        price: "100K",
        board: "/menu/board-18.webp",
      },
      {
        id: "zucchini",
        name: "Zucchini Rolls",
        description: "Grilled zucchini filled with cream cheese and chopped garlic.",
        price: "80K",
        board: "/menu/board-18.webp",
      },
    ],
  },
  {
    id: "mandi",
    title: "Arabic Mandi & Kabsa",
    board: "/menu/board-22.webp",
    dishes: [
      {
        id: "mandi-chicken-thigh",
        name: "Chicken Mandi or Kabsa with Full Thigh",
        description: "Yemeni-style rice with a full roasted chicken thigh.",
        price: "120K",
        board: "/menu/board-22.webp",
      },
      {
        id: "mandi-half-chicken",
        name: "Kabsa or Mandi Half Grilled Chicken",
        description: "Half chicken char-grilled after a fragrant spice marinade. Served over rice.",
        price: "210K",
        board: "/menu/board-22.webp",
      },
      {
        id: "mandi-lamb",
        name: "Mandi or Kabsa Rice with Lamb",
        description: "Pressure-cooked lamb with a Yemeni spice blend over basmati rice.",
        price: "300K",
        board: "/menu/board-22.webp",
      },
    ],
  },
  {
    id: "arabic-grill",
    title: "Arabic Grill",
    board: "/menu/board-06.webp",
    dishes: [
      {
        id: "mix-grill",
        name: "Mix Grill",
        description:
          "Combination of kebab options on one platter. Serves 2 adults. Rice, salad, flatbread, and sauce.",
        price: "350K (L) · 650K (XL)",
        board: "/menu/board-06.webp",
      },
      {
        id: "lamb-shashlik",
        name: "Lamb Shashlik",
        description:
          "Marinated lamb on skewers, charred over open flame and served on flatbread with rice and salad.",
        price: "280K",
        board: "/menu/board-06.webp",
      },
      {
        id: "eggplant-kebab",
        name: "Eggplant Kebab",
        description: "Lamb kebab paired with charred eggplant on flatbread. Rice and salad on the side.",
        price: "260K",
        board: "/menu/board-06.webp",
      },
    ],
  },
  {
    id: "kebabs",
    title: "Kebabs & Grill",
    board: "/menu/board-08.webp",
    dishes: [
      {
        id: "chicken-shish",
        name: "Chicken Shish",
        description: "Marinated chicken skewers with rice and salad.",
        price: "185K",
        board: "/menu/board-08.webp",
      },
      {
        id: "lamb-kebab",
        name: "Lamb Kebab",
        description: "Minced lamb kebab roasted over charcoal. Rice and salad.",
        price: "280K",
        board: "/menu/board-08.webp",
      },
      {
        id: "chicken-kebab",
        name: "Chicken Kebab",
        description: "Minced chicken kebab with rice and salad.",
        price: "185K",
        board: "/menu/board-08.webp",
      },
      {
        id: "chicken-wings",
        name: "Chicken Wings",
        description: "Marinated wings grilled with seasonal spices. Rice, salad, and garlic sauce.",
        price: "170K",
        board: "/menu/board-08.webp",
      },
    ],
  },
  {
    id: "appetizers",
    title: "Appetizers",
    board: "/menu/board-16.webp",
    dishes: [
      {
        id: "olivier",
        name: "Olivier Salad",
        description:
          "Diced potatoes, carrots, peas, pickles, egg, and chicken in a creamy mayonnaise dressing.",
        price: "100K",
        board: "/menu/board-16.webp",
      },
      {
        id: "hummus",
        name: "Hummus with Arabic Bread",
        description: "Chickpeas, tahini, lemon, and garlic. Served with warm in-house Arabic bread.",
        price: "130K",
        board: "/menu/board-16.webp",
      },
      {
        id: "mutabel",
        name: "Mutabel with Arabic Bread",
        description: "Smoky roasted eggplant dip with tahini, garlic, and lemon. Warm bread for dipping.",
        price: "100K",
        board: "/menu/board-16.webp",
      },
      {
        id: "fattoush",
        name: "Fattoush Salad",
        description: "Lettuce, tomatoes, cucumbers, onions, crispy bread croutons, pomegranate sauce.",
        price: "120K",
        board: "/menu/board-16.webp",
      },
    ],
  },
  {
    id: "cold-plates",
    title: "Cold Plates",
    board: "/menu/board-07.webp",
    dishes: [
      {
        id: "mixed-cold",
        name: "Mixed Cold Appetizer",
        description:
          "Green salad, tabbouleh, hummus, mutabel. Choose Russian salad or falafel on the side.",
        price: "200K",
        board: "/menu/board-07.webp",
      },
      {
        id: "green-salad",
        name: "Green Salad",
        description: "Curly lettuce, tomatoes, cucumbers, onion, parsley. Olive oil dressing.",
        price: "90K",
        board: "/menu/board-07.webp",
      },
      {
        id: "tabbouleh",
        name: "Tabbouleh Salad",
        description: "Parsley, chopped tomatoes, white onions, light olive oil dressing.",
        price: "100K",
        board: "/menu/board-07.webp",
      },
      {
        id: "falafel",
        name: "Falafel (5 pieces)",
        description: "Chickpea fritters with herbs and spices. Crispy outside, soft inside.",
        price: "100K",
        board: "/menu/board-07.webp",
      },
    ],
  },
  {
    id: "salads",
    title: "Salads & Sides",
    board: "/menu/board-14.webp",
    dishes: [
      {
        id: "shrimp-avocado",
        name: "Shrimp and Avocado Salad",
        description:
          "Arugula, cherry tomatoes, boiled egg, avocado, grilled shrimp, lemon, olive oil.",
        price: "150K",
        board: "/menu/board-14.webp",
      },
      {
        id: "seafood-salad",
        name: "Seafood Salad",
        description: "Shrimp, crab stick, egg, corn, mayonnaise.",
        price: "100K",
        board: "/menu/board-14.webp",
      },
      {
        id: "napa-cabbage",
        name: "Napa Cabbage Salad",
        description: "Napa cabbage with mayonnaise, egg, and green onion.",
        price: "70K",
        board: "/menu/board-14.webp",
      },
      {
        id: "homemade-potatoes",
        name: "Homemade Potatoes",
        description: "Golden crispy potato wedges with garlic and dill.",
        price: "75K",
        board: "/menu/board-14.webp",
      },
    ],
  },
  {
    id: "soups",
    title: "Soups",
    board: "/menu/board-25.webp",
    dishes: [
      {
        id: "lamb-soup",
        name: "Lamb Soup",
        description: "Tender lamb in a broth seasoned with Arabian spices.",
        price: "170K",
        board: "/menu/board-25.webp",
      },
      {
        id: "lentil-soup",
        name: "Lentil Soup",
        description: "Hearty lentil soup with vegetables, herbs, cumin, and lemon. Served with pita chips.",
        price: "110K",
        board: "/menu/board-25.webp",
      },
      {
        id: "couscous-chicken",
        name: "Couscous with Chicken Breast",
        description: "North African couscous with breaded fried chicken breast.",
        price: "220K",
        board: "/menu/board-25.webp",
      },
    ],
  },
  {
    id: "fast-bites",
    title: "Wraps & Fast Bites",
    board: "/menu/board-12.webp",
    dishes: [
      {
        id: "gyros-wrap",
        name: "Gyros Wrap",
        description: "Potato fries, lettuce, pickles, and tomatoes.",
        price: "130K",
        board: "/menu/board-12.webp",
      },
      {
        id: "placinta-apple",
        name: "Placinta Apple",
        description: "Romanian flaky pastry with apple filling.",
        price: "120K",
        board: "/menu/board-12.webp",
      },
      {
        id: "placinta-potato",
        name: "Placinta Potato",
        description: "Flaky pastry with seasoned potato filling.",
        price: "90K",
        board: "/menu/board-12.webp",
      },
      {
        id: "placinta-mozzarella",
        name: "Placinta Mozzarella",
        description: "Cheesy pastry with mozzarella and feta.",
        price: "120K",
        board: "/menu/board-12.webp",
      },
      {
        id: "placinta-cheese-potato",
        name: "Placinta Cheese & Potato",
        description: "Cheese and potato with dill and green onion.",
        price: "110K",
        board: "/menu/board-12.webp",
      },
      {
        id: "french-fries",
        name: "French Fries",
        description: "Golden crispy fries.",
        price: "50K",
        board: "/menu/board-12.webp",
      },
    ],
  },
  {
    id: "drinks",
    title: "Drinks",
    board: "/menu/board-11.webp",
    dishes: [
      {
        id: "karak-chai",
        name: "Karak Chai",
        description:
          "Spiced tea with cardamom, clove, cinnamon, star anise, and evaporated milk.",
        price: "100K",
        board: "/menu/board-11.webp",
      },
      {
        id: "cappuccino",
        name: "Cappuccino",
        description: "Espresso with steamed milk and a light cocoa finish.",
        price: "45K",
        board: "/menu/board-11.webp",
      },
      {
        id: "espresso",
        name: "Espresso Double Shot",
        description: "Two shots of espresso.",
        price: "35K",
        board: "/menu/board-11.webp",
      },
    ],
  },
];
