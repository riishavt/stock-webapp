import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { CallApi } from "../utils/callApi";


export const ChartItem = () => {
    const [fetchedData, setFetchedData] = useState<any>([]);
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
                setFetchedData(
                    responseJson.map((item: any) => {
                        return {
                            x: new Date(Number(item.Time)),
                            y: [
                                item.Open,
                                item.High,
                                item.Low,
                                item.Close,
                            ],
                        };
                    })
                );
                console.log(fetchedData);
            }

            //   console.log("JSON--->", responseJson);
        } catch (e) {
            console.log(e);
        }
    };

    const options: any = {
        // theme: {
        //     mode: isDarkMode ? 'dark' : 'light',
        // },
        chart: {
            type: "candlestick",
            height: 450,
        },
        title: {
            text: "CandleStick Chart",
            align: "left",
        },
        annotations: {
            xaxis: [
                {
                    x: 'Oct 06 14:00',
                    borderColor: '#00E396',
                    label: {
                        borderColor: '#00E396',
                        style: {
                            fontSize: '12px',
                            color: '#fff',
                            background: '#00E396'
                        },
                        orientation: 'horizontal',
                        offsetY: 7,
                        text: 'Annotation Test'
                    }
                }
            ]
        },
        xaxis: {
            type: "category",
            labels: {
                formatter: function (val: any) {
                    return new Date(val).toLocaleDateString();
                }
            }
        },
        yaxis: {
            tooltip: {
                enabled: true,
            },
        },
    };

    return (
        <div style={{ minWidth: "100%", overflowX: "scroll" }}>
            <ReactApexChart
                options={options}
                series={[{ data: fetchedData }]}
                type="candlestick"
                height={350}
            />
        </div>
    );
}