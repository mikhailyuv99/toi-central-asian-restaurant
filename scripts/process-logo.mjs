#!/usr/bin/env node
/** Strip near-black pixels from TOI logo PNG → transparent background */
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(dir, "..", "public", "brand");
const src = path.join(root, "logo-source.png");
const out = path.join(root, "logo-on-dark.png");

const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  // Remove black/dark grey background; keep gold lettering
  if (r < 48 && g < 48 && b < 48) {
    data[i + 3] = 0;
  }
}

await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
  .png()
  .toFile(out);

console.log("Wrote transparent logo:", out);
