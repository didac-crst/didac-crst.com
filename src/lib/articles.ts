import type { CollectionEntry } from "astro:content";

const wordsPerMinute = 220;

export function getReadingTime(body: string) {
  const wordCount = body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]*>/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

export function getArticleSlug(article: CollectionEntry<"writing">) {
  return article.id.replace(/\.(md|mdx)$/i, "").replace(/\/index$/i, "");
}

export function getRelatedArticles(
  article: CollectionEntry<"writing">,
  articles: CollectionEntry<"writing">[],
  limit = 3
) {
  const tags = new Set(article.data.tags);

  return articles
    .filter((candidate) => candidate.id !== article.id && !candidate.data.draft)
    .map((candidate) => ({
      article: candidate,
      score: candidate.data.tags.filter((tag) => tags.has(tag)).length
    }))
    .filter((candidate) => candidate.score > 0)
    .sort((a, b) => b.score - a.score || b.article.data.published.valueOf() - a.article.data.published.valueOf())
    .slice(0, limit)
    .map((candidate) => candidate.article);
}
