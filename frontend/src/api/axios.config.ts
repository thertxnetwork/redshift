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
    // Detailed error logging for debugging
    console.error('=== API Error Details ===');
    
    if (error.response) {
      // Server responded with error status
      const { status, data, config } = error.response;
      
      console.error('Response Error:', {
        status,
        statusText: error.response.statusText,
        url: config.url,
        method: config.method?.toUpperCase(),
        data,
      });

      if (status === 401) {
        // Unauthorized - clear token and redirect to login
        console.error('Unauthorized access - clearing auth token');
        try {
          await SecureStore.deleteItemAsync('auth_token');
          // Navigation will be handled by the app state
        } catch (e) {
          console.error('Error clearing auth token:', e);
        }
      }

      if (status === 403) {
        // Forbidden - user doesn't have permission
        console.warn('Access forbidden:', data);
      }

      if (status === 422) {
        // Validation error
        console.warn('Validation error:', data);
      }

      if (status >= 500) {
        // Server error
        console.error('Server error:', data);
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network Error - No response received:', {
        message: error.message,
        code: error.code,
        config: {
          url: error.config?.url,
          method: error.config?.method?.toUpperCase(),
          baseURL: error.config?.baseURL,
          timeout: error.config?.timeout,
        },
      });
      console.error('Possible causes:');
      console.error('1. Backend server is not running');
      console.error('2. Network connectivity issues');
      console.error('3. CORS configuration problem');
      console.error('4. Request timeout');
      console.error('5. Incorrect API URL:', API_URL);
    } else {
      // Something else happened in setting up the request
      console.error('Request setup error:', {
        message: error.message,
        stack: error.stack,
      });
    }
    
    console.error('=== End API Error Details ===');

    return Promise.reject(error);
  }
);

export default axiosInstance;
export { API_URL };
