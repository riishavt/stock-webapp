import { EditRounded } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogTitle, FormGroup, TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { Storage } from "../utils/storage";

type userStorage = {
    token: string;
    username: string;
}
const initialFormData = Object.freeze({
    scrip: "",
    total: 0,
    price: 0
});

export const EditPortfolioItem = () => {

    const [open, setOpen] = React.useState(false);
    const [formData, updateFormData] = React.useState(initialFormData)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleFormChange = (e: any) => {
        updateFormData({
            ...formData,

            // Trimming any whitespace
            [e.target.name]: e.target.value.trim()
        });
    };



    const handleEditPortfolioItem = (e: any) => {
        const rawToken = Storage.load("user");
        const userToken: userStorage = rawToken ? JSON.parse(rawToken) : "";
        const data = `{"username": "${userToken.username}", "scrip": "${formData.scrip}", "total": ${formData.total}, "price": ${formData.price}}`
        axios.patch(
            `http://localhost:8080/api/admin/portfolios/${userToken.username}`,
            data,
            { headers: { Authorization: `Bearer ${userToken.token}` } }
        )

    }

    return (
        <div>
            <Button variant="outlined" color="primary" size="small" sx={{ backgroundColor: 'whitesmoke' }} onClick={() => { handleClickOpen }}>
                <EditRounded />
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Your Stock</DialogTitle>
                <DialogActions>
                    <FormGroup >
                        <TextField name="scrip" label="Scrip" required onChange={handleFormChange} />
                        <TextField name="total" label="Total" required onChange={handleFormChange} />
                        <TextField name="price" label="Price" required onChange={handleFormChange} />
                        <Button onClick={handleEditPortfolioItem}> Add</Button>
                    </FormGroup>
                </DialogActions>

            </Dialog>
        </div>
    )
}