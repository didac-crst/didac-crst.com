# visuals/

Editable visual sources and published artifacts for didac-crst.com.

Standards: [`docs/visual-guidelines.md`](../docs/visual-guidelines.md) · [`VISUAL_GUIDELINES.md`](../VISUAL_GUIDELINES.md)

## Layout

```text
visuals/
  sources/<article-slug>/     # source of truth
  published/<article-slug>/   # generated outputs (WebP + thin JPEG; no PNG)
```

## Rules

- Technical diagrams: Mermaid (`.mmd`) → SVG
- Conceptual illustrations / covers: brief (`.md`) → Recraft → AVIF/WebP
- Filenames: `<article-slug>--<visual-concept>.<ext>`
- Do not generate architecture diagrams with image models

Validate Mermaid sources:

```sh
npm run check:mermaid
```

This validates `.mmd` files under `visuals/sources/` and Mermaid code fences in the guideline Markdown files.

Checks are deterministic:

1. **Parse** — `mermaid.parse()` must succeed
2. **Preview lint** — fail on patterns that show “Unable to render” in IDE/GitHub previews (multi-line `init`, `<small>`, unquoted `/`/`?`, unicode arrows, theme-only `.mmd` with no diagram body)

Theme config lives in `sources/_site/diagram-theme.json` with **`modes.dark`** and **`modes.light`**.

- `.mmd` sources keep the **dark** palette for IDE preview
- Published SVGs on the site use `--diagram-*` tokens and switch with light/dark mode
- Resolve modes in scripts via `scripts/lib/diagram-theme.mjs`

**Preview tip:** quote labels with `/` or `?`. Prefer `Label<br/>secondary` over `<small>`. Keep `.mmd` free of multi-line `%%{init}%%`.
