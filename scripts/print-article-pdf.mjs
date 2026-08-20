#!/usr/bin/env node
/**
 * Print a writing article as one continuous (tall) PDF with images.
 *
 * Requires a running local site (dev or preview):
 *   npm run dev
 *   npm run pdf:article -- ai-needs-better-context
 *
 * Options:
 *   --base <url>   Site origin (default http://localhost:4321)
 *   --out <path>   Output PDF path (default _drafts/<slug>-onepage.pdf)
 *   --width <px>   Viewport / PDF width (default 1100)
 *   --chrome <path> Chrome / Chromium binary
 *
 * Env:
 *   CHROME_PATH    Override browser binary
 */

import { access, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const chromeCandidates = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter(Boolean);

const usage = () => {
  console.error(`Usage: node scripts/print-article-pdf.mjs <slug> [options]

Example:
  npm run pdf:article -- ai-needs-better-context
`);
};

const parseArgs = (argv) => {
  const options = {
    slug: null,
    base: "http://localhost:4321",
    out: null,
    width: 1100,
    chrome: null,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      usage();
      process.exit(0);
    }
    if (arg === "--base") {
      options.base = argv[++i];
      continue;
    }
    if (arg === "--out") {
      options.out = argv[++i];
      continue;
    }
    if (arg === "--width") {
      options.width = Number(argv[++i]);
      continue;
    }
    if (arg === "--chrome") {
      options.chrome = argv[++i];
      continue;
    }
    if (arg.startsWith("-")) {
      throw new Error(`Unknown option: ${arg}`);
    }
    if (!options.slug) {
      options.slug = arg;
      continue;
    }
    throw new Error(`Unexpected argument: ${arg}`);
  }

  return options;
};

const resolveChrome = async (explicit) => {
  const candidates = explicit ? [explicit, ...chromeCandidates] : chromeCandidates;
  for (const candidate of candidates) {
    try {
      await access(candidate);
      return candidate;
    } catch {
      // try next
    }
  }
  throw new Error(
    "Could not find Chrome/Chromium. Pass --chrome <path> or set CHROME_PATH."
  );
};

const waitForImages = async (page) => {
  // Force lazy images to load, then wait for decode.
  await page.evaluate(async () => {
    const imgs = Array.from(document.images);
    for (const img of imgs) {
      img.loading = "eager";
      if (img.dataset.src && !img.src) {
        img.src = img.dataset.src;
      }
    }

    // Scroll through the page so intersection-based lazy loaders fire.
    const step = Math.max(window.innerHeight, 600);
    const max = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    for (let y = 0; y < max; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 50));
    }
    window.scrollTo(0, 0);

    await Promise.all(
      Array.from(document.images).map((img) => {
        if (img.complete && img.naturalWidth > 0) return Promise.resolve();
        return new Promise((resolve) => {
          const done = () => resolve();
          img.addEventListener("load", done, { once: true });
          img.addEventListener("error", done, { once: true });
          setTimeout(done, 8000);
        });
      })
    );
  });
};

const options = parseArgs(process.argv.slice(2));
if (!options.slug) {
  usage();
  process.exit(1);
}

if (!Number.isFinite(options.width) || options.width < 320) {
  throw new Error("--width must be a number >= 320");
}

const articlePath = `/writing/${options.slug}/`.replace(/\/{2,}/g, "/");
const url = new URL(articlePath, options.base.endsWith("/") ? options.base : `${options.base}/`).toString();
const out = path.resolve(
  root,
  options.out ?? path.join("_drafts", `${options.slug}-onepage.pdf`)
);

const chromePath = await resolveChrome(options.chrome);
await mkdir(path.dirname(out), { recursive: true });

console.log(`Printing ${url}`);
console.log(`Browser  ${chromePath}`);

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: "new",
  args: [
    "--no-sandbox",
    "--disable-gpu",
    "--disable-dev-shm-usage",
    "--disable-extensions",
  ],
});

try {
  const page = await browser.newPage();
  await page.setViewport({
    width: options.width,
    height: 900,
    deviceScaleFactor: 1,
  });
  await page.emulateMediaType("screen");

  // Astro dev keeps HMR websockets open — never wait for networkidle*.
  console.log("Loading page…");
  const response = await page.goto(url, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  if (!response || !response.ok()) {
    const status = response?.status?.() ?? "no response";
    throw new Error(`Failed to load article (${status}): ${url}`);
  }

  console.log("Waiting for images…");
  await waitForImages(page);
  // Allow late layout (fonts / SVGs)
  await new Promise((resolve) => setTimeout(resolve, 500));

  await page.addStyleTag({
    content: `
      header.site-header,
      footer.site-footer,
      [data-reader-control],
      [data-theme-control],
      .reader-control,
      .theme-control {
        display: none !important;
      }
      .site-main {
        padding-top: 1.5rem !important;
      }
    `,
  });

  console.log("Measuring page…");
  const metrics = await page.evaluate(() => {
    const height = Math.ceil(
      Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.querySelector(".site-main")?.scrollHeight ?? 0
      )
    );
    return { height, title: document.title, images: document.images.length };
  });

  const pdfHeight = Math.min(metrics.height + 80, 35000);
  console.log(`Rendering PDF (${metrics.images} images, ${pdfHeight}px)…`);
  await page.pdf({
    path: out,
    width: `${options.width}px`,
    height: `${pdfHeight}px`,
    printBackground: true,
    margin: { top: "0px", right: "0px", bottom: "0px", left: "0px" },
    pageRanges: "1",
  });

  console.log(`Wrote    ${out}`);
  console.log(`Title    ${metrics.title}`);
  console.log(`Height   ${pdfHeight}px`);
} finally {
  await browser.close();
}
