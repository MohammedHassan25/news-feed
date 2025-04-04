import React, { useEffect, useState, useRef, useCallback } from "react";
import { Header, LoadingArticles, NewsFeed } from "./components/index";
import { Button, Container } from "@mui/material";
import { debounce } from "lodash";
import { styled } from "@mui/material/styles";

const Footer = styled("footer")(({ theme }) => ({
  padding: theme.spacing(2, 0),
  display: "flex",
  justifyContent: "space-between",
}));

export function App() {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState(null);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);
  const page = useRef(1);
  const searching = useRef("");
  const searchingByCategory = useRef("general");

  const fetchData = useCallback(async () => {
    setLoading(true);
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;
    const signal = controller.signal;
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&category=${
          searchingByCategory.current
        }&pageSize=5&q=${searching.current}&page=${page.current}&apiKey=${
          import.meta.env.VITE_NEWS_API_KEY
        }`,
        { signal }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "An error occurred.");
      }
      const articleList =
        data.articles?.map((article) => ({
          title: article.title,
          description: article.description,
          image: article.urlToImage,
          author: article.author,
          publishedAt: article.publishedAt,
          url: article.url,
        })) || [];
      setError(null);
      return articleList;
    } catch (error) {
      if (error.name !== "AbortError") {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchArticles = useCallback(async () => {
    const data = await fetchData();
    setArticles(data || []);
  }, [fetchData]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const searchBySearch = debounce(async () => {
    page.current = 1;
    fetchArticles();
  }, 500);

  const searchByCategory = () => {
    page.current = 1;
    fetchArticles();
  };

  const previousChangeHandler = () => {
    if (page.current > 1) {
      page.current -= 1;
      fetchArticles();
    }
  };

  const nextChangeHandler = () => {
    page.current += 1;
    fetchArticles();
  };

  return (
    <Container style={{ paddingLeft: "16px", paddingRight: "16px" }}>
      <Header
        searching={searching}
        searchBySearch={searchBySearch}
        searchingByCategory={searchingByCategory}
        searchByCategory={searchByCategory}
      />
      {loading || articles === null ? (
        [...Array(5)].map((_, index) => <LoadingArticles key={index} />)
      ) : (
        <NewsFeed articles={articles} loading={loading} error={error} />
      )}
      <Footer>
        <Button
          variant="outlined"
          disabled={page.current === 1}
          onClick={previousChangeHandler}
        >
          Previous
        </Button>
        <Button
          variant="outlined"
          disabled={
            articles?.length === 0 || (articles === undefined && !loading)
          }
          onClick={nextChangeHandler}
        >
          Next
        </Button>
      </Footer>
    </Container>
  );
}

export default React.memo(App);
