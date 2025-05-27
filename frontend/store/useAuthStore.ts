import { create } from 'zustand';

interface User {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  sessionToken: string | null;
  isLoading: boolean;
  error: string | null;
  signupStatus: string | null;
  baseUrl: string;

  signup: (
    userName: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => Promise<{ message: string; user: User; sessionToken: string }>;

  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  getProfile: () => Promise<void>;
}

const BASE_URL = 'https://circlemate-spark-landing-jet.vercel.app/api';

export const useAuthStore = create<AuthState>((set, get) => ({
  baseUrl: BASE_URL,

  user: null,
  token: localStorage.getItem('token'),
  sessionToken: localStorage.getItem('sessionToken'),
  isLoading: false,
  error: null,
  signupStatus: null,

  signup: async (userName, firstName, lastName, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`${get().baseUrl}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, firstName, lastName, email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Signup failed');

      localStorage.setItem('sessionToken', data.sessionToken);

      set({ signupStatus: data.message, user: data.user, sessionToken: data.sessionToken, isLoading: false });

      return data; // Return data so caller can handle success
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      throw err; // rethrow to let caller handle error if needed
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`${get().baseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');

      const { token, sessionToken, user } = data;

      localStorage.setItem('token', token);
      localStorage.setItem('sessionToken', sessionToken);

      set({ token, sessionToken, user, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('sessionToken');
    set({ user: null, token: null, sessionToken: null });
  },

  getProfile: async () => {
    const sessionToken = localStorage.getItem('sessionToken');
    if (!sessionToken) {
      set({ user: null });
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`${get().baseUrl}/auth/profile`, {
        headers: {
          'Content-Type': 'application/json',
          Cookie: `sessionToken=${sessionToken}`,
        },
        credentials: 'include',
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch profile');

      set({ user: data.user, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
}));
