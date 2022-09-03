import { Card, Container, Grid, Stack, Typography } from "@mui/material";
import { ChartItem } from "../components/ChartItem";
import GainerLoserCard from "../components/GainerLoserCard";
import { IndexTable } from "../components/IndexTable";
import { NepseCard } from "../components/NepseCard";
import { PredictionCard } from "../components/PredictionCard";

export default function HomePage() {
  return (
    <Container
      maxWidth="lg"
      sx={{ padding: 2, display: "flex", mt: "-300px", ml: "250px" }}
    >
      <Grid container spacing={4}>
        <Grid container spacing={12}>
          <Stack
            spacing={25}
            direction="row"
            sx={{ alignItems: "center", ml: "170px", mt: "120px" }}
          >
            <NepseCard />
            <GainerLoserCard />
            <PredictionCard />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={3} direction="row" sx={{ alignItems: "end" }}>
            <ChartItem />
            <IndexTable />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
