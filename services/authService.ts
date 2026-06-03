import { LoginRequest, AuthResponse, User } from '@/types/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function login(credentials: LoginRequest): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
      credentials: 'include', // Send and receive cookies
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Login failed',
      };
    }

    return {
      success: true,
      message: data.message || 'Login successful',
      user: data.user,
      token: data.token,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Network error occurred';
    console.error('Login request failed:', message);
    return {
      success: false,
      message: message,
    };
  }
}

export async function logout(): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_URL}/api/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    const data = await response.json();

    return {
      success: response.ok,
      message: data.message || 'Logout failed',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Logout failed',
    };
  }
}

export async function getProfile(): Promise<{ user: User | null; error?: string }> {
  try {
    const response = await fetch(`${API_URL}/api/profile`, {
      credentials: 'include',
    });

    if (!response.ok) {
      return { user: null, error: 'Unauthorized' };
    }

    const data = await response.json();
    return { user: data.user };
  } catch (error) {
    return {
      user: null,
      error: error instanceof Error ? error.message : 'Failed to fetch profile',
    };
  }
}

export async function verifySession(): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/api/verify`, {
      credentials: 'include',
    });

    return response.ok;
  } catch (error) {
    return false;
  }
}
