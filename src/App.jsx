import { useEffect, useState, useRef } from "react";
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
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);
  const page = useRef(1);
  const searching = useRef("");

  async function fetchData() {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;
    const signal = controller.signal;
    try {
      setLoading(true);
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&pageSize=5&q=${
          searching.current
        }&page=${page.current}&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`,
        { signal }
      );
      const data = await response.json();
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error(data.message);
        } else if (response.status === 429) {
          throw new Error("Too many requests. Please try again later.");
        } else if (response.status === 404) {
          throw new Error("Not Found.");
        } else if (!response.status) {
          console.log("Network error");
          setLoading(false);
          return;
        } else {
          throw new Error("An error occurred. Please try again later.");
        }
      }
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
      setError(null);
      return articleList;
    } catch (error) {
      if (error.name === "AbortError") {
        return;
      }
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function fetchArticles() {
      const data = await fetchData();
      setArticles(data);
    }
    fetchArticles();
  }, []);

  const searchBySearch = debounce(async () => {
    const data = await fetchData();
    setArticles(data);
  }, 700);

  const previousChangeHandler = () => {
    if (page.current > 1) {
      page.current -= 1;
      searchBySearch();
    }
  };

  const nextChangeHandler = () => {
    page.current += 1;
    searchBySearch();
  };

  return (
    <Container style={{ paddingLeft: "16px", paddingRight: "16px" }}>
      <Header searching={searching} searchBySearch={searchBySearch} />
      {loading ? (
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

export default App;
