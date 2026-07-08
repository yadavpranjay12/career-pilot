import axios from 'axios';

export const authApi = axios.create({
  baseURL: import.meta.env.VITE_AUTH_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const careerApi = axios.create({
  baseURL: import.meta.env.VITE_CAREER_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// ... interceptor setup remains the same ...
// Centralized interceptor logic
const setupInterceptors = (apiInstance) => {
  apiInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('careerpilot_token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  apiInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('careerpilot_token');
        localStorage.removeItem('careerpilot_refresh_token');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
};

setupInterceptors(authApi);
setupInterceptors(careerApi);