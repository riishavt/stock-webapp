import { Button, CircularProgress, Container, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks/search";
import { CrosshairMode } from 'lightweight-charts';
import { Chart, CandlestickSeries, HistogramSeries } from 'lightweight-charts-react-wrapper';
import { forEach } from "lodash";
import { formatDate } from "../utils/formatDate";


interface StockInterface {
    Change: number;
    High: number;
    LastPrice: number;
    Low: number;
    Open: number;
    ShareTraded: number;
    StockName: string;
    TurnOver: number;
}

export const StockPage = () => {
    const { scrip } = useAppSelector((state) => state.scrip);
    const [isLoading, setIsLoading] = useState(true);
    const [isChartLoading, setIsChartLoading] = useState(true);
    const [stockData, setStockData] = useState<StockInterface>({} as StockInterface);
    const [historicData, setHistoricData] = useState<any[]>([]);
    const [volumeData, setVolumeData] = useState<any[]>([]);

    const fetchStockData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/stocks/${scrip}`);
            if (response.status === 200) {
                setStockData(response.data);
            }
            setIsLoading(false);
        } catch (e) {
            console.log(e);
        }
    }

    const fetchHistoricData = async () => {

        const response = await axios.get(`http://localhost:8080/api/nepseHistory/${scrip}`)
        if (response.status === 200) {
            setHistoricData(
                response.data.map((item: any) => {
                    return {
                        // { time: '2018-10-22', open: 180.82, high: 181.40, low: 177.56, close: 178.75 },
                        time: formatDate(item.Time),
                        open: item.Open,
                        high: item.High,
                        low: item.Low,
                        close: item.Close,
                    }
                }
                )
            );
            setVolumeData(
                response.data.map((item: any) => {
                    return {
                        //{ time: '2019-05-28', value: 59.57 },
                        time: new Date(item.Time * 1000).toLocaleDateString('en-US'),
                        value: item.Volume,
                    }
                })
            )
            setIsChartLoading(false);
        }
    }

    useEffect(() => {
        fetchStockData();
    }, [scrip]);

    useEffect(() => {
        setIsChartLoading(true);
        fetchHistoricData();
    }, [scrip]);
    return (
        <div>
            <Container sx={{ padding: 2, display: 'flex', mt: '-200px', ml: '250px' }}>
                <Grid>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: '2.5rem' }}>
                        {scrip}
                    </Typography>
                    <div>
                        <Grid item xs={8}>
                            {!isLoading ?
                                <TableContainer sx={{ maxHeight: 440 }}>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Stock Name</TableCell>
                                                <TableCell>Last Price</TableCell>
                                                <TableCell>Turn Over</TableCell>
                                                <TableCell>Change</TableCell>
                                                <TableCell>High</TableCell>
                                                <TableCell>Low</TableCell>
                                                <TableCell>Open</TableCell>
                                                <TableCell>Share Traded</TableCell>

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableCell>{stockData.StockName}</TableCell>
                                            <TableCell>{stockData.LastPrice}</TableCell>
                                            <TableCell>{stockData.TurnOver}</TableCell>
                                            <TableCell>{stockData.Change}</TableCell>
                                            <TableCell>{stockData.High}</TableCell>
                                            <TableCell>{stockData.Low}</TableCell>
                                            <TableCell>{stockData.Open}</TableCell>
                                            <TableCell>{stockData.ShareTraded}</TableCell>

                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                : <CircularProgress />}
                        </Grid>
                        <Grid item xs={8}>
                            {!isChartLoading ?
                                <Chart {...options}>
                                    <CandlestickSeries
                                        data={historicData}
                                    />
                                    <HistogramSeries
                                        data={volumeData}
                                        priceScaleId=""
                                        color="#26a69a"
                                        priceFormat={{ type: 'volume' }}
                                        scaleMargins={{ top: 0.9, bottom: 0 }}
                                    />
                                </Chart>
                                : <CircularProgress />}
                        </Grid>
                    </div>
                </Grid>
            </Container>
        </div>
    )
}


const options = {
    width: 800,
    height: 500,
    layout: {
        backgroundColor: '#faf5f5',
        textColor: 'rgba(255, 255, 255, 0.9)',
    },
    grid: {
        vertLines: {
            color: 'rgba(197, 203, 206, 0.5)',
        },
        horzLines: {
            color: 'rgba(197, 203, 206, 0.5)',
        },
    },
    crosshair: {
        mode: CrosshairMode.Normal,
    },
    rightPriceScale: {
        borderColor: 'rgba(197, 203, 206, 0.8)',
    },
    timeScale: {
        borderColor: 'rgba(197, 203, 206, 0.8)',
    },
};
