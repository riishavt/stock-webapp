import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { CallApi } from "../utils/callApi";
import { CrosshairMode } from 'lightweight-charts';
import { Chart, CandlestickSeries } from 'lightweight-charts-react-wrapper';


export const ChartItem = () => {
    const [fetchedData, setFetchedData] = useState<any[]>([]);
    const [isChartLoading, setIsChartLoading] = useState(true);
    useEffect(() => {
        getData()
    }, []);

    const getData = async () => {
        try {
            const orderCurrency = "other";
            const paymentCurrency = "nric";
            const data = {
                method: "GET",
                url: `http://localhost:8080/api/nepseHistory/${orderCurrency}/${paymentCurrency}`,
            };

            const response: any = await CallApi(data);
            const responseJson: any = await response.json();
            if (response.status === 200) {
                setIsChartLoading(false);
                setFetchedData(
                    responseJson
                        .map((item: any) => {
                            return {
                                // { time: '2018-10-19', open: 180.34, high: 180.99, low: 178.57, close: 179.85 },
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
                console.log(responseJson);
            }
            //   console.log("JSON--->", responseJson);
        } catch (e) {
            console.log(e);
        }
    };

    const options = {
        width: 600,
        height: 400,
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
            borderColor: 'rgba(197, 203, 206, 0.8)',
        },
        timeScale: {
            borderColor: 'rgba(197, 203, 206, 0.8)',
        },
    };

    return (
        <div >
            {isChartLoading ? <div>Loading...</div> :
                <Chart {...options}>
                    <CandlestickSeries
                        data={fetchedData.slice(0, 500)}
                    />
                </Chart>
            }
        </div>
    );
}