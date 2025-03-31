import { Box, CircularProgress, Typography } from "@mui/material";
import { NewsCard } from "./NewsCard";

export function NewsFeed({ articles, loading }) {
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!articles || articles.length === 0) {
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
  }

  return (
    <>
      {articles.map((article, index) => (
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
