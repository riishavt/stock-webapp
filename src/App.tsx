import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import { useInitialize } from './hooks/useInitialize';
import { Portfolio } from './pages/PortfolioPage';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import { StockPage } from './pages/StockPage';

const darkTheme = createTheme({

  palette: {

    mode: "light",
  },
});


export default function App() {
  useInitialize();
  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/stock" element={<StockPage />} />
            <Route path="/" element={<ProtectedRoute />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/portfolio" element={<Portfolio />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}