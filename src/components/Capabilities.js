import React from 'react';
import { Box, Container, Typography, Grid, Paper, Chip } from '@mui/material';

const Capabilities = () => {
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

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                height: '100%',
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                boxShadow: '0 8px 20px rgba(15,23,42,0.05)',
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
                <Chip
                  size="small"
                  label="High purity"
                  sx={{ bgcolor: '#ecfdf3', color: '#166534' }}
                />
                <Chip
                  size="small"
                  label="Consistent sizing"
                  sx={{ bgcolor: '#eff6ff', color: '#1d4ed8' }}
                />
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                height: '100%',
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                boxShadow: '0 8px 20px rgba(15,23,42,0.05)',
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
              sx={{
                p: 3,
                height: '100%',
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                boxShadow: '0 8px 20px rgba(15,23,42,0.05)',
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


