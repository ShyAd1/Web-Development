export interface User {
  id?: number;
  username: string;
  email: string;
  createdAt?: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  message: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}
