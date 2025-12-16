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
  Tabs,
  Tab,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../context/AuthContext';
import api from '../apiClient';

const AdminDashboard = () => {
  const { isAuthenticated, loading: authLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [heroSlides, setHeroSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [heroDialogOpen, setHeroDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingHero, setEditingHero] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
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
  const heroFileInputRef = useRef(null);
  const [heroFormData, setHeroFormData] = useState({
    image: '',
    order: 0,
  });
  const [heroImageFile, setHeroImageFile] = useState(null);
  const [heroImagePreview, setHeroImagePreview] = useState(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin/login');
    } else if (isAuthenticated) {
      fetchProducts();
      fetchHeroSlides();
    }
  }, [isAuthenticated, authLoading, navigate]);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await api.get('/products', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load products');
      setLoading(false);
    }
  };

  const fetchHeroSlides = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await api.get('/hero', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHeroSlides(response.data);
    } catch (err) {
      console.error('Failed to load hero slides:', err);
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

      const response = await api.post('/products/upload-images', formDataUpload, {
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
        await api.put(`/products/${editingProduct._id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSuccess('Product updated successfully');
      } else {
        await api.post('/products', payload, {
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
        await api.delete(`/products/${id}`, {
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

  // Hero management functions
  const handleOpenHeroDialog = (hero = null) => {
    if (hero) {
      setEditingHero(hero);
      setHeroFormData({
        image: hero.image || '',
        order: hero.order || 0,
      });
      setHeroImagePreview(hero.image || null);
      setHeroImageFile(null);
    } else {
      setEditingHero(null);
      setHeroFormData({
        image: '',
        order: heroSlides.length,
      });
      setHeroImagePreview(null);
      setHeroImageFile(null);
    }
    setHeroDialogOpen(true);
  };

  const handleCloseHeroDialog = () => {
    setHeroDialogOpen(false);
    setEditingHero(null);
    setHeroFormData({ image: '', order: 0 });
    setHeroImageFile(null);
    setHeroImagePreview(null);
  };

  const handleHeroImageSelect = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setHeroImageFile(file);
    setHeroImagePreview(previewUrl);
    setError('');
    
    // Clean up previous preview if editing
    if (heroImagePreview && heroImagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(heroImagePreview);
    }
    
    event.target.value = '';
  };

  const handleHeroSubmit = async () => {
    try {
      setError('');
      setSuccess('');
      const token = localStorage.getItem('adminToken');

      let imageUrl = heroFormData.image;

      // Upload image if a new file was selected
      if (heroImageFile) {
        const formData = new FormData();
        formData.append('image', heroImageFile);

        // Don't set Content-Type header - let axios/browser set it automatically for FormData
        const uploadResponse = await api.post('/hero/upload-image', formData);

        imageUrl = uploadResponse.data.url;
        
        // Clean up preview URL
        if (heroImagePreview && heroImagePreview.startsWith('blob:')) {
          URL.revokeObjectURL(heroImagePreview);
        }
      }

      if (!imageUrl) {
        setError('Please select an image');
        return;
      }

      const payload = {
        image: imageUrl,
        order: heroFormData.order,
      };

      if (editingHero) {
        await api.put(`/hero/${editingHero._id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSuccess('Hero slide updated successfully');
      } else {
        await api.post('/hero', payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSuccess('Hero slide created successfully');
      }

      fetchHeroSlides();
      setTimeout(() => {
        handleCloseHeroDialog();
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to save hero slide');
    }
  };

  const handleDeleteHero = async (id) => {
    if (window.confirm('Are you sure you want to delete this hero slide?')) {
      try {
        const token = localStorage.getItem('adminToken');
        await api.delete(`/hero/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSuccess('Hero slide deleted successfully');
        fetchHeroSlides();
      } catch (err) {
        setError('Failed to delete hero slide');
      }
    }
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
            {activeTab === 0 && (
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
            )}
            {activeTab === 1 && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleOpenHeroDialog()}
                sx={{
                  backgroundColor: '#1e3a5f',
                  '&:hover': { backgroundColor: '#2d4f7a' },
                }}
              >
                Add Hero Slide
              </Button>
            )}
            <Button
              variant="outlined"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Box>

        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
          <Tab label="Products" />
          <Tab label="Hero Images" />
        </Tabs>

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

        {activeTab === 0 && (
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
        )}

        {activeTab === 1 && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Image</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Label</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Order</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {heroSlides.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                      <Typography color="text.secondary">No hero slides yet. Add one to get started.</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  heroSlides.map((hero) => (
                    <TableRow key={hero._id}>
                      <TableCell>
                        <Box
                          component="img"
                          src={hero.image}
                          alt={hero.label}
                          sx={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 1 }}
                        />
                      </TableCell>
                      <TableCell>{hero.label || 'No label'}</TableCell>
                      <TableCell>{hero.order}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => handleOpenHeroDialog(hero)}
                          color="primary"
                          size="small"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteHero(hero._id)}
                          color="error"
                          size="small"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}

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

        {/* Hero Form Dialog */}
        <Dialog open={heroDialogOpen} onClose={handleCloseHeroDialog} maxWidth="md" fullWidth>
          <DialogTitle>
            {editingHero ? 'Edit Hero Slide' : 'Add New Hero Slide'}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                  Select Image
                </Typography>
                <input
                  type="file"
                  accept="image/*"
                  ref={heroFileInputRef}
                  onChange={handleHeroImageSelect}
                  style={{ display: 'none' }}
                />
                <Button
                  variant="outlined"
                  onClick={() => heroFileInputRef.current?.click()}
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  {heroImagePreview ? 'Change Image' : 'Select Image'}
                </Button>
                <TextField
                  fullWidth
                  type="number"
                  label="Order"
                  value={heroFormData.order}
                  onChange={(e) => setHeroFormData({ ...heroFormData, order: parseInt(e.target.value) || 0 })}
                  helperText="Lower numbers appear first"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                  Preview
                </Typography>
                {heroImagePreview ? (
                  <Box
                    component="img"
                    src={heroImagePreview}
                    alt="Hero preview"
                    sx={{
                      width: '100%',
                      height: 300,
                      objectFit: 'cover',
                      borderRadius: 2,
                      border: '2px solid #e0e0e0',
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: '100%',
                      height: 300,
                      border: '2px dashed #e0e0e0',
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#f5f5f5',
                    }}
                  >
                    <Typography color="text.secondary">No image selected</Typography>
                  </Box>
                )}
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
            <Button onClick={handleCloseHeroDialog}>Cancel</Button>
            <Button onClick={handleHeroSubmit} variant="contained" disabled={!heroImagePreview && !heroFormData.image}>
              {editingHero ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default AdminDashboard;

