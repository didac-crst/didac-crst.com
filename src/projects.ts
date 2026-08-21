export type Project = {
  name: string;
  slug: string;
  description: string;
  status: "planned" | "active" | "archived";
  tags: string[];
  /** First public / repo start date */
  started: Date;
  /** Last meaningful update (curated, like article `updated`) */
  updated: Date;
  version?: string;
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
    description:
      "When documents stop being files and become knowledge — a semantic layer on top of Paperless-ngx for entities, relationships, and provenance.",
    status: "active",
    tags: ["Open source", "Early development", "Knowledge Architecture"],
    started: new Date("2026-08-07"),
    updated: new Date("2026-08-21"),
    version: "v0.4",
    githubUrl: "https://github.com/didac-crst/atlas-docs",
    programmingLanguage: ["Python", "TypeScript"],
    keywords: [
      "document intelligence",
      "knowledge architecture",
      "Paperless-ngx",
      "semantic layer",
      "information architecture"
    ]
  }
];
