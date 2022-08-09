import { Container } from '@mui/material'

import { LiveTable } from '../components/LiveTable';

export default function LiveMarketPage() {

    return (
        <div>
            <Container sx={{ padding: 2, display: 'flex', mt: '-330px', ml: '350px' }}>
                <LiveTable />
            </Container>
        </div>
    )
}