import { useEffect, useState, useRef } from "react";
import { Header, NewsFeed } from "./components/index";
import { Container } from "@mui/material";
import { debounce } from "lodash";

export function App() {
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const abortControllerRef = useRef(null);

  async function fetchData(searching) {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;
    const signal = controller.signal;

    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?q=${searching}&country=us&apiKey=${
          import.meta.env.VITE_NEWS_API_KEY
        }`,
        { signal }
      );
      const data = await response.json();
      const articleList =
        data.articles &&
        data.articles.map((article) => ({
          title: article.title,
          description: article.description,
          image: article.urlToImage,
          author: article.author,
          publishedAt: article.publishedAt,
          url: article.url,
        }));
      return articleList;
    } catch (error) {
      if (error.name === "AbortError") {
        console.error(error.name);
      } else {
        console.error(error);
      }
    }
  }

  useEffect(() => {
    setLoading(true);
    async function fetchArticles() {
      const data = await fetchData("");
      setArticles(data);
      setLoading(false);
    }
    fetchArticles();
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const debouncedSearch = debounce(async (searchValue) => {
    setLoading(true);
    const data = await fetchData(searchValue);
    setArticles(data);
    setLoading(false);
  }, 700);

  function searchBySearch(searchValue) {
    debouncedSearch(searchValue);
  }

  return (
    <Container style={{ paddingLeft: "16px", paddingRight: "16px" }}>
      <Header searchBySearch={searchBySearch} />
      <NewsFeed articles={articles} loading={loading} />
    </Container>
  );
}

export default App;
