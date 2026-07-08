import { careerApi } from './api';

export const DashboardService = {
  getStats: async (userId) => {
    const response = await careerApi.get('/api/dashboard', { params: { userId } });
    return response.data;
  },

  getRecentApplications: async (userId) => {
    const response = await careerApi.get('/api/applications', {
      params: { userId, size: 5, sort: 'createdAt,desc' }
    });
    return response.data; 
  },

  getUpcomingGoals: async (userId) => {
    // Uses the actual /search endpoint from GoalController to support status filtering
    const response = await careerApi.get('/api/goals/search', {
      params: { userId, size: 5, sort: 'targetDate,asc', status: 'ACTIVE' }
    });
    return response.data; 
  }
};