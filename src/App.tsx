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
import { TopGainersLosers } from './pages/TopGainerPage';
import CalculatorPage from './pages/CalculatorPage';
import LiveMarketPage from './pages/LiveMarketPage';
import NewsPage from './pages/NewsPage';

const darkTheme = createTheme({

  palette: {

    background: {
      default: '#ffffff'
      //  default: '#121212',
    },
    primary: {
      main: '#34B3F1',
    },
    secondary: {
      main: '#827397',
    },
    text: {
      primary: '#000000',
      secondary: '#000000',
    }

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
            <Route path="/live" element={<LiveMarketPage />} />
            <Route path="/calculator" element={<CalculatorPage />} />
            <Route path="/gainer" element={<TopGainersLosers />} />
            <Route path="/news" element={<NewsPage />} />
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