import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import RegisterPage from './pages/RegisterPage';
// import ProfilePage from './pages/ProfilePage';
import { useInitialize } from './hooks/useInitialize';
// import { Portfolio } from './pages/PortfolioPage';

export default function App() {
  useInitialize();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          {/* <Route path="/profile" element={<ProfilePage />} /> */}
          <Route path="/" element={<ProtectedRoute />}>
            {/* <Route path="/order-history" element={<Portfolio />} /> */}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}