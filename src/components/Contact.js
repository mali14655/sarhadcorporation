import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Grid, Alert, Snackbar } from '@mui/material';
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
      // Note: User needs to set up EmailJS service and get their keys
      const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'your_service_id';
      const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'your_template_id';
      const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'your_public_key';

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: 'info@sarhadcorporation.com',
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
      setSnackbar({
        open: true,
        message: 'Failed to send message. Please try again or contact us directly.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box id="contact" sx={{ py: { xs: 6, md: 10 }, backgroundColor: '#f8f9fa' }}>
      <Container maxWidth="lg">
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

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                backgroundColor: '#ffffff',
                p: 4,
                borderRadius: 3,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
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
                      '&:hover': {
                        backgroundColor: '#2d4f7a',
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
              sx={{
                height: '100%',
                minHeight: 320,
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e2e8f0',
              }}
            >
              <iframe
                title="Sarhad Corporation Location"
                src="https://www.google.com/maps?q=Sarhad%20Board%20%26%20Chemicals%20Pvt%20Ltd%2C%20Hayatabad%2C%20Peshawar&output=embed"
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



