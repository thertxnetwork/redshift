import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import * as SecureStore from 'expo-secure-store';
import type { ApiError } from '@/types';

// Get API URL from environment or use default
const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000/api';

// Create axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor - Add auth token
axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      const token = await SecureStore.getItemAsync('auth_token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error retrieving auth token:', error);
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError<ApiError>) => {
    // Detailed error logging for debugging (development only)
    if (__DEV__) {
      console.group('🔴 API Error Details');
      console.log('URL:', error.config?.url);
      console.log('Method:', error.config?.method?.toUpperCase());
      console.log('Base URL:', error.config?.baseURL);
    }
    
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      if (__DEV__) {
        console.log('Status:', status);
        console.log('Response Data:', data);
      }

      if (status === 401) {
        // Unauthorized - clear token and redirect to login
        if (__DEV__) {
          console.warn('⚠️ Unauthorized - Clearing auth token');
        }
        try {
          await SecureStore.deleteItemAsync('auth_token');
          // Navigation will be handled by the app state
        } catch (e) {
          console.error('Error clearing auth token:', e);
        }
      }

      if (status === 403) {
        // Forbidden - user doesn't have permission
        if (__DEV__) {
          console.warn('⚠️ Access forbidden:', data);
        }
      }

      if (status === 422) {
        // Validation error
        if (__DEV__) {
          console.warn('⚠️ Validation error:', data);
        }
      }

      if (status >= 500) {
        // Server error
        console.error('❌ Server error:', data);
      }
    } else if (error.request) {
      // Request was made but no response
      console.error('❌ Network Error - No response received');
      if (__DEV__) {
        console.error('Request details:', {
          url: error.config?.url,
          method: error.config?.method,
          timeout: error.config?.timeout,
          baseURL: error.config?.baseURL,
        });
        console.error('Error message:', error.message);
        console.error('Error code:', error.code);
      }
    } else {
      // Something else happened
      console.error('❌ Request setup error:', error.message);
    }
    
    if (__DEV__) {
      console.groupEnd();
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
export { API_URL };
