import {
  Container,
  Grid,
  Stack,
  styled,
  Tab,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { NewsInterface } from "../utils/newsType";

const StyledTableCellCompany = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#78909c",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    backgroundColor: "#78909c",
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#78909c",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 28,
    fontWeight: "bold",
    color: "black",
  },
}));

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
          <Container sx={{ ml: 40 }}>
            <TableBody>
              <StyledTableCell align="center">Highlights</StyledTableCell>
            </TableBody>
          </Container>
          <Grid>
            {news &&
              news?.featured_news?.map((item: any) => {
                return (
                  <Table>
                    <TableBody>
                      <TableRow>
                        <StyledTableCellCompany>
                          {item.title}
                        </StyledTableCellCompany>
                      </TableRow>
                    </TableBody>
                  </Table>
                );
              })}
          </Grid>
          <Grid>
            {news &&
              news?.stock_analysis?.map((item: any) => {
                return (
                  <Table>
                    <TableBody>
                      <TableRow>
                        <StyledTableCellCompany>
                          {item.title}
                        </StyledTableCellCompany>
                      </TableRow>
                    </TableBody>
                  </Table>
                );
              })}
          </Grid>
          <Grid>
            {news &&
              news?.highlights_news?.map((item: any) => {
                return (
                  <Table>
                    <TableBody>
                      <TableRow>
                        <StyledTableCellCompany>
                          {item.title}
                        </StyledTableCellCompany>
                      </TableRow>
                    </TableBody>
                  </Table>
                );
              })}
          </Grid>
          <Grid>
            {news &&
              news?.investing_ideas?.map((item: any) => {
                return (
                  <Table>
                    <TableBody>
                      <TableRow>
                        <StyledTableCellCompany>
                          {item.title}
                        </StyledTableCellCompany>
                      </TableRow>
                    </TableBody>
                  </Table>
                );
              })}
          </Grid>
          <Grid>
            {news &&
              news?.weekly_market_analysis?.map((item: any) => {
                return (
                  <Table>
                    <TableBody>
                      <TableRow>
                        <StyledTableCellCompany>
                          {item.title}
                        </StyledTableCellCompany>
                      </TableRow>
                    </TableBody>
                  </Table>
                );
              })}
          </Grid>
          <Grid>
            {news &&
              news?.articles?.map((item: any) => {
                return (
                  <Table>
                    <TableBody>
                      <TableRow>
                        <StyledTableCellCompany>
                          {item.title}
                        </StyledTableCellCompany>
                      </TableRow>
                    </TableBody>
                  </Table>
                );
              })}
          </Grid>
        </Stack>
      </Container>
    </div>
  );
}
