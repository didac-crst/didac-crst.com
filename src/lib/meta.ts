const defaultFallback =
  "Knowledge engineering, information architecture, and AI-enhanced systems by Didac Cristobal.";

/** Preferred SEO band; not a pad-to-length requirement. */
export const META_DESCRIPTION_MIN = 100;
export const META_DESCRIPTION_TARGET_MAX = 160;
export const META_DESCRIPTION_HARD_MAX = 170;

function normalizeWhitespace(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function truncateAtWord(text: string, max: number) {
  if (text.length <= max) {
    return text;
  }

  const slice = text.slice(0, max);
  const lastSpace = slice.lastIndexOf(" ");
  const cut = lastSpace > Math.floor(max * 0.6) ? slice.slice(0, lastSpace) : slice.trimEnd();

  return `${cut.replace(/[.,;:!?…-]+$/u, "")}…`;
}

/**
 * Compose a meta description deterministically.
 * - Preferred length: 130–160 characters
 * - Hard maximum: ~170 (word-boundary cut)
 * - Fallback only when the source is under ~100 characters
 * - Never pad a natural mid-length description just to hit 130
 */
export function ensureMetaDescription(description: string, fallback = defaultFallback) {
  let normalized = normalizeWhitespace(description);

  if (normalized.length < META_DESCRIPTION_MIN) {
    const supplement = normalizeWhitespace(fallback);
    const combined = normalizeWhitespace(
      normalized.toLowerCase().includes(supplement.toLowerCase().slice(0, 32))
        ? normalized
        : `${normalized} ${supplement}`
    );
    normalized = combined;
  }

  if (normalized.length > META_DESCRIPTION_HARD_MAX) {
    return truncateAtWord(normalized, META_DESCRIPTION_TARGET_MAX);
  }

  return normalized;
}

export function joinOxford(items: string[]) {
  if (items.length <= 1) {
    return items[0] ?? "";
  }

  if (items.length === 2) {
    return `${items[0]} and ${items[1]}`;
  }

  return `${items.slice(0, -1).join(", ")}, and ${items.at(-1)}`;
}
