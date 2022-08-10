import { Card, Container, Grid, Stack, Typography } from '@mui/material';
import { ChartItem } from '../components/ChartItem';
import GainerLoserCard from '../components/GainerLoserCard';
import { IndexTable } from '../components/IndexTable';
import { NepseCard } from '../components/NepseCard';

export default function HomePage() {
    return (
        <Container maxWidth='lg' sx={{ padding: 2, display: 'flex', mt: '-365px', ml: '250px' }}>
            <Grid container spacing={4}>
                <Grid container spacing={12}>
                    <Stack spacing={25} direction="row" sx={{ alignItems: 'center', ml: '170px', mt: '120px' }}>
                        <NepseCard />
                        <GainerLoserCard />
                        <Card variant='outlined'>
                            <Typography variant="h5" component="div">
                                Prediction
                            </Typography>
                        </Card>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Stack spacing={3} direction="row" sx={{ alignItems: 'end' }}>
                        <ChartItem />
                        <IndexTable />
                    </Stack>
                </Grid>
            </Grid>
        </Container>

    );
}

