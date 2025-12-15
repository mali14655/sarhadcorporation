import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  FormControlLabel,
  Switch,
  Alert,
  CircularProgress,
  Chip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const AdminDashboard = () => {
  const { isAuthenticated, loading: authLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    specifications: {},
    applications: [],
    cloudinaryImages: [],
    isFeatured: false,
  });
  const [specKey, setSpecKey] = useState('');
  const [specValue, setSpecValue] = useState('');
  const [application, setApplication] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin/login');
    } else if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated, authLoading, navigate]);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get('/api/products', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load products');
      setLoading(false);
    }
  };

  const handleOpenDialog = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name || '',
        description: product.description || '',
        category: product.category || '',
        specifications: product.specifications || {},
        applications: product.applications || [],
        cloudinaryImages: product.cloudinaryImages || [],
        isFeatured: product.isFeatured || false,
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        category: '',
        specifications: {},
        applications: [],
        cloudinaryImages: [],
        isFeatured: false,
      });
    }
    setDialogOpen(true);
    setError('');
    setSuccess('');
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      category: '',
      specifications: {},
      applications: [],
      cloudinaryImages: [],
      isFeatured: false,
    });
  };

  const handleAddSpec = () => {
    if (specKey && specValue) {
      setFormData({
        ...formData,
        specifications: {
          ...formData.specifications,
          [specKey]: specValue,
        },
      });
      setSpecKey('');
      setSpecValue('');
    }
  };

  const handleRemoveSpec = (key) => {
    const newSpecs = { ...formData.specifications };
    delete newSpecs[key];
    setFormData({ ...formData, specifications: newSpecs });
  };

  const handleAddApplication = () => {
    if (application && !formData.applications.includes(application)) {
      setFormData({
        ...formData,
        applications: [...formData.applications, application],
      });
      setApplication('');
    }
  };

  const handleRemoveApplication = (app) => {
    setFormData({
      ...formData,
      applications: formData.applications.filter((a) => a !== app),
    });
  };

  const handleImageUpload = () => {
    // Open native file picker
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFilesSelected = async (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    try {
      setError('');
      const token = localStorage.getItem('adminToken');
      const formDataUpload = new FormData();
      files.forEach((file) => formDataUpload.append('images', file));

      const response = await axios.post('/api/products/upload-images', formDataUpload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      const urls = response.data.urls || [];
      if (!urls.length) {
        setError('No images were returned from the server.');
        return;
      }

      setFormData((prev) => ({
        ...prev,
        cloudinaryImages: [...(prev.cloudinaryImages || []), ...urls],
      }));
    } catch (uploadError) {
      console.error('Image upload error:', uploadError);
      setError(
        uploadError.response?.data?.message ||
          uploadError.message ||
          'Failed to upload image to server. Please try again.'
      );
    } finally {
      // Reset input so selecting the same files again still triggers onChange
      event.target.value = '';
    }
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      cloudinaryImages: formData.cloudinaryImages.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async () => {
    try {
      setError('');
      setSuccess('');
      const token = localStorage.getItem('adminToken');

      const payload = {
        ...formData,
      };

      if (editingProduct) {
        await axios.put(`/api/products/${editingProduct._id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSuccess('Product updated successfully');
      } else {
        await axios.post('/api/products', payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSuccess('Product created successfully');
      }

      fetchProducts();
      setTimeout(() => {
        handleCloseDialog();
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to save product');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const token = localStorage.getItem('adminToken');
        await axios.delete(`/api/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSuccess('Product deleted successfully');
        fetchProducts();
      } catch (err) {
        setError('Failed to delete product');
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (authLoading || loading) {
    return (
      <Box sx={{ py: 10, textAlign: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ py: { xs: 4, md: 6 }, minHeight: '80vh' }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e3a5f' }}>
            Admin Dashboard
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
              sx={{
                backgroundColor: '#1e3a5f',
                '&:hover': { backgroundColor: '#2d4f7a' },
              }}
            >
              Add Product
            </Button>
            <Button
              variant="outlined"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
            {success}
          </Alert>
        )}

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
                <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Images</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Featured</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category || 'N/A'}</TableCell>
                  <TableCell>{product.cloudinaryImages?.length || 0} images</TableCell>
                  <TableCell>
                    {product.isFeatured ? (
                      <Chip label="Yes" color="primary" size="small" />
                    ) : (
                      <Chip label="No" size="small" />
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleOpenDialog(product)}
                      color="primary"
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(product._id)}
                      color="error"
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Product Form Dialog */}
        <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle>
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Product Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                  Specifications
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <TextField
                    label="Key"
                    value={specKey}
                    onChange={(e) => setSpecKey(e.target.value)}
                    size="small"
                  />
                  <TextField
                    label="Value"
                    value={specValue}
                    onChange={(e) => setSpecValue(e.target.value)}
                    size="small"
                  />
                  <Button onClick={handleAddSpec} variant="outlined" size="small">
                    Add
                  </Button>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {Object.entries(formData.specifications).map(([key, value]) => (
                    <Chip
                      key={key}
                      label={`${key}: ${value}`}
                      onDelete={() => handleRemoveSpec(key)}
                    />
                  ))}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                  Applications
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <TextField
                    fullWidth
                    label="Application"
                    value={application}
                    onChange={(e) => setApplication(e.target.value)}
                    size="small"
                  />
                  <Button onClick={handleAddApplication} variant="outlined" size="small">
                    Add
                  </Button>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {formData.applications.map((app, index) => (
                    <Chip
                      key={index}
                      label={app}
                      onDelete={() => handleRemoveApplication(app)}
                    />
                  ))}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                  Images (Upload via Cloudinary)
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={handleImageUpload}
                    sx={{ mb: 2 }}
                  >
                    Upload Images
                  </Button>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFilesSelected}
                  />
                </Box>
                {formData.cloudinaryImages.length > 0 && (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
                    {formData.cloudinaryImages.map((url, index) => (
                      <Box key={index} sx={{ position: 'relative' }}>
                        <img
                          src={url}
                          alt={`Upload ${index + 1}`}
                          style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
                        />
                        <IconButton
                          size="small"
                          onClick={() => handleRemoveImage(index)}
                          sx={{
                            position: 'absolute',
                            top: -8,
                            right: -8,
                            backgroundColor: 'error.main',
                            color: 'white',
                            '&:hover': { backgroundColor: 'error.dark' },
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    ))}
                  </Box>
                )}
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    />
                  }
                  label="Featured Product"
                />
              </Grid>
            </Grid>
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mt: 2 }}>
                {success}
              </Alert>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" disabled={!formData.name || !formData.description}>
              {editingProduct ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default AdminDashboard;

