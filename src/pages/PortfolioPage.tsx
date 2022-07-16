import { DeleteOutlined } from "@mui/icons-material";
import { Button, Container, Stack, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
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
    total: number;
    price: number;
    lastPrice: number;
    open: number;
}

type userStorage = {
    token: string;
    username: string;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#78909c',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        //backgroundColor: '#3F4E4F',
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));



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
        { id: "total", label: "total", minWidth: 100 },
        { id: "price", label: "price", minWidth: 100 },
        { id: "lastPrice", label: "ltp", minWidth: 100 },
        { id: "open", label: "open", minWidth: 100 },
    ];

    useEffect(() => {
        setIsLoading(true);
        getPortfolio()
    }, []);

    const getPortfolio = async () => {
        const rawToken = Storage.load("user");
        const userToken: userStorage = rawToken ? JSON.parse(rawToken) : "";
        setCurrentUser(userToken);
        try {
            const response = await axios.get(`http://localhost:8080/api/admin/portfolios/${userToken.username}`,
                { headers: { Authorization: `Bearer ${userToken.token}` } });
            if (response.status === 200) {
                setPortfolioData(response.data);
                console.log(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

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
        <Container sx={{ padding: 2, display: 'flex', mt: '-200px', ml: '350px' }}>
            <Stack spacing={3} sx={{ alignItems: 'end' }}>
                <TableContainer sx={{ maxHeight: 600, maxWidth: 800 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead >
                            <TableRow>
                                {columns.map((column) => (
                                    <StyledTableCell
                                        key={column.id}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </StyledTableCell>
                                ))}
                                <StyledTableCell key={1000}>
                                    Profit/Loss
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {portfolioData
                                .map((row: any) => {
                                    return (
                                        <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.scrip}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <StyledTableCell key={column.id} >
                                                        {value}
                                                    </StyledTableCell>
                                                );
                                            })}
                                            <StyledTableCell>
                                                {row.lastPrice > row.open
                                                    ? <span style={{ color: 'green' }}>
                                                        {(row.lastPrice - row.open).toFixed(2)}
                                                    </span>
                                                    : <span style={{ color: 'red' }}>
                                                        {(row.lastPrice - row.open).toFixed(2)}
                                                    </span>}
                                            </StyledTableCell>
                                            <EditPortfolioItem />
                                            {/* <Button variant="outlined" color="primary" size="small" onClick={() => {
                                        handleEditPortfolioItem(row.username, row.scrip, row.type, row.total, row.price);
                                    }}>
                                        <EditRounded />
                                    </Button> */}
                                            <Button variant="outlined" color="secondary" size="small" sx={{ backgroundColor: 'whitesmoke' }} onClick={() => {
                                                handleDeletePortfolioItem("sachin", row.scrip);
                                            }}>
                                                <DeleteOutlined />
                                            </Button>
                                        </StyledTableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <AddPortfolioItem />
            </Stack>
        </Container>
    </div>
}