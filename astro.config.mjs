import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { unified } from "@astrojs/markdown-remark";
import { rehypeArticleStory } from "./src/lib/rehype-article-story.mjs";
import { rehypeWrapTables } from "./src/lib/rehype-wrap-tables.mjs";

export default defineConfig({
  site: "https://didac-crst.com",
  integrations: [mdx(), sitemap()],
  markdown: {
    processor: unified({
      rehypePlugins: [rehypeArticleStory, rehypeWrapTables]
    }),
    shikiConfig: {
      theme: "github-light",
      themes: {
        light: "github-light",
        dark: "github-dark"
      },
      wrap: true
    }
  }
});
