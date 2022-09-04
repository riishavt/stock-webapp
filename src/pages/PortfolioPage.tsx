import { DeleteOutlined, EditRounded } from "@mui/icons-material";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { AddPortfolioItem } from "../components/AddPortfolioItem";
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
  totalProfit: number;
}

type userStorage = {
  token: string;
  username: string;
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#78909c",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    //backgroundColor: '#3F4E4F',
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const initialFormData = Object.freeze({
  total: 0,
  price: 0,
});

export const Portfolio = () => {
  const [portfolioData, setPortfolioData] = useState<PortfolioInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<userStorage>({
    token: "",
    username: "",
  });
  const [formData, updateFormData] = React.useState(initialFormData);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    // { id: "ID", label: "ID", minWidth: 100 },
    // { id: "CreatedAt", label: "CreatedAt", minWidth: 100 },
    // { id: "UpdatedAt", label: "UpdatedAt", minWidth: 100 },
    // { id: "DeletedAt", label: "DeletedAt", minWidth: 100 },
    // { id: "username", label: "username", minWidth: 100 },
    { id: "scrip", label: "Scrip", minWidth: 100 },
    { id: "total", label: "Total", minWidth: 100 },
    { id: "price", label: "Price(Rs)", minWidth: 100 },
    { id: "lastPrice", label: "LTP(Rs)", minWidth: 100 },
    { id: "open", label: "Open(Rs)", minWidth: 100 },
  ];
  const handleChange = (e: any) => {
    e.preventDefault();
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
    console.log(formData);
  };

  useEffect(() => {
    getPortfolio();
  }, []);

  const getPortfolio = async () => {
    const rawToken = Storage.load("user");
    const userToken: userStorage = rawToken ? JSON.parse(rawToken) : "";
    setCurrentUser(userToken);
    try {
      const response = await axios.get(
        `http://localhost:8080/api/admin/portfolios/${userToken.username}`,
        { headers: { Authorization: `Bearer ${userToken.token}` } }
      );
      if (response.status === 200) {
        setPortfolioData(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditPortfolioItem = (scrip: string) => {
    const rawToken = Storage.load("user");
    const userToken: userStorage = rawToken ? JSON.parse(rawToken) : "";
    const data = `{"username": "${userToken.username}", "scrip": "${scrip}", "total": ${formData.total}, "price": ${formData.price}}`;
    axios.patch(
      `http://localhost:8080/api/admin/portfolios/${userToken.username}`,
      data,
      { headers: { Authorization: `Bearer ${userToken.token}` } }
    );
    window.location.reload();
  };

  const handleDeletePortfolioItem = (username: string, scrip: string) => {
    axios.get(
      `http://localhost:8080/api/admin/portfolios/${currentUser.username}/${scrip}`,
      { headers: { Authorization: `Bearer ${currentUser.token}` } }
    );
    window.location.reload();
  };

  return (
    <div>
      <Container
        sx={{ padding: 2, display: "flex", mt: "-300px", ml: "350px" }}
      >
        <Stack spacing={3} sx={{ alignItems: "end" }}>
          <TableContainer sx={{ maxHeight: 600, maxWidth: 900 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <StyledTableCell
                      key={column.label}
                      style={{
                        minWidth: column.minWidth,
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}
                    >
                      {column.label}
                    </StyledTableCell>
                  ))}
                  <StyledTableCell>Daily Profit/Loss(Rs)</StyledTableCell>
                  <StyledTableCell>Total Profit/Loss(Rs)</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {portfolioData.map((row: any) => {
                  return (
                    <StyledTableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.ID}
                    >
                      <StyledTableCell key={row.ID}>
                        {row.scrip}
                      </StyledTableCell>
                      <StyledTableCell key={row.ID}>
                        <TextField
                          id="portfolio-total"
                          name="total"
                          type="number"
                          label={row.total}
                          onChange={handleChange}
                          variant="filled"
                          sx={{ backgroundColor: "whitesmoke" }}
                        />
                      </StyledTableCell>
                      <StyledTableCell key={row.ID}>
                        <TextField
                          id="portfolio-total"
                          name="price"
                          type="number"
                          label={row.price}
                          onChange={handleChange}
                          variant="filled"
                          sx={{ backgroundColor: "whitesmoke" }}
                        />
                      </StyledTableCell>
                      <StyledTableCell key={row.ID}>
                        {row.lastPrice}
                      </StyledTableCell>
                      <StyledTableCell key={row.ID}>{row.open}</StyledTableCell>
                      <StyledTableCell key={row.ID}>
                        {row.lastPrice > row.open ? (
                          <span style={{ color: "green" }}>
                            {(row.lastPrice - row.open).toFixed(2)}
                          </span>
                        ) : (
                          <span style={{ color: "red" }}>
                            {(row.lastPrice - row.open).toFixed(2)}
                          </span>
                        )}
                      </StyledTableCell>
                      <StyledTableCell key={row.ID}>
                        {row.totalProfit > 0 ? (
                          <span style={{ color: "green" }}>
                            {row.totalProfit.toFixed(2)}
                          </span>
                        ) : (
                          <span style={{ color: "red" }}>
                            {row.totalProfit.toFixed(2)}
                          </span>
                        )}
                      </StyledTableCell>

                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => handleEditPortfolioItem(row.scrip)}
                      >
                        <EditRounded />
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        sx={{ backgroundColor: "whitesmoke" }}
                        onClick={() => {
                          handleClickOpen();
                        }}
                      >
                        <DeleteOutlined />
                      </Button>
                      <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"Are you sure you want to delete ?"}
                        </DialogTitle>
                        <DialogActions>
                          <Button onClick={handleClose}>No</Button>
                          <Button
                            onClick={() => {
                              handleClose;
                              handleDeletePortfolioItem(
                                currentUser?.username,
                                row.scrip
                              );
                            }}
                            autoFocus
                          >
                            <Typography color={"red"} fontWeight={"bold"}>
                              Yes
                            </Typography>
                          </Button>
                        </DialogActions>
                      </Dialog>
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
  );
};
