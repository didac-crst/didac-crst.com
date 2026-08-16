const defaultFallback =
  "Explore knowledge engineering, information architecture, decision intelligence, and AI-augmented systems by Didac Cristobal.";

export function ensureMetaDescription(description: string, fallback = defaultFallback) {
  const normalized = description.trim().replace(/\s+/g, " ");

  if (normalized.length >= 100) {
    return normalized;
  }

  return `${normalized} ${fallback}`.trim();
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
