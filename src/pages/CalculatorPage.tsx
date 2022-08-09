import { Minimize, Shop } from "@mui/icons-material";
import { Box, Button, Container, Grid, Link, Tab, Tabs, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface SellResult {
    shareAmount: number;
    brokerCommission: number;
    sebonCommission: number;
    dpFee: number;
    capitalGain: number;
    capitalGainTax: number;
    ToatalReceivable: number;
}

interface BuyResult {
    shareAmount: number;
    brokerCommission: number;
    sebonCommission: number;
    dpFee: number;
    totalPayableAmount: number;
    costPricePerShare: number;
}

export default function CalculatorPage() {

    const [profit, setProfit] = useState<SellResult>();
    const [cost, setCost] = useState<BuyResult>();
    const [value, setValue] = useState(0);

    const handleSellSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let purchasePrice: number = Number(data.get('purchasePrice'));
        let sellingPrice: number = Number(data.get('sellingPrice'));
        let shares: number = Number(data.get('shares'));
        console.log({
            purchasePrice: data.get('purchasePrice'),
            sellingPrice: data.get('sellingPrice'),
            shares: data.get('shares'),
        });
        let shareAmount = shares * purchasePrice;
        let brokerCommission = shareAmount * 0.034;
        let sebonCommission = -300;
        let dpFee = -25;
        let capitalGain = sellingPrice - purchasePrice;
        let capitalGainTax = capitalGain * 0.75;
        let ToatalReceivable = shareAmount + brokerCommission + sebonCommission + dpFee + capitalGainTax;

        let profit = {
            shareAmount,
            brokerCommission,
            sebonCommission,
            dpFee,
            capitalGain,
            capitalGainTax,
            ToatalReceivable,
        }
        setProfit(profit);
    };
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleBuySubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let buyingPrice: number = Number(data.get('buyingPrice'));
        let noOfShares: number = Number(data.get('noOfShares'));
        console.log({
            buyingPrice: data.get('buyingPrice'),
            noOfShares: data.get('noOfShares'),
        });
        let shareAmount = noOfShares * buyingPrice;
        let brokerCommission = shareAmount * 0.034;
        let sebonCommission = -300;
        let dpFee = -25;
        let totalPayableAmount = shareAmount + brokerCommission + sebonCommission + dpFee;
        let costPricePerShare = totalPayableAmount / noOfShares;
        let cost = {
            shareAmount,
            brokerCommission,
            sebonCommission,
            dpFee,
            totalPayableAmount,
            costPricePerShare,
        }
        setCost(cost);
    }


    // useEffect(() => {
    // }, []);

    return (
        <div>

            <Container sx={{ padding: 2, display: 'flex', mt: '-330px', ml: '350px' }}>
                <Box>
                    <h1>Calculator</h1>
                    <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example">
                        <Tab icon={<Shop />} label="BUY" />
                        <Tab icon={<Minimize />} label="SELL" />
                    </Tabs>

                    {value == 0 ?
                        <div>
                            <Box component="form" noValidate onSubmit={handleBuySubmit} sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="buyingPrice"
                                            label="Buying Price"
                                            name="buyingPrice"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="noOfShares"
                                            label="Number of Shares"
                                            name="noOfShares"
                                        />
                                    </Grid>
                                </Grid>
                                <h4>Share Amount : {cost?.shareAmount}</h4>
                                <h4>Broker Commission : {cost?.brokerCommission}</h4>
                                <h4>SEBON Commission : {cost?.sebonCommission}</h4>
                                <h4>DP Fee : {cost?.dpFee}</h4>
                                <h4>Total Payable Amount : {cost?.totalPayableAmount}</h4>
                                <h4>Cost Price Per Share :{cost?.costPricePerShare}</h4>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Calculate
                                </Button>
                            </Box>
                        </div>
                        :
                        <div>
                            <Box component="form" noValidate onSubmit={handleSellSubmit} sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="purchasePrice"
                                            label="Purchaced/Base Price"
                                            name="purchasePrice"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="sellingPrice"
                                            label="Selling Price"
                                            name="sellingPrice"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="shares"
                                            label="Number of Shares"
                                            name="shares"
                                        />
                                    </Grid>
                                </Grid>
                                <h4>Share Amount : {profit?.shareAmount}</h4>
                                <h4>Broker Commission : {profit?.brokerCommission}</h4>
                                <h4>SEBON Commission : {profit?.sebonCommission}</h4>
                                <h4>DP Fee : {profit?.dpFee}</h4>
                                <h4>Capital Gain : {profit?.capitalGain}</h4>
                                <h4>Capital Gain Tax : {profit?.capitalGainTax}</h4>
                                <h4>Total Receivable :{profit?.ToatalReceivable}</h4>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Calculate
                                </Button>
                            </Box>
                        </div>
                    }
                </Box>
            </Container>

        </div>
    )

}
