import { CircularProgress, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#78909c',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        // backgroundColor: '#3F4E4F',
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

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
        getLiveStock()
    }, []);

    const getLiveStock = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/stocks");
            if (response.status === 200) {
                setLiveStockData(response.data);
                setIsLoading(false);
            }
        }
        catch (error) {
            console.log(error);
        }
    }


    return (
        <div>{!isLoading ?
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead >
                        <TableRow>
                            {columns.map((column) => (
                                <StyledTableCell
                                    key={column.id}
                                    style={{ minWidth: column.minWidth, fontWeight: "bold", fontSize: "16px" }}
                                >
                                    {column.label}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {liveStockData
                            .map((row: any) => {
                                return (
                                    <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.StockName}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <StyledTableCell key={column.id} >
                                                    {value}
                                                </StyledTableCell>
                                            );
                                        })}
                                    </StyledTableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            : <CircularProgress />}
        </div>
    )
}