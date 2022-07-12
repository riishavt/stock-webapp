import axios from "axios"
import { useEffect, useState } from "react"
import { Box, Collapse, IconButton, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


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
        //backgroundColor: '#3F4E4F',
        // backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

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

function Row(props: { row: ReturnType<typeof createData> }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.IndexName}
                </TableCell>
                <TableCell align="right">{row.Ltp}</TableCell>
                <TableCell align="right">{row.DailyGain}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Index
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Index</TableCell>
                                        <TableCell>Beta</TableCell>
                                        <TableCell align="right">Pb</TableCell>
                                        <TableCell align="right">Rsi</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    <TableRow key={row.IndexName}>
                                        <TableCell component="th" scope="row">
                                            {row.FullName}
                                        </TableCell>
                                        <TableCell>{row.Beta}</TableCell>
                                        <TableCell align="right">{row.Pb}</TableCell>
                                        <TableCell align="right">
                                            {row.Rsi}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

function createData(
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
) {
    return {
        IndexName,
        FullName,
        Turnover,
        DailyGain,
        TotalPositiveGainer,
        TotalNegativeGainer,
        Pe,
        Pb,
        Peg,
        Roe,
        Alpha,
        Beta,
        SharpeRatio,
        Macd,
        Rsi,
        YearlyPercentChange,
        MacdSignal,
        SmaTwo,
        Ltp,
        TotalDividendYield,
        Roa,
    }
}


export const IndexTable = () => {
    const [indexData, setIndexData] = useState<IndexInterface[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const columns = [
        { id: "IndexName", label: "Index Name", minWidth: 100 },
        //{ id: "FullName", label: "Full Name", minWidth: 100 },
        //{ id: "Turnover", label: "Turnover", minWidth: 100 },
        { id: "DailyGain", label: "Daily Gain", minWidth: 100 },
        // { id: "TotalPositiveGainer", label: "Total Positive Gainer", minWidth: 100 },
        // { id: "TotalNegativeGainer", label: "Total Negative Gainer", minWidth: 100 },
        // { id: "Pe", label: "Pe", minWidth: 100 },
        // { id: "Pb", label: "Pb", minWidth: 100 },
        // { id: "Peg", label: "Peg", minWidth: 100 },
        // { id: "Roe", label: "Roe", minWidth: 100 },
        // { id: "Alpha", label: "Alpha", minWidth: 100 },
        // { id: "Beta", label: "Beta", minWidth: 100 },
        // { id: "SharpeRatio", label: "Sharpe Ratio", minWidth: 100 },
        // { id: "Macd", label: "Macd", minWidth: 100 },
        // { id: "Rsi", label: "Rsi", minWidth: 100 },
        // { id: "YearlyPercentChange", label: "Yearly Percent Change", minWidth: 100 },
        // { id: "MacdSignal", label: "Macd Signal", minWidth: 100 },
        // { id: "SmaTwo", label: "Sma Two", minWidth: 100 },
        { id: "Ltp", label: "Ltp", minWidth: 100 },
        //  { id: "TotalDividendYield", label: "Total Dividend Yield", minWidth: 100 },
        // { id: "Roa", label: "Roa", minWidth: 100 },
    ]

    useEffect(() => {
        setIsLoading(true);
        fetchIndexData()
    }, []);

    const fetchIndexData = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/index");
            if (response.status === 200) {
                setIndexData(response.data);
                setIsLoading(false);
            }
        }
        catch (error) {
            console.log(error);
        }
    }




    return (
        <div>{!isLoading ?
            <div>
                <TableContainer sx={{ maxHeight: 400 }} >
                    <Table stickyHeader aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell />
                                {columns.map((column) => (
                                    <StyledTableCell
                                        key={column.id}
                                        style={{ minWidth: column.minWidth }}>
                                        {column.label}
                                    </StyledTableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {indexData
                                .map((row: IndexInterface) => {
                                    return (
                                        <Row key={row.IndexName} row={row} />
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