export const SITE = {
  name: "Didac Cristobal",
  fullName: "Didac Cristóbal Canals",
  domain: "https://didac-crst.com",
  title: "Didac Cristobal",
  description:
    "Engineering systems that transform information into trusted knowledge.",
  github: "https://github.com/didac-crst",
  linkedin: "https://linkedin.com/in/didac-crst",
  repository: "https://github.com/didac-crst/didac-crst.com",
  logo: "/brand/dc-logo.png",
  portrait: "/images/didac-cristobal.webp",
  faviconIco: "/favicon.ico",
  favicon16: "/brand/favicon-16.png",
  favicon32: "/brand/favicon-32.png",
  favicon48: "/brand/favicon-48.png",
  appleTouchIcon: "/brand/apple-touch-icon.png",
  defaultOgImage: "/brand/og-default.png",
  knowsAbout: [
    "Knowledge Engineering",
    "Information Architecture",
    "Software Architecture",
    "Decision Intelligence",
    "AI-Enhanced Systems",
    "Open Source"
  ] as const
} as const;

export const NAVIGATION = [
  { label: "Home", href: "/" },
  { label: "Writing", href: "/writing/" },
  { label: "Projects", href: "/projects/" },
  { label: "About", href: "/about/" }
] as const;
