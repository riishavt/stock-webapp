import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
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
        setIsLoading(true);
        axios.get(`http://localhost:8080/api/admin/portfolios/${userToken.username}`, { headers: { Authorization: `Bearer ${userToken.token}` } })
            .then(res => res.data)
            .then(json => {
                setIsLoading(false);
                console.log(json)
                setPortfolioData(json);
            })
    }, []);

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
                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
}