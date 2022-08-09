import { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSignupMutation } from '../redux/services/userApi';
import { Alert } from '../components/Alert';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Container, CssBaseline, Box, Avatar, Typography, Grid, TextField, Button } from '@mui/material';

interface Inputs {
  username: string;
  fullname: string;
  email: string;
  password: string;
}

interface Error {
  error: {
    message: string;
  };
}

export default function RegisterPage() {
  const [signup, { isLoading, isSuccess, isError }] = useSignupMutation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const {
    formState: { errors }
  } = useForm<Inputs>();


  const handleSubmitSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let username: string = data.get('username') as string;
    let fullname: string = data.get('fullname') as string;
    let email: string = data.get('email') as string;
    let password: string = data.get('password') as string;
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    await signup({
      username,
      fullname,
      email,
      password
    });
  };

  useEffect(() => {
    // reset();
    const path = searchParams.get('redirect');
    if (isSuccess) {
      navigate(path ?? '/signin');
      alert('Successfully registered! Please sign in to proceed.');
    }
  }, [isError, isSuccess, searchParams]);

  return (
    <div>
      {isSuccess && (
        <Alert
          type="success"
          title="Success"
          text="You have successfully registered"
        />
      )}
      {isError && (
        <Alert
          type="error"
          title="There was a problem"
          text="Username address already used"
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmitSignUp} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="fullname"
                  label="Fullname"
                  name="fullname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/signin">
                  Already have an account?
                  <Typography variant="body2" color="green" align='center'>
                    Sign in
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
