import { CircularProgress, Container, Grid, styled, Tab, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Tabs, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks/search";
import { CrosshairMode } from 'lightweight-charts';
import { Chart, CandlestickSeries, HistogramSeries } from 'lightweight-charts-react-wrapper';
import { formatDate } from "../utils/formatDate";
import { GraphicEq, Details, History } from "@mui/icons-material";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <>
                    {children}
                </>
            )}
        </div>
    );
}

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

export interface NepseHistory {
    Time?: number;
    Close?: number;
    Open?: number;
    High?: number;
    Low?: number;
    Volume?: number;
}

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

const options = {
    width: 800,
    height: 500,
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


export const StockPage = () => {
    const { scrip } = useAppSelector((state) => state.scrip);
    const [isLoading, setIsLoading] = useState(true);
    const [isChartLoading, setIsChartLoading] = useState(true);
    const [stockData, setStockData] = useState<StockInterface>({} as StockInterface);
    const [historicData, setHistoricData] = useState<any[]>([]);
    const [historicTableData, setHistoricTableData] = useState<NepseHistory[]>([]);
    const [volumeData, setVolumeData] = useState<any[]>([]);
    const [value, setValue] = useState(0);

    const columns = [
        { id: "Time", label: "Time", minWidth: 150 },
        { id: "Close", label: "Close", minWidth: 150 },
        { id: "Open", label: "Open", minWidth: 150 },
        { id: "High", label: "High", minWidth: 150 },
        { id: "Low", label: "Low", minWidth: 150 },
        { id: "Volume", label: "Volume", minWidth: 150 },
    ];

    const fetchStockData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/stock/${scrip}`);
            if (response.status === 200) {
                setStockData(response.data);
            }
            setIsLoading(false);
        } catch (e) {
            console.log(e);
        }
    }

    const fetchHistoricData = async () => {

        const response = await axios.get(`http://localhost:8080/api/nepseHistory/${scrip}`)
        if (response.status === 200) {
            setHistoricData(
                response.data.map((item: any) => {
                    return {
                        // { time: '2018-10-22', open: 180.82, high: 181.40, low: 177.56, close: 178.75 },
                        time: formatDate(item.Time),
                        open: item.Open,
                        high: item.High,
                        low: item.Low,
                        close: item.Close,
                    }
                }
                )
            );
            setVolumeData(
                response.data.map((item: any) => {
                    return {
                        //{ time: '2019-05-28', value: 59.57 },
                        time: new Date(item.Time * 1000).toLocaleDateString('en-US'),
                        value: item.Volume,
                    }
                })
            )
            setHistoricTableData(response.data.map((item: any) => {
                return {
                    // { time: '2018-10-22', open: 180.82, high: 181.40, low: 177.56, close: 178.75 },
                    Time: formatDate(item.Time),
                    Open: item.Open,
                    High: item.High,
                    Low: item.Low,
                    Close: item.Close,
                    Volume: item.Volume,
                }

            }
            ));

            setIsChartLoading(false);
        }
    }

    useEffect(() => {
        fetchStockData();
    }, [scrip]);

    useEffect(() => {
        setIsChartLoading(true);
        fetchHistoricData();
    }, [scrip]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <div>
            <Container sx={{ padding: 2, display: 'flex', mt: '-365px', ml: '250px' }}>
                <Grid>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: '2.5rem' }}>
                        {scrip}
                    </Typography>

                    <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example" sx={{ ml: "250px" }}>
                        <Tab icon={<GraphicEq />} label="CHART" value={0} />
                        <Tab icon={<Details />} label="DETAILS" value={1} />
                        <Tab icon={<History />} label="HISTORIC DATA" value={2} />
                    </Tabs>

                    <TabPanel value={value} index={0}>

                        {!isChartLoading ?
                            <Chart {...options}>
                                <CandlestickSeries
                                    data={historicData}
                                />
                                <HistogramSeries
                                    data={volumeData}
                                    priceScaleId=""
                                    color="#26a69a"
                                    priceFormat={{ type: 'volume' }}
                                    scaleMargins={{
                                        top: 0.11,
                                        bottom: 0,
                                    }}
                                />
                            </Chart>
                            : <CircularProgress />}

                    </TabPanel>

                    <TabPanel value={value} index={1}>

                        <Grid item xs={8}>
                            {!isLoading ?
                                <div>
                                    <h1>Name : {stockData.StockName}</h1>
                                    <h1>Open : {stockData.Open}</h1>
                                    <h1>High : {stockData.High}</h1>
                                    <h1>Low : {stockData.Low}</h1>
                                    <h1>LastPrice : {stockData.LastPrice}</h1>
                                    <h1>TurnOver : {stockData.TurnOver}</h1>
                                </div>
                                : <CircularProgress />}
                        </Grid>
                    </TabPanel>

                    <TabPanel value={value} index={2}>

                        <TableContainer sx={{ maxHeight: 500, maxWidth: 900 }}>
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
                                    {historicTableData
                                        .map((row: any) => {
                                            return (
                                                <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.Time}>
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

                    </TabPanel>

                </Grid>
            </Container>
        </div >
    )
}