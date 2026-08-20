/**
 * Resolve diagram theme modes from visuals/sources/_site/diagram-theme.json.
 *
 * Usage:
 *   import { getDiagramMode, listDiagramModes } from "./lib/diagram-theme.mjs";
 *   const dark = await getDiagramMode("dark");
 *   const light = await getDiagramMode("light");
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const themePath = path.resolve(
  __dirname,
  "../../visuals/sources/_site/diagram-theme.json"
);

let cached;

async function loadTheme() {
  if (!cached) {
    cached = JSON.parse(await readFile(themePath, "utf8"));
  }
  return cached;
}

export async function listDiagramModes() {
  const theme = await loadTheme();
  return Object.keys(theme.modes ?? {});
}

export async function getDiagramMode(mode) {
  const theme = await loadTheme();
  const resolved = mode ?? theme.defaultMode ?? "dark";
  const block = theme.modes?.[resolved];

  if (!block) {
    throw new Error(
      `Unknown diagram theme mode "${resolved}". Known: ${Object.keys(theme.modes ?? {}).join(", ")}`
    );
  }

  return {
    mode: resolved,
    shared: theme.shared,
    ...block,
    mermaidConfig: {
      theme: block.theme ?? "base",
      themeVariables: block.themeVariables,
      flowchart: theme.shared?.flowchart
    }
  };
}

export function getThemePath() {
  return themePath;
}
