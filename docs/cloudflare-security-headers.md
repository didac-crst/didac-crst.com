# Cloudflare security headers

GitHub Pages cannot set custom response headers from this Astro build. Security headers are therefore configured at Cloudflare.

This document records the production security configuration and the design decisions behind it so it can be reproduced after migrations or infrastructure changes. The project does not call the Cloudflare API.

## Design principles

This website follows a conservative hardening strategy:

- enable low-risk security headers;
- keep the configuration understandable;
- avoid policies that require continuous maintenance (such as CSP) until they provide clear value.

## Prerequisites

Visitor-facing hostnames must use **Proxied** (orange-cloud) Cloudflare DNS records. DNS-only records bypass Cloudflare response transforms and managed security headers.

## Production configuration

### 1. Managed Security Headers

Provides baseline browser hardening:

- prevent MIME sniffing;
- prevent framing by other sites;
- restrict referrer information.

Configured in Cloudflare:

Cloudflare Dashboard → **Rules** → **Settings** → **Managed Transforms** → **HTTP response headers** → **Add security headers**

Response headers:

```txt
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Referrer-Policy: same-origin
```

`Referrer-Policy: same-origin` is chosen because this website does not require referrer information to be sent to third-party origins.

Do not duplicate these with custom response-header rules unless there is a specific reason to override them.

### 2. HSTS

Ensures browsers always use HTTPS for this domain after the first successful visit.

Configured in Cloudflare:

Cloudflare Dashboard → **SSL/TLS** → **Edge Certificates** → **HTTP Strict Transport Security (HSTS)**

Response header:

```txt
Strict-Transport-Security: max-age=31536000
```

Settings:

- HSTS enabled
- Max age: 12 months (`31536000`)
- `includeSubDomains`: disabled
- Preload: disabled
- No-Sniff option: disabled, because `X-Content-Type-Options` is already provided by Managed Security Headers

### 3. Permissions-Policy

Restricts browser capabilities that are not required by this static website.

Configured in Cloudflare:

Cloudflare Dashboard → **Rules** → **Transform Rules** → **Modify Response Header**

- **Rule name:** `didac-crst permissions policy`
- **Match:** hostname is in:
  - `didac-crst.com`
  - `www.didac-crst.com`
- **Action:** **Set static**

Response header:

```txt
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
```

The rule is intentionally scoped to the public website hostnames so it does not affect unrelated proxied subdomains or services.

## Verify

`curl` is the authoritative verification because it inspects the actual HTTP response:

```sh
curl -sI https://didac-crst.com/
```

Expected headers include:

```txt
x-content-type-options: nosniff
x-frame-options: SAMEORIGIN
referrer-policy: same-origin
strict-transport-security: max-age=31536000
permissions-policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
```

[SecurityHeaders.com](https://securityheaders.com/?q=https://didac-crst.com&followRedirects=on) can be used as a quick external smoke test. An **A** rating is the intended baseline. **Content-Security-Policy** is intentionally deferred because an incorrect CSP is more harmful than having no CSP. It should be introduced only after a dedicated design and testing phase.

## Out of scope for now

### Content-Security-Policy

CSP is intentionally deferred.

It can provide stronger XSS protection, but it requires careful allowlists for Astro inline scripts, theme logic, future analytics, embeds, fonts, and other external assets. Introduce it separately and test before deployment.

### Automation

Cloudflare API, Workers, or infrastructure-as-code changes are intentionally out of scope. The current configuration is applied manually in the Cloudflare dashboard and documented here.
