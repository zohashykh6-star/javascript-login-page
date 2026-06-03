export interface User {
  id: number;
  email: string;
  fullName: string;
  createdAt: Date;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export interface JWTPayload {
  userId: number;
  email: string;
  iat: number;
  exp: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}
