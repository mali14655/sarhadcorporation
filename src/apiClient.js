import axios from 'axios';

// Automatically detect backend URL:
// - If running on localhost, ALWAYS use local backend (even if env is set)
// - If REACT_APP_API_BASE_URL is set and not on localhost, use it
// - Otherwise, use production backend
const getApiBaseUrl = () => {
  // If running on localhost, ALWAYS use local backend for development
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:5000/api';
  }
  
  // If explicitly set in env and not on localhost, use that
  if (process.env.REACT_APP_API_BASE_URL && 
      !process.env.REACT_APP_API_BASE_URL.includes('your-backend-domain')) {
    return process.env.REACT_APP_API_BASE_URL;
  }
  
  // Otherwise, use production backend
  return 'https://sarhadcorporationbackend.vercel.app/api';
};

const API_BASE_URL = getApiBaseUrl();

console.log('API Base URL:', API_BASE_URL);

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false, // Set to false to avoid CORS issues with credentials
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Remove Content-Type header for FormData - let browser set it automatically
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;



