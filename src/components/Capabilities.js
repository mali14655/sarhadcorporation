import React from 'react';
import { Box, Container, Typography, Grid, Paper, Chip } from '@mui/material';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Capabilities = () => {
  const [headerRef, headerVisible] = useScrollAnimation();
  const [card1Ref, card1Visible] = useScrollAnimation();
  const [card2Ref, card2Visible] = useScrollAnimation();
  const [card3Ref, card3Visible] = useScrollAnimation();

  return (
    <Box
      sx={{
        py: { xs: 6, md: 9 },
        backgroundColor: '#f9fafb',
        color: '#0f172a',
        borderTop: '1px solid #e5e7eb',
        borderBottom: '1px solid #e5e7eb',
      }}
    >
      <Container maxWidth="lg">
        <Box
          ref={headerRef}
          sx={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <Typography
            variant="overline"
            sx={{ color: '#64748b', letterSpacing: 2, fontWeight: 700 }}
          >
            WHAT WE DELIVER
          </Typography>
          <Typography
            variant="h2"
            sx={{
              mt: 1,
              mb: 2,
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '2.5rem' },
            }}
          >
            Industrial minerals tailored to your process.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 6,
              maxWidth: 760,
              color: '#4b5563',
              lineHeight: 1.8,
            }}
          >
            From mine development to export logistics, Sarhad Corporation controls the full
            value chain. We size, grade, and blend minerals to tight specifications for
            fertilizers, ceramics, glass, paints, plastics, rubber, and more.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper
              ref={card1Ref}
              sx={{
                p: 4,
                height: '100%',
                backgroundColor: '#ffffff',
                border: '1px solid rgba(226, 232, 240, 0.8)',
                borderRadius: 3,
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 4px 12px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                opacity: card1Visible ? 1 : 0,
                transform: card1Visible ? 'translateY(0)' : 'translateY(40px)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: 'linear-gradient(90deg, #1e3a5f, #3b82f6)',
                  transform: 'scaleX(0)',
                  transformOrigin: 'left',
                  transition: 'transform 0.4s ease',
                },
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: '0 20px 40px rgba(15, 23, 42, 0.12), 0 8px 16px rgba(15, 23, 42, 0.08)',
                  borderColor: 'rgba(30, 58, 95, 0.2)',
                  '&::before': {
                    transform: 'scaleX(1)',
                  },
                },
              }}
            >
              <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 700, color: '#0f172a' }}>
                Core Mineral Lines
              </Typography>
              <Typography variant="body2" sx={{ color: '#4b5563', mb: 2 }}>
                Rock Phosphate, Talc/Soap Stone, Calcium Fluoride, Calcium Carbonate,
                Quartz, Dolomite, Brite, Mica and more.
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <Chip size="small" label="High purity" />
                <Chip size="small" label="Consistent sizing" />
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              ref={card2Ref}
              sx={{
                p: 4,
                height: '100%',
                backgroundColor: '#ffffff',
                border: '1px solid rgba(226, 232, 240, 0.8)',
                borderRadius: 3,
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 4px 12px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                opacity: card2Visible ? 1 : 0,
                transform: card2Visible ? 'translateY(0)' : 'translateY(40px)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: 'linear-gradient(90deg, #1e3a5f, #3b82f6)',
                  transform: 'scaleX(0)',
                  transformOrigin: 'left',
                  transition: 'transform 0.4s ease',
                },
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: '0 20px 40px rgba(15, 23, 42, 0.12), 0 8px 16px rgba(15, 23, 42, 0.08)',
                  borderColor: 'rgba(30, 58, 95, 0.2)',
                  '&::before': {
                    transform: 'scaleX(1)',
                  },
                },
              }}
            >
              <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 700 }}>
                Industries We Serve
              </Typography>
              <Typography variant="body2" sx={{ color: '#4b5563', mb: 2 }}>
                Tailored grades for fertilizer producers, ceramics and glass plants,
                paper and pulp mills, paint and coating formulators, plastics and rubber
                manufacturers.
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <Chip size="small" label="Fertilizers" />
                <Chip size="small" label="Ceramics & Glass" />
                <Chip size="small" label="Paints & Coatings" />
                <Chip size="small" label="Plastics & Rubber" />
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              ref={card3Ref}
              sx={{
                p: 4,
                height: '100%',
                backgroundColor: '#ffffff',
                border: '1px solid rgba(226, 232, 240, 0.8)',
                borderRadius: 3,
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 4px 12px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                opacity: card3Visible ? 1 : 0,
                transform: card3Visible ? 'translateY(0)' : 'translateY(40px)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: 'linear-gradient(90deg, #1e3a5f, #3b82f6)',
                  transform: 'scaleX(0)',
                  transformOrigin: 'left',
                  transition: 'transform 0.4s ease',
                },
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: '0 20px 40px rgba(15, 23, 42, 0.12), 0 8px 16px rgba(15, 23, 42, 0.08)',
                  borderColor: 'rgba(30, 58, 95, 0.2)',
                  '&::before': {
                    transform: 'scaleX(1)',
                  },
                },
              }}
            >
              <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 700 }}>
                From Mine to Port
              </Typography>
              <Typography variant="body2" sx={{ color: '#4b5563', mb: 2 }}>
                Long-term leases, in-house processing, and export-focused logistics
                ensure reliable supply for your annual contracts and spot shipments.
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <Chip size="small" label="Long-term leases" />
                <Chip size="small" label="QA/QC lab" />
                <Chip size="small" label="Export ready" />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Capabilities;


