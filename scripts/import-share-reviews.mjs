#!/usr/bin/env node
/**
 * Import reviews from Google share links (individual review URLs).
 */
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SHARE_URLS = [
  "https://share.google/zppX8A0MQfWdU1HJA",
  "https://share.google/RSRgkc1v6BFbCgOf3",
  "https://share.google/F6nOIn2gG95loG6Lu",
  "https://share.google/8qxkpbHBwNQzNcqAX",
  "https://share.google/HtzZfkIhS9LdbK148",
  "https://share.google/1O5fRsrwiEZ4EKxCg",
  "https://share.google/g1eYmhnJqucOIqq7Q",
  "https://share.google/LHlhxBB4z6NkHxuGL",
  "https://share.google/WjgMgH6mtPRISFwZ0",
  "https://share.google/QpmfBRqil2xJGE4O7",
  "https://share.google/fMAYDCxiNe3YZnUjX",
  "https://share.google/h2NQjKAgR2TCVC79U",
  "https://share.google/wkptvapCUjhuATPvS",
  "https://share.google/0tZW4Y0rf9iEGsNRJ",
  "https://share.google/5syUIXdQ4f2e5By3w",
];

const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "data", "client.json");

async function dismissConsent(page) {
  for (const label of ["Reject all", "Accept all", "Tout refuser", "I agree"]) {
    try {
      const btn = page.getByRole("button", { name: label, exact: false });
      if (await btn.first().isVisible({ timeout: 1000 })) {
        await btn.first().click();
        await page.waitForTimeout(600);
        return;
      }
    } catch {
      /* skip */
    }
  }
}

async function extractReview(page) {
  await page.waitForTimeout(2500);
  return page.evaluate(() => {
    const rawAuthor =
      document.querySelector(".d4r55")?.textContent?.trim() ??
      document.querySelector(".PhaUTe")?.textContent?.trim() ??
      "";

    let author = rawAuthor;
    const ariaBtn = document.querySelector('[data-review-id] button[aria-label]');
    if (ariaBtn) {
      const label = ariaBtn.getAttribute("aria-label") ?? "";
      const byMatch =
        label.match(/review by\s+(.+?)(?:\s+Local Guide|\s*$)/i) ??
        label.match(/avis de\s+(.+?)(?:\s|$)/i);
      if (byMatch) author = byMatch[1].trim();
    }

    author = author
      .replace(/^Actions pour l['']avis rédigé par\s+/i, "")
      .replace(/^Review by\s+/i, "")
      .trim();

    const text =
      document.querySelector('span[class*="wiI7pd"]')?.textContent?.trim() ??
      document.querySelector(".OA1nbd")?.textContent?.trim() ??
      document.querySelector(".MyEned")?.textContent?.trim() ??
      "";

    const starsLabel =
      document.querySelector('[aria-label*="star"], [aria-label*="étoile"], [aria-label*="Star"]')?.getAttribute("aria-label") ?? "";
    const ratingMatch = starsLabel.match(/(\d)/);

    return {
      author: author || "Google reviewer",
      text: text.replace(/\s+/g, " ").trim(),
      rating: ratingMatch ? parseInt(ratingMatch[1], 10) : 5,
    };
  });
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    locale: "en-US",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  });

  const reviews = [];
  const seen = new Set();

  for (const url of SHARE_URLS) {
    const page = await context.newPage();
    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
      await dismissConsent(page);
      let review = await extractReview(page);

      if (review.text.length < 15) {
        await page.waitForTimeout(2000);
        review = await extractReview(page);
      }

      if (review.text.length >= 15 && !seen.has(review.text)) {
        seen.add(review.text);
        reviews.push(review);
        console.log(`+ ${review.author}: ${review.text.slice(0, 60)}…`);
      } else {
        console.log(`× skipped ${url}`);
      }
    } catch (e) {
      console.log(`× error ${url}: ${e.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();

  if (reviews.length === 0) {
    console.error("No reviews imported.");
    process.exit(1);
  }

  const client = JSON.parse(fs.readFileSync(OUT, "utf8"));
  client.reviews = reviews.slice(0, 15);
  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  client.rating = Math.round(avg * 10) / 10;
  client.review_count = client.review_count ?? reviews.length;
  fs.writeFileSync(OUT, JSON.stringify(client, null, 2) + "\n");
  console.log(`\nSaved ${client.reviews.length} reviews to ${OUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
