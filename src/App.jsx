import { useEffect, useState, useRef } from "react";
import { Header, NewsFeed } from "./components/index";
import { Button, Container } from "@mui/material";
import { debounce } from "lodash";
import { styled } from "@mui/material/styles";

const Footer = styled("footer")(({ theme }) => ({
  padding: theme.spacing(2, 0),
  display: "flex",
  justifyContent: "space-between",
}));

export function App() {
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);
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
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&pageSize=5&q=${
          searching.current
        }&page=${page.current}&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`,
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
      const data = await fetchData();
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

  const searchBySearch = debounce(async () => {
    setLoading(true);
    const data = await fetchData();
    setArticles(data);
    setLoading(false);
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
      <NewsFeed articles={articles} loading={loading} />
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
