import { useEffect, useState } from "react";
import { Header, NewsFeed } from "./components/index";
import { Container } from "@mui/material";

export function App() {
  const [articles, setArticles] = useState([]);
  async function fetchData() {
    try {
      const response = await fetch(
        "https://newsapi.org/v2/top-headlines?country=us&apiKey=6eee4d9e91854fff8ff296cdc22efff2"
      );
      const data = await response.json();
      console.log(data);
      const article = data.articles.map((article) => {
        return {
          title: article.title,
          description: article.description,
          image: article.urlToImage ?? article.urlToImage,
          author: article.author,
          publishedAt: article.publishedAt,
          url: article.url
        };
      });
      return article;
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function fetchArticles() {
      const data = await fetchData();
      setArticles(data);
    }
    fetchArticles();
  }, []);

  console.log(articles);

  return (
    <Container style={{ paddingLeft: "16px", paddingRight: "16px" }}>
      <Header />
      <NewsFeed articles={articles} />
    </Container>
  );
}

export default App;
