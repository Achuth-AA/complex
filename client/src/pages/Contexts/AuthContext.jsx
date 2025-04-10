import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the auth context
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is already logged in (token in localStorage)
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          // Set the default auth header for all axios requests
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Verify token and get user data
          const response = await axios.get(`http://localhost:5000/api/auth/me`);
          
          if (response.data.success) {
            setUser(response.data.user);
          } else {
            // Token invalid, remove it
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
          }
        } catch (error) {
          console.error('Authentication check failed:', error);
          localStorage.removeItem('token');
          delete axios.defaults.headers.common['Authorization'];
        }
      }
      
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  // Register function
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(`http://localhost:5000/api/auth/register`, userData);
      
      if (response.data.success) {
        return { success: true, message: 'Registration successful. Please log in.' };
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
      return { success: false, message: error.response?.data?.message || 'Registration failed. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  // Login function
  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(`http://localhost:5000/api/auth/login`, credentials);
      
      if (response.data.success) {
        const { token, user } = response.data;
        
        // Store token in localStorage
        localStorage.setItem('token', token);
        
        // Set axios default header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Set user in state
        setUser(user);
        
        return { success: true };
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please check your credentials.');
      return { success: false, message: error.response?.data?.message || 'Login failed. Please check your credentials.' };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    
    // Remove auth header
    delete axios.defaults.headers.common['Authorization'];
    
    // Clear user from state
    setUser(null);
  };

  const authContextValue = {
    user,
    loading,
    error,
    register,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;