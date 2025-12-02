// User types
export interface User {
  id: number;
  name: string;
  email: string;
  avatar_url: string | null;
  phone: string | null;
  bio: string | null;
  email_verified_at: string | null;
  roles: Role[];
  permissions: Permission[];
  created_at: string;
  updated_at: string;
}

export interface Role {
  id: number;
  name: string;
  guard_name: string;
  permissions: Permission[];
}

export interface Permission {
  id: number;
  name: string;
  guard_name: string;
}

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  data: {
    user: User;
    token: string;
  };
}
