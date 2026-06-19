/**
 * Extract square dish thumbnails from Habibi menu board photography.
 * Crops target food-only regions (no menu text). Run: node scripts/extract-order-dish-photos.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "public/photos/dishes");

/** @param {number} col 0=left 1=right @param {number} row grid row on 420×560 board */
function foodCell(col, row, tweaks = {}) {
  const left = (tweaks.left ?? (col ? 228 : 12)) + (tweaks.dx ?? 0);
  const top = (tweaks.top ?? 42 + row * 128) + (tweaks.dy ?? 0);
  const width = tweaks.width ?? 168;
  const height = tweaks.height ?? 96;
  return { left, top, width, height };
}

/** @type {Record<string, { src: string; left: number; top: number; width: number; height: number; focus?: string }>} */
const CROPS = {
  hummus: { src: "menu-hd/appetizers.jpg", ...foodCell(1, 1, { dy: 12, dx: 4, width: 160, height: 88 }) },
  mutabel: { src: "menu-hd/appetizers.jpg", ...foodCell(0, 3, { dy: 8, width: 164, height: 92 }) },
  fattoush: { src: "menu-hd/appetizers.jpg", ...foodCell(1, 3, { dy: 6, width: 164, height: 94 }) },

  "mixed-cold": { src: "menu-hd/cold-plates.jpg", ...foodCell(0, 1, { dy: 10, width: 164, height: 90 }) },
  "green-salad": { src: "menu-hd/cold-plates.jpg", ...foodCell(1, 1, { dy: 8, width: 162, height: 92 }) },
  tabbouleh: { src: "menu-hd/cold-plates.jpg", ...foodCell(0, 2, { dy: 6, width: 164, height: 94 }) },
  falafel: { src: "menu-hd/cold-plates.jpg", ...foodCell(1, 3, { dy: 8, width: 164, height: 92 }) },

  "napa-cabbage": { src: "menu-hd/salads.jpg", ...foodCell(0, 2, { dy: 6, width: 164, height: 94 }) },
  "homemade-potatoes": { src: "menu-hd/salads.jpg", ...foodCell(1, 3, { dy: 8, width: 164, height: 92 }) },

  "lamb-soup": { src: "menu-hd/soups.jpg", ...foodCell(0, 0, { dy: 4, width: 168, height: 98 }) },
  "lentil-soup": { src: "menu-hd/soups.jpg", ...foodCell(1, 1, { dy: 4, width: 164, height: 96 }) },
  "couscous-chicken": { src: "menu-hd/soups.jpg", ...foodCell(0, 3, { dy: 6, width: 164, height: 94 }) },

  "mandi-chicken-thigh": { src: "menu-hd/mandi.jpg", ...foodCell(1, 1, { dy: 18, dx: -8, width: 172, height: 88 }) },
  "mandi-half-chicken": { src: "menu-hd/mandi.jpg", ...foodCell(1, 2, { dy: 8, width: 164, height: 92 }) },
  "mandi-lamb": { src: "menu-hd/mandi.jpg", ...foodCell(0, 3, { dy: 6, width: 166, height: 94 }) },

  "piroshki-potato": { src: "menu-hd/slavic-snacks.jpg", ...foodCell(1, 0, { dy: 2, width: 168, height: 98 }) },
  "piroshki-chicken": { src: "menu-hd/slavic-snacks.jpg", ...foodCell(1, 0, { dy: 2, width: 168, height: 98 }) },
  "piroshki-cheese": { src: "menu-hd/slavic-snacks.jpg", ...foodCell(1, 0, { dy: 2, width: 168, height: 98 }) },
  "falafel-wrap": { src: "menu-hd/slavic-snacks.jpg", ...foodCell(0, 2, { dy: 4, width: 166, height: 96 }) },
  "zucchini-rolls": { src: "menu-hd/slavic-snacks.jpg", ...foodCell(1, 3, { dy: 6, width: 164, height: 94 }) },

  "mix-grill-l": { src: "menu-hd/arabic-grill.jpg", ...foodCell(0, 1, { dy: 14, dx: 2, width: 170, height: 90 }) },
  "mix-grill-xl": { src: "menu-hd/arabic-grill.jpg", ...foodCell(0, 1, { dy: 14, dx: 2, width: 170, height: 90 }) },
  "lamb-shashlik": { src: "menu-hd/arabic-grill.jpg", ...foodCell(1, 2, { dy: 6, width: 166, height: 94 }) },
  "eggplant-kebab": { src: "menu-hd/arabic-grill.jpg", ...foodCell(1, 2, { dy: 6, width: 166, height: 94 }) },

  "chicken-shish": { src: "menu-hd/kebabs.jpg", left: 14, top: 48, width: 120, height: 96 },
  "lamb-kebab": { src: "menu-hd/kebabs.jpg", ...foodCell(1, 1, { dy: 8, width: 164, height: 92 }) },
  "chicken-kebab": { src: "menu-hd/kebabs.jpg", ...foodCell(1, 3, { dy: 8, width: 164, height: 92 }) },
  "chicken-wings": { src: "menu-hd/kebabs.jpg", ...foodCell(1, 2, { dy: 6, width: 166, height: 94 }) },

  "karak-chai": { src: "menu-hd/drinks.jpg", left: 14, top: 52, width: 168, height: 96 },
  cappuccino: { src: "menu-hd/drinks.jpg", ...foodCell(0, 3, { dy: 4, width: 164, height: 96 }) },
  espresso: { src: "menu-hd/drinks.jpg", ...foodCell(1, 3, { dy: 4, width: 164, height: 96 }) },

  "gyros-wrap": { src: "menu-hd/_preview/board-12.jpg", left: 500, top: 55, width: 380, height: 250 },
  "placinta-apple": { src: "menu-hd/_preview/board-12.jpg", left: 35, top: 310, width: 370, height: 260 },
  "placinta-potato": { src: "menu-hd/_preview/board-12.jpg", left: 35, top: 310, width: 370, height: 260 },
  "placinta-mozzarella": { src: "menu-hd/_preview/board-12.jpg", left: 35, top: 310, width: 370, height: 260 },
  "placinta-cottage": { src: "menu-hd/_preview/board-12.jpg", left: 35, top: 310, width: 370, height: 260 },
  "french-fries": { src: "menu-hd/_preview/board-12.jpg", left: 510, top: 545, width: 370, height: 320 },
};

fs.mkdirSync(OUT, { recursive: true });

let ok = 0;
for (const [id, crop] of Object.entries(CROPS)) {
  const input = path.join(ROOT, "public", crop.src);
  const output = path.join(OUT, `${id}.jpg`);
  if (!fs.existsSync(input)) {
    console.error("missing source:", input);
    continue;
  }
  await sharp(input)
    .extract({
      left: crop.left,
      top: crop.top,
      width: crop.width,
      height: crop.height,
    })
    .resize(480, 480, {
      fit: "cover",
      position: crop.focus ?? "centre",
    })
    .sharpen({ sigma: 0.6, m1: 0.5, m2: 0.25 })
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(output);
  ok += 1;
}

console.log(`Wrote ${ok} dish thumbnails to public/photos/dishes/`);
