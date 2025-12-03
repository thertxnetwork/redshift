import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import type { User } from '@/types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  setAuth: (user: User, token: string) => Promise<void>;
  clearAuth: () => Promise<void>;
  setUser: (user: User) => void;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: string) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      setAuth: async (user: User, token: string) => {
        try {
          // Store token securely
          await SecureStore.setItemAsync('auth_token', token);
          
          set({
            user,
            token,
            isAuthenticated: true,
          });
        } catch (error) {
          console.error('Error setting auth:', error);
          throw error;
        }
      },

      clearAuth: async () => {
        try {
          // Clear secure token
          await SecureStore.deleteItemAsync('auth_token');
          
          set({
            user: null,
            token: null,
            isAuthenticated: false,
          });
        } catch (error) {
          console.error('Error clearing auth:', error);
        }
      },

      setUser: (user: User) => {
        set({ user });
      },

      hasPermission: (permission: string) => {
        const { user } = get();
        if (!user) return false;
        
        // Check direct permissions
        return user.permissions?.some((p) => p.name === permission) ?? false;
      },

      hasRole: (role: string) => {
        const { user } = get();
        if (!user) return false;
        
        return user.roles?.some((r) => r.name === role) ?? false;
      },

      hasAnyRole: (roles: string[]) => {
        const { user } = get();
        if (!user) return false;
        
        return user.roles?.some((r) => roles.includes(r.name)) ?? false;
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Don't persist token in AsyncStorage, only in SecureStore
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
