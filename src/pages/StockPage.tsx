import { Button, Container, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks/search";
import { CrosshairMode } from 'lightweight-charts';
import { Chart, CandlestickSeries, HistogramSeries } from 'lightweight-charts-react-wrapper';
import { forEach } from "lodash";
import { formatDate } from "../utils/formatDate";


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

const sectors = {
    corporate_debentures: ['NICAD8283', 'NBLD85'],
    microfinance: ['ACLBSL', 'ALBSL', 'CBBL', 'CLBSL', 'DDBL', 'FMDBL', 'FOWAD', 'GMFBS', 'GILB', 'GBLBS', 'GLBSL', 'ILBS', 'JALPA', 'JSLBB', 'JBLB', 'KMCDB', 'KLBSL', 'LLBS', 'MLBSL', 'MSLB', 'MKLB', 'MLBS', 'MERO', 'MMFDB', 'MLBBL', 'NSLB', 'NLBBL', 'NESDO', 'NICLBSL', 'NUBL', 'RULB', 'RMDC', 'RSDC', 'SABSL', 'SDLBSL', 'SMATA', 'SLBSL', 'SKBBL', 'SMFDB', 'SMB', 'SWBBL', 'SMFBS', 'SLBBL', 'USLB', 'VLBS', 'WNLB'],
    commercial_banks: ['ADBL', 'BOKL', 'CCBL', 'CZBIL', 'CBL', 'EBL', 'GBIME', 'KBL', 'LBL', 'MBL', 'MEGA', 'NABIL', 'NBL', 'NCCB', 'SBI', 'NICA', 'NMB', 'PRVU', 'PCBL', 'SANIMA', 'SBL', 'SCB', 'SRBL'],
    non_life_insurance: ['AIL', 'EIC', 'GIC', 'HGI', 'IGI', 'LGIL', 'NIL', 'NICL', 'NLG', 'PRIN', 'PIC', 'PICL', 'RBCL', 'SIC', 'SGI', 'SICL', 'SIL', 'UIC'],
    hydro_powers: ['AKJCL', 'API', 'AKPL', 'AHPC', 'BARUN', 'BNHC', 'BPCL', 'CHL', 'CHCL', 'DHPL', 'GHL', 'GLH', 'HDHPC', 'HURJA', 'HPPL', 'JOSHI', 'KPCL', 'KKHC', 'LEC', 'MBJC', 'MKJC', 'MEN', 'MHNL', 'NHPC', 'NHDL', 'NGPL', 'NYADI', 'PMHPL', 'PPCL', 'RADHI', 'RHPL', 'RURU', 'SAHAS', 'SPC', 'SHPC', 'SJCL', 'SSHL', 'SHEL', 'SPDL', 'TPC', 'UNHPL', 'UMRH', 'UMHL', 'UPCL', 'UPPER'],
    life_insurance: ['ALICL', 'GLICL', 'JLI', 'LICN', 'NLICL', 'NLIC', 'PLI', 'PLIC', 'RLI', 'SLI', 'SLICL', 'ULI'],
    finance: ['BFC', 'CFCL', 'GFCL', 'GMFIL', 'GUFL', 'ICFC', 'JFL', 'MFIL', 'MPFL', 'NFS', 'PFL', 'PROFL', 'RLFL', 'SFCL', 'SIFC'],
    tradings: ['BBC', 'STC'],
    manufacturing_and_processing: ['BNT', 'HDL', 'SHIVM', 'UNL'],
    investment: ['CHDC', 'CIT', 'ENL', 'HIDCL', 'NIFRA', 'NRN'],
    hotels: ['CGH', 'OHL', 'SHL', 'TRH'],
    development_banks: ['CORBL', 'EDBL', 'GBBL', 'GRDBL', 'JBBL', 'KSBBL', 'KRBL', 'LBBL', 'MLBL', 'MDB', 'MNBBL', 'NABBC', 'SAPDBL', 'SADBL', 'SHINE', 'SINDU'],
    mutual_fund: ['KEF', 'LUK', 'NEF', 'NIBLPF'],
    other: ['NTC', 'NRIC']
}

export const StockPage = () => {
    const { scrip } = useAppSelector((state) => state.scrip);
    const [isLoading, setIsLoading] = useState(true);
    const [isChartLoading, setIsChartLoading] = useState(true);
    const [stockData, setStockData] = useState<StockInterface>({} as StockInterface);
    const [historicData, setHistoricData] = useState<any[]>([]);
    const [volumeData, setVolumeData] = useState<any[]>([]);
    const [sector, setSector] = useState<string>("");
    const [isFindSectorLoading, setIsFindSectorLoading] = useState(true);

    const findSector = (scripName: string) => {
        forEach(sectors, (sector, value) => {

            if (sector.includes(scripName)) {
                console.log(value)
                setSector(value);
                setIsFindSectorLoading(false);
            }
        })

    }

    const fetchStockData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/stocks/${scrip}`);
            if (response.status === 200) {
                setStockData(response.data);
            }
            setIsLoading(false);
        } catch (e) {
            console.log(e);
        }
    }

    const fetchHistoricData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/nepseHistory/${sector}/${scrip}`)
            if (response.status === 200) {
                setHistoricData(
                    response.data.map((item: any) => {
                        return {
                            //     { time: '2018-10-19', open: 180.34, high: 180.99, low: 178.57, close: 179.85 },
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
                setIsChartLoading(false);
            }

        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        setIsFindSectorLoading(true);
        fetchStockData();
        findSector(scrip);
    }, [scrip]);



    useEffect(() => {
        setIsChartLoading(true);
        fetchHistoricData();

    }, [scrip, sector]);
    return (
        <div>
            <Container sx={{ padding: 2, display: 'flex', mt: '-200px', ml: '250px' }}>
                <Grid>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: '2.5rem' }}>
                        {scrip}
                    </Typography>
                    {!isFindSectorLoading ?
                        <div>
                            <Grid item xs={8}>
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
                            </Grid>
                            <Grid item xs={8}>
                                {!isChartLoading ?
                                    <Chart {...options}>
                                        <CandlestickSeries
                                            data={historicData.slice(0, 500)}
                                        />
                                        <HistogramSeries
                                            data={volumeData}
                                            priceScaleId=""
                                            color="#26a69a"
                                            priceFormat={{ type: 'volume' }}
                                            scaleMargins={{ top: 0.9, bottom: 0 }}
                                        />
                                    </Chart>
                                    : <div>Loading...</div>}
                            </Grid>
                        </div>
                        : <div>Loading...</div>}
                </Grid>
            </Container>
        </div>
    )
}

type SectorType = {
    coporate_debentures: string[];
    microfinance: string[];
    commercial_banks: string[];
    non_life_insurance: string[];
    hydro_powers: string[];
    life_insurance: string[];
    finance: string[];
    tradings: string[];
    manufacturing_and_processing: string[];
    investment: string[];
    hotels: string[];
    development_banks: string[];
    mutual_fund: string[];
    other: string[];
}

const options = {
    width: 800,
    height: 500,
    layout: {
        backgroundColor: '#faf5f5',
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
    crosshair: {
        mode: CrosshairMode.Normal,
    },
    rightPriceScale: {
        borderColor: 'rgba(197, 203, 206, 0.8)',
    },
    timeScale: {
        borderColor: 'rgba(197, 203, 206, 0.8)',
    },
};


// const sectorsJson = {
//     "corporate_debentures": [
//         "NICAD8283",
//         "NBLD85"
//     ],
//     "microfinance": [
//         "ACLBSL",
//         "ALBSL",
//         "CBBL",
//         "CLBSL",
//         "DDBL",
//         "FMDBL",
//         "FOWAD",
//         "GMFBS",
//         "GILB",
//         "GBLBS",
//         "GLBSL",
//         "ILBS",
//         "JALPA",
//         "JSLBB",
//         "JBLB",
//         "KMCDB",
//         "KLBSL",
//         "LLBS",
//         "MLBSL",
//         "MSLB",
//         "MKLB",
//         "MLBS",
//         "MERO",
//         "MMFDB",
//         "MLBBL",
//         "NSLB",
//         "NLBBL",
//         "NESDO",
//         "NICLBSL",
//         "NUBL",
//         "RULB",
//         "RMDC",
//         "RSDC",
//         "SABSL",
//         "SDLBSL",
//         "SMATA",
//         "SLBSL",
//         "SKBBL",
//         "SMFDB",
//         "SMB",
//         "SWBBL",
//         "SMFBS",
//         "SLBBL",
//         "USLB",
//         "VLBS",
//         "WNLB"
//     ],
//     "commercial_banks": [
//         "ADBL",
//         "BOKL",
//         "CCBL",
//         "CZBIL",
//         "CBL",
//         "EBL",
//         "GBIME",
//         "KBL",
//         "LBL",
//         "MBL",
//         "MEGA",
//         "NABIL",
//         "NBL",
//         "NCCB",
//         "SBI",
//         "NICA",
//         "NMB",
//         "PRVU",
//         "PCBL",
//         "SANIMA",
//         "SBL",
//         "SCB",
//         "SRBL"
//     ],
//     "non_life_insurance": [
//         "AIL",
//         "EIC",
//         "GIC",
//         "HGI",
//         "IGI",
//         "LGIL",
//         "NIL",
//         "NICL",
//         "NLG",
//         "PRIN",
//         "PIC",
//         "PICL",
//         "RBCL",
//         "SIC",
//         "SGI",
//         "SICL",
//         "SIL",
//         "UIC"
//     ],
//     "hydro_powers": [
//         "AKJCL",
//         "API",
//         "AKPL",
//         "AHPC",
//         "BARUN",
//         "BNHC",
//         "BPCL",
//         "CHL",
//         "CHCL",
//         "DHPL",
//         "GHL",
//         "GLH",
//         "HDHPC",
//         "HURJA",
//         "HPPL",
//         "JOSHI",
//         "KPCL",
//         "KKHC",
//         "LEC",
//         "MBJC",
//         "MKJC",
//         "MEN",
//         "MHNL",
//         "NHPC",
//         "NHDL",
//         "NGPL",
//         "NYADI",
//         "PMHPL",
//         "PPCL",
//         "RADHI",
//         "RHPL",
//         "RURU",
//         "SAHAS",
//         "SPC",
//         "SHPC",
//         "SJCL",
//         "SSHL",
//         "SHEL",
//         "SPDL",
//         "TPC",
//         "UNHPL",
//         "UMRH",
//         "UMHL",
//         "UPCL",
//         "UPPER"
//     ],
//     "life_insurance": [
//         "ALICL",
//         "GLICL",
//         "JLI",
//         "LICN",
//         "NLICL",
//         "NLIC",
//         "PLI",
//         "PLIC",
//         "RLI",
//         "SLI",
//         "SLICL",
//         "ULI"
//     ],
//     "finance": [
//         "BFC",
//         "CFCL",
//         "GFCL",
//         "GMFIL",
//         "GUFL",
//         "ICFC",
//         "JFL",
//         "MFIL",
//         "MPFL",
//         "NFS",
//         "PFL",
//         "PROFL",
//         "RLFL",
//         "SFCL",
//         "SIFC"
//     ],
//     "tradings": [
//         "BBC",
//         "STC"
//     ],
//     "manufacturing_and_processing": [
//         "BNT",
//         "HDL",
//         "SHIVM",
//         "UNL"
//     ],
//     "investment": [
//         "CHDC",
//         "CIT",
//         "ENL",
//         "HIDCL",
//         "NIFRA",
//         "NRN"
//     ],
//     "hotels": [
//         "CGH",
//         "OHL",
//         "SHL",
//         "TRH"
//     ],
//     "development_banks": [
//         "CORBL",
//         "EDBL",
//         "GBBL",
//         "GRDBL",
//         "JBBL",
//         "KSBBL",
//         "KRBL",
//         "LBBL",
//         "MLBL",
//         "MDB",
//         "MNBBL",
//         "NABBC",
//         "SAPDBL",
//         "SADBL",
//         "SHINE",
//         "SINDU"
//     ],
//     "mutual_fund": [
//         "KEF",
//         "LUK",
//         "NEF",
//         "NIBLPF"
//     ],
//     "other": [
//         "NTC",
//         "NRIC"
//     ]
// }