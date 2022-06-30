import { ViewColumn } from '@mui/icons-material';
import { Grid, TableRow } from '@mui/material';
import { ChartItem } from '../components/ChartItem';
import { IndexTable } from '../components/IndexTable';
import { LiveTable } from '../components/LiveTable';

import styles from './HomePage.module.css';

export default function HomePage() {


    return (
        <div className={styles.container}>
            <Grid container >
                <Grid xs={8}>
                    <ChartItem />
                </Grid>
                <Grid xs={4}>
                    <IndexTable />
                </Grid>
                <Grid xs={6}>
                    <LiveTable />
                </Grid>

            </Grid>
        </div >
    );
}
