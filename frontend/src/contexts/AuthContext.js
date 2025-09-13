import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email, password) => {
    // Mock login logic
    if (email && password) {
      const mockUser = {
        id: '1',
        name: 'John Doe',
        email: email,
        company: 'Sample Company'
      };
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('auth_user', JSON.stringify(mockUser));
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const register = async (userData) => {
    // Mock registration logic
    if (userData.email && userData.password) {
      const mockUser = {
        id: '1',
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        company: userData.company || 'New Company'
      };
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('auth_user', JSON.stringify(mockUser));
      return { success: true };
    }
    return { success: false, error: 'Registration failed' };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('auth_user');
  };

  const socialLogin = async (provider) => {
    // Mock social login
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: `john.doe@${provider}.com`,
      company: 'Sample Company',
      provider: provider
    };
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('auth_user', JSON.stringify(mockUser));
    return { success: true };
  };

  const value = {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    socialLogin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};