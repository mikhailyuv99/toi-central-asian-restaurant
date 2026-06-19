import type { Lang } from "@/lib/i18n/translations";
import {
  ORDER_MENU_RAW,
  type OrderMenuCategory,
  type OrderMenuItem,
} from "@/data/order-menu";
import { getOrderItemImage } from "@/data/order-menu-images";

const CAT_KEYS: Record<
  string,
  | "catAppetizers"
  | "catColdPlates"
  | "catSalads"
  | "catSoups"
  | "catGeorgian"
  | "catSlavicFood"
  | "catSlavicSnacks"
  | "catMandi"
  | "catArabicGrill"
  | "catKebabs"
  | "catWraps"
  | "catDrinks"
> = {
  appetizers: "catAppetizers",
  "cold-plates": "catColdPlates",
  salads: "catSalads",
  soups: "catSoups",
  georgian: "catGeorgian",
  slavic: "catSlavicFood",
  "slavic-snacks": "catSlavicSnacks",
  mandi: "catMandi",
  "arabic-grill": "catArabicGrill",
  kebabs: "catKebabs",
  "fast-bites": "catWraps",
  drinks: "catDrinks",
};

type ItemCopy = { name: string; description?: string };

/** Item copy per language. English lives in order-menu.ts; other langs override here. */
const ITEM_COPY: Partial<Record<Lang, Record<string, ItemCopy>>> = {
  ru: {
    olivier: { name: "Салат Оливье", description: "Картофель, морковь, горошек, соленья, яйцо и курица в майонезе." },
    hummus: { name: "Хумус с арабским хлебом", description: "Нут, тахини, лимон и чеснок с теплым лавашом." },
    mutabel: { name: "Мутabal с арабским хлебом", description: "Копченый баклажан с тахини, чесноком и лимоном." },
    fattoush: { name: "Салат Фаттуш", description: "Салат, помидоры, огурцы, лук, гренки и гранатовый соус." },
    "mixed-cold": { name: "Смешанная холодная закуска", description: "Зеленый салат, табуле, хумус, мутabal. Оливье или фалафель на выбор." },
    "green-salad": { name: "Зеленый салат", description: "Салат, помидоры, огурцы, лук, петрушка, оливковое масло." },
    tabbouleh: { name: "Табуле", description: "Петрушка, помидоры, лук и легкая заправка." },
    falafel: { name: "Фалафель (5 шт.)", description: "Хрустящие нутовые котлеты с арабскими травами." },
    "shrimp-avocado": { name: "Салат с креветками и авокадо", description: "Рукола, креветки, авокадо, яйцо, лосось." },
    "seafood-salad": { name: "Морской салат", description: "Креветки, крабовые палочки, яйцо, кукуруза, майонез." },
    "napa-cabbage": { name: "Салат с пекинской капустой", description: "Капуста с майонезом, яйцом и зеленым луком." },
    "homemade-potatoes": { name: "Домашний картофель", description: "Золотистый хрустящий картофель." },
    "french-fries": { name: "Картофель фри", description: "Хрустящий картофель фри." },
    "lamb-soup": { name: "Бараний суп", description: "Сытный суп с бараниной и овощами." },
    "lentil-soup": { name: "Чечевичный суп", description: "Густой чечевичный суп с хрустящим хлебом." },
    "borscht-half": { name: "Борщ (половина)", description: "Классический свекольный суп со сметаной." },
    "borscht-full": { name: "Борщ (полная порция)", description: "Классический свекольный суп со сметаной." },
    "couscous-chicken": { name: "Кускус с курицей", description: "Кускус с курицей и специями." },
    "steamed-salmon": { name: "Лосось на пару", description: "Нежный лосось с овощами." },
    "kazan-kebab": { name: "Казан-кебаб", description: "Курица с баклажаном и гречкой в казане." },
    "stuffed-pepper-1": { name: "Фаршированный перец (1 шт.)", description: "Фарш с рисом, луком и томатом." },
    "stuffed-pepper-2": { name: "Фаршированный перец (2 шт.)", description: "Фарш с рисом, луком и томатом." },
    khinkali: { name: "Хинкали (за штуку)", description: "Грузинские пельмени. Спросите начинку: мясо, грибы, лосось или шпинат." },
    "chebureki-chicken": { name: "Чебурек (курица)", description: "Жареный чебурек с сочной курицей." },
    "chebureki-beef": { name: "Чебурек (говядина)", description: "Жареный чебурек с говядиной." },
    "vareniki-potato": { name: "Вареники (картофель)", description: "Вареники с картофелем и йогуртом." },
    "vareniki-cottage": { name: "Вареники (творог)", description: "Вареники с творогом и йогуртом." },
    "piroshki-potato": { name: "Пирожок (картофель)", description: "Жареный пирожок с картофелем." },
    "piroshki-chicken": { name: "Пирожок (курица)", description: "Жареный пирожок с курицей." },
    "piroshki-cheese": { name: "Пирожок (сыр)", description: "Жареный пирожок с сыром." },
    "falafel-wrap": { name: "Фалафель wrap (веган)", description: "Фалафель с картофелем фри и соленьями." },
    "zucchini-rolls": { name: "Рулетики из кабачков", description: "Кабачок с сыром и чесноком." },
    "mandi-chicken-thigh": { name: "Манди / Кабса (бедро)", description: "Йеменский рис с целым куриным бедром." },
    "mandi-half-chicken": { name: "Манди / Кабса (пол-курицы)", description: "Половина курицы на рисе с пряностями." },
    "mandi-lamb": { name: "Манди / Кабса с бараниной", description: "Баранина с йеменскими специями на рисе." },
    "mix-grill-l": { name: "Микс гриль (1 персона)", description: "Ассорти кебабов с рисом, салатом и лавашом." },
    "mix-grill-xl": { name: "Микс гриль (2 персоны)", description: "Ассорти кебабов с рисом, салатом и лавашом." },
    "lamb-shashlik": { name: "Бараний шашлык", description: "Маринованная баранина на углях с рисом и салатом." },
    "eggplant-kebab": { name: "Кебаб с баклажаном", description: "Кебаб с баклажаном, рисом и салатом." },
    "chicken-shish": { name: "Куриный шашлык (Tawook)", description: "Маринованная курица с рисом или фри и салатом." },
    "lamb-kebab": { name: "Кебаб из баранины", description: "Фарш из баранины на углях с рисом или фри." },
    "chicken-kebab": { name: "Куриный кебаб", description: "Фарш из курицы с рисом или фри и салатом." },
    "chicken-wings": { name: "Куриные крылья", description: "Маринованные крылья с рисом или фри и соусом." },
    "gyros-wrap": { name: "Гирос в лаваше", description: "Чесночный соус, фри, салат, соленья и помидоры." },
    "placinta-apple": { name: "Placinta с яблоком", description: "Румынская выпечка с яблоком." },
    "placinta-potato": { name: "Placinta с картофелем", description: "Румынская выпечка с картофелем." },
    "placinta-mozzarella": { name: "Placinta с моцареллой", description: "Сырная выпечка с моцареллой и фетой." },
    "placinta-cottage": { name: "Placinta с творогом", description: "Выпечка с творогом, укропом и зеленым луком." },
    "karak-chai": { name: "Карак чай", description: "Пряный чай с кардамоном, гвоздикой и молоком." },
    cappuccino: { name: "Капучино", description: "Эспрессо со вспененным молоком." },
    espresso: { name: "Эспрессо (двойной)", description: "Два шота эспрессо." },
  },
  vi: {
    olivier: { name: "Salad Olivier", description: "Khoai tây, cà rốt, đậu, dưa muối, trứng và gà sốt mayonnaise." },
    hummus: { name: "Hummus kèm bánh Arabic", description: "Đậu gà, tahini, chanh và tỏi với bánh nóng." },
    mutabel: { name: "Mutabal kèm bánh Arabic", description: "Cà tím hun khói với tahini, tỏi và chanh." },
    fattoush: { name: "Salad Fattoush", description: "Rau, cà chua, dưa leo, hành, croutons và sốt lựu." },
    khinkali: { name: "Khinkali (từng cái)", description: "Bánh bao Georgia. Hỏi nhân: thịt, nấm, cá hồi hoặc rau bina." },
    "mandi-chicken-thigh": { name: "Mandi / Kabsa (đùi gà)", description: "Cơm kiểu Yemen với đùi gà quay nguyên." },
    "lamb-shashlik": { name: "Thịt cừu shashlik", description: "Xiên cừu ướp than hoa với cơm và salad." },
    "chicken-shish": { name: "Gà shish tawook", description: "Gà ướp xiên nướng với cơm hoặc khoai và salad." },
    "karak-chai": { name: "Trà Karak", description: "Trà thảo mộc với bột quế, đinh hương và sữa." },
  },
  fr: {
    olivier: { name: "Salade Olivier", description: "Pommes de terre, carottes, petits pois, cornichons, oeuf et poulet à la mayonnaise." },
    hummus: { name: "Houmous et pain arabe", description: "Pois chiches, tahini, citron et ail avec pain maison." },
    mutabel: { name: "Mutabal et pain arabe", description: "Aubergine fumée, tahini, ail et citron." },
    fattoush: { name: "Salade fattouche", description: "Laitue, tomates, concombre, oignon, croûtons et sauce grenade." },
    khinkali: { name: "Khinkali (à l'unité)", description: "Raviolis géorgiens. Demandez la garniture: viande, champignons, saumon ou épinards." },
    "mandi-chicken-thigh": { name: "Mandi / Kabsa (cuisse)", description: "Riz yéménite avec cuisse de poulet rôtie." },
    "lamb-shashlik": { name: "Brochettes d'agneau", description: "Agneau mariné au charbon avec riz et salade." },
    "chicken-shish": { name: "Brochettes de poulet tawook", description: "Poulet mariné avec riz ou frites et salade." },
    "karak-chai": { name: "Thé karak", description: "Thé épicé au cardamome, clou de girofle et lait." },
  },
};

type MenuLabels = {
  menu: Record<
    | "catAppetizers"
    | "catColdPlates"
    | "catSalads"
    | "catSoups"
    | "catGeorgian"
    | "catSlavicFood"
    | "catSlavicSnacks"
    | "catMandi"
    | "catArabicGrill"
    | "catKebabs"
    | "catWraps"
    | "catDrinks",
    string
  >;
};

export function getLocalizedOrderMenu(lang: Lang, t: MenuLabels): OrderMenuCategory[] {
  const overrides = ITEM_COPY[lang] ?? {};

  return ORDER_MENU_RAW.map((category) => ({
    id: category.id,
    title: t.menu[CAT_KEYS[category.id] ?? "catAppetizers"],
    items: category.items.map((item): OrderMenuItem => {
      const copy = overrides[item.id];
      return {
        id: item.id,
        name: copy?.name ?? item.name,
        description: copy?.description ?? item.description,
        priceVnd: item.priceVnd,
        image: getOrderItemImage(item.id) ?? "",
      };
    }),
  }));
}

export { CAT_KEYS };
