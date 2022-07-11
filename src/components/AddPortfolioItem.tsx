import { Button, Dialog, DialogActions, DialogTitle, FormGroup, Input, TextField } from "@mui/material"
import axios from "axios";
import React, { useState } from "react";
import { Storage } from "../utils/storage";

type userStorage = {
    token: string;
    username: string;
}

type exportPortfolioData = {
    scrip: string;
    type: string;
    total: number;
    price: number;
}
const initialFormData = Object.freeze({
    scrip: "",
    type: "",
    total: 0,
    price: 0
});
export const AddPortfolioItem = () => {

    const [open, setOpen] = React.useState(false);
    const [currentUser, setCurrentUser] = useState<userStorage>({ token: "", username: "" });
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


    const handleOnSubmit = (e: any) => {
        const rawToken = Storage.load("user");
        const userToken: userStorage = rawToken ? JSON.parse(rawToken) : "";
        setCurrentUser(userToken);
        const headers = { Authorization: `Bearer ${userToken.token}` }
        const data = `{"username": "${userToken.username}", "scrip": "${formData.scrip}", "type": "${formData.type}", "total": ${formData.total}, "price": ${formData.price}}`
        axios.post(
            `http://localhost:8080/api/admin/portfolios`,
            data,
            { headers: headers }
        )
        handleClose();
        window.location.reload();

    }


    return (<div>
        <Button onClick={handleClickOpen}>
            ADD
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Your Stock</DialogTitle>
            <DialogActions>
                <FormGroup >
                    <TextField name="scrip" label="Scrip" required onChange={handleFormChange} />
                    <TextField name="type" label="Type" required onChange={handleFormChange} />
                    <TextField name="total" label="Total" required onChange={handleFormChange} />
                    <TextField name="price" label="Price" required onChange={handleFormChange} />
                    <Button onClick={handleOnSubmit}> Add</Button>
                </FormGroup>
            </DialogActions>

        </Dialog>
    </div>
    )

}