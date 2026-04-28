import axios from 'axios';

// Get API URL from environment variable or use default
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests if it exists
apiClient.interceptors.request.use((config) => {
  const userToken = localStorage.getItem('userToken');
  if (userToken) {
    config.headers.Authorization = `Bearer ${userToken}`;
  }
  return config;
});

export default apiClient;
