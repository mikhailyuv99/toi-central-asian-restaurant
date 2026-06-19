import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const FIXTURES = ["vietnamese", "italian", "seafood", "family", "luxury"];
const fixture = process.argv[2] ?? "vietnamese";

if (!FIXTURES.includes(fixture)) {
  console.error(`Unknown fixture "${fixture}". Use: ${FIXTURES.join(", ")}`);
  process.exit(1);
}

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "fixtures", fixture);
const dataDir = join(root, "data");
const photosDir = join(root, "public", "photos");

await mkdir(dataDir, { recursive: true });
await rm(photosDir, { recursive: true, force: true });
await mkdir(photosDir, { recursive: true });

for (const file of ["client.json", "strategy.json", "template.config.json"]) {
  await cp(join(src, file), join(dataDir, file));
}

await cp(join(src, "photos"), photosDir, { recursive: true });
await writeFile(join(root, ".fixture"), fixture, "utf8");

console.log(`Prepared fixture: ${fixture}`);
