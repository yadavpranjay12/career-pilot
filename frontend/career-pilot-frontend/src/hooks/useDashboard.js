import { useState, useEffect, useCallback } from 'react';
import { DashboardService } from '../services/dashboard.service';
import { getUserIdFromToken } from '../utils/jwt';

export const useDashboard = () => {
  const [data, setData] = useState({
    stats: null,
    recentApplications: [],
    upcomingGoals: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    const userId = getUserIdFromToken();
    
    if (!userId) {
      setError('User context not found. Please log in again.');
      setIsLoading(false);
      return;
    }

    try {
      // Execute network requests concurrently for performance
      const [stats, applicationsPage, goalsPage] = await Promise.all([
        DashboardService.getStats(userId),
        DashboardService.getRecentApplications(userId),
        DashboardService.getUpcomingGoals(userId)
      ]);

      setData({
        stats,
        recentApplications: applicationsPage.content || [],
        upcomingGoals: goalsPage.content || []
      });
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to load dashboard data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return { ...data, isLoading, error, refetch: fetchDashboardData };
};