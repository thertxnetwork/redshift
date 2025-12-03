import { useQuery, useMutation, useQueryClient, UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import { notificationsApi } from '@/api/notifications.api';
import type { Notification, PaginatedResponse, ApiResponse } from '@/types';
import { AxiosError } from 'axios';

/**
 * Hook to fetch notifications
 */
export const useNotifications = (unreadOnly: boolean = false): UseQueryResult<PaginatedResponse<Notification>, AxiosError> => {
  return useQuery({
    queryKey: ['notifications', { unreadOnly }],
    queryFn: () => notificationsApi.getAll({ unread_only: unreadOnly }),
    staleTime: 1000 * 60, // 1 minute
  });
};

/**
 * Hook to get unread notification count
 */
export const useUnreadCount = (): UseQueryResult<{ count: number }, AxiosError> => {
  return useQuery({
    queryKey: ['notifications', 'unread-count'],
    queryFn: notificationsApi.getUnreadCount,
    refetchInterval: 1000 * 30, // Refetch every 30 seconds
    staleTime: 1000 * 20, // 20 seconds
    retry: false, // Don't retry if backend is not configured
    // Return default value on error to prevent app crashes
    placeholderData: { count: 0 },
  });
};

/**
 * Hook to mark notification as read
 */
export const useMarkAsRead = (): UseMutationResult<ApiResponse<null>, AxiosError, string> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notificationsApi.markAsRead,
    onSuccess: () => {
      // Invalidate and refetch notifications
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};

/**
 * Hook to mark notification as unread
 */
export const useMarkAsUnread = (): UseMutationResult<ApiResponse<null>, AxiosError, string> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notificationsApi.markAsUnread,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};

/**
 * Hook to mark all notifications as read
 */
export const useMarkAllAsRead = (): UseMutationResult<ApiResponse<null>, AxiosError, void> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notificationsApi.markAllAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};

/**
 * Hook to delete notification
 */
export const useDeleteNotification = (): UseMutationResult<ApiResponse<null>, AxiosError, string> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notificationsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};
