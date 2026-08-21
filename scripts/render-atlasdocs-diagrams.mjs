#!/usr/bin/env node
/**
 * Render AtlasDocs Mermaid sources to SVG for the project page.
 * Uses Puppeteer + Mermaid with the site dark diagram theme.
 *
 * Usage: node scripts/render-atlasdocs-diagrams.mjs
 */
import { mkdir, readFile, writeFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";
import { getDiagramMode } from "./lib/diagram-theme.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const sourcesDir = path.join(root, "visuals", "sources", "atlasdocs");
const outDir = path.join(root, "public", "images", "projects", "atlasdocs");

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium"
  ].filter(Boolean);

  return candidates[0];
}

async function main() {
  const dark = await getDiagramMode("dark");
  const files = (await readdir(sourcesDir)).filter((name) => name.endsWith(".mmd"));
  await mkdir(outDir, { recursive: true });

  const executablePath = findChrome();
  if (!executablePath) {
    throw new Error("Chrome/Chromium not found. Set CHROME_PATH.");
  }

  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  try {
    for (const file of files) {
      const source = await readFile(path.join(sourcesDir, file), "utf8");
      const id = file.replace(/\.mmd$/, "");
      const page = await browser.newPage();

      await page.setContent(`<!doctype html>
<html><body>
  <div id="host"></div>
  <script type="module">
    import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";
    const definition = ${JSON.stringify(source)};
    const config = ${JSON.stringify({
      ...dark.mermaidConfig,
      flowchart: {
        ...dark.mermaidConfig.flowchart,
        // Roomier layout so stacked system panels stay readable on the page
        nodeSpacing: 56,
        rankSpacing: 80,
        padding: 24
      }
    })};
    mermaid.initialize({ startOnLoad: false, securityLevel: "strict", ...config });
    const { svg } = await mermaid.render("diagram-${id}", definition);
    document.getElementById("host").innerHTML = svg;
    window.__DONE__ = true;
  </script>
</body></html>`, { waitUntil: "networkidle0" });

      await page.waitForFunction("window.__DONE__ === true", { timeout: 30000 });
      let svg = await page.$eval("#host svg", (el) => el.outerHTML);

      // Prefer site diagram tokens when present in fills/strokes from the dark palette.
      svg = svg
        .replaceAll("#E9F0F5", "var(--diagram-text)")
        .replaceAll("#91A1AE", "var(--diagram-muted)")
        .replaceAll("#667783", "var(--diagram-arrow)")
        .replaceAll("#2B3742", "var(--diagram-border)")
        .replaceAll("#55C7C2", "var(--diagram-machine)")
        .replaceAll("#122525", "var(--diagram-machine-fill)")
        .replaceAll("#D9B76E", "var(--diagram-human)")
        .replaceAll("#211D15", "var(--diagram-human-fill)")
        .replaceAll("#46545F", "var(--diagram-output-border)")
        .replaceAll("rgb(233, 240, 245)", "var(--diagram-text)")
        .replaceAll("rgb(85, 199, 194)", "var(--diagram-machine)")
        .replaceAll("rgb(18, 37, 37)", "var(--diagram-machine-fill)")
        .replaceAll("rgb(43, 55, 66)", "var(--diagram-border)");

      svg = svg
        .replace(/\sclass="flowchart"/, "")
        .replace(
          /<svg([^>]*?)class="([^"]*)"/,
          '<svg$1class="diagram $2"'
        );
      if (!svg.includes('class="diagram')) {
        svg = svg.replace("<svg ", '<svg class="diagram" ');
      }

      const outPath = path.join(outDir, `${id}.svg`);
      await writeFile(outPath, `${svg}\n`, "utf8");
      console.log(`wrote ${path.relative(root, outPath)}`);
      await page.close();
    }
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
