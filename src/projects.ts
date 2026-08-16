export type Project = {
  name: string;
  slug: string;
  description: string;
  summary: string;
  status: "planned" | "active" | "archived";
  statusLabel: string;
  externalUrl?: string;
  githubUrl?: string;
  programmingLanguage?: string[];
  license?: string;
  keywords?: string[];
  image?: {
    src: string;
    alt: string;
  };
};

export const projects: Project[] = [
  {
    name: "AtlasDocs",
    slug: "atlasdocs",
    description: "Document intelligence and knowledge architecture.",
    summary:
      "An open-source exploration of turning documents and metadata into trusted knowledge while combining deterministic processing with AI only where it adds value.",
    status: "active",
    statusLabel: "Open source · Early development",
    keywords: [
      "document intelligence",
      "knowledge architecture",
      "information architecture",
      "deterministic systems",
      "AI-enhanced systems"
    ]
  }
];
