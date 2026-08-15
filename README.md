# didac-crst.com

Personal website, technical writing, and open-source projects.

## Development

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
```

## Preview

```sh
npm run preview
```

## Deployment

Automatically deployed to GitHub Pages from `main`.

Before the first deployment, configure the repository on GitHub:

1. Create `didac-crst/didac-crst.com`.
2. In repository settings, set Pages source to GitHub Actions.
3. Configure the custom domain as `didac-crst.com`.
4. Configure Cloudflare DNS separately to point the root domain to GitHub Pages.

Then push:

```sh
git init
git remote add origin git@github.com:didac-crst/didac-crst.com.git
git branch -M main
git add .
git commit -m "Scaffold Astro personal site"
git push -u origin main
```

## Cursor Handoff

Open this repository in Cursor and keep the scope narrow:

- Edit site-wide identity and social links in `src/site.config.ts`.
- Add long-form writing in `src/content/writing/`.
- Use article metadata for credibility features: `living`, `version`, `discussionUrl`, `sourceUrl`, `resources`, and `versionHistory`.
- Add project metadata in `src/projects.ts` and project pages in `src/pages/projects/`.
- Keep visual changes token-driven through `src/styles/tokens.css`.
- Run `npm run check` and `npm run build` before pushing.
- Do not add secrets, analytics, backend services, or Cloudflare automation unless explicitly required later.

The article template intentionally supports RSS, reading time, last updated dates, share links, citations, GitHub discussion links, resources, related articles, and version history. It intentionally does not include public view counts, likes, comments, newsletter popups, or engagement counters.

## Structure

```txt
.
├── .github/workflows/deploy.yml
├── public/
│   ├── CNAME
│   ├── favicon.svg
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
