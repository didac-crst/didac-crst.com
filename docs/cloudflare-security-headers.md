# Cloudflare security headers

GitHub Pages cannot set custom response headers from this Astro build. Apply these with a Cloudflare **Transform Rule** → **Modify Response Header** (or equivalent Response Header transform) on `didac-crst.com`.

This repository documents the intended values for reproducibility. Do not expect them to appear until they are configured in the Cloudflare dashboard. This project does not call the Cloudflare API.

## Prerequisites

Every visitor-facing hostname covered by the rule must use a **Proxied** (orange-cloud) Cloudflare DNS record. **DNS-only** (grey-cloud) records bypass Transform Rules, so the headers will not be applied.

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

1. Confirm each visitor-facing hostname (`didac-crst.com`, and `www` if used) has a **Proxied** DNS record that will match the rule.
2. Cloudflare Dashboard → **Rules** → **Transform Rules** → **Modify Response Header**.
3. Rule name: `didac-crst security headers`.
4. Match: hostname equals `didac-crst.com` (and `www` if used).
5. For each header above, use **Set static** so the value overwrites any existing header of the same name. Do **not** use **Add static**, which preserves existing values.

## Verify

After deploying the rule, confirm each header is present with the expected value on every visitor-facing host (apex and `www` if used):

```sh
permissions_policy='accelerometer=(), autoplay=(), camera=(), display-capture=(), encrypted-media=(), fullscreen=(), geolocation=(), gyroscope=(), interest-cohort=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), sync-xhr=(), usb=(), web-share=(), xr-spatial-tracking=()'

verify_host() {
  host="$1"
  headers="$(curl -fsS -D - -o /dev/null "https://${host}/" | tr -d '\r')"
  for expected in \
    'X-Content-Type-Options: nosniff' \
    'Referrer-Policy: strict-origin-when-cross-origin' \
    "Permissions-Policy: ${permissions_policy}"
  do
    printf '%s\n' "$headers" | rg -i -F -q -- "$expected" || {
      echo "Missing or incorrect on ${host}: ${expected}" >&2
      return 1
    }
  done
  echo "OK ${host}"
}

verify_host didac-crst.com
verify_host www.didac-crst.com
```

Skip the `www` check if that hostname is not visitor-facing.

## Out of scope for now

- **Content-Security-Policy** — useful next hardening step; needs careful allowlists for inline theme scripts and any future assets. Add later, not in the first pass.
- Automated application via Cloudflare API or Workers — intentionally avoided so this site stays a static GitHub Pages deploy.
