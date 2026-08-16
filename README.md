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

## Preview

```sh
npm run preview
```

## Deployment

Pushes to `main` are automatically built and deployed to GitHub Pages.

The custom domain is `didac-crst.com`.

Cloudflare DNS is managed outside this repository. The current production security-header configuration is documented in [`docs/cloudflare-security-headers.md`](docs/cloudflare-security-headers.md).

## Content

- Writing: `src/content/writing/`
- Projects: `src/projects.ts` and `src/pages/projects/`
- Site identity and social URLs: `src/site.config.ts`

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
- Keep page/layout width separate from long-form reading width.
- Prefer reusable components over page-specific styling.
- Keep body text left-aligned; do not justify prose.
- Preserve accessibility and reduced-motion behavior.
- Avoid unnecessary dependencies.

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
├── public/
│   ├── CNAME
│   ├── favicon.svg
│   ├── og/
│   ├── robots.txt
│   └── images/
├── src/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   ├── pages/
│   ├── styles/
│   ├── content.config.ts
│   ├── projects.ts
│   └── site.config.ts
├── astro.config.mjs
├── package.json
└── tsconfig.json
```
