import { useState, useCallback } from 'react';
import { ApplicationService } from '../services/application.service';
import { getUserIdFromToken } from '../utils/jwt';

export const useApplications = () => {
  const [data, setData] = useState({ content: [], totalPages: 0, totalElements: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchApplications = useCallback(async (filters = {}, page = 0, sort = 'applicationDate,desc') => {
    setIsLoading(true);
    setError(null);
    try {
      const userId = getUserIdFromToken();
      const cleanedFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== '' && v !== null)
      );

      const response = await ApplicationService.searchApplications({
        userId,
        ...cleanedFilters,
        page,
        sort
      });
      setData(response);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to fetch applications.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { ...data, isLoading, error, fetchApplications };
};