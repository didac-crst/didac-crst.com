# didac-crst.com

Personal website, technical writing, and open-source projects.

Production: <https://didac-crst.com>

## Stack

- Astro
- TypeScript
- Markdown / MDX
- GitHub Pages
- GitHub Actions
- Cloudflare DNS / proxy

## Development

```sh
npm install
npm run dev
```

## Validation

```sh
npm run check
npm run build
```

`npm run check` runs Astro type-checking and validates every Mermaid source under `visuals/sources/` (`npm run check:mermaid`). Theme-only snippets are skipped; invalid diagrams fail the check.

## Preview

```sh
npm run preview
```

## Print

One-page PDF of a published article (Chromium / Chrome via Puppeteer; output under `_drafts/`, gitignored):

```sh
npm run pdf:article -- <slug>
```

Example: `npm run pdf:article -- ai-needs-better-context`

## Deployment

Pushes to `main` are automatically built and deployed to GitHub Pages.

The custom domain is `didac-crst.com`.

Cloudflare DNS is managed outside this repository. The current production security-header configuration is documented in [`docs/cloudflare-security-headers.md`](docs/cloudflare-security-headers.md).

## Content

- Writing: `src/content/writing/`
- Projects: `src/projects.ts` and `src/pages/projects/`
- Home stance / motto: `src/home.config.json`
- Site identity, SEO titles, Person schema fields, social URLs: `src/site.config.ts`
- Structured data helpers: `src/lib/structured-data.ts`

Articles support metadata such as:

- living article status
- version
- updated date
- discussion URL
- source/resources
- version history

The article template intentionally supports RSS, reading time, last updated dates, share links, citations, GitHub discussion links, resources, related articles, and version history. It intentionally does not include public view counts, likes, comments, newsletter popups, or engagement counters.

## Design principles

- Static-first and minimal client-side JavaScript.
- Site-wide styling should be driven by tokens in `src/styles/tokens.css`.
- Dark is the default theme; light is an explicit opt-in (no system-follow option).
- Keep page/layout width separate from long-form reading width.
- Prefer reusable components over page-specific styling.
- Keep article body text justified (`text-align: justify`); keep headings left-aligned and visually prominent; center tables as blocks (cell text stays left).
- Preserve accessibility and reduced-motion behavior.
- Avoid unnecessary dependencies.

Writing and visual standards:

- [`ARTICLE_GUIDELINES.md`](ARTICLE_GUIDELINES.md) / [`docs/writing-guidelines.md`](docs/writing-guidelines.md)
- [`VISUAL_GUIDELINES.md`](VISUAL_GUIDELINES.md) / [`docs/visual-guidelines.md`](docs/visual-guidelines.md)
- Editable diagram sources: [`visuals/`](visuals/)

## Scope

Do not add unless explicitly required:

- backend services
- analytics/tracking
- newsletter infrastructure
- likes or public view counters
- inline comment systems
- Cloudflare automation
- secrets

Discussion may be linked through GitHub rather than embedded as a comment platform.

## Review workflow

Feature work should normally be done in branches and merged through pull requests.

CodeRabbit automatic review is disabled; request a manual full review once implementation, checks, and visual validation are complete.

## Structure

```txt
.
├── .github/workflows/deploy.yml
├── docs/
├── public/
│   ├── CNAME
│   ├── brand/
│   ├── favicon.ico
│   ├── images/
│   ├── og/
│   └── robots.txt
├── scripts/
├── src/
│   ├── assets/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   ├── lib/
│   ├── pages/
│   ├── styles/
│   ├── content.config.ts
│   ├── home.config.json
│   ├── projects.ts
│   └── site.config.ts
├── visuals/
│   ├── published/
│   └── sources/
├── ARTICLE_GUIDELINES.md
├── VISUAL_GUIDELINES.md
├── astro.config.mjs
├── package.json
└── tsconfig.json
```
