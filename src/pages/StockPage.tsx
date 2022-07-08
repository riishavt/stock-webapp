import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks/search";


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
    const [stockData, setStockData] = useState<StockInterface>({} as StockInterface);

    useEffect(() => {
        setIsLoading(true);
        axios.get(`http://localhost:8080/api/stocks/${scrip}`)
            .then(res => res.data)
            .then(json => {
                setIsLoading(false);
                console.log(json)
                setStockData(json);
            })
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

        </div>
    )
}