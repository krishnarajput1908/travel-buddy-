import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('tb_user');
    try {
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('tb_token') || null);
  const [loading, setLoading] = useState(true);

  // Initialize and verify session on load
  useEffect(() => {
    const verifyUser = async () => {
      if (token) {
        try {
          const res = await authService.getMe();
          if (res.success && res.user) {
            setUser(res.user);
            localStorage.setItem('tb_user', JSON.stringify(res.user));
          }
        } catch (err) {
          console.warn('Session verification failed, logging out');
          logout();
        }
      }
      setLoading(false);
    };

    verifyUser();
  }, [token]);

  // Login handler
  const login = async (email, password) => {
    const res = await authService.login({ email, password });
    if (res.success && res.token) {
      setToken(res.token);
      setUser(res.user);
      localStorage.setItem('tb_token', res.token);
      localStorage.setItem('tb_user', JSON.stringify(res.user));
      return { success: true, user: res.user };
    }
    return { success: false, message: res.message || 'Login failed' };
  };

  // Register handler
  const register = async (name, email, password) => {
    const res = await authService.register({ name, email, password });
    if (res.success && res.token) {
      setToken(res.token);
      setUser(res.user);
      localStorage.setItem('tb_token', res.token);
      localStorage.setItem('tb_user', JSON.stringify(res.user));
      return { success: true, user: res.user };
    }
    return { success: false, message: res.message || 'Registration failed' };
  };

  // Logout handler
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('tb_token');
    localStorage.removeItem('tb_user');
  };

  // Update user in context
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('tb_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
