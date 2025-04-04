import React from "react";
import { Typography } from "@mui/material";
import { NewsCard } from "../index";

export const NewsFeed = React.memo(function NewsFeed({ articles, loading, error }) {
  if (!loading && articles?.length === 0) {
    return (
      <Typography variant="h4" color="textSecondary" align="center" sx={{ pt: 2 }}>
        No Articles Found
      </Typography>
    );
  } else if (error && (!articles || articles?.length === 0)) {
    return (
      <Typography variant="h4" color="error" align="center" sx={{ pt: 2 }}>
        {error}
      </Typography>
    );
  } else if (articles?.length > 0) {
    return (
      <>
        {articles.map((article, index) => (
          <NewsCard article={article} key={article.url || index} />
        ))}
      </>
    );
  } else {
    return null; 
  }
});