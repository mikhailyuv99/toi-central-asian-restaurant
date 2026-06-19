import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const FIXTURES = ["vietnamese", "italian", "seafood", "family", "luxury"];
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "screenshots");
const PORT = 3456;

function run(cmd, args, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { cwd, stdio: "inherit", shell: true });
    child.on("exit", (code) => (code === 0 ? resolve(undefined) : reject(new Error(`${cmd} failed`))));
  });
}

async function waitForServer(url, attempts = 60) {
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // retry
    }
    await new Promise((r) => setTimeout(r, 750));
  }
  throw new Error(`Server did not start at ${url}`);
}

function startServer(cwd) {
  return spawn("npm", ["run", "start", "--", "-p", String(PORT)], {
    cwd,
    stdio: "ignore",
    shell: true,
    detached: process.platform === "win32",
  });
}

async function stopServer(server) {
  if (!server?.pid) return;
  if (process.platform === "win32") {
    spawn("taskkill", ["/pid", String(server.pid), "/f", "/t"], { shell: true });
  } else {
    server.kill("SIGTERM");
  }
  await new Promise((r) => setTimeout(r, 3000));
}

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();

for (const fixture of FIXTURES) {
  console.log(`\n=== Screenshots: ${fixture} ===`);
  await run("node", ["scripts/prepare-fixture.mjs", fixture], root);
  await run("npm", ["run", "build"], root);

  const server = startServer(root);

  try {
    await waitForServer(`http://127.0.0.1:${PORT}`);
    for (const width of [375, 1280]) {
      const page = await browser.newPage();
      await page.setViewportSize({ width, height: width === 375 ? 812 : 900 });
      await page.goto(`http://127.0.0.1:${PORT}`, { waitUntil: "networkidle", timeout: 60000 });
      await page.screenshot({
        path: join(outDir, `${fixture}-${width}.png`),
        fullPage: true,
      });
      await page.close();
    }
  } finally {
    await stopServer(server);
  }
}

await browser.close();
console.log(`\nScreenshots saved to ${outDir}`);
