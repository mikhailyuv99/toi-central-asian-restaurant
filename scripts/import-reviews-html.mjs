#!/usr/bin/env node
/**
 * Import Google reviews from a saved HTML page.
 *
 * 1. Open Google Maps -> Habibi -> Reviews / Avis tab
 * 2. Scroll the reviews panel until 15+ are visible
 * 3. Ctrl+S -> save anywhere in this project (Chrome default name is fine)
 * 4. npm run import-reviews
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { countReviewsOnPage, parseReviewsFromHtml } from "./reviews-parser.mjs";

const SITE_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REPO_ROOT = path.resolve(SITE_ROOT, "../..");
const CLIENT_PATH = path.join(SITE_ROOT, "data", "client.json");
const HTML_OUT = path.join(SITE_ROOT, "data", "habibi-reviews-page.html");

function scoreHtmlFile(filePath) {
  try {
    const html = fs.readFileSync(filePath, "utf8");
    const blocks = (html.match(/class="bwb7ce"/g) || []).length;
    const maps = (html.match(/class="jftiEf"/g) || []).length;
    const mapsAlt = (html.match(/wiI7pd/g) || []).length;
    return blocks * 10 + maps * 10 + mapsAlt + html.length / 1_000_000;
  } catch {
    return -1;
  }
}

function findHtmlCandidates() {
  const roots = [REPO_ROOT, SITE_ROOT, path.join(SITE_ROOT, "data"), path.join(REPO_ROOT, "data")];
  const found = new Set();

  function walk(dir, depth = 0) {
    if (depth > 4 || !fs.existsSync(dir)) return;
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      if (entry.name.startsWith(".") || entry.name === "node_modules") continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full, depth + 1);
        continue;
      }
      if (!entry.name.endsWith(".html")) continue;
      const lower = entry.name.toLowerCase();
      const parentLower = dir.toLowerCase();
      if (
        lower.includes("habibi") ||
        lower.includes("avis sur") ||
        lower.includes("recherche google") ||
        lower.includes("reviews-page") ||
        lower.includes("google maps") ||
        parentLower.includes("habibi")
      ) {
        found.add(full);
      }
    }
  }

  for (const root of roots) walk(root);
  return [...found].sort((a, b) => scoreHtmlFile(b) - scoreHtmlFile(a));
}

const candidates = findHtmlCandidates();
const HTML_PATH = candidates[0] ?? null;

if (!HTML_PATH) {
  console.error("No reviews HTML found. Save the Google reviews page after scrolling, then re-run.");
  console.error("Open Maps -> Habibi -> Avis tab -> scroll -> Ctrl+S");
  process.exit(1);
}

const html = fs.readFileSync(HTML_PATH, "utf8");
const reviews = parseReviewsFromHtml(html, 15);
const blocksInFile = (html.match(/class="bwb7ce"/g) || []).length;
const totalOnGoogle = countReviewsOnPage(html);

if (reviews.length === 0) {
  console.error(`No reviews found in ${HTML_PATH}`);
  console.error("Scroll the reviews panel before saving so review text is in the page.");
  process.exit(1);
}

fs.mkdirSync(path.dirname(HTML_OUT), { recursive: true });
fs.copyFileSync(HTML_PATH, HTML_OUT);

const client = JSON.parse(fs.readFileSync(CLIENT_PATH, "utf8"));
client.reviews = reviews;
client.rating = client.rating ?? 4.6;
client.review_count = totalOnGoogle ?? client.review_count ?? 189;

fs.writeFileSync(CLIENT_PATH, JSON.stringify(client, null, 2) + "\n");

console.log(`Imported ${reviews.length} reviews`);
console.log(`Source: ${HTML_PATH}`);
console.log(`(${blocksInFile} review blocks in file, Google total: ${totalOnGoogle ?? "?"})`);
if (candidates.length > 1) {
  console.log(`Skipped ${candidates.length - 1} older/smaller saved file(s).`);
}
for (const r of reviews) {
  console.log(`  - ${r.author} (${r.rating}*): ${r.text.slice(0, 70)}…`);
}
console.log(`Updated ${CLIENT_PATH}`);
