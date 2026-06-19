/**
 * Download stock food photos for order menu items with bad board crops.
 * Run: node scripts/download-stock-dish-photos.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "public/photos/stock");

const UA = { "User-Agent": "HabibiWebsiteFactory/1.0 (contact: habibi restaurant)" };

/** @type {Record<string, string>} */
const STOCK = {
  "karak-chai":
    "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=800&h=800&q=85",
  cappuccino:
    "https://commons.wikimedia.org/wiki/Special:FilePath/Cappuccino_at_Sightglass_Coffee.jpg?width=800",
  espresso:
    "https://commons.wikimedia.org/wiki/Special:FilePath/A_small_cup_of_coffee.JPG?width=800",
  "gyros-wrap":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Gyros_pita.jpg?width=800",
  "placinta-mozzarella":
    "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&h=800&q=85",
  "placinta-apple":
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&h=800&q=85",
  "placinta-potato":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Khachapuri.jpg?width=800",
  "placinta-cottage":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Khachapuri_cheese.jpg?width=800",
  "chicken-wings":
    "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=800&h=800&q=85",
  "lamb-kebab":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Lula_kebab_2.jpg?width=800",
  "falafel-wrap":
    "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&h=800&q=85",
  "lamb-soup":
    "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&h=800&q=85",
  "lentil-soup":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Lentil_soup.jpg?width=800",
  "couscous-chicken":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Couscous-1.jpg?width=800",
  "french-fries":
    "https://commons.wikimedia.org/wiki/Special:FilePath/French_Fries.JPG?width=800",
};

fs.mkdirSync(OUT, { recursive: true });

for (const [id, url] of Object.entries(STOCK)) {
  const output = path.join(OUT, `${id}.jpg`);
  try {
    const response = await fetch(url, { headers: UA, redirect: "follow" });
    if (!response.ok) {
      console.error(`Failed ${id}: ${response.status} ${response.url}`);
      continue;
    }
    const buffer = Buffer.from(await response.arrayBuffer());
    await sharp(buffer)
      .resize(480, 480, { fit: "cover", position: "centre" })
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile(output);
    console.log(`Wrote ${id}.jpg`);
  } catch (error) {
    console.error(`Failed ${id}:`, error);
  }
}

console.log("Done.");
