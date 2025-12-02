import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { authApi } from '@/api/auth.api';
import { useAuthStore } from '@/store/authStore';
import type { LoginCredentials, RegisterData, AuthResponse } from '@/types';
import { AxiosError } from 'axios';

/**
 * Hook for user login
 */
export const useLogin = (): UseMutationResult<AuthResponse, AxiosError, LoginCredentials> => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: async (data) => {
      await setAuth(data.data.user, data.data.token);
    },
  });
};

/**
 * Hook for user registration
 */
export const useRegister = (): UseMutationResult<AuthResponse, AxiosError, RegisterData> => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: async (data) => {
      await setAuth(data.data.user, data.data.token);
    },
  });
};

/**
 * Hook for user logout
 */
export const useLogout = () => {
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: async () => {
      await clearAuth();
    },
    onError: async () => {
      // Clear auth even if API call fails
      await clearAuth();
    },
  });
};

/**
 * Hook to check if user has permission
 */
export const usePermission = (permission: string): boolean => {
  return useAuthStore((state) => state.hasPermission(permission));
};

/**
 * Hook to check if user has role
 */
export const useRole = (role: string): boolean => {
  return useAuthStore((state) => state.hasRole(role));
};

/**
 * Hook to check if user has any of the specified roles
 */
export const useAnyRole = (roles: string[]): boolean => {
  return useAuthStore((state) => state.hasAnyRole(roles));
};
