import React from "react";
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
import { CrosshairMode } from "lightweight-charts";
import { Chart, LineSeries } from "lightweight-charts-react-wrapper";
import { formatDate } from "../utils/formatDate";
import {
  GraphicEq,
  Details,
  History,
  CircleRounded,
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
    align: "center",
    fontSize: 14,
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

interface NepseHistory {
  Time?: number;
  Close?: number;
  Open?: number;
  High?: number;
  Low?: number;
  Volume?: number;
}

export interface NepsePredictionTableInterface {
  Scrip?: string;
  Time?: number;
  Close?: number;
  LstmPrediction?: number;
  GruPrediction?: number;
}

const options = {
  width: 800,
  height: 550,
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

export const NepsePrediction = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isChartLoading, setIsChartLoading] = useState(true);
  const [historicTableData, setHistoricTableData] = useState<NepseHistory[]>(
    []
  );
  const [historicPredictionTableData, setHistoricPredictionTableData] =
    useState<any[]>([]);
  const [value, setValue] = useState(0);
  const [lstmPredictionLineData, setLstmPredictionLineData] = useState<any[]>(
    []
  );
  const [gruPredictionLineData, setGruPredictionLineData] = useState<any[]>([]);
  const [originalLineData, setOriginalLineData] = useState<any[]>([]);

  const [dense, setDense] = useState(false);

  const columns = [
    { id: "Time", label: "Time", minWidth: 150 },
    { id: "Close", label: "Close", minWidth: 150 },
    { id: "Open", label: "Open", minWidth: 150 },
    { id: "High", label: "High", minWidth: 150 },
    { id: "Low", label: "Low", minWidth: 150 },
    { id: "Volume", label: "Volume", minWidth: 150 },
  ];

  const predictionColumns = [
    // { id: "Scrip", label: "Scrip", minWidth: 150 },
    { id: "Time", label: "Time", minWidth: 150 },
    { id: "Close", label: "Close", minWidth: 150 },
    { id: "LstmPrediction", label: "LstmPrediction", minWidth: 200 },
    { id: "GruPrediction", label: "GruPrediction", minWidth: 200 },
  ];

  const fetchHistoricData = async () => {
    const response = await axios.get(`http://localhost:8080/api/nepseHistoric`);
    if (response.status === 200) {
      setHistoricTableData(
        response.data.map((item: any) => {
          return {
            // { time: '2018-10-22', open: 180.82, high: 181.40, low: 177.56, close: 178.75 },
            Time: formatDate(item.Time),
            Open: item.Open,
            High: item.High,
            Low: item.Low,
            Close: item.Close,
            Volume: item.Volume,
          };
        })
      );

      setIsChartLoading(false);
    }
  };

  const fetchHistoricDataPrediction = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/nepsePrediction`
    );
    if (response.status === 200) {
      setHistoricPredictionTableData(
        response.data.map((item: any) => {
          return {
            // Scrip: item.Scrip,
            Time: formatDate(item.Time),
            Close: item.Close,
            LstmPrediction: item.LstmPrediction.toFixed(2),
            GruPrediction: item.GruPrediction.toFixed(2),
          };
        })
      );
      setOriginalLineData(
        response.data.slice(0, -8).map((item: any) => {
          return {
            // {time: {year: 2018, month: 9, day: 22}, value: 25.531816900940186},
            // {time: {year: 2018, month: 9, day: 23}, value: 26.350850429478125},
            time: formatDate(item.Time),
            value: item.Close,
          };
        })
      );
      setLstmPredictionLineData(
        response.data.slice(0, -4).map((item: any) => {
          return {
            // {time: {year: 2018, month: 9, day: 22}, value: 25.531816900940186},
            // {time: {year: 2018, month: 9, day: 23}, value: 26.350850429478125},
            time: formatDate(item.Time),
            value: item.LstmPrediction,
          };
        })
      );
      setGruPredictionLineData(
        response.data.slice(0, -4).map((item: any) => {
          return {
            // {time: {year: 2018, month: 9, day: 22}, value: 25.531816900940186},
            // {time: {year: 2018, month: 9, day: 23}, value: 26.350850429478125},
            time: formatDate(item.Time),
            value: item.GruPrediction,
          };
        })
      );
      console.log(historicPredictionTableData);
    }
  };

  useEffect(() => {
    setIsChartLoading(true);
    fetchHistoricData();
    fetchHistoricDataPrediction();
  }, []);

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
            align="center"
            sx={{ fontWeight: "bold", fontSize: "1.5rem" }}
          >
            NEPAL STOCK EXCHANGE (NEPSE)
          </Typography>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="icon label tabs example"
            sx={{ ml: "250px" }}
          >
            <Tab icon={<Details />} label="PREDICTIONS" value={0} />
            <Tab icon={<GraphicEq />} label="CHARTS" value={1} />
            <Tab icon={<History />} label="HISTORIC DATA" value={2} />
          </Tabs>

          <TabPanel value={value} index={0}>
            {isLoading ? (
              <TableContainer
                sx={{ maxHeight: 500, maxWidth: 900, alignSelf: "center" }}
              >
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {predictionColumns.map((column) => (
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
                    {historicPredictionTableData.map((row: any) => {
                      return (
                        <StyledTableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.Time}
                        >
                          {predictionColumns.map((column, index) => {
                            const value = row[column.id];
                            return (
                              <StyledTableCell key={index}>
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
            ) : (
              <CircularProgress />
            )}
          </TabPanel>

          <TabPanel value={value} index={1}>
            {!isChartLoading ? (
              <div>
                <Stack direction={"row"}>
                  <Chart {...options}>
                    <LineSeries
                      data={lstmPredictionLineData}
                      priceScaleId="right"
                      color="#046fe8"
                      lineWidth={2}
                    />
                    <LineSeries
                      data={gruPredictionLineData}
                      priceScaleId="right"
                      color="#38d41a"
                      lineWidth={2}
                    />
                    <LineSeries
                      data={originalLineData}
                      priceScaleId="right"
                      color="#38d4e8"
                      lineWidth={2}
                    />
                  </Chart>
                  <List dense={dense}>
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
                    <ListItem>
                      <ListItemIcon>
                        <SquareRounded htmlColor="#38d41a" />
                      </ListItemIcon>
                      <ListItemText primary="GRU Prediction" />
                    </ListItem>
                  </List>
                </Stack>
              </div>
            ) : (
              <CircularProgress />
            )}
          </TabPanel>

          <TabPanel value={value} index={2}>
            <TableContainer sx={{ maxHeight: 500, maxWidth: 900 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column, index) => (
                      <StyledTableCell
                        key={index}
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
                        {columns.map((column, index) => {
                          const value = row[column.id];
                          return (
                            <StyledTableCell key={index}>
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
