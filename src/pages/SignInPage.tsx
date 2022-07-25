import { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Alert } from '../components/Alert';
import { userSlice } from '../redux/features/userSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useSignInMutation } from '../redux/services/userApi';
import { useForm } from 'react-hook-form';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import styles from './SignInPage.module.css';
import { Home } from '@mui/icons-material';
import { Container, CssBaseline, Box, Avatar, Typography, TextField, Button, Grid } from '@mui/material';

interface Inputs {
  username: string;
  password: string;
}

interface Error {
  data: { message: string };
  status: number;
}

export default function SignInPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAppSelector((state) => state.userSlice);
  const [signIn, { isLoading, isSuccess, error, isError }] =
    useSignInMutation();
  const {
    formState: { errors },
    reset
  } = useForm<Inputs>();

  const handleSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let username: string = data.get('username') as string;
    let password: string = data.get('password') as string;
    console.log({
      username: data.get('username'),
      password: data.get('password'),
    });
    const userData = await signIn({
      username,
      password,
    }).unwrap();
    dispatch(userSlice.actions.login(userData));
  };

  useEffect(() => {
    const path = searchParams.get('redirect');
    if (isSuccess) {
      navigate(path ?? '/');
    }
    if (!isSuccess && user) {
      navigate('/profile');
    }
  }, [isSuccess, user, searchParams]);

  useEffect(() => {
    reset();
  }, [isError, isSuccess]);

  return (
    <div className={styles.container}>
      <Link to="/">
        <Home />
      </Link>
      {error && (
        <Alert
          type="error"
          title="There was a problem"
          text={(error as Error).data.message}
          className={styles.alert}
        />
      )}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmitLogin} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/register" >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
