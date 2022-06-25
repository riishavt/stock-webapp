import { IndexTable } from '../components/IndexTable';
import { LiveTable } from '../components/LiveTable';

import styles from './HomePage.module.css';

export default function HomePage() {


    return (
        <div className={styles.container}>
            <IndexTable />
            <LiveTable />


        </div>
    );
}
