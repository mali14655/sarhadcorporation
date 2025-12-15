import React from 'react';
import { Box, Container, Typography, Button, Stack, Chip, Grid } from '@mui/material';

const Hero = () => {

  const handleScrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box
      sx={{
        py: { xs: 8, md: 10 },
        backgroundColor: '#f8fafc',
        borderBottom: '1px solid #e2e8f0',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Stack spacing={2.5} sx={{ maxWidth: 620 }}>
              <Chip
                label="Producers & Exporters • Since 1998"
                sx={{
                  alignSelf: 'flex-start',
                  backgroundColor: '#e0f2fe',
                  color: '#0369a1',
                  fontWeight: 600,
                  borderRadius: 999,
                }}
              />
              <Box>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2rem', sm: '2.4rem', md: '3rem' },
                    fontWeight: 700,
                    color: '#0f172a',
                    lineHeight: 1.1,
                  }}
                >
                  Pure Beauty,
                </Typography>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2rem', sm: '2.4rem', md: '3rem' },
                    fontWeight: 700,
                    color: '#1e3a5f',
                    lineHeight: 1.1,
                  }}
                >
                  Natural Brilliance.
                </Typography>
              </Box>
              <Typography
                variant="h6"
                sx={{
                  color: '#475569',
                  fontWeight: 400,
                  lineHeight: 1.7,
                  fontSize: { xs: '0.98rem', md: '1.1rem' },
                }}
              >
                At Sarhad Corporation, we mine, process, and export premium industrial minerals
                that power fertilizers, ceramics, glass, paints, plastics and more.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: '#64748b',
                  maxWidth: 640,
                }}
              >
                Backed by long-term leases and strict quality control, we deliver consistent,
                specification-driven minerals from Pakistan to partners across the globe.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5} sx={{ pt: 1 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleScrollToProducts}
                  sx={{
                    backgroundColor: '#1e3a5f',
                    color: '#ffffff',
                    px: 4,
                    borderRadius: 999,
                    boxShadow: '0 12px 30px rgba(15,23,42,0.25)',
                    '&:hover': { backgroundColor: '#15233f' },
                  }}
                >
                  View mineral portfolio
                </Button>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                borderRadius: 4,
                overflow: 'hidden',
                border: '1px solid #e2e8f0',
                backgroundColor: '#ffffff',
              }}
            >
              <Box
                sx={{
                  height: { xs: 260, md: 360 },
                  backgroundImage: `url(${process.env.PUBLIC_URL}/hero.jpg)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;
