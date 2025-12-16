import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Button, Stack, Chip, IconButton, CircularProgress } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import api from '../apiClient';

// Fallback slides if API fails
const FALLBACK_SLIDES = [
  {
    image: '/hero.jpg',
    label: 'Premium industrial minerals from Pakistan',
  },
  {
    image: '/product.jpg',
    label: 'Engineered for demanding global applications',
  },
  {
    image: '/product2.jpg',
    label: 'Consistent, specification-driven quality',
  },
];

const AUTO_SLIDE_INTERVAL = 4000; // 4 seconds

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slides, setSlides] = useState(FALLBACK_SLIDES);
  const [loading, setLoading] = useState(true);
  const [slideDirection, setSlideDirection] = useState('right'); // 'left' or 'right'

  const handleScrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goToSlide = (index, direction) => {
    if (slides.length === 0) return;
    const total = slides.length;
    const nextIndex = (index + total) % total;
    setSlideDirection(direction);
    setActiveIndex(nextIndex);
  };

  const handleNext = () => {
    // Right arrow: slide moves right to left (new slide comes from right)
    goToSlide(activeIndex + 1, 'left');
  };

  const handlePrev = () => {
    // Left arrow: slide moves left to right (new slide comes from left)
    goToSlide(activeIndex - 1, 'right');
  };

  // Fetch hero slides from API
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await api.get('/hero');
        if (response.data && response.data.length > 0) {
          const formattedSlides = response.data.map((slide) => ({
            image: slide.image,
            label: slide.label || '',
          }));
          setSlides(formattedSlides);
        }
      } catch (error) {
        console.error('Error fetching hero slides:', error);
        // Keep fallback slides
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  // Auto-slide effect - moves left to right (normal direction)
  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setSlideDirection('left'); // Auto-slide goes left (new slide from right)
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, AUTO_SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: { xs: '85vh', md: '90vh' },
        color: '#ffffff',
        overflow: 'hidden',
      }}
    >
      {/* Background slideshow */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: `${slides.length * 100}%`,
            height: '100%',
            transform: `translateX(-${activeIndex * (100 / slides.length)}%)`,
            transition: slideDirection === 'left' 
              ? 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' 
              : 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {slides.map((slide, index) => (
            <Box
              key={slide.image}
              sx={{
                width: `${100 / slides.length}%`,
                height: '100%',
                flexShrink: 0,
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transform: 'scale(1.03)',
                filter: 'brightness(0.45)',
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Gradient overlay - more transparent */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(120deg, rgba(15,23,42,0.65) 0%, rgba(15,23,42,0.5) 40%, rgba(15,23,42,0.35) 70%, rgba(15,23,42,0.2) 100%)',
        }}
      />

      {/* Content */}
      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          minHeight: { xs: '85vh', md: '90vh' },
          py: { xs: 4, md: 6 },
          pt: { xs: 6, md: 8 },
        }}
      >
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <CircularProgress sx={{ color: '#ffffff' }} />
          </Box>
        ) : (
          <Box sx={{ maxWidth: { xs: '100%', md: 620 } }}>
          <Chip
            label="Producers & Exporters • Since 1998"
            sx={{
              mb: 2,
              backgroundColor: 'rgba(148, 163, 184, 0.2)',
              color: '#e5e7eb',
              fontWeight: 600,
              borderRadius: 999,
              backdropFilter: 'blur(6px)',
              border: '1px solid rgba(148, 163, 184, 0.4)',
            }}
          />

          <Box sx={{ mb: 2 }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.1rem', sm: '2.6rem', md: '3.2rem' },
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
              }}
            >
              Pure Beauty,
            </Typography>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.1rem', sm: '2.6rem', md: '3.2rem' },
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: '#38bdf8',
              }}
            >
              Natural Brilliance.
            </Typography>
          </Box>

          <Typography
            variant="h6"
            sx={{
              color: '#e5e7eb',
              fontWeight: 400,
              lineHeight: 1.7,
              fontSize: { xs: '0.98rem', md: '1.08rem' },
              maxWidth: 640,
              mb: 1.5,
            }}
          >
            At Sarhad Corporation, we mine, process, and export premium industrial minerals
            that power fertilizers, ceramics, glass, paints, plastics and more.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: '#cbd5f5',
              maxWidth: 640,
              lineHeight: 1.8,
              mb: 4,
            }}
          >
            Backed by long-term leases and strict quality control, we deliver consistent,
            specification-driven minerals from Pakistan to partners across the globe.
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2.5}
            sx={{ pt: 1, alignItems: { xs: 'stretch', sm: 'center' } }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={handleScrollToProducts}
              sx={{
                backgroundColor: '#38bdf8',
                color: '#020617',
                px: 4,
                borderRadius: 999,
                boxShadow: '0 8px 20px rgba(56,189,248,0.25)',
                fontWeight: 600,
                '&:hover': { backgroundColor: '#0ea5e9', boxShadow: '0 10px 25px rgba(56,189,248,0.35)' },
              }}
            >
              View mineral portfolio
            </Button>
            <Typography
              variant="body2"
              sx={{
                color: '#e5e7eb',
                maxWidth: 260,
              }}
            >
              Long-term partners for fertilizer, ceramics, glass, paints and industrial applications.
            </Typography>
          </Stack>
          </Box>
        )}
      </Container>

      {/* Left Arrow - Middle of screen, no background */}
      <IconButton
        onClick={handlePrev}
        sx={{
          position: 'absolute',
          left: { xs: 4, md: 8 },
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 2,
          color: '#ffffff',
          width: { xs: 48, md: 56 },
          height: { xs: 48, md: 56 },
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            transform: 'translateY(-50%) scale(1.15)',
          },
          transition: 'all 0.3s ease',
        }}
        aria-label="Previous slide"
      >
        <ArrowBackIosNewIcon sx={{ fontSize: { xs: 28, md: 32 } }} />
      </IconButton>

      {/* Right Arrow - Middle of screen, no background */}
      <IconButton
        onClick={handleNext}
        sx={{
          position: 'absolute',
          right: { xs: 4, md: 8 },
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 2,
          color: '#ffffff',
          width: { xs: 48, md: 56 },
          height: { xs: 48, md: 56 },
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            transform: 'translateY(-50%) scale(1.15)',
          },
          transition: 'all 0.3s ease',
        }}
        aria-label="Next slide"
      >
        <ArrowForwardIosIcon sx={{ fontSize: { xs: 28, md: 32 } }} />
      </IconButton>

      {/* Dots - Bottom center */}
      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          bottom: { xs: 24, md: 32 },
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1.2,
        }}
      >
        {slides.map((slide, index) => (
          <Box
            key={slide.image}
            onClick={() => {
              // Determine direction based on which slide is clicked
              const direction = index > activeIndex ? 'left' : 'right';
              goToSlide(index, direction);
            }}
            sx={{
              width: index === activeIndex ? 32 : 10,
              height: 10,
              borderRadius: 999,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backgroundColor:
                index === activeIndex ? 'rgba(248,250,252,0.95)' : 'rgba(148,163,184,0.6)',
              '&:hover': {
                backgroundColor: index === activeIndex ? 'rgba(248,250,252,1)' : 'rgba(148,163,184,0.9)',
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Hero;
