import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';
import { AuthProvider } from './context/AuthContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1e3a5f',
      light: '#3b82f6',
      dark: '#15233f',
    },
    secondary: {
      main: '#22c55e',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a',
      secondary: '#4b5563',
    },
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.03em',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 999,
          padding: '10px 20px',
          fontSize: '0.95rem',
          fontWeight: 600,
          boxShadow: 'none',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:slug" element={<ProductDetail />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
            <Box
              sx={{
                position: 'fixed',
                bottom: 32,
                right: 24,
                zIndex: 1300,
              }}
            >
              <IconButton
                component="a"
                href="https://wa.me/923459090973?text=Hello%20Sarhad%20Corporation"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  backgroundColor: '#25D366',
                  color: '#ffffff',
                  width: 56,
                  height: 56,
                  boxShadow: '0 6px 18px rgba(37,211,102,0.6), 0 2px 8px rgba(37,211,102,0.4)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  animation: 'pulse 2s ease-in-out infinite',
                  '&:hover': {
                    backgroundColor: '#1ebe57',
                    transform: 'scale(1.1) rotate(5deg)',
                    boxShadow: '0 8px 24px rgba(37,211,102,0.7), 0 4px 12px rgba(37,211,102,0.5)',
                  },
                  '&:active': {
                    transform: 'scale(0.95)',
                  },
                  '@keyframes pulse': {
                    '0%, 100%': {
                      boxShadow: '0 6px 18px rgba(37,211,102,0.6), 0 2px 8px rgba(37,211,102,0.4)',
                    },
                    '50%': {
                      boxShadow: '0 8px 24px rgba(37,211,102,0.8), 0 4px 12px rgba(37,211,102,0.6)',
                    },
                  },
                }}
              >
                <WhatsAppIcon />
              </IconButton>
            </Box>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;



