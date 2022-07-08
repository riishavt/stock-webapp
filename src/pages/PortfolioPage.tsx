import { Add, DeleteOutlined, EditRounded } from "@mui/icons-material";
import { Button, Dialog, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { render } from "react-dom";
import { AddPortfolioItem } from "../components/AddPortfolioItem";
import { EditPortfolioItem } from "../components/EditPortfolioItem";
import { Storage } from "../utils/storage";

interface PortfolioInterface {
    ID: number;
    // CreatedAt: Date | null;
    // UpdatedAt: Date | null;
    // DeletedAt: Date | null;
    username: string;
    scrip: string;
    type: string;
    total: number;
    price: number;
}

type userStorage = {
    token: string;
    username: string;
}


export const Portfolio = () => {

    const [portfolioData, setPortfolioData] = useState<PortfolioInterface[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState<userStorage>({ token: "", username: "" });


    const columns = [
        // { id: "ID", label: "ID", minWidth: 100 },
        // { id: "CreatedAt", label: "CreatedAt", minWidth: 100 },
        // { id: "UpdatedAt", label: "UpdatedAt", minWidth: 100 },
        // { id: "DeletedAt", label: "DeletedAt", minWidth: 100 },
        // { id: "username", label: "username", minWidth: 100 },
        { id: "scrip", label: "scrip", minWidth: 100 },
        { id: "type", label: "type", minWidth: 100 },
        { id: "total", label: "total", minWidth: 100 },
        { id: "price", label: "price", minWidth: 100 },
    ];

    useEffect(() => {
        const rawToken = Storage.load("user");
        const userToken: userStorage = rawToken ? JSON.parse(rawToken) : "";
        setCurrentUser(userToken);
        setIsLoading(true);
        axios.get(`http://localhost:8080/api/admin/portfolios/${userToken.username}`,
            { headers: { Authorization: `Bearer ${userToken.token}` } })
            .then(res => res.data)
            .then(json => {
                setIsLoading(false);
                console.log(json)
                setPortfolioData(json);
            })
    }, []);

    // const handleEditPortfolioItem = (username: string, scrip: string, type: string, total: number, price: number) => {
    //     const data = `{"username": "${username}", "scrip": "${scrip}", "type": "${type}", "total": ${total}, "price": ${price}}`
    //     axios.patch(
    //         `http://localhost:8080/api/admin/portfolios/${username}`,
    //         data,
    //         { headers: { Authorization: `Bearer ${currentUser.token}` } }
    //     )
    //     return (
    //         <div>
    //             <Dialog open={true}>
    //                 <DialogTitle>Hello</DialogTitle>
    //             </Dialog>
    //         </div>

    //     )

    // }

    const handleDeletePortfolioItem = (username: string, scrip: string) => {
        axios.get(`http://localhost:8080/api/admin/portfolios/${username}/${scrip}`, { headers: { Authorization: `Bearer ${currentUser.token}` } })
        window.location.reload();
    }

    return <div>
        <h1>Portfolio</h1>
        <TableContainer sx={{ maxHeight: 440, maxWidth: 600 }}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead >
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell
                                key={column.id}
                                style={{ minWidth: column.minWidth }}
                            >
                                {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {portfolioData
                        .map((row: any) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.scrip}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} >
                                                {value}
                                            </TableCell>
                                        );
                                    })}
                                    <EditPortfolioItem />
                                    {/* <Button variant="outlined" color="primary" size="small" onClick={() => {
                                        handleEditPortfolioItem(row.username, row.scrip, row.type, row.total, row.price);
                                    }}>
                                        <EditRounded />
                                    </Button> */}
                                    <Button variant="outlined" color="secondary" size="small" onClick={() => {
                                        handleDeletePortfolioItem("sachin", row.scrip);
                                    }}>
                                        <DeleteOutlined />
                                    </Button>
                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>
        </TableContainer>
        <AddPortfolioItem />
    </div>
}