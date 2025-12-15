import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Paper,
  Chip,
  Button,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import api from '../apiClient';

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/products/${slug}`);
      setProduct(response.data);
      setLoading(false);
    } catch (err) {
      setError('Product not found');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ py: 10, textAlign: 'center' }}>
        <Container maxWidth="lg">
          <CircularProgress />
        </Container>
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Box sx={{ py: 10 }}>
        <Container maxWidth="lg">
          <Alert severity="error">{error || 'Product not found'}</Alert>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
            sx={{ mt: 2 }}
          >
            Back to Home
          </Button>
        </Container>
      </Box>
    );
  }

  // Prepare images for gallery
  const galleryImages =
    product.cloudinaryImages && product.cloudinaryImages.length > 0
      ? product.cloudinaryImages.map((url) => ({
          original: url,
          thumbnail: url,
        }))
      : [
          {
            original: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
            thumbnail: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=200&q=80',
          },
        ];

  return (
    <Box sx={{ py: { xs: 4, md: 8 }, minHeight: '80vh' }}>
      <Container maxWidth="lg">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ mb: 3 }}
        >
          Back to Products
        </Button>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box sx={{ width: '100%', maxWidth: 520 }}>
                <ImageGallery
                  items={galleryImages}
                  showPlayButton={false}
                  showFullscreenButton={true}
                  showThumbnails={true}
                  lazyLoad={true}
                  additionalClass="product-image-gallery"
                />
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 3,
                color: '#1e3a5f',
              }}
            >
              {product.name}
            </Typography>

            {product.category && (
              <Chip
                label={product.category}
                sx={{
                  mb: 3,
                  backgroundColor: '#c9a961',
                  color: '#ffffff',
                  fontWeight: 500,
                }}
              />
            )}

            <Typography
              variant="body1"
              sx={{
                mb: 4,
                fontSize: '1.1rem',
                lineHeight: 1.8,
                color: '#4a5568',
              }}
            >
              {product.description}
            </Typography>

            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: '#1e3a5f',
                  }}
                >
                  Technical Specifications
                </Typography>
                <Paper sx={{ p: 3, backgroundColor: '#f8f9fa' }}>
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <Box
                      key={key}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        py: 1,
                        borderBottom: '1px solid #e0e0e0',
                        '&:last-child': { borderBottom: 'none' },
                      }}
                    >
                      <Typography sx={{ fontWeight: 600, color: '#1e3a5f' }}>
                        {key}:
                      </Typography>
                      <Typography sx={{ color: '#4a5568' }}>{value}</Typography>
                    </Box>
                  ))}
                </Paper>
              </Box>
            )}

            {product.applications && product.applications.length > 0 && (
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: '#1e3a5f',
                  }}
                >
                  Applications
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {product.applications.map((app, index) => (
                    <Chip
                      key={index}
                      label={app}
                      sx={{
                        backgroundColor: '#e8eaf6',
                        color: '#1e3a5f',
                        fontWeight: 500,
                      }}
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductDetail;



