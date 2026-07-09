import { careerApi } from './api';

export const ApplicationService = {
  searchApplications: async (params) => {
    const response = await careerApi.get('/api/applications/search', { params });
    return response.data;
  },

  getApplication: async (id) => {
    const response = await careerApi.get(`/api/applications/${id}`);
    return response.data;
  },

  createApplication: async (data) => {
    const response = await careerApi.post('/api/applications', data);
    return response.data;
  },

  updateApplication: async (id, data) => {
    const response = await careerApi.put(`/api/applications/${id}`, data);
    return response.data;
  },

  deleteApplication: async (id) => {
    await careerApi.delete(`/api/applications/${id}`);
  }
};