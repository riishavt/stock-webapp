import { ViewColumn } from '@mui/icons-material';
import { Grid, TableRow } from '@mui/material';
import { ChartItem } from '../components/ChartItem';
import { IndexTable } from '../components/IndexTable';
import { LiveTable } from '../components/LiveTable';

import styles from './HomePage.module.css';

export default function HomePage() {


    return (
        <div className={styles.container}>
            <Grid container spacing={2} sx={{ bgcolor: 'grey' }}>
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
        </div >
    );
}
