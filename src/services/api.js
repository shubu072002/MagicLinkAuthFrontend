import axios from 'axios';

const API_BASE = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT to every request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const sendMagicLink = (email) =>
  api.post('/auth/magic-link', { email });

export const verifyToken = (token) =>
  api.post('/auth/verify', { token });

export const getMe = () =>
  api.get('/auth/me');

export default api;
