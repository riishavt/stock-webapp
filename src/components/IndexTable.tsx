import axios from "axios"
import { FC, useEffect, useState } from "react"

interface IndexInterface {
    IndexName: string,
    FullName: string,
    Turnover: string,
    DailyGain: number,
    TotalPositiveGainer: string,
    TotalNegativeGainer: string,
    Pe: string,
    Pb: string,
    Peg: string,
    Roe: string,
    Alpha: string,
    Beta: string,
    SharpeRatio: string,
    Macd: string,
    Rsi: string,
    YearlyPercentChange: string,
    MacdSignal: string,
    SmaTwo: string,
    Ltp: number,
    TotalDividendYield: string,
    Roa: string,
}


export const IndexTable = () => {
    const [indexData, setIndexData] = useState<IndexInterface[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        axios.get("http://localhost:8080/api/index")
            .then(res => res.data)
            .then(json => {
                setIsLoading(false);
                console.log(json)
                setIndexData(json);
            })
    }, []);



    return (
        <div>{!isLoading ?
            <div>
                <div>
                    <span className="indices-label">
                        {indexData[9].FullName}{'  '}
                        <span style={{ backgroundColor: indexData[9].DailyGain > 0 ? 'springgreen' : 'red', padding: '5px', fontWeight: 'bold' }}>{indexData[9].Ltp}</span>{'  '}
                        <span style={{ color: indexData[9].DailyGain > 0 ? 'springgreen' : 'red' }}>
                            {indexData[9].Ltp > 0 ? '+' : ''}{indexData[9].Ltp}{'  '}
                            ({indexData[9].DailyGain > 0 ? '+' : ''}{indexData[9].DailyGain}%)
                        </span>
                    </span>
                </div>
                <table>
                    <tbody>
                        {
                            indexData.map(index => (
                                <tr key={index.IndexName}>
                                    <td>{index.IndexName}</td>
                                    <td>{index.FullName}</td>
                                    <td>{index.Turnover}</td>
                                    <td>{index.DailyGain}</td>
                                    <td>{index.TotalPositiveGainer}</td>
                                    <td>{index.TotalNegativeGainer}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            : <p>Loading...</p>}


        </div>
    )
}