// src/apiService.js
import axios from 'axios';

// Create an instance of axios
const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Log request details
    console.log('Request:', config);
    // Add custom headers here
    config.headers['Custom-Header'] = 'HeaderValue';
    return config;
  },
  (error) => {
    // Log request error
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    // Log response details
    console.log('Response:', response);
    return response;
  },
  (error) => {
    // Log response error
    console.error('Response Error:', error);
    // Handle specific error codes here if necessary
    return Promise.reject(error);
  }
);

// Fetch data API call
const fetchData = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Add data API call
const addData = async (newData) => {
  try {
    const response = await api.post('/products', newData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Edit data API call
const editData = async (updatedData) => {
  const { id, ...changes } = updatedData;
  try {
    const response = await api.put(`/products/${id}`, changes);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Error handling function
const handleError = (error) => {
  if (error.response) {
    // Server responded with a status other than 2xx
    console.error('Server Error:', error.response.data);
  } else if (error.request) {
    // No response received
    console.error('Network Error:', error.request);
  } else {
    // Other errors
    console.error('Error:', error.message);
  }
};

export { fetchData, addData, editData };

