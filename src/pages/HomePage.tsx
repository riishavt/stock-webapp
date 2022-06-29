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
                <Grid spacing={12}>
                    <ChartItem />
                </Grid>
                <Grid spacing={1}>
                    <IndexTable />
                    <LiveTable />
                </Grid>

            </Grid>
        </div >
    );
}
