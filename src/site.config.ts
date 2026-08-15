export const SITE = {
  name: "Didac Cristóbal Canals",
  domain: "https://didac-crst.com",
  title: "Didac Cristóbal Canals",
  description:
    "Knowledge systems, information architecture, and applied AI for turning fragmented information into structured, traceable, usable knowledge.",
  github: "https://github.com/didac-crst",
  linkedin: "https://linkedin.com/in/didac-crst",
  repository: "https://github.com/didac-crst/didac-crst.com"
} as const;

export const NAVIGATION = [
  { label: "Home", href: "/" },
  { label: "Writing", href: "/writing/" },
  { label: "Projects", href: "/projects/" },
  { label: "About", href: "/about/" }
] as const;
