import React from 'react';
import { Box, Container, Typography, Grid, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1e3a5f',
        color: '#ffffff',
        py: 5,
        mt: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Sarhad Corporation
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, lineHeight: 1.8 }}>
              Leading producers and exporters of premium-quality industrial minerals. 
              Bringing the beauty of nature's rarest treasures to the world.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/" sx={{ color: '#ffffff', opacity: 0.9, '&:hover': { opacity: 1 } }}>
                Home
              </Link>
              <Link href="/#about" sx={{ color: '#ffffff', opacity: 0.9, '&:hover': { opacity: 1 } }}>
                About
              </Link>
              <Link href="/#products" sx={{ color: '#ffffff', opacity: 0.9, '&:hover': { opacity: 1 } }}>
                Products
              </Link>
              <Link href="/#contact" sx={{ color: '#ffffff', opacity: 0.9, '&:hover': { opacity: 1 } }}>
                Contact
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Contact Info
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, lineHeight: 1.8 }}>
              Email: sarhadcorpo@gmail.com<br />
              Phone: 0345-9090973<br />
              Address: Plot 38/A, street B3 Industrial Estate Rd,<br />
              Hayatabad, Peshawar, Pakistan
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', mt: 4, pt: 3, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © {new Date().getFullYear()} Sarhad Corporation. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;



