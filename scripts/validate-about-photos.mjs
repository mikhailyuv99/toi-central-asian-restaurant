#!/usr/bin/env node
/**
 * Fail build if any site photo matches Habibi bytes, is too small (avatar junk),
 * or duplicates another referenced photo.
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicPhotos = path.join(ROOT, "public", "photos");
const HABIBI_PHOTOS = path.join(ROOT, "..", "habibi-an-thuong", "public", "photos");
const MIN_BYTES = 50_000;

const ABOUT_PATHS = [
  "/photos/maps/photo-22.jpg",
  "/photos/maps/photo-35.jpg",
  "/photos/maps/photo-15.jpg",
  "/photos/maps/photo-2.jpg",
  "/photos/maps/photo-10.jpg",
  "/photos/maps/photo-20.jpg",
  "/photos/maps/photo-50.jpg",
  "/photos/maps/photo-90.jpg",
  "/photos/maps/photo-4.jpg",
  "/photos/maps/photo-7.jpg",
  "/photos/maps/photo-8.jpg",
  "/photos/maps/photo-11.jpg",
  "/photos/maps/photo-14.jpg",
  "/photos/maps/photo-16.jpg",
  "/photos/maps/photo-17.jpg",
  "/photos/maps/photo-19.jpg",
  "/photos/maps/photo-23.jpg",
  "/photos/maps/photo-21.jpg",
];

const FORBIDDEN_PREFIXES = ["/photos/owner/", "/photos/dishes/", "/photos/stock/", "/photos/telegram/"];

function loadHabibiHashes() {
  const hashes = new Set();
  const dirs = [
    HABIBI_PHOTOS,
    path.join(ROOT, "..", "..", "data", "habibi-slavic-and-arabic-food-drink", "photos"),
  ];
  for (const base of dirs) {
    if (!fs.existsSync(base)) continue;
    (function walk(dir) {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) walk(full);
        else if (/\.(jpe?g|webp|png|svg)$/i.test(entry.name)) {
          hashes.add(crypto.createHash("sha256").update(fs.readFileSync(full)).digest("hex"));
        }
      }
    })(base);
  }
  return hashes;
}

function toDisk(rel) {
  return path.join(publicPhotos, rel.replace(/^\/photos\//, "").replace(/\//g, path.sep));
}

function hashFile(rel) {
  for (const bad of FORBIDDEN_PREFIXES) {
    if (rel.includes(bad)) throw new Error(`Forbidden photo source: ${rel}`);
  }
  if (!rel.startsWith("/photos/maps/")) {
    throw new Error(`Photo must live under /photos/maps/: ${rel}`);
  }
  const file = toDisk(rel);
  if (!fs.existsSync(file)) throw new Error(`Missing photo: ${rel}`);
  const stat = fs.statSync(file);
  if (stat.size < MIN_BYTES) throw new Error(`Photo too small (likely avatar junk): ${rel} (${stat.size} bytes)`);
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

const habibiHashes = loadHabibiHashes();
const checked = new Set([...ABOUT_PATHS, "/photos/maps/photo-1.jpg"]);
const byHash = new Map();

for (const rel of checked) {
  const hash = hashFile(rel);
  if (habibiHashes.has(hash)) throw new Error(`Habibi photo detected: ${rel}`);
  if (byHash.has(hash)) {
    console.error(`Duplicate image content:\n  ${rel}\n  ${byHash.get(hash)}`);
    process.exit(1);
  }
  byHash.set(hash, rel);
}

const mapsDir = path.join(publicPhotos, "maps");
for (const entry of fs.readdirSync(mapsDir)) {
  if (!/\.jpe?g$/i.test(entry)) continue;
  const rel = `/photos/maps/${entry}`;
  const hash = hashFile(rel);
  if (habibiHashes.has(hash)) {
    console.error(`Habibi photo in maps folder: ${rel}`);
    process.exit(1);
  }
}

console.log(
  `Photos OK: ${checked.size} referenced paths, ${fs.readdirSync(mapsDir).filter((f) => /\.jpe?g$/i.test(f)).length} maps files, 0 Habibi matches.`,
);
