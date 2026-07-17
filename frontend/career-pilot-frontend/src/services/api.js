import axios from 'axios';

// 1. Create the instances
export const authApi = axios.create({
  baseURL: import.meta.env.VITE_AUTH_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const careerApi = axios.create({
  baseURL: import.meta.env.VITE_CAREER_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// 2. Define the setup logic
const setupInterceptors = (apiInstance) => {
  apiInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('careerpilot_token');
      if (token&&config.headers) {
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
        window.location.href = '/'; // Changed to '/' based on your earlier requirement
      }
      return Promise.reject(error);
    }
  );
};

// 3. APPLY IMMEDIATELY
setupInterceptors(authApi);
setupInterceptors(careerApi);