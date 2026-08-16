import type { CollectionEntry } from "astro:content";
import type { Project } from "@/projects";
import { SITE } from "@/site.config";

export type JsonLd = Record<string, unknown>;

const personId = `${SITE.domain}/#person`;
const websiteId = `${SITE.domain}/#website`;

export function absoluteUrl(path: string) {
  return new URL(path, SITE.domain).toString();
}

export function personJsonLd(): JsonLd {
  return {
    "@type": "Person",
    "@id": personId,
    name: SITE.name,
    alternateName: SITE.fullName,
    url: SITE.domain,
    image: absoluteUrl(SITE.portrait),
    sameAs: [SITE.github, SITE.linkedin],
    knowsAbout: [...SITE.knowsAbout]
  };
}

export function websiteJsonLd(): JsonLd {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    name: SITE.title,
    url: SITE.domain,
    description: SITE.description,
    inLanguage: "en",
    author: { "@id": personId },
    publisher: { "@id": personId }
  };
}

export function homeJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@graph": [personJsonLd(), websiteJsonLd()]
  };
}

export function personPageJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    ...personJsonLd()
  };
}

type ArticleJsonLdInput = {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified: string;
};

export function articleJsonLd(input: ArticleJsonLdInput): JsonLd {
  const person = personJsonLd();

  return {
    "@type": "Article",
    headline: input.title,
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    image: absoluteUrl(input.image),
    author: person,
    publisher: person,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": input.url
    }
  };
}

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export function breadcrumbJsonLd(items: BreadcrumbItem[]): JsonLd {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}

export function articlePageJsonLd(
  article: CollectionEntry<"writing">,
  articleSlug: string
): JsonLd {
  const url = absoluteUrl(`/writing/${articleSlug}/`);
  const image = `/og/writing/${articleSlug}.png`;
  const { title, description, published, updated } = article.data;

  return {
    "@context": "https://schema.org",
    "@graph": [
      articleJsonLd({
        title,
        description,
        url,
        image,
        datePublished: published.toISOString(),
        dateModified: (updated ?? published).toISOString()
      }),
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Writing", path: "/writing/" },
        { name: title, path: `/writing/${articleSlug}/` }
      ])
    ]
  };
}

export function projectJsonLd(project: Project): JsonLd {
  const data: JsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.name,
    description: project.summary,
    url: absoluteUrl(`/projects/${project.slug}/`),
    author: personJsonLd()
  };

  if (project.githubUrl) {
    data.codeRepository = project.githubUrl;
  }

  if (project.programmingLanguage?.length) {
    data.programmingLanguage = project.programmingLanguage;
  }

  if (project.license) {
    data.license = project.license;
  }

  if (project.keywords?.length) {
    data.keywords = project.keywords.join(", ");
  }

  return data;
}
