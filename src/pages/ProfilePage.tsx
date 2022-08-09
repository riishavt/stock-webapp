import { Button, Stack, Typography } from '@mui/material';
import { Container } from '@mui/system';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userSlice } from '../redux/features/userSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

interface UserDetails {
  id: number;
  createdAt: string;
  updatedAt: string;
  username: string;
  fullname: string;
  email: string;
  password: string;
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.userSlice);
  const [userData, setUserData] = useState<UserDetails>();
  const [isLoading, setIsLoading] = useState(true);

  const handleOnSignOut = () => {
    dispatch(userSlice.actions.logout());
    navigate('/');
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
        }
      },
    );
    setUserData(userData.data);
    setIsLoading(false);

  }

  return (
    <div>
      <Container sx={{ padding: 2, display: 'flex', mt: '-80px', ml: '450px' }}>
        <Stack spacing={2} alignItems='normal'>
          {user && userData ?
            <div>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                Username: {user.username}
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                Fullname: {userData.fullname}
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {userData.email}
              </Typography>
            </div>
            : <div>...Loading</div>}
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
