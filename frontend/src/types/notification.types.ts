// Notification types
export interface Notification {
  id: string;
  type: NotificationType;
  data: NotificationData;
  read_at: string | null;
  created_at: string;
  updated_at: string;
}

export type NotificationType = 'system' | 'admin_message' | 'account_update';

export interface NotificationData {
  title: string;
  message: string;
  action_url?: string;
  metadata?: Record<string, unknown>;
}
