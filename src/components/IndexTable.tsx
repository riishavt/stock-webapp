import axios from "axios"
import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

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

    const columns = [
        { id: "IndexName", label: "Index Name", minWidth: 100 },
        { id: "FullName", label: "Full Name", minWidth: 100 },
        { id: "Turnover", label: "Turnover", minWidth: 100 },
        { id: "DailyGain", label: "Daily Gain", minWidth: 100 },
        { id: "TotalPositiveGainer", label: "Total Positive Gainer", minWidth: 100 },
        { id: "TotalNegativeGainer", label: "Total Negative Gainer", minWidth: 100 },
        { id: "Pe", label: "Pe", minWidth: 100 },
        { id: "Pb", label: "Pb", minWidth: 100 },
        { id: "Peg", label: "Peg", minWidth: 100 },
        { id: "Roe", label: "Roe", minWidth: 100 },
        { id: "Alpha", label: "Alpha", minWidth: 100 },
        { id: "Beta", label: "Beta", minWidth: 100 },
        { id: "SharpeRatio", label: "Sharpe Ratio", minWidth: 100 },
        { id: "Macd", label: "Macd", minWidth: 100 },
        { id: "Rsi", label: "Rsi", minWidth: 100 },
        { id: "YearlyPercentChange", label: "Yearly Percent Change", minWidth: 100 },
        { id: "MacdSignal", label: "Macd Signal", minWidth: 100 },
        { id: "SmaTwo", label: "Sma Two", minWidth: 100 },
        { id: "Ltp", label: "Ltp", minWidth: 100 },
        { id: "TotalDividendYield", label: "Total Dividend Yield", minWidth: 100 },
        { id: "Roa", label: "Roa", minWidth: 100 },
    ]

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
                <TableContainer sx={{ maxHeight: 440 }} >
                    <Table stickyHeader aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        style={{ minWidth: column.minWidth }}>
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {indexData
                                .map((row: any) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.StockName}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} >
                                                        {value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            : <p>Loading...</p>}


        </div>
    )
}