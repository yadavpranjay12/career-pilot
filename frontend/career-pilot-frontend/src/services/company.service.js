import { careerApi } from './api';

export const CompanyService = {
  // Uses the /search endpoint to handle both listing and filtering
  searchCompanies: async (params) => {
    const response = await careerApi.get('/api/companies/search', { params });
    return response.data;
  },

  getCompany: async (id) => {
    const response = await careerApi.get(`/api/companies/${id}`);
    return response.data;
  },

  createCompany: async (data) => {
    const response = await careerApi.post('/api/companies', data);
    return response.data;
  },

  updateCompany: async (id, data) => {
    const response = await careerApi.put(`/api/companies/${id}`, data);
    return response.data;
  },

  deleteCompany: async (id) => {
    await careerApi.delete(`/api/companies/${id}`);
  }
};