#!/usr/bin/env python3
"""Generate circular favicon set from the simplified DC draft mark.

Only writes favicon assets (not apple-touch / PWA icons).

Local/manual use (not wired into npm — source lives under gitignored `_drafts/`
and requires Pillow):

    python3 scripts/generate-favicons.py

Committed favicon outputs under public/brand/ and public/favicon.ico are the
source of truth for builds.
"""

from __future__ import annotations

import base64
from io import BytesIO
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "_drafts" / "Codex Image 21 Aug 2026, 15_42_53.png"
BRAND = ROOT / "public" / "brand"
PUBLIC = ROOT / "public"

# Near-white outside the rounded plate → transparent
WHITE_LUMA_THRESHOLD = 240

PNG_SIZES = {
    "favicon-16.png": 16,
    "favicon-32.png": 32,
    "favicon-48.png": 48,
    "favicon-96.png": 96,
}

ICO_SIZES = [16, 32, 48, 64, 128, 256]
MASTER_SIZE = 512


def luma(r: int, g: int, b: int) -> float:
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def to_transparent_plate(src: Image.Image) -> Image.Image:
    """Remove light background; keep the dark plate + mark."""
    img = src.convert("RGBA")
    pixels = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if luma(r, g, b) >= WHITE_LUMA_THRESHOLD:
                pixels[x, y] = (0, 0, 0, 0)
    return img


def to_circle(img: Image.Image) -> Image.Image:
    """Mask to a circle; transparent outside."""
    w, h = img.size
    size = min(w, h)
    left = (w - size) // 2
    top = (h - size) // 2
    square = img.crop((left, top, left + size, top + size))

    mask = Image.new("L", (size, size), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, size - 1, size - 1), fill=255)

    out = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    out.paste(square, (0, 0), mask=mask)
    return out


def resize_rgba(img: Image.Image, size: int) -> Image.Image:
    return img.resize((size, size), Image.Resampling.LANCZOS)


def write_svg(circle: Image.Image, svg_path: Path) -> None:
    """Self-contained SVG favicon (circle + embedded PNG mark)."""
    embed = resize_rgba(circle, 256)
    buf = BytesIO()
    embed.save(buf, format="PNG", optimize=True)
    b64 = base64.b64encode(buf.getvalue()).decode("ascii")
    svg = f"""<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" role="img" aria-label="Didac Cristobal">
  <circle cx="128" cy="128" r="128" fill="#050506"/>
  <image href="data:image/png;base64,{b64}" width="256" height="256" />
</svg>
"""
    svg_path.write_text(svg, encoding="utf-8")


def main() -> None:
    if not SOURCE.exists():
        raise SystemExit(f"Missing source image: {SOURCE}")

    BRAND.mkdir(parents=True, exist_ok=True)

    plate = to_transparent_plate(Image.open(SOURCE))
    circle = to_circle(plate)

    master_path = BRAND / "favicon-master.png"
    resize_rgba(circle, MASTER_SIZE).save(master_path, optimize=True)
    print(f"wrote {master_path.relative_to(ROOT)}")

    for name, size in PNG_SIZES.items():
        out = BRAND / name
        resize_rgba(circle, size).save(out, optimize=True)
        print(f"wrote {out.relative_to(ROOT)} ({size}x{size})")

    largest = resize_rgba(circle, max(ICO_SIZES))
    ico_path = PUBLIC / "favicon.ico"
    largest.save(ico_path, format="ICO", sizes=[(s, s) for s in ICO_SIZES])
    print(f"wrote {ico_path.relative_to(ROOT)} sizes={ICO_SIZES}")

    svg_path = BRAND / "favicon.svg"
    write_svg(circle, svg_path)
    print(f"wrote {svg_path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
