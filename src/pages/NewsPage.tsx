import { Container, Grid, Stack } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { NewsInterface } from "../utils/newsType";

export default function NewsPage() {
  const [news, setNews] = useState<NewsInterface>();

  const fetchNews = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/news`);
      if (response.status === 200) {
        setNews(response.data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div>
      <Container
        sx={{ padding: 2, display: "flex", mt: "-300px", ml: "350px" }}
      >
        <Stack direction="column">
          <h1>HighLights</h1>
          <Grid>
            {news &&
              news?.featured_news?.map((item: any) => {
                return (
                  <ul>
                    <li>
                      <h3>{item.title}</h3>
                    </li>
                  </ul>
                );
              })}
          </Grid>
          <Grid>
            {news &&
              news?.stock_analysis?.map((item: any) => {
                return (
                  <ul>
                    <li>
                      <h3>{item.title}</h3>
                    </li>
                  </ul>
                );
              })}
          </Grid>
          <Grid>
            {news &&
              news?.highlights_news?.map((item: any) => {
                return (
                  <ul>
                    <li>
                      <h3>{item.title}</h3>
                    </li>
                  </ul>
                );
              })}
          </Grid>
        </Stack>
      </Container>
    </div>
  );
}
