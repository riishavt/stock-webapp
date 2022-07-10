import { ViewColumn } from '@mui/icons-material';
import { Card, Container, Grid, TableRow, Typography } from '@mui/material';
import { ChartItem } from '../components/ChartItem';
import { IndexTable } from '../components/IndexTable';
import { LiveTable } from '../components/LiveTable';

import styles from './HomePage.module.css';

export default function HomePage() {


    return (
        <div className={styles.container}>
            <Container maxWidth='xl' sx={{ padding: 5 }}>
                <Grid container spacing={2} sx={{ bgcolor: 'grey' }}>
                    <Grid container spacing={8}>
                        <Grid item xs={4} >
                            <Card variant='outlined' >
                                <Typography variant="h5" component="div">
                                    NEPSE
                                </Typography>
                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                            <Card variant='outlined'>
                                <Typography variant="h5" component="div">
                                    Total Portfolio Value
                                </Typography>
                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                            <Card variant='outlined'>
                                <Typography variant="h5" component="div">
                                    Prediction
                                </Typography>
                            </Card>
                        </Grid>
                    </Grid>
                    <Grid item xs={8}>
                        <ChartItem />
                    </Grid>
                    <Grid item xs={4}>
                        <IndexTable />
                    </Grid>
                    <Grid item xs={8}>
                        <LiveTable />
                    </Grid>

                </Grid>
            </Container>
        </div >
    );
}
