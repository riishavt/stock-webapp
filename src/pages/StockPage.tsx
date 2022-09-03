import {
  CircularProgress,
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  styled,
  Tab,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks/search";
import { CrosshairMode } from "lightweight-charts";
import {
  Chart,
  CandlestickSeries,
  HistogramSeries,
  LineSeries,
} from "lightweight-charts-react-wrapper";
import { formatDate } from "../utils/formatDate";
import {
  GraphicEq,
  Details,
  History,
  SquareRounded,
} from "@mui/icons-material";

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
      {value === index && <>{children}</>}
    </div>
  );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#78909c",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableCellCompany = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#78909c",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    backgroundColor: "#78909c",
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    // backgroundColor: '#3F4E4F',
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
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

export interface NepsePredictionHistory {
  Time?: number;
  Close?: number;
  Prediction?: number;
}

// {
//     "Scrip": "KMCDB",
//         "Name": "Kalika Laghubitta Bittiya Sanstha Limited (KMCDB)",
//             "Sector": "Microfinance",
//                 "ShareOutstanding": "3,128,750.00",
//                     "MarketPrice": "1,084.90",
//                         "PercentChange": "",
//                             "LastTradedOn": "2022/08/2203:00:00",
//                                 "FifitytwoWeekHighLow": "",
//                                     "OnehundredeightyDayAvg": "1,168.86",
//                                         "OnehundredtwentyDayAvg": "1,127.37",
//                                             "OneYearYield": "-25.02%",
//                                                 "Eps": "41.07(FY:078-079,Q:4)",
//                                                     "PeRatio": "26.42",
//                                                         "BookValue": "172.68",
//                                                             "Pbv": "6.28"
// }
interface StockInterface {
  Scrip: string;
  Name: string;
  Sector: string;
  ShareOutstanding: string;
  MarketPrice: string;
  PercentChange: string;
  LastTradedOn: string;
  FifitytwoWeekHighLow: string;
  OnehundredeightyDayAvg: string;
  OnehundredtwentyDayAvg: string;
  OneYearYield: string;
  Eps: string;
  PeRatio: string;
  BookValue: string;
  Pbv: string;
}

const options = {
  width: 600,
  height: 500,
  layout: {
    backgroundColor: "#2B2B43",
    lineColor: "#2B2B43",
    textColor: "rgba(255, 255, 255, 0.9)",
  },
  grid: {
    vertLines: {
      color: "rgba(197, 203, 206, 0.5)",
    },
    horzLines: {
      color: "rgba(197, 203, 206, 0.5)",
    },
  },
  rightPriceScale: {
    visible: true,
    borderColor: "rgba(197, 203, 206, 1)",
    lockVisibleTimeRangeOnResize: true,
  },
  timeScale: {
    borderColor: "rgba(197, 203, 206, 1)",
  },
  crosshair: {
    mode: CrosshairMode.Normal,
  },
};

const lineOptions = {
  width: 600,
  height: 500,
  rightPriceScale: {
    visible: true,
    borderColor: "rgba(197, 203, 206, 1)",
  },
  leftPriceScale: {
    visible: true,
    borderColor: "rgba(197, 203, 206, 1)",
  },
  layout: {
    backgroundColor: "#ffffff",
    textColor: "rgba(33, 56, 77, 1)",
  },
  grid: {
    horzLines: {
      color: "#F0F3FA",
    },
    vertLines: {
      color: "#F0F3FA",
    },
  },
  crosshair: {
    mode: CrosshairMode.Normal,
  },
  timeScale: {
    borderColor: "rgba(197, 203, 206, 1)",
  },
  handleScroll: {
    vertTouchDrag: false,
  },
};

export const StockPage = () => {
  const { scrip } = useAppSelector((state) => state.scrip);
  const [isLoading, setIsLoading] = useState(true);
  const [isChartLoading, setIsChartLoading] = useState(true);
  const [stockData, setStockData] = useState<StockInterface>(
    {} as StockInterface
  );
  const [historicData, setHistoricData] = useState<any[]>([]);
  const [historicTableData, setHistoricTableData] = useState<NepseHistory[]>(
    []
  );
  const [tomorrowPredictedValue, setTomorrowPredictedValue] = useState<any>();
  const [historicTablePredictionData, setHistoricTablePredictionData] =
    useState<NepsePredictionHistory[]>([]);
  const [volumeData, setVolumeData] = useState<any[]>([]);
  const [value, setValue] = useState(0);
  const [predictionLineData, setPredictionLineData] = useState<any[]>([]);
  const [originalLineData, setOriginalLineData] = useState<any[]>([]);

  const columns = [
    { id: "Time", label: "Time", minWidth: 150 },
    { id: "Close", label: "Close(Rs)", minWidth: 150 },
    { id: "Open", label: "Open(Rs)", minWidth: 150 },
    { id: "High", label: "High(Rs)", minWidth: 150 },
    { id: "Low", label: "Low(Rs)", minWidth: 150 },
    { id: "Volume", label: "Volume", minWidth: 150 },
  ];

  const fetchStockData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/stock/${scrip}`
      );
      if (response.status === 200) {
        setStockData(response.data);
      }
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchHistoricData = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/nepseHistory/${scrip}`
    );
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
          };
        })
      );
      setVolumeData(
        response.data.map((item: any) => {
          return {
            //{ time: '2019-05-28', value: 59.57 },
            time: new Date(item.Time * 1000).toLocaleDateString("en-US"),
            value: item.Volume,
          };
        })
      );
      setHistoricTableData(
        response.data.map((item: any) => {
          return {
            // { time: '2018-10-22', open: 180.82, high: 181.40, low: 177.56, close: 178.75 },
            Time: formatDate(item.Time),
            Open: item.Open.toFixed(2),
            High: item.High.toFixed(2),
            Low: item.Low.toFixed(2),
            Close: item.Close.toFixed(2),
            Volume: item.Volume.toFixed(2),
          };
        })
      );

      setIsChartLoading(false);
    }
  };

  const fetchHistoricDataPrediction = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/nepseHistoryPrediction/${scrip}`
    );
    if (response.status === 200) {
      setTomorrowPredictedValue(response.data.splice(-1));
      setOriginalLineData(
        response.data.slice(0, -1).map((item: any) => {
          return {
            // {time: {year: 2018, month: 9, day: 22}, value: 25.531816900940186},
            // {time: {year: 2018, month: 9, day: 23}, value: 26.350850429478125},
            time: formatDate(item.Time),
            value: item.Close,
          };
        })
      );
      setPredictionLineData(
        response.data.map((item: any) => {
          return {
            // {time: {year: 2018, month: 9, day: 22}, value: 25.531816900940186},
            // {time: {year: 2018, month: 9, day: 23}, value: 26.350850429478125},
            time: formatDate(item.Time),
            value: item.Prediction,
          };
        })
      );
    }
  };

  useEffect(() => {
    fetchStockData();
  }, [scrip]);

  useEffect(() => {
    setIsChartLoading(true);
    fetchHistoricData();
    fetchHistoricDataPrediction();
  }, [scrip]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div>
      <Container
        sx={{ padding: 2, display: "flex", mt: "-300px", ml: "250px" }}
      >
        <Grid>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", fontSize: "1.5rem" }}
          >
            {stockData.Name}
          </Typography>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="icon label tabs example"
            sx={{ ml: "250px" }}
          >
            <Tab icon={<GraphicEq />} label="CHART" value={0} />
            <Tab icon={<Details />} label="DETAILS" value={1} />
            <Tab icon={<History />} label="HISTORIC DATA" value={2} />
          </Tabs>

          <TabPanel value={value} index={0}>
            {!isChartLoading ? (
              <div>
                <Stack direction="row">
                  <Chart {...options}>
                    <CandlestickSeries data={historicData} />
                    <HistogramSeries
                      data={volumeData}
                      priceScaleId=""
                      color="#26a69a"
                      priceFormat={{ type: "volume" }}
                      scaleMargins={{
                        top: 0.11,
                        bottom: 0,
                      }}
                    />
                  </Chart>
                  <Stack>
                    <Stack direction="row">
                      <ListItem>
                        <ListItemIcon>
                          <SquareRounded htmlColor="#38d4e8" />
                        </ListItemIcon>
                        <ListItemText primary="Original Close Price" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <SquareRounded htmlColor="#046fe8" />
                        </ListItemIcon>
                        <ListItemText primary="LSTM Prediction" />
                      </ListItem>
                    </Stack>
                    <Chart {...lineOptions}>
                      <LineSeries
                        data={predictionLineData}
                        priceScaleId="right"
                        color="rgba(4, 111, 232, 1)"
                        lineWidth={2}
                      />
                      <LineSeries
                        data={originalLineData}
                        priceScaleId="right"
                        color="rgba(56, 212, 232, 45)"
                        lineWidth={2}
                      />
                    </Chart>
                  </Stack>
                </Stack>
              </div>
            ) : (
              <CircularProgress />
            )}
          </TabPanel>

          <TabPanel value={value} index={1}>
            <Grid item xs={8}>
              {!isLoading ? (
                <div>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <StyledTableCellCompany align="center">
                          Name : {stockData.Name}
                        </StyledTableCellCompany>
                      </TableRow>
                      <TableRow>
                        {tomorrowPredictedValue ? (
                          <StyledTableCellCompany align="center">
                            Tomorrow's Prediction : Rs{" "}
                            {tomorrowPredictedValue[0].Prediction.toFixed(2)}
                          </StyledTableCellCompany>
                        ) : (
                          <StyledTableCellCompany align="center">
                            Tomorrow's Prediction : 0
                          </StyledTableCellCompany>
                        )}
                      </TableRow>
                      <TableRow>
                        <StyledTableCellCompany align="center">
                          Sector : {stockData.Sector}
                        </StyledTableCellCompany>
                      </TableRow>
                      <TableRow>
                        <StyledTableCellCompany align="center">
                          MarketPrice : Rs {stockData.MarketPrice}
                        </StyledTableCellCompany>
                      </TableRow>
                      <TableRow>
                        <StyledTableCellCompany align="center">
                          % Change : {stockData.PercentChange}
                        </StyledTableCellCompany>
                      </TableRow>
                      <TableRow>
                        <StyledTableCellCompany align="center">
                          BookValue : Rs {stockData.BookValue}
                        </StyledTableCellCompany>
                      </TableRow>
                      <TableRow>
                        <StyledTableCellCompany align="center">
                          PERatio : {stockData.PeRatio}
                        </StyledTableCellCompany>
                      </TableRow>
                      <TableRow>
                        <StyledTableCellCompany align="center">
                          DividendYield : {stockData.OneYearYield}
                        </StyledTableCellCompany>
                      </TableRow>
                      <TableRow>
                        <StyledTableCellCompany align="center">
                          EPS : {stockData.Eps}
                        </StyledTableCellCompany>
                      </TableRow>
                      <TableRow>
                        <StyledTableCellCompany align="center">
                          Price To Book Value : {stockData.Pbv}
                        </StyledTableCellCompany>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <CircularProgress />
              )}
            </Grid>
          </TabPanel>

          <TabPanel value={value} index={2}>
            <TableContainer sx={{ maxHeight: 500, maxWidth: 900 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <StyledTableCell
                        key={column.id}
                        style={{
                          minWidth: column.minWidth,
                          fontWeight: "bold",
                          fontSize: "16px",
                        }}
                      >
                        {column.label}
                      </StyledTableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {historicTableData.map((row: any) => {
                    return (
                      <StyledTableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.Time}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <StyledTableCell key={column.id}>
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
    </div>
  );
};
