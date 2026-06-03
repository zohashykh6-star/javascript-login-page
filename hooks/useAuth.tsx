'use client';

import { useState, useEffect, useCallback, useContext, createContext, ReactNode } from 'react';
import { User, AuthContextType } from '@/types/auth';
import * as authService from '@/services/authService';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await authService.getProfile();
      if (result.user) {
        setUser(result.user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      const result = await authService.login({ email, password });

      if (result.success && result.user) {
        setUser(result.user);
        setIsAuthenticated(true);

        // IMPORTANT
        window.location.href = "/dashboard";
      } else {
        setUser(null);
        setIsAuthenticated(false);

        throw new Error(result.message || "Login failed");
      }
   } catch (error) {
      setUser(null);
      setIsAuthenticated(false);

      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

    const logout = useCallback(async () => {
      setIsLoading(true);
      try {
        await authService.logout();
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
