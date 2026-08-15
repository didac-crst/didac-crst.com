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
    translations: z.array(z.string()).optional(),
    series: z.string().optional(),
    featured: z.boolean().optional(),
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
