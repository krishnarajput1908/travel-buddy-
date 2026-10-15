import axios from 'axios';

// Create Axios instance
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request Interceptor: Attach JWT Bearer Token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('tb_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle unauthenticated or token expiration gracefully
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If unauthorized and on protected page, clear token
      const isAuthRoute = window.location.pathname.includes('/login') || window.location.pathname.includes('/register');
      if (!isAuthRoute) {
        localStorage.removeItem('tb_token');
        localStorage.removeItem('tb_user');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
