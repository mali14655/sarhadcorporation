import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  CircularProgress,
  Alert,
  Chip,
  Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../apiClient';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load products');
      setLoading(false);
    }
  };

  return (
    <Box
      id="products"
      sx={{
        py: { xs: 8, md: 10 },
        backgroundColor: '#ffffff',
      }}
    >
      <Container maxWidth="lg">
          <Grid container spacing={4} sx={{ mb: 6 }} alignItems="center">
          <Grid item xs={12} md={7}>
            <Typography
              variant="overline"
              sx={{ letterSpacing: 2, color: '#64748b', fontWeight: 600 }}
            >
              OUR MINERAL PORTFOLIO
            </Typography>
            <Typography
              variant="h2"
              sx={{
                mt: 1,
                fontWeight: 700,
                color: '#0f172a',
                fontSize: { xs: '2.1rem', md: '2.6rem' },
              }}
            >
              Industrial minerals engineered for performance.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mt: 2,
                maxWidth: 620,
                color: '#64748b',
                lineHeight: 1.8,
              }}
            >
              From Rock Phosphate and Talc to Quartz and Mica, every product is mined, processed,
              and graded to meet demanding global specifications for fertilizers, ceramics,
              paper, paints, plastics, and more.
            </Typography>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1.5,
                justifyContent: { xs: 'flex-start', md: 'flex-end' },
              }}
            >
              <Chip label="Fertilizer grade" sx={{ bgcolor: '#e0f2fe', color: '#0369a1' }} />
              <Chip label="Ceramics & glass" sx={{ bgcolor: '#ede9fe', color: '#5b21b6' }} />
              <Chip label="Paints & coatings" sx={{ bgcolor: '#fef3c7', color: '#92400e' }} />
              <Chip label="Custom sizing" sx={{ bgcolor: '#ecfdf3', color: '#166534' }} />
            </Box>
          </Grid>
        </Grid>

        {loading ? (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <CircularProgress sx={{ color: '#1e3a5f' }} />
          </Box>
        ) : error ? (
          <Alert variant="filled" severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        ) : (
          <Grid container spacing={4}>
            {products.map((product) => {
              return (
                <Grid item xs={12} sm={6} md={4} key={product._id}>
                  <Card
                    onClick={() => navigate(`/product/${product.slug}`)}
                    sx={{
                      cursor: 'pointer',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 2,
                      overflow: 'hidden',
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e7eb',
                      boxShadow: '0 10px 25px rgba(15,23,42,0.06)',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 16px 35px rgba(15,23,42,0.16)',
                        borderColor: '#1e3a5f',
                      },
                    }}
                  >
                    <Box sx={{ position: 'relative' }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={
                          product.cloudinaryImages && product.cloudinaryImages.length > 0
                            ? product.cloudinaryImages[0]
                            : 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80'
                        }
                        alt={product.name}
                        sx={{ objectFit: 'cover', filter: 'saturate(1.1)' }}
                      />
                      {product.isFeatured && (
                        <Chip
                          label="Featured"
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: 12,
                            left: 12,
                            bgcolor: '#1e3a5f',
                            color: '#ffffff',
                            fontWeight: 700,
                          }}
                        />
                      )}
                    </Box>
                    <CardContent
                      sx={{
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        p: 3,
                        color: '#0f172a',
                        minHeight: 200,
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{ color: '#64748b', textTransform: 'uppercase', letterSpacing: 1.2, mb: 0.5 }}
                      >
                        {product.category || 'Industrial Mineral'}
                      </Typography>
                      <Typography
                        variant="h5"
                        component="h3"
                        sx={{
                          fontWeight: 700,
                          mb: 1.5,
                          color: '#0f172a',
                        }}
                      >
                        {product.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          mb: 2,
                          color: '#64748b',
                          flexGrow: 1,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {product.description}
                      </Typography>

                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography
                          variant="body2"
                          sx={{
                            color: '#9ca3af',
                            fontSize: { xs: '0.8rem', md: '0.85rem' },
                          }}
                        >
                          Tap card to view full technical data
                        </Typography>
                        <Button
                          size="small"
                          variant="outlined"
                          sx={{
                            ml: 1,
                            borderRadius: 999,
                            px: { xs: 2, md: 2.5 },
                            py: 0.4,
                            borderColor: '#e5e7eb',
                            color: '#1e3a5f',
                            textTransform: 'none',
                            fontWeight: 500,
                            fontSize: { xs: '0.82rem', md: '0.86rem' },
                            '&:hover': { borderColor: '#1e3a5f', backgroundColor: '#f1f5f9' },
                          }}
                        >
                          Details
                        </Button>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Products;


