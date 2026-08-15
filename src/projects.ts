export type Project = {
  name: string;
  slug: string;
  description: string;
  status: "planned" | "active" | "archived";
  externalUrl?: string;
  githubUrl?: string;
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
      "A public placeholder for an information architecture and documentation systems project. Details will be added as the project matures.",
    status: "planned"
  }
];
