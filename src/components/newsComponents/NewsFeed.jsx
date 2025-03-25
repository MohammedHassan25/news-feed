import { NewsCard } from "./NewsCard";

export function NewsFeed({ articles }) {
  return (
    <>
      {articles &&
        articles.map((article, i) => (
          <a href={article.url} style={{textDecoration: "none"}}>
            <NewsCard key={i} article={article} />
          </a>
        ))}
    </>
  );
}
