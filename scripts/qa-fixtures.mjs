import { execSync } from "node:child_process";
import { readFile, readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const FIXTURES = ["vietnamese", "italian", "seafood", "family", "luxury"];
const BANNED_GREP = ["lorem", "ipsum", "[Business Name]", "Learn More", "Get Started", "Click Here"];
const BANNED_CLASSES = ["from-purple", "to-blue", "bg-blue-600", "bg-indigo-600"];

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = join(root, "src");
const results = [];

function pass(fixture, check, detail = "") {
  results.push({ fixture, check, ok: true, detail });
}

function fail(fixture, check, detail) {
  results.push({ fixture, check, ok: false, detail });
}

async function grepSource() {
  const files = await walk(srcDir);
  const combined = (
    await Promise.all(files.filter((f) => /\.(tsx?|css)$/.test(f)).map((f) => readFile(f, "utf8")))
  ).join("\n");

  for (const term of BANNED_GREP) {
    if (combined.toLowerCase().includes(term.toLowerCase())) {
      fail("all", `banned-term:${term}`, "Found in src/");
    } else {
      pass("all", `banned-term:${term}`);
    }
  }

  for (const cls of BANNED_CLASSES) {
    if (combined.includes(cls)) {
      fail("all", `banned-class:${cls}`, "Found in src/");
    } else {
      pass("all", `banned-class:${cls}`);
    }
  }
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(p)));
    else files.push(p);
  }
  return files;
}

for (const fixture of FIXTURES) {
  console.log(`\n=== QA: ${fixture} ===`);
  execSync(`node scripts/prepare-fixture.mjs ${fixture}`, { cwd: root, stdio: "inherit" });

  const client = JSON.parse(await readFile(join(root, "data", "client.json"), "utf8"));
  const strategy = JSON.parse(await readFile(join(root, "data", "strategy.json"), "utf8"));
  const config = JSON.parse(await readFile(join(root, "data", "template.config.json"), "utf8"));

  if (client.slug && client.name && client.phone && client.maps_url) {
    pass(fixture, "client-required-fields");
  } else {
    fail(fixture, "client-required-fields", "Missing slug, name, phone, or maps_url");
  }

  if (strategy.archetype?.assigned) {
    pass(fixture, "strategy-archetype", strategy.archetype.assigned);
  } else {
    fail(fixture, "strategy-archetype", "Missing archetype");
  }

  if (config.template === "sit-down-restaurant") {
    pass(fixture, "template-config-id");
  } else {
    fail(fixture, "template-config-id", config.template);
  }

  const phoneDigits = client.phone.replace(/\s/g, "");
  const buildOut = execSync("npm run build", { cwd: root, encoding: "utf8" });
  if (buildOut.includes("error") && buildOut.toLowerCase().includes("failed")) {
    fail(fixture, "build", "Build reported failure");
  } else {
    pass(fixture, "build");
  }

  const htmlPath = join(root, ".next", "server", "app", "index.html");
  let html = "";
  try {
    html = await readFile(htmlPath, "utf8");
  } catch {
    fail(fixture, "prerender-html", "index.html not found");
    continue;
  }

  if (html.includes(client.name)) pass(fixture, "renders-business-name");
  else fail(fixture, "renders-business-name", client.name);

  if (html.includes(`tel:${phoneDigits}`) || html.includes(phoneDigits)) {
    pass(fixture, "tel-link");
  } else {
    fail(fixture, "tel-link", phoneDigits);
  }

  if (html.includes(client.maps_url)) pass(fixture, "maps-link");
  else fail(fixture, "maps-link", client.maps_url);

  if (client.hours?.[0] && html.includes(client.hours[0].split(":")[0])) {
    pass(fixture, "hours-present");
  } else if (!client.hours?.length) {
    pass(fixture, "hours-present", "no hours in data");
  } else {
    fail(fixture, "hours-present", client.hours[0]);
  }

  for (const term of ["lorem", "ipsum", "Learn More"]) {
    if (html.toLowerCase().includes(term.toLowerCase())) {
      fail(fixture, `html-banned:${term}`, "Found in rendered HTML");
    } else {
      pass(fixture, `html-banned:${term}`);
    }
  }

  if (fixture === "family" && !html.toLowerCase().includes("rosa")) {
    fail(fixture, "family-owner-story", "Owner story content missing");
  } else if (fixture === "family") {
    pass(fixture, "family-owner-story");
  }

  if (fixture === "vietnamese" && !html.includes("What to order")) {
    fail(fixture, "vietnamese-review-led", "Review-led menu title missing");
  } else if (fixture === "vietnamese") {
    pass(fixture, "vietnamese-review-led");
  }

  if (fixture === "luxury" && !html.toLowerCase().includes("reserve")) {
    fail(fixture, "luxury-reserve-cta", "Reserve CTA missing");
  } else if (fixture === "luxury") {
    pass(fixture, "luxury-reserve-cta");
  }
}

await grepSource();

const failed = results.filter((r) => !r.ok);
console.log("\n========== QA SUMMARY ==========");
for (const r of results) {
  console.log(`${r.ok ? "PASS" : "FAIL"} [${r.fixture}] ${r.check}${r.detail ? ` — ${r.detail}` : ""}`);
}
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);

if (failed.length > 0) {
  process.exit(1);
}
