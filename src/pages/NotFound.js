import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Typography, Stack } from '@mui/material';

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Page Not Found - Sarhad Corporation';
    return () => {
      document.title = previousTitle;
    };
  }, []);

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        minHeight: '80vh',
        background:
          'radial-gradient(circle at top left, #1e3a5f 0, #020617 50%, #020617 100%)',
        color: '#e5e7eb',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="md">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 4, md: 8 }}
          alignItems={{ xs: 'flex-start', md: 'center' }}
        >
          <Box
            sx={{
              borderRadius: 4,
              border: '1px solid rgba(148,163,184,0.4)',
              px: 3,
              py: 1,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1.5,
              backgroundColor: 'rgba(15,23,42,0.55)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Box
              component="img"
              src="/logosarhad.webp"
              alt="Sarhad Corporation logo"
              sx={{
                height: 40,
                width: 'auto',
                objectFit: 'contain',
              }}
            />
            <Box>
              <Typography
                variant="overline"
                sx={{ color: '#cbd5f5', letterSpacing: 1.5, fontWeight: 600 }}
              >
                SARHAD CORPORATION
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: '#94a3b8', fontWeight: 400 }}
              >
                Industrial Minerals &amp; Exports
              </Typography>
            </Box>
          </Box>

          <Box sx={{ maxWidth: 520 }}>
            <Typography
              variant="overline"
              sx={{
                color: '#38bdf8',
                letterSpacing: 3,
                fontWeight: 600,
                mb: 1,
              }}
            >
              ERROR 404
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                letterSpacing: '-0.03em',
                mb: 2,
                fontSize: { xs: '2.1rem', md: '2.6rem' },
              }}
            >
              This page couldn&apos;t be found.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#cbd5f5',
                lineHeight: 1.8,
                mb: 4,
              }}
            >
              The link you followed might be outdated or the page has moved.
              Let&apos;s take you back to the main site where you can explore
              our minerals, capabilities, and global reach.
            </Typography>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              alignItems={{ xs: 'stretch', sm: 'center' }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={handleGoHome}
                sx={{
                  backgroundColor: '#38bdf8',
                  color: '#020617',
                  px: 4,
                  borderRadius: 999,
                  boxShadow: '0 8px 20px rgba(56,189,248,0.25)',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: '#0ea5e9',
                    boxShadow: '0 10px 25px rgba(56,189,248,0.35)',
                  },
                }}
              >
                Back to homepage
              </Button>
              <Typography
                variant="body2"
                sx={{ color: '#9ca3af', maxWidth: 260 }}
              >
                Need specific product information? Use the navigation above to
                reach our product portfolio or contact team.
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default NotFound;

