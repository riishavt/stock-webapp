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
        let brokerCommission = Number((shareAmount * 0.034).toFixed(2));
        let sebonCommission = -300;
        let dpFee = -25;
        let capitalGain = sellingPrice - purchasePrice;
        let capitalGainTax = Number((capitalGain * 0.75).toFixed(2));
        let ToatalReceivable = Number((shareAmount + brokerCommission + sebonCommission + dpFee + capitalGainTax).toFixed(2));

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
        event.preventDefault();
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
        let brokerCommission = Number((shareAmount * 0.034).toFixed(2));
        let sebonCommission = -300;
        let dpFee = -25;
        let totalPayableAmount = Number((shareAmount + brokerCommission + sebonCommission + dpFee).toFixed(2));
        let costPricePerShare = Number((totalPayableAmount / noOfShares).toFixed(2));
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

    return (
        <div>

            <Container sx={{ padding: 2, display: 'flex', mt: '-365px', ml: '350px' }}>
                <Box>
                    <h1>Calculator</h1>
                    <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example" >
                        <Tab icon={<Shop />} label="BUY" />
                        <Tab icon={<Minimize />} label="SELL" />
                    </Tabs>

                    {value == 0 ?
                        <div>
                            <Box component="form" onSubmit={handleBuySubmit} sx={{ mt: 3 }} >
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            type="number"
                                            id="buyingPrice"
                                            label="Buying Price"
                                            name="buyingPrice"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            type="number"
                                            id="noOfShares"
                                            label="Number of Shares"
                                            name="noOfShares"
                                        />
                                    </Grid>
                                </Grid>
                                <h4>Share Amount : Rs {cost?.shareAmount}</h4>
                                <h4>Broker Commission : Rs {cost?.brokerCommission}</h4>
                                <h4>SEBON Commission : Rs {cost?.sebonCommission}</h4>
                                <h4>DP Fee : Rs {cost?.dpFee}</h4>
                                <h4>Total Payable Amount : Rs {cost?.totalPayableAmount}</h4>
                                <h4>Cost Price Per Share :Rs {cost?.costPricePerShare}</h4>
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
                            <Box component="form" onSubmit={handleSellSubmit} sx={{ mt: 3 }} >
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            type="number"
                                            id="purchasePrice"
                                            label="Purchaced/Base Price"
                                            name="purchasePrice"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            type="number"
                                            id="sellingPrice"
                                            label="Selling Price"
                                            name="sellingPrice"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            type="number"
                                            id="shares"
                                            label="Number of Shares"
                                            name="shares"
                                        />
                                    </Grid>
                                </Grid>
                                <h4>Share Amount : Rs {profit?.shareAmount}</h4>
                                <h4>Broker Commission : Rs {profit?.brokerCommission}</h4>
                                <h4>SEBON Commission : Rs {profit?.sebonCommission}</h4>
                                <h4>DP Fee : Rs {profit?.dpFee}</h4>
                                <h4>Capital Gain : Rs {profit?.capitalGain}</h4>
                                <h4>Capital Gain Tax : Rs {profit?.capitalGainTax}</h4>
                                <h4>Total Receivable :Rs {profit?.ToatalReceivable}</h4>
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
