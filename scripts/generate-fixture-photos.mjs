import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const FIXTURES = {
  vietnamese: {
    labels: ["Storefront", "Phở bowl", "Bún tray", "Dining room", "Kitchen"],
    colors: ["#5c3d2e", "#c45c26", "#8b6914", "#3d2b1f", "#6b4423"],
  },
  italian: {
    labels: ["Trattoria front", "Pasta plate", "Wood-fired oven", "Wine wall", "Terrace", "Dessert"],
    colors: ["#2d4a3e", "#8b2942", "#5c4033", "#1e3a2f", "#6b7c3a", "#c9a227"],
  },
  seafood: {
    labels: ["Harbor view", "Raw bar", "Grilled catch", "Evening dining", "Cocktail bar", "Chef's plate"],
    colors: ["#1a3a4a", "#2e6b8a", "#0f2d3d", "#4a7c8c", "#1e4d5c", "#8b6914"],
  },
  family: {
    labels: ["Family storefront", "Sunday roast", "Kids corner", "Garden patio", "Homemade pie"],
    colors: ["#6b3a2a", "#c4783a", "#4a6741", "#8b5e3c", "#a0522d"],
  },
  luxury: {
    labels: ["Private entrance", "Tasting course", "Wine cellar", "Dining salon", "Pastry finish"],
    colors: ["#1a1410", "#2c2420", "#3d3530", "#1e1a16", "#4a3f35"],
  },
};

import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

for (const [fixture, { labels, colors }] of Object.entries(FIXTURES)) {
  const dir = join(root, "fixtures", fixture, "photos");
  await mkdir(dir, { recursive: true });
  for (let i = 0; i < labels.length; i++) {
    const label = labels[i];
    const color = colors[i % colors.length];
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800" role="img" aria-label="${label}">
  <rect width="1200" height="800" fill="${color}"/>
  <text x="600" y="400" text-anchor="middle" dominant-baseline="middle" fill="rgba(255,255,255,0.85)" font-family="system-ui,sans-serif" font-size="42" font-weight="600">${label}</text>
</svg>`;
    await writeFile(join(dir, `photo-${i + 1}.svg`), svg, "utf8");
  }
}

console.log("Fixture photos generated.");
