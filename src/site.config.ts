export const SITE = {
  name: "Didac Cristobal",
  fullName: "Didac Cristóbal Canals",
  domain: "https://didac-crst.com",
  /** Short brand — used as `| ${SITE.title}` on inner pages */
  title: "Didac Cristobal",
  /** Home / default document title — stronger SEO signal than the name alone */
  homeTitle: "Didac Cristobal | Engineering Systems into Trusted Knowledge",
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
  email: "contact@didac-crst.com",
  jobTitle: "Knowledge Architect",
  homeLocation: {
    locality: "Toulouse",
    country: "FR",
    countryName: "France"
  },
  knowsLanguage: [
    "English",
    "French",
    "German",
    "Spanish",
    "Catalan",
    "Italian"
  ] as const,
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
