import { Typography } from "@mui/material";
import { NewsCard } from "../index";

export function NewsFeed({ articles, loading, error }) {
  if (!loading && articles?.length === 0) {
    return (
      <Typography
        variant="h4"
        color="textSecondary"
        align="center"
        sx={{ pt: 2 }}
      >
        No Articles Found
      </Typography>
    );
  } else if (error && (!articles || articles.length === 0)) {
    return (
      <Typography variant="h4" color="error" align="center" sx={{ pt: 2 }}>
        {error}
      </Typography>
    );
  } else {
    return (
      <>
        {articles?.map((article, index) => (
          <a
            key={article.url || index}
            href={article.url}
            style={{ textDecoration: "none" }}
          >
            <NewsCard article={article} />
          </a>
        ))}
      </>
    );
  }
}
