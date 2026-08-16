import { mkdir, readFile, readdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const home = JSON.parse(
  await readFile(path.join(root, "src/home.config.json"), "utf8")
);
const siteConfig = await readFile(path.join(root, "src/site.config.ts"), "utf8");

const readSiteString = (key) => {
  const match = siteConfig.match(new RegExp(`${key}:\\s*"([^"]+)"`));
  if (!match) {
    throw new Error(`Could not find SITE.${key} in src/site.config.ts`);
  }
  return match[1];
};

const SITE = {
  name: readSiteString("name"),
  domain: readSiteString("domain"),
  logo: readSiteString("logo")
};

const escapeXml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const width = 1200;
const height = 630;
const logoSize = 112;
const logoX = 73;
const logoY = 85;
const textX = 218;
const nameY = 177;
const mottoY = 282;
const pillY = 384;
const pillHeight = 52;
const pillGap = 14;
const urlY = 512;

const colors = {
  background: "#030708",
  white: "#ffffff",
  cyan: "#6bc7b3",
  beige: "#d8be9f",
  beigeBorder: "rgba(216, 190, 159, 0.78)"
};

const logoPath = path.join(root, "public", SITE.logo.replace(/^\//, ""));
const logo = await sharp(logoPath)
  .resize(logoSize, logoSize, { fit: "contain" })
  .png()
  .toBuffer();
const logoData = `data:image/png;base64,${logo.toString("base64")}`;
const smallLogo = await sharp(logoPath)
  .resize(96, 96, { fit: "contain" })
  .png()
  .toBuffer();
const smallLogoData = `data:image/png;base64,${smallLogo.toString("base64")}`;

const mottoLines = Array.isArray(home.motto)
  ? home.motto
  : [String(home.motto)];
const pillars = home.pillars;

if (!Array.isArray(pillars) || pillars.length !== 3) {
  throw new Error("src/home.config.json must define exactly three pillars.");
}

const estimateTextWidth = (text, fontSize, weight = 500) => {
  const weightFactor = weight >= 650 ? 0.62 : 0.58;
  return Math.round(text.length * fontSize * weightFactor);
};

const wrapText = (text, maxWidth, fontSize, weight = 500, maxLines = 3) => {
  const words = String(text).replace(/\s+/g, " ").trim().split(" ");
  const lines = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (estimateTextWidth(candidate, fontSize, weight) <= maxWidth || !current) {
      current = candidate;
    } else {
      lines.push(current);
      current = word;
    }
  }

  if (current) {
    lines.push(current);
  }

  if (lines.length > maxLines) {
    const visible = lines.slice(0, maxLines);
    visible[maxLines - 1] = `${visible[maxLines - 1].replace(/[.,;:]?$/, "")}...`;
    return visible;
  }

  return lines;
};

const renderPills = ({ items, x, y, fontSize = 18, height = 52, gap = 14 }) => {
  let nextX = x;

  return items
    .map((item) => {
      const pillWidth = estimateTextWidth(item, fontSize, 500) + 46;
      const pill = `
        <g>
          <rect x="${nextX}" y="${y}" width="${pillWidth}" height="${height}" rx="${height / 2}"
            fill="transparent" stroke="${colors.beigeBorder}" stroke-width="1.5" />
          <text x="${nextX + pillWidth / 2}" y="${y + Math.round(height * 0.64)}" text-anchor="middle"
            font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="650"
            fill="${colors.beige}">${escapeXml(item)}</text>
        </g>`;
      nextX += pillWidth + gap;
      return pill;
    })
    .join("");
};

const pills = renderPills({
  items: pillars,
  x: textX,
  y: pillY,
  fontSize: 18,
  height: pillHeight,
  gap: pillGap
});

const domain = SITE.domain.replace(/^https?:\/\//, "").replace(/\/$/, "");

const motto = mottoLines
  .map(
    (line, index) => `
      <text x="${textX}" y="${mottoY + index * 55}"
        font-family="Arial, Helvetica, sans-serif" font-size="44" font-weight="700"
        fill="${colors.cyan}">${escapeXml(line)}</text>`
  )
  .join("");

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <radialGradient id="logoGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
      gradientTransform="translate(132 140) rotate(90) scale(246 290)">
      <stop offset="0" stop-color="${colors.cyan}" stop-opacity="0.42" />
      <stop offset="0.56" stop-color="${colors.cyan}" stop-opacity="0.16" />
      <stop offset="1" stop-color="${colors.cyan}" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="backgroundFade" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#06110f" />
      <stop offset="0.42" stop-color="${colors.background}" />
      <stop offset="1" stop-color="#010303" />
    </linearGradient>
    <filter id="textShadow" x="-10%" y="-20%" width="120%" height="150%">
      <feDropShadow dx="0" dy="6" stdDeviation="7" flood-color="#000000" flood-opacity="0.35" />
    </filter>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#backgroundFade)" />
  <rect width="${width}" height="${height}" fill="url(#logoGlow)" />
  <image href="${logoData}" x="${logoX}" y="${logoY}" width="${logoSize}" height="${logoSize}" />
  <g filter="url(#textShadow)">
    <text x="${textX}" y="${nameY}"
      font-family="Arial, Helvetica, sans-serif" font-size="94" font-weight="700"
      letter-spacing="-1" fill="${colors.white}">${escapeXml(SITE.name)}</text>
    ${motto}
    ${pills}
    <text x="${textX}" y="${urlY}"
      font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="400"
      fill="${colors.beige}" opacity="0.92">${escapeXml(domain)}</text>
  </g>
</svg>`;

const output = path.join(root, "public/brand/og-default.png");
await sharp(Buffer.from(svg)).png().toFile(output);

console.log(`Generated ${path.relative(root, output)} from src/home.config.json`);

const frontmatterValue = (value) => {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  return trimmed;
};

const parseFrontmatter = (source) => {
  const match = source.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};

  const data = {};
  const lines = match[1].split("\n");

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const field = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!field) continue;

    const [, key, rawValue] = field;
    if (rawValue) {
      data[key] = frontmatterValue(rawValue);
      continue;
    }

    const list = [];
    let cursor = index + 1;
    while (cursor < lines.length) {
      const item = lines[cursor].match(/^\s+-\s*(.+)$/);
      if (!item) break;
      list.push(frontmatterValue(item[1]));
      cursor += 1;
    }
    data[key] = list;
    index = cursor - 1;
  }

  return data;
};

const listArticleFiles = async (directory, prefix = "") => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const relative = path.join(prefix, entry.name);
    const absolute = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await listArticleFiles(absolute, relative)));
    } else if (/\.(md|mdx)$/i.test(entry.name)) {
      files.push(relative);
    }
  }

  return files;
};

const getSlug = (file) => file.replace(/\.(md|mdx)$/i, "").replace(/\/index$/i, "");

const renderArticleCard = async ({ slug, title, description, tags }) => {
  const articleLogoX = 106;
  const articleTextX = 228;
  const labelY = 111;
  const titleY = 178;
  const titleLines = wrapText(title, 790, 55, 700, 3);
  const titleLineHeight = 62;
  const descriptionY = titleY + titleLines.length * titleLineHeight + 42;
  const descriptionLines = wrapText(description, 820, 30, 400, titleLines.length >= 3 ? 1 : 2);
  const tagY = descriptionY + descriptionLines.length * 40 + 24;
  const articleUrl = domain;

  const titleMarkup = titleLines
    .map(
      (line, index) => `
        <text x="${articleTextX}" y="${titleY + index * titleLineHeight}"
          font-family="Arial, Helvetica, sans-serif" font-size="58" font-weight="700"
          letter-spacing="-0.5" fill="${colors.white}">${escapeXml(line)}</text>`
    )
    .join("");

  const descriptionMarkup = descriptionLines
    .map(
      (line, index) => `
        <text x="${articleTextX}" y="${descriptionY + index * 40}"
          font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="400"
          fill="${colors.cyan}" opacity="0.96">${escapeXml(line)}</text>`
    )
    .join("");

  const articleSvg = `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <radialGradient id="logoGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
        gradientTransform="translate(122 126) rotate(90) scale(230 275)">
        <stop offset="0" stop-color="${colors.cyan}" stop-opacity="0.34" />
        <stop offset="0.58" stop-color="${colors.cyan}" stop-opacity="0.12" />
        <stop offset="1" stop-color="${colors.cyan}" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="backgroundFade" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#06110f" />
        <stop offset="0.42" stop-color="${colors.background}" />
        <stop offset="1" stop-color="#010303" />
      </linearGradient>
      <filter id="textShadow" x="-10%" y="-20%" width="120%" height="150%">
        <feDropShadow dx="0" dy="6" stdDeviation="7" flood-color="#000000" flood-opacity="0.32" />
      </filter>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#backgroundFade)" />
    <rect width="${width}" height="${height}" fill="url(#logoGlow)" />
    <image href="${smallLogoData}" x="${articleLogoX}" y="88" width="96" height="96" />
    <g filter="url(#textShadow)">
      <text x="${articleTextX}" y="${labelY}"
        font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700"
        letter-spacing="2.5" fill="${colors.cyan}">WRITING</text>
      ${titleMarkup}
      ${descriptionMarkup}
      ${renderPills({
        items: tags.slice(0, 3),
        x: articleTextX,
        y: tagY,
        fontSize: 16,
        height: 44,
        gap: 12
      })}
      <text x="${articleTextX}" y="560"
        font-family="Arial, Helvetica, sans-serif" font-size="25" font-weight="650"
        fill="${colors.white}" opacity="0.95">${escapeXml(SITE.name)}</text>
      <text x="${articleTextX}" y="594"
        font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="400"
        fill="${colors.beige}" opacity="0.92">${escapeXml(articleUrl)}</text>
    </g>
  </svg>`;

  const outputPath = path.join(root, "public/og/writing", `${slug}.png`);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await sharp(Buffer.from(articleSvg)).png().toFile(outputPath);
  console.log(`Generated ${path.relative(root, outputPath)}`);
};

const writingDir = path.join(root, "src/content/writing");
const articleOutputDir = path.join(root, "public/og/writing");
await rm(articleOutputDir, { recursive: true, force: true });
await mkdir(articleOutputDir, { recursive: true });

for (const file of await listArticleFiles(writingDir)) {
  const source = await readFile(path.join(writingDir, file), "utf8");
  const data = parseFrontmatter(source);

  if (data.draft) continue;
  if (!data.title || !data.description) {
    throw new Error(`${file} must define title and description to generate an OG image.`);
  }

  await renderArticleCard({
    slug: getSlug(file),
    title: data.title,
    description: data.description,
    tags: Array.isArray(data.tags) ? data.tags : []
  });
}
