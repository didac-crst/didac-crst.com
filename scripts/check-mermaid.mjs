#!/usr/bin/env node
/**
 * Validate Mermaid sources and Mermaid fences in Markdown docs.
 *
 * Deterministic checks:
 * 1. mermaid.parse() — syntax must be valid
 * 2. preview lint — patterns known to show "Unable to render" in IDE/GitHub previews
 *
 * Usage: npm run check:mermaid
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { JSDOM } from "jsdom";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const sourcesRoot = path.join(root, "visuals", "sources");

const MARKDOWN_TARGETS = [
  path.join(root, "VISUAL_GUIDELINES.md"),
  path.join(root, "ARTICLE_GUIDELINES.md"),
  path.join(root, "docs", "visual-guidelines.md"),
  path.join(root, "docs", "writing-guidelines.md")
];

const DIAGRAM_START =
  /^(flowchart|graph|sequenceDiagram|classDiagram|stateDiagram(?:-v2)?|erDiagram|journey|gantt|pie|mindmap|timeline|gitGraph|quadrantChart|requirementDiagram|C4Context|C4Container|C4Component|C4Dynamic|C4Deployment)\b/m;

const MERMAID_FENCE = /```mermaid\s*\n([\s\S]*?)```/gi;

/** Patterns that parse in Mermaid CLI but break Cursor/GitHub Mermaid preview. */
const PREVIEW_RULES = [
  {
    id: "no-diagram-body",
    test: (source) => {
      const body = stripInit(stripLineComments(source));
      return !DIAGRAM_START.test(body);
    },
    message:
      'No diagram body — IDE shows "Unable to render". Use .md/.json for theme snippets, not .mmd.'
  },
  {
    id: "multiline-init",
    test: (source) => /%%\{\s*init:[\s\S]*?\n[\s\S]*?\}%%/.test(source),
    message:
      "Multi-line %%{init}%% breaks many Mermaid previews. Omit init from .mmd (apply theme at render) or use a single line."
  },
  {
    id: "html-small",
    test: (source) => {
      const body = stripInit(stripLineComments(source));
      return /<small[\s>]/i.test(body);
    },
    message:
      "<small> is unsupported in many Mermaid previews. Use Label<br/>secondary line instead."
  },
  {
    id: "unquoted-special",
    test: (source) => {
      const body = stripInit(stripLineComments(source));
      if (/\|[^|"\n]*[\/?][^|"\n]*\|/.test(body)) return true;
      if (/\[[^\]"\n]*[\/?][^\]"\n]*\]/.test(body)) return true;
      if (/\{[^\}"\n]*\?[^\}"\n]*\}/.test(body)) return true;
      return false;
    },
    message:
      "Unquoted labels contain / or ?. Quote them: [\"Label?\"] or |\"a / b\"|."
  },
  {
    id: "unicode-arrow",
    test: (source) => {
      const body = stripInit(stripLineComments(source));
      return /[→←—–]/.test(body);
    },
    message: "Unicode arrows/dashes break some previews. Use ASCII (to, -)."
  }
];

function installDom() {
  const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>", {
    url: "https://didac-crst.com/"
  });
  const { window } = dom;

  globalThis.window = window;
  globalThis.document = window.document;
  globalThis.DOMParser = window.DOMParser;
  globalThis.XMLSerializer = window.XMLSerializer;
  globalThis.HTMLElement = window.HTMLElement;
  globalThis.SVGElement = window.SVGElement;
  globalThis.Element = window.Element;
  globalThis.Node = window.Node;
  globalThis.getComputedStyle = window.getComputedStyle.bind(window);
}

function stripLineComments(source) {
  return source
    .split("\n")
    .filter((line) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("%%{")) return true;
      if (trimmed.startsWith("%%")) return false;
      return true;
    })
    .join("\n")
    .trim();
}

function stripInit(source) {
  return source.replace(/%%\{[\s\S]*?\}%%/g, "").trim();
}

function lintPreview(source) {
  return PREVIEW_RULES.filter((rule) => rule.test(source));
}

installDom();

const { default: mermaid } = await import("mermaid");

mermaid.initialize({
  startOnLoad: false,
  securityLevel: "loose",
  theme: "base"
});

async function collectMmdFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectMmdFiles(full)));
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".mmd")) {
      files.push(full);
    }
  }

  return files.sort();
}

function extractMarkdownDiagrams(markdown, filePath) {
  const diagrams = [];
  let match;
  let index = 0;
  const re = new RegExp(MERMAID_FENCE.source, "gi");

  while ((match = re.exec(markdown)) !== null) {
    index += 1;
    diagrams.push({
      label: `${path.relative(root, filePath)}#mermaid-${index}`,
      source: match[1].trim()
    });
  }

  return diagrams;
}

async function validate(label, source, { allowThemeOnly = false } = {}) {
  const cleaned = stripLineComments(source);
  const previewIssues = lintPreview(source);

  if (allowThemeOnly && previewIssues.some((issue) => issue.id === "no-diagram-body")) {
    console.log(`skip  ${label} (theme / no diagram body)`);
    return "skipped";
  }

  if (previewIssues.length > 0) {
    console.error(`FAIL  ${label} [preview-lint]`);
    for (const issue of previewIssues) {
      console.error(`      ${issue.id}: ${issue.message}`);
    }
    return "failed";
  }

  if (!cleaned || !DIAGRAM_START.test(stripInit(cleaned))) {
    console.error(`FAIL  ${label}`);
    console.error(`      No parseable diagram after stripping comments`);
    return "failed";
  }

  try {
    const result = await mermaid.parse(cleaned);
    const type = result?.diagramType ?? "unknown";
    console.log(`ok    ${label} (${type})`);
    return "passed";
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`FAIL  ${label} [parse]`);
    console.error(`      ${message}`);
    return "failed";
  }
}

let failed = 0;
let skipped = 0;
let passed = 0;

const mmdFiles = await collectMmdFiles(sourcesRoot);

if (mmdFiles.length === 0) {
  console.error(`No .mmd files found under ${path.relative(root, sourcesRoot)}`);
  process.exit(1);
}

console.log("== .mmd sources ==");
for (const file of mmdFiles) {
  const relative = path.relative(root, file);
  const raw = await readFile(file, "utf8");
  const status = await validate(relative, raw, { allowThemeOnly: false });
  if (status === "passed") passed += 1;
  else if (status === "skipped") skipped += 1;
  else failed += 1;
}

console.log("\n== markdown fences ==");
for (const file of MARKDOWN_TARGETS) {
  let markdown;
  try {
    markdown = await readFile(file, "utf8");
  } catch {
    continue;
  }

  const diagrams = extractMarkdownDiagrams(markdown, file);
  for (const diagram of diagrams) {
    const status = await validate(diagram.label, diagram.source);
    if (status === "passed") passed += 1;
    else if (status === "skipped") skipped += 1;
    else failed += 1;
  }
}

console.log("");
console.log(`Mermaid check: ${passed} ok, ${skipped} skipped, ${failed} failed`);

if (failed > 0) {
  process.exit(1);
}
