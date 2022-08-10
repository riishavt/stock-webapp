import { useEffect, useState } from "react";
import { CrosshairMode } from 'lightweight-charts';
import { Chart, CandlestickSeries } from 'lightweight-charts-react-wrapper';
import axios from "axios";
import { formatDate } from "../utils/formatDate";
import { CircularProgress } from "@mui/material";


export const ChartItem = () => {
    const [fetchedData, setFetchedData] = useState<any[]>([]);
    const [isChartLoading, setIsChartLoading] = useState(true);
    useEffect(() => {
        setIsChartLoading(true);
        getData()
    }, []);

    const getData = async () => {
        const response: any = await axios.get("http://localhost:8080/api/nepseHistoric");
        if (response.status === 200) {
            setFetchedData(
                response.data
                    .map((item: any) => {
                        return {
                            // { time: '2018-10-19', open: 180.34, high: 180.99, low: 178.57, close: 179.85 },
                            time: formatDate(item.Time),
                            open: item.Open,
                            high: item.High,
                            low: item.Low,
                            close: item.Close
                        }
                    })
            );
            setIsChartLoading(false);
        }
    };

    const options = {
        width: 600,
        height: 400,
        layout: {
            backgroundColor: '#2B2B43',
            lineColor: '#2B2B43',
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
        rightPriceScale: {
            visible: true,
            borderColor: 'rgba(197, 203, 206, 1)',
            lockVisibleTimeRangeOnResize: true,
        },
        timeScale: {
            borderColor: 'rgba(197, 203, 206, 1)',
        },
        crosshair: {
            mode: CrosshairMode.Normal,
        },
    };

    return (
        <div >
            {isChartLoading ? <CircularProgress /> :
                <Chart {...options}>
                    <CandlestickSeries
                        data={fetchedData}
                    />

                </Chart>
            }
        </div>
    );
}