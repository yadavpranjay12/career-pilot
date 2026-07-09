import { careerApi } from './api';

export const GoalService = {
  searchGoals: async (params) => {
    const response = await careerApi.get('/api/goals/search', { params });
    return response.data;
  },
  getGoal: async (id) => {
    const response = await careerApi.get(`/api/goals/${id}`);
    return response.data;
  },
  createGoal: async (data) => {
    const response = await careerApi.post('/api/goals', data);
    return response.data;
  },
  updateGoal: async (id, data) => {
    const response = await careerApi.put(`/api/goals/${id}`, data);
    return response.data;
  },
  deleteGoal: async (id) => {
    await careerApi.delete(`/api/goals/${id}`);
  },
  updateProgress: async (id, data) => {
    const response = await careerApi.patch(`/api/goals/${id}/progress`, data);
    return response.data;
  },
  cancelGoal: async (id) => {
    const response = await careerApi.post(`/api/goals/${id}/cancel`);
    return response.data;
  }
};