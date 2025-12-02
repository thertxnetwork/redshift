import axiosInstance from './axios.config';
import type { Notification, PaginatedResponse, ApiResponse } from '@/types';

export const notificationsApi = {
  /**
   * Get notifications list
   */
  getAll: async (params?: { unread_only?: boolean }): Promise<PaginatedResponse<Notification>> => {
    const response = await axiosInstance.get<PaginatedResponse<Notification>>('/notifications', {
      params,
    });
    return response.data;
  },

  /**
   * Get unread notification count
   */
  getUnreadCount: async (): Promise<{ count: number }> => {
    const response = await axiosInstance.get<ApiResponse<{ count: number }>>('/notifications/unread-count');
    return response.data.data;
  },

  /**
   * Mark notification as read
   */
  markAsRead: async (id: string): Promise<ApiResponse<null>> => {
    const response = await axiosInstance.put<ApiResponse<null>>(`/notifications/${id}/read`);
    return response.data;
  },

  /**
   * Mark notification as unread
   */
  markAsUnread: async (id: string): Promise<ApiResponse<null>> => {
    const response = await axiosInstance.put<ApiResponse<null>>(`/notifications/${id}/unread`);
    return response.data;
  },

  /**
   * Mark all notifications as read
   */
  markAllAsRead: async (): Promise<ApiResponse<null>> => {
    const response = await axiosInstance.put<ApiResponse<null>>('/notifications/mark-all-read');
    return response.data;
  },

  /**
   * Delete notification
   */
  delete: async (id: string): Promise<ApiResponse<null>> => {
    const response = await axiosInstance.delete<ApiResponse<null>>(`/notifications/${id}`);
    return response.data;
  },
};
