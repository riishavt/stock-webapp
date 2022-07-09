import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks/search";
import { CrosshairMode } from 'lightweight-charts';
import { Chart, CandlestickSeries } from 'lightweight-charts-react-wrapper';


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

    const options = {
        width: 600,
        height: 300,
        layout: {
            backgroundColor: '#000000',
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
            borderColor: 'rgba(197, 203, 206, 1)',
        },
        timeScale: {

            borderColor: 'rgba(197, 203, 206, 1)',
        },
    };

    useEffect(() => {
        setIsLoading(true);
        axios.get(`http://localhost:8080/api/stocks/${scrip}`)
            .then(res => res.data)
            .then(json => {
                setIsLoading(false);
                console.log(json)
                setStockData(json);
            })

        axios.get(`http://localhost:8080/api/nepseHistory/other/${scrip}`)
            .then(res => res.data)
            .then(json => {
                setIsChartLoading(false);
                console.log(json)
                setHistoricData(
                    json.map((item: any) => {
                        return {
                            //     { time: '2018-10-19', open: 180.34, high: 180.99, low: 178.57, close: 179.85 },
                            // { time: '2018-10-22', open: 180.82, high: 181.40, low: 177.56, close: 178.75 },
                            time: new Date(item.Time * 1000).toLocaleDateString('en-US'),
                            open: item.Open,
                            high: item.High,
                            low: item.Low,
                            close: item.Close,
                        }
                    }
                    )
                );
            }
            )
    }, []);
    return (
        <div>
            <h1>{scrip}</h1>
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
                : <div>Loading...</div>}
            <div>
                {!isChartLoading ?

                    <Chart {...options}>
                        <CandlestickSeries
                            data={historicData.slice(0, 200)}
                            upColor="rgba(255, 144, 0, 1)"
                            downColor="#000"
                            borderDownColor="rgba(255, 144, 0, 1)"
                            borderUpColor="rgba(255, 144, 0, 1)"
                            wickDownColor="rgba(255, 144, 0, 1)"
                            wickUpColor="rgba(255, 144, 0, 1)"
                        />
                    </Chart>
                    : <div>Loading...</div>}
            </div>
            <Button variant="contained" color="primary" onClick={() => console.log(historicData.slice(0, 200))}>Click</Button>

        </div>
    )
}