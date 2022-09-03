import {
  Button,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableRow,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userSlice } from "../redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

interface UserDetails {
  id: number;
  createdAt: string;
  updatedAt: string;
  username: string;
  fullname: string;
  email: string;
  password: string;
}

const StyledTableCellCompany = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#78909c",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    backgroundColor: "#78909c",
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
}));

export default function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.userSlice);
  const [userData, setUserData] = useState<UserDetails>();
  const [isLoading, setIsLoading] = useState(true);

  const handleOnSignOut = () => {
    dispatch(userSlice.actions.logout());
    navigate("/");
  };

  useEffect(() => {
    getUserInfo();
  }, [user]);

  const getUserInfo = async () => {
    const userData = await axios.get(
      `http://localhost:8080/api/admin/user/${user?.username}`,
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );
    setUserData(userData.data);
    setIsLoading(false);
  };

  return (
    <div>
      <Container
        sx={{ padding: 2, display: "flex", mt: "-300px", ml: "450px" }}
      >
        <Stack spacing={2} alignItems="center" marginTop={12}>
          {user && userData ? (
            <div>
              <Table>
                <TableBody>
                  <TableRow>
                    <StyledTableCellCompany>
                      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                        Username: {user.username}
                      </Typography>
                    </StyledTableCellCompany>
                  </TableRow>
                  <TableRow>
                    <StyledTableCellCompany>
                      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                        Fullname: {userData.fullname}
                      </Typography>
                    </StyledTableCellCompany>
                  </TableRow>
                  <TableRow>
                    <StyledTableCellCompany>
                      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                        {userData.email}
                      </Typography>
                    </StyledTableCellCompany>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          ) : (
            <div>...Loading</div>
          )}
          <Button
            variant="contained"
            type="submit"
            onClick={handleOnSignOut}
            color="error"
          >
            Sign out
          </Button>
        </Stack>
      </Container>
    </div>
  );
}
