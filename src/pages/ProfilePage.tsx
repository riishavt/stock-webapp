import { Button, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userSlice } from '../redux/features/userSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';


export default function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.userSlice);

  const handleOnSignOut = () => {
    dispatch(userSlice.actions.logout());
    navigate('/');
  };

  useEffect(() => {
  }, [user]);

  return (
    <div>
      <Container sx={{ padding: 2, display: 'flex', mt: '-80px', ml: '450px' }}>
        {user ?
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            {user.username}
          </Typography>
          : <div>...Loading</div>}
        <Button
          variant="contained"
          type="submit"
          onClick={handleOnSignOut}
        >
          Sign out
        </Button>
      </Container>

    </div>
  );
}
