import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://didac-crst.com",
  integrations: [mdx(), sitemap()],
  markdown: {
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
