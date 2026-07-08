import { useState, useCallback } from 'react';
import { CompanyService } from '../services/company.service';

export const useCompanies = () => {
  const [data, setData] = useState({
    content: [],
    totalPages: 0,
    totalElements: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Removed the colliding pagination 'size' parameter
  const fetchCompanies = useCallback(async (filters = {}, page = 0, sort = 'name,asc') => {
    setIsLoading(true);
    setError(null);
    try {
      // Clean up empty filters
      const cleanedFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== '' && v !== null)
      );

      // We omit the pagination 'size' because it collides with the backend's CompanySize enum
      const response = await CompanyService.searchCompanies({
        ...cleanedFilters,
        page,
        sort
      });
      
      setData(response);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to fetch companies.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { 
    companies: data.content, 
    totalPages: data.totalPages, 
    totalElements: data.totalElements,
    isLoading, 
    error, 
    fetchCompanies 
  };
};