import { Container, Stack } from '@mui/material'

import { LiveTable } from '../components/LiveTable';

export default function LiveMarketPage() {

    return (
        <div>
            <Container sx={{ padding: 2, display: 'flex', mt: '-390px', ml: '350px' }}>
                <Stack>
                    <h1>Live Market</h1>
                    <LiveTable />
                </Stack>
            </Container>
        </div>
    )
}