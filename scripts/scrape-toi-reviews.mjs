#!/usr/bin/env node
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const MAPS = "https://maps.app.goo.gl/iwThMtZCGQxUgfEb7";
const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "data", "client.json");
const MAX = 15;

async function dismissConsent(page) {
  for (const label of ["Reject all", "Accept all", "Tout refuser"]) {
    try {
      const btn = page.getByRole("button", { name: label, exact: false });
      if (await btn.first().isVisible({ timeout: 1200 })) {
        await btn.first().click();
        await page.waitForTimeout(800);
        return;
      }
    } catch {
      /* skip */
    }
  }
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, locale: "en-US" });
  await page.goto(MAPS, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(3500);
  await dismissConsent(page);
  await page.waitForTimeout(1500);

  for (const attempt of [
    () => page.getByRole("tab", { name: /Reviews/i }).first().click({ timeout: 4000 }),
    () => page.locator('button[aria-label*="Reviews"]').first().click({ timeout: 4000 }),
  ]) {
    try {
      await attempt();
      break;
    } catch {
      /* next */
    }
  }
  await page.waitForTimeout(2000);
  for (let i = 0; i < 10; i++) {
    await page.mouse.wheel(0, 2800);
    await page.waitForTimeout(450);
  }

  const reviews = await page.evaluate((max) => {
    const blocks = Array.from(document.querySelectorAll("div[data-review-id], .jftiEf"));
    return blocks
      .slice(0, max + 6)
      .map((b) => {
        const author =
          b.querySelector(".d4r55")?.textContent?.trim() ??
          b.querySelector("button[aria-label]")?.getAttribute("aria-label")?.trim() ??
          "Guest";
        const text =
          b.querySelector('span[class*="wiI7pd"]')?.textContent?.trim() ??
          b.querySelector(".MyEned")?.textContent?.trim() ??
          "";
        const starsLabel = b.querySelector('[aria-label*="star"]')?.getAttribute("aria-label") ?? "";
        const ratingMatch = starsLabel.match(/(\d+)/);
        return { author, text, rating: ratingMatch ? parseInt(ratingMatch[1], 10) : 5 };
      })
      .filter((r) => r.text.length > 20)
      .slice(0, max);
  }, MAX);

  const meta = await page.evaluate(() => {
    const m = document.body.innerText.match(/(\d\.\d)[^\d]{0,20}(\d[\d,]*)\s*(?:reviews|avis)/i);
    return m ? { rating: parseFloat(m[1]), review_count: parseInt(m[2].replace(/,/g, ""), 10) } : null;
  });

  await browser.close();

  const client = JSON.parse(fs.readFileSync(OUT, "utf8"));
  client.reviews = reviews;
  if (meta) {
    client.rating = meta.rating;
    client.review_count = meta.review_count;
  }
  fs.writeFileSync(OUT, JSON.stringify(client, null, 2) + "\n");
  console.log(`Saved ${reviews.length} reviews to ${OUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
