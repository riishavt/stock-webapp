import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { Card, CardContent, CardHeader, CircularProgress, Container, Grid, Icon, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

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

export const NepseCard = () => {
    const [nepseData, setNepseData] = useState<IndexInterface>({
        IndexName: "",
        FullName: "",
        Turnover: "",
        DailyGain: 0,
        TotalPositiveGainer: "",
        TotalNegativeGainer: "",
        Pe: "",
        Pb: "",
        Peg: "",
        Roe: "",
        Alpha: "",
        Beta: "",
        SharpeRatio: "",
        Macd: "",
        Rsi: "",
        YearlyPercentChange: "",
        MacdSignal: "",
        SmaTwo: "",
        Ltp: 0,
        TotalDividendYield: "",
        Roa: "",
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        getNepseData()
    }, []);

    const getNepseData = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/nepse");
            if (response.status === 200) {
                setNepseData(response.data);
                setIsLoading(false);
                console.log(response.data);
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            {!isLoading ?
                <Card variant='elevation' raised>
                    <CardHeader
                        title={'NEPSE'}
                        titleTypographyProps={{ align: 'center' }}
                        subheaderTypographyProps={{ align: 'center' }}
                        sx={{ backgroundColor: '#78909c' }}
                    />
                    <CardContent sx={{ backgroundColor: '#091929' }}>
                        <Typography component="h3" variant="h4" color={nepseData.DailyGain > 0 ? "green" : "red"} align="center">
                            {nepseData.Ltp}
                            <Icon children={nepseData.DailyGain > 0 ? <ArrowUpward color="success" /> : <ArrowDownward color="error" />} />
                        </Typography>
                        <Typography component="h5"
                            variant="h5"
                            align="center"
                            color={nepseData.DailyGain > 0 ? "green" : "red"}
                        >
                            {nepseData.DailyGain}
                        </Typography>
                        <Stack direction="row">
                            <Typography component="h5"
                                variant="h5"
                                color={"white"}
                                align="center"
                            >
                                Gainers:
                            </Typography>
                            <Typography component="h4"
                                variant="h4"
                                align="center"
                                color={"green"}
                            >
                                {nepseData.TotalPositiveGainer}
                            </Typography>
                        </Stack>
                        <Stack direction="row">
                            <Typography component="h5"
                                variant="h5"
                                color={"white"}
                                align="center"
                            >
                                Losers:
                            </Typography>
                            <Typography component="h4"
                                variant="h4"
                                align="center"
                                color={"red"}
                            >
                                {nepseData.TotalNegativeGainer}
                            </Typography>
                        </Stack>
                    </CardContent>
                </Card>
                : <CircularProgress />}
        </div>
    )
}
