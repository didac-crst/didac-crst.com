export const SITE = {
  name: "Didac Cristobal",
  fullName: "Didac Cristóbal Canals",
  domain: "https://didac-crst.com",
  title: "Didac Cristobal",
  description:
    "Knowledge systems, information architecture, and applied AI for turning fragmented information into structured, traceable, usable knowledge.",
  github: "https://github.com/didac-crst",
  linkedin: "https://linkedin.com/in/didac-crst",
  repository: "https://github.com/didac-crst/didac-crst.com",
  logo: "/brand/dc-logo.png",
  faviconIco: "/favicon.ico",
  favicon16: "/brand/favicon-16.png",
  favicon32: "/brand/favicon-32.png",
  favicon48: "/brand/favicon-48.png",
  appleTouchIcon: "/brand/apple-touch-icon.png",
  defaultOgImage: "/brand/og-default.png"
} as const;

export const NAVIGATION = [
  { label: "Home", href: "/" },
  { label: "Writing", href: "/writing/" },
  { label: "Projects", href: "/projects/" },
  { label: "About", href: "/about/" }
] as const;
