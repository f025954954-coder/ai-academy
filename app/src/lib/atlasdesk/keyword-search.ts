import { HELP_ARTICLES, type HelpArticle } from "./help-articles";

/** חיפוש מילולי פשוט (keyword match) — לצורך השוואה מול חיפוש סמנטי במעבדת ה-embeddings. */
export function keywordSearch(query: string): (HelpArticle & { matchCount: number })[] {
  const queryWords = query.toLowerCase().split(/\s+/).filter(Boolean);
  return HELP_ARTICLES.map((article) => {
    const haystack = `${article.title} ${article.content}`.toLowerCase();
    const matchCount = queryWords.filter((w) => haystack.includes(w)).length;
    return { ...article, matchCount };
  })
    .filter((a) => a.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount);
}
