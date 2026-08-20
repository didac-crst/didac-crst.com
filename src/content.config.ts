import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const writing = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/writing" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    language: z.string().default("en"),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    /** Wrap content before the first h2 as a narrative lead. Default: on when such content exists. */
    storyLead: z.boolean().optional(),
    translations: z.array(z.string()).optional(),
    series: z.string().optional(),
    /** Editorial pointer to the next piece in a series (rendered outside article prose). */
    seriesNext: z
      .object({
        title: z.string(),
        description: z.string(),
        /** When set and published, the title becomes a link to `/writing/{slug}/`. */
        slug: z.string().optional()
      })
      .optional(),
    featured: z.boolean().optional(),
    /** Optional article hero (below header, before prose). Flagship / Principle pieces. */
    hero: z
      .object({
        /** Path under public/, e.g. /images/writing/slug--hero.webp */
        src: z.string(),
        /** PNG/JPEG fallback when src is WebP/AVIF */
        fallback: z.string().optional(),
        alt: z.string(),
        width: z.number().int().positive().optional(),
        height: z.number().int().positive().optional()
      })
      .optional(),
    canonical: z.url().optional(),
    living: z.boolean().default(false),
    version: z.string().optional(),
    discussionUrl: z.url().optional(),
    sourceUrl: z.url().optional(),
    resources: z
      .array(
        z.object({
          label: z.string(),
          url: z.url()
        })
      )
      .optional(),
    versionHistory: z
      .array(
        z.object({
          version: z.string(),
          date: z.coerce.date(),
          notes: z.string()
        })
      )
      .optional()
  })
});

export const collections = { writing };
