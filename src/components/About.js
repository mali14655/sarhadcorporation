import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const About = () => {
  const [titleRef, titleVisible] = useScrollAnimation();
  const [imageRef, imageVisible] = useScrollAnimation();
  const [text1Ref, text1Visible] = useScrollAnimation();
  const [text2Ref, text2Visible] = useScrollAnimation();

  return (
    <Box id="about" sx={{ py: { xs: 6, md: 10 }, backgroundColor: '#f8f9fa' }}>
      <Container maxWidth="lg">
        <Box 
          ref={titleRef}
          sx={{ 
            textAlign: 'center', 
            mb: 3,
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              fontWeight: 600,
              color: '#1e3a5f',
              fontSize: { xs: '1.8rem', md: '2.4rem' },
            }}
          >
            About Sarhad Corporation
          </Typography>
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              ref={imageRef}
              component="img"
              src="/about.jpg"
              alt="About Sarhad Corporation"
              sx={{
                height: '100%',
                minHeight: '300px',
                width: '100%',
                objectFit: 'cover',
                borderRadius: 3,
                opacity: imageVisible ? 1 : 0,
                transform: imageVisible ? 'translateX(0) scale(1)' : 'translateX(-40px) scale(0.95)',
                transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
                boxShadow: imageVisible ? '0 20px 40px rgba(0, 0, 0, 0.1)' : '0 4px 12px rgba(0, 0, 0, 0.05)',
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              ref={text1Ref}
              variant="body1"
              sx={{
                mb: 3,
                fontSize: '1.1rem',
                lineHeight: 1.8,
                color: '#4a5568',
                opacity: text1Visible ? 1 : 0,
                transform: text1Visible ? 'translateX(0)' : 'translateX(40px)',
                transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s',
              }}
            >
              Sarhad Corporation was established in 1998 as a trading company, initially focusing 
              on the export of various commodities. In 2005, the company secured a lease for a 
              Rock Phosphate mine, marking its first significant step into the mining industry. 
              This venture proved successful, leading to the acquisition of a second Rock Phosphate 
              mine lease in 2010.
            </Typography>
            <Typography
              ref={text2Ref}
              variant="body1"
              sx={{
                fontSize: '1.1rem',
                lineHeight: 1.8,
                color: '#4a5568',
                opacity: text2Visible ? 1 : 0,
                transform: text2Visible ? 'translateX(0)' : 'translateX(40px)',
                transition: 'opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s',
              }}
            >
              In 2012, Sarhad Corporation made a strategic transition from trading to becoming a 
              dedicated mining and export company. This shift allowed the company to have direct 
              control over the quality and supply of minerals, ensuring consistent delivery of 
              premium-grade products to international markets. Today, Sarhad Corporation stands as 
              a trusted name in the industrial minerals sector, known for its commitment to 
              quality, ethical practices, and customer satisfaction.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;



