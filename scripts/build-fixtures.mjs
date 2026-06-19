import { execSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const FIXTURES = ["vietnamese", "italian", "seafood", "family", "luxury"];
const root = join(dirname(fileURLToPath(import.meta.url)), "..");

for (const fixture of FIXTURES) {
  console.log(`\n=== Building fixture: ${fixture} ===`);
  execSync(`node scripts/prepare-fixture.mjs ${fixture}`, { cwd: root, stdio: "inherit" });
  execSync("npm run build", { cwd: root, stdio: "inherit" });
}

console.log("\nAll fixtures built successfully.");
