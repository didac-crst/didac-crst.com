# ai-needs-better-context — visual inventory

| Asset | Category | Source | Published form | Status |
| --- | --- | --- | --- | --- |
| Hero — Prompt vs Context | Article hero | `hero-brief.md` | `ai-needs-better-context--hero.webp` | Below header, before story |
| Instruction vs context | Editorial diagram | `instruction-context-model.mmd` | Inline SVG | Body |
| Context gap | Conceptual illustration | `context-gap-brief.md` | `…--context-gap.webp` | After Context Gap lead |
| Fresh session recovery | Illustration / exceptional infographic | `fresh-session-brief.md` | `…--fresh-session.webp` | After More Context lead |
| Context lifecycle | Editorial diagram | `context-lifecycle.mmd` | Inline SVG | Body |
| Diagram theme | Config | `../_site/diagram-theme.json` | `--diagram-*` tokens | Light + dark |
| Article cover / OG | Cover | `npm run generate:og` | PNG | Share card |

Density: hero + 2 diagrams + 2 in-body illustrations. Infographic only where it maps a section.

Paths:

- Site: `/images/writing/ai-needs-better-context--{hero|context-gap|fresh-session}.webp` (+ `.jpg` fallback)
- Archive: `visuals/published/ai-needs-better-context/`
