import { useState, useCallback } from 'react';
import { GoalService } from '../services/goal.service';
import { getUserIdFromToken } from '../utils/jwt';

export const useGoals = () => {
  const [data, setData] = useState({ content: [], totalPages: 0, totalElements: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGoals = useCallback(async (filters = {}, page = 0, sort = 'targetDate,asc') => {
    setIsLoading(true);
    setError(null);
    try {
      const userId = getUserIdFromToken();
      const cleanedFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== '' && v !== null)
      );
      const response = await GoalService.searchGoals({ userId, ...cleanedFilters, page, sort });
      setData(response);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to fetch goals.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { ...data, isLoading, error, fetchGoals };
};