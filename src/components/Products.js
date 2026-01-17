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
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import api from '../apiClient';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [headerRef, headerVisible] = useScrollAnimation();
  const [chipsRef, chipsVisible] = useScrollAnimation();

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
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box
              ref={chipsRef}
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1.5,
                justifyContent: { xs: 'flex-start', md: 'flex-end' },
                opacity: chipsVisible ? 1 : 0,
                transform: chipsVisible ? 'translateX(0)' : 'translateX(40px)',
                transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
              }}
            >
              <Chip label="Fertilizer grade" />
              <Chip label="Ceramics & glass" />
              <Chip label="Paints & coatings" />
              <Chip label="Custom sizing" />
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
            {products.map((product, index) => {
              return (
                <ProductCard 
                  key={product._id} 
                  product={product} 
                  index={index}
                  navigate={navigate}
                />
              );
            })}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

// Separate component for individual product card with scroll animation
const ProductCard = ({ product, index, navigate }) => {
  const [cardRef, cardVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        ref={cardRef}
        onClick={() => navigate(`/product/${product.slug}`)}
        sx={{
          cursor: 'pointer',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 3,
          overflow: 'hidden',
          backgroundColor: '#ffffff',
          border: '1px solid rgba(226, 232, 240, 0.8)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 4px 12px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          opacity: cardVisible ? 1 : 0,
          transform: cardVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
          transitionDelay: `${index * 0.1}s`,
          position: 'relative',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: 3,
                        padding: '1px',
                        background: 'linear-gradient(135deg, rgba(30, 58, 95, 0.1), rgba(30, 58, 95, 0.05))',
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude',
                        opacity: 0,
                        transition: 'opacity 0.4s ease',
                      },
                      '&:hover': {
                        transform: 'translateY(-8px) scale(1.02)',
                        boxShadow: '0 20px 40px rgba(15, 23, 42, 0.15), 0 8px 16px rgba(15, 23, 42, 0.1)',
                        borderColor: 'rgba(30, 58, 95, 0.3)',
                        '&::before': {
                          opacity: 1,
                        },
                        '& .product-image': {
                          transform: 'scale(1.1)',
                        },
                      },
                    }}
                  >
                    <Box 
                      sx={{ 
                        position: 'relative',
                        overflow: 'hidden',
                        height: 240,
                        backgroundColor: '#f8f9fa',
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="240"
                        className="product-image"
                        image={
                          product.cloudinaryImages && product.cloudinaryImages.length > 0
                            ? product.cloudinaryImages[0]
                            : 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80'
                        }
                        alt={product.name}
                        sx={{ 
                          objectFit: 'cover',
                          width: '100%',
                          height: '100%',
                          filter: 'saturate(1.05) brightness(1.02)',
                          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.02) 100%)',
                          pointerEvents: 'none',
                        }}
                      />
                      {product.isFeatured && (
                        <Chip
                          label="Featured"
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: 16,
                            left: 16,
                            bgcolor: '#1e3a5f',
                            color: '#ffffff',
                            fontWeight: 700,
                            boxShadow: '0 4px 12px rgba(30, 58, 95, 0.4)',
                            backdropFilter: 'blur(8px)',
                            animation: 'pulse 2s ease-in-out infinite',
                            '@keyframes pulse': {
                              '0%, 100%': {
                                    opacity: 1,
                                  },
                                  '50%': {
                                    opacity: 0.8,
                                  },
                                },
                          }}
                        />
                      )}
                    </Box>
                    <CardContent
                      sx={{
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        p: 3.5,
                        color: '#0f172a',
                        minHeight: 200,
                        background: 'linear-gradient(to bottom, #ffffff 0%, #fafbfc 100%)',
                      }}
                    >
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
                            py: 0.5,
                            borderColor: '#e5e7eb',
                            color: '#1e3a5f',
                            textTransform: 'none',
                            fontWeight: 600,
                            fontSize: { xs: '0.82rem', md: '0.86rem' },
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                            '&:hover': { 
                              borderColor: '#1e3a5f', 
                              backgroundColor: '#1e3a5f',
                              color: '#ffffff',
                              transform: 'translateY(-2px)',
                              boxShadow: '0 4px 12px rgba(30, 58, 95, 0.3)',
                            },
                          }}
                        >
                          Details
                        </Button>
                      </Stack>
                    </CardContent>
                  </Card>
    </Grid>
  );
};

export default Products;


