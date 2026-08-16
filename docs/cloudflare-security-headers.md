# Cloudflare security headers

GitHub Pages cannot set custom response headers from this Astro build. Apply these with a Cloudflare **Transform Rule** → **Modify Response Header** (or equivalent Response Header transform) on `didac-crst.com`.

This repository documents the intended values for reproducibility. Do not expect them to appear until they are configured in the Cloudflare dashboard. This project does not call the Cloudflare API.

## Recommended headers

| Header | Value |
|--------|--------|
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | See below |

### Permissions-Policy (conservative)

Disable powerful browser features this static site does not use:

```txt
accelerometer=(), autoplay=(), camera=(), display-capture=(), encrypted-media=(), fullscreen=(), geolocation=(), gyroscope=(), interest-cohort=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), sync-xhr=(), usb=(), web-share=(), xr-spatial-tracking=()
```

If a future page needs a capability (for example `fullscreen`), re-enable only that directive.

## Suggested Cloudflare setup

1. Cloudflare Dashboard → **Rules** → **Transform Rules** → **Modify Response Header**.
2. Rule name: `didac-crst security headers`.
3. Match: hostname equals `didac-crst.com` (and `www` if used).
4. Then set each header above (set static / set once).

## Out of scope for now

- **Content-Security-Policy** — useful next hardening step; needs careful allowlists for inline theme scripts and any future assets. Add later, not in the first pass.
- Automated application via Cloudflare API or Workers — intentionally avoided so this site stays a static GitHub Pages deploy.
