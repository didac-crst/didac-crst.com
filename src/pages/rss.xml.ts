import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { getArticleSlug } from "@/lib/articles";
import { SITE } from "@/site.config";

export async function GET(context: { site?: URL }) {
  const articles = (await getCollection("writing"))
    .filter((article) => !article.data.draft)
    .sort((a, b) => b.data.published.valueOf() - a.data.published.valueOf());

  return rss({
    title: `${SITE.title} Writing`,
    description: SITE.description,
    site: context.site ?? SITE.domain,
    items: articles.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: article.data.published,
      link: `/writing/${getArticleSlug(article)}/`
    }))
  });
}
