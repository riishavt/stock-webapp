import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

interface LiveStockInterface {
    StockName: string;
    LastPrice: number;
    TurnOver: number;
    Change: number;
    High: number;
    Low: number;
    Open: number;
    ShareTraded: number;
}


export const LiveTable = () => {
    const [liveStockData, setLiveStockData] = useState<LiveStockInterface[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const columns = [
        { id: "StockName", label: "Stock Name", minWidth: 100 },
        { id: "LastPrice", label: "Last Price", minWidth: 100 },
        { id: "TurnOver", label: "Turn Over", minWidth: 100 },
        { id: "Change", label: "Change", minWidth: 100 },
        { id: "High", label: "High", minWidth: 100 },
        { id: "Low", label: "Low", minWidth: 100 },
        { id: "Open", label: "Open", minWidth: 100 },
        { id: "ShareTraded", label: "Share Traded", minWidth: 100 },
    ];

    useEffect(() => {
        setIsLoading(true);
        axios.get("http://localhost:8080/api/stocks")
            .then(res => res.data)
            .then(json => {
                setIsLoading(false);
                console.log(json)
                setLiveStockData(json);
            })
    }, []);

    return (
        <div>{!isLoading ?
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead >
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {liveStockData
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
            : <p>Loading...</p>}
        </div>
    )
}