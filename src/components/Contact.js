import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Grid, Alert, Snackbar } from '@mui/material';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [titleRef, titleVisible] = useScrollAnimation();
  const [formRef, formVisible] = useScrollAnimation();
  const [mapRef, mapVisible] = useScrollAnimation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // EmailJS configuration
      const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
      const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

      // Validate EmailJS configuration
      if (!serviceId || !templateId || !publicKey) {
        throw new Error('Email service is not configured. Please contact the administrator.');
      }

      // Initialize EmailJS with public key
      emailjs.init(publicKey);

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: 'sarhadcorpo@gmail.com',
          reply_to: formData.email,
        },
        publicKey
      );

      setSnackbar({
        open: true,
        message: 'Thank you! Your message has been sent successfully.',
        severity: 'success',
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('EmailJS error:', error);
      const errorMessage = error.text || error.message || 'Failed to send message. Please try again or contact us directly.';
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box id="contact" sx={{ py: { xs: 6, md: 10 }, backgroundColor: '#f8f9fa' }}>
      <Container maxWidth="lg">
        <Box
          ref={titleRef}
          sx={{
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              mb: 3,
              fontWeight: 600,
              color: '#1e3a5f',
              fontSize: { xs: '1.8rem', md: '2.4rem' },
            }}
          >
            Contact us
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              mb: 6,
              maxWidth: '800px',
              mx: 'auto',
              color: '#4a5568',
              fontSize: '1.1rem',
            }}
          >
            We would love to hear from you! Whether you have inquiries about our gemstones, need 
            expert guidance, or want to discuss business opportunities, our team is here to assist you. 
            Connect with us today and let Sarhad Corporation be your trusted partner for premium-quality gemstones.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              ref={formRef}
              component="form"
              onSubmit={handleSubmit}
              sx={{
                backgroundColor: '#ffffff',
                p: 4.5,
                borderRadius: 3,
                border: '1px solid rgba(226, 232, 240, 0.8)',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 4px 12px rgba(0, 0, 0, 0.08)',
                opacity: formVisible ? 1 : 0,
                transform: formVisible ? 'translateX(0)' : 'translateX(-40px)',
                transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s, box-shadow 0.3s ease',
                '&:hover': {
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.08)',
                },
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    multiline
                    rows={6}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={loading}
                    sx={{
                      backgroundColor: '#1e3a5f',
                      color: '#ffffff',
                      py: 1.5,
                      fontSize: '1.1rem',
                      borderRadius: 2,
                      boxShadow: '0 4px 12px rgba(30, 58, 95, 0.3)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        backgroundColor: '#2d4f7a',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 20px rgba(30, 58, 95, 0.4)',
                      },
                      '&:active': {
                        transform: 'translateY(0)',
                      },
                    }}
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              ref={mapRef}
              sx={{
                height: '100%',
                minHeight: 320,
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 4px 12px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(226, 232, 240, 0.8)',
                opacity: mapVisible ? 1 : 0,
                transform: mapVisible ? 'translateX(0)' : 'translateX(40px)',
                transition: 'opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s, box-shadow 0.3s ease',
                '&:hover': {
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.08)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <iframe
                title="Sarhad Corporation Location"
                src="https://www.google.com/maps?q=Plot%2038%2FA%2C%20street%20B3%20Industrial%20Estate%20Rd%2C%20Hayatabad%2C%20Peshawar%2C%20Pakistan&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              mb: 2,
              color: '#1e3a5f',
            }}
          >
            Unlock the Beauty of Natural Industrial Minerals
          </Typography>
          <Typography
            variant="body1"
            sx={{
              maxWidth: '800px',
              mx: 'auto',
              color: '#4a5568',
              fontSize: '1.1rem',
              lineHeight: 1.8,
            }}
          >
            Experience the finest industrial minerals with Sarhad Corporation. Contact us today 
            for premium-quality stones, ethical sourcing, and expert craftsmanship. Let's bring 
            brilliance to your collection!
          </Typography>
        </Box>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Contact;



