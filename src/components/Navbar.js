import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Stack,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/#about' },
    { label: 'Products', path: '/#products' },
    { label: 'Contact', path: '/#contact' },
  ];

  const handleNavClick = (path) => {
    if (path.startsWith('/#')) {
      const section = path.substring(2);
      if (window.location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(section);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      } else {
        const element = document.getElementById(section);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
  };

  const drawer = (
    <Box sx={{ width: 260, bgcolor: '#ffffff', height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>
          Sarhad Corporation
        </Typography>
        <IconButton onClick={handleDrawerToggle} sx={{ color: '#0f172a' }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.label}
            onClick={() => {
              handleNavClick(item.path);
              setMobileOpen(false);
            }}
            sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'rgba(15,23,42,0.04)' } }}
          >
            <ListItemText primary={item.label} sx={{ color: '#0f172a' }} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: '#ffffff',
          color: '#0f172a',
          borderBottom: '1px solid #e2e8f0',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', py: 1.5 }}>
          <Stack direction="row" spacing={1.5} alignItems="center" component={Link} to="/" sx={{ textDecoration: 'none' }}>
            <Box
              component="img"
              src={`${process.env.PUBLIC_URL}/logosarhad.webp`}
              alt="Sarhad Corporation logo"
              sx={{
                height: 40,
                width: 'auto',
                objectFit: 'contain',
              }}
            />
            <Box>
              <Typography variant="overline" sx={{ color: '#64748b', letterSpacing: 1.5, fontWeight: 600 }}>
                SARHAD CORPORATION
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: '#0f172a',
                  fontWeight: 700,
                  lineHeight: 1.2,
                  fontSize: { xs: '0.98rem', md: '1.1rem' },
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                Industrial Minerals &amp; Exports
              </Typography>
            </Box>
          </Stack>

          {isMobile ? (
            <IconButton edge="end" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.label}
                  onClick={() => handleNavClick(item.path)}
                  sx={{
                    color: '#475569',
                    fontWeight: 500,
                    fontSize: 14,
                    letterSpacing: 0.3,
                    '&:hover': { color: '#1e3a5f', backgroundColor: '#f1f5f9' },
                  }}
                >
                  {item.label}
                </Button>
              ))}
              <Button
                variant="contained"
                onClick={() => handleNavClick('/#contact')}
                sx={{
                  backgroundColor: '#1e3a5f',
                  color: '#ffffff',
                  borderRadius: 999,
                  px: 3,
                  boxShadow: '0 10px 25px rgba(15,23,42,0.16)',
                  '&:hover': { backgroundColor: '#15233f', boxShadow: '0 14px 35px rgba(15,23,42,0.22)' },
                }}
              >
                Get in touch
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }}>
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
