import { authApi } from './api';

export const AuthService = {
  login: async (credentials) => {
    const response = await authApi.post('/api/auth/login', credentials);
    return response.data;
  },

  register: async (userData) => {
    const response = await authApi.post('/api/auth/register', userData);
    return response.data;
  },

  logout: () => {
    // We will implement the POST /api/auth/logout call in a future phase
    localStorage.removeItem('careerpilot_token');
    localStorage.removeItem('careerpilot_refresh_token');
  }
};