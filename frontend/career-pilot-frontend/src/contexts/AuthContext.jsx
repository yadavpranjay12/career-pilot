import { createContext, useState, useEffect, useMemo } from 'react';
import { AuthService } from '../services/auth.service';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('careerpilot_token');
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials) => {
    const data = await AuthService.login(credentials);
    
    const token = data.accessToken;
    if (!token) {
      throw new Error("No authentication token received from the server.");
    }

    localStorage.setItem('careerpilot_token', token);
    localStorage.setItem('careerpilot_refresh_token', data.refreshToken);
    setIsAuthenticated(true);
    return data;
  };

  const logout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
  };

  const value = useMemo(() => ({
    isAuthenticated,
    isLoading,
    login,
    logout
  }), [isAuthenticated, isLoading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};