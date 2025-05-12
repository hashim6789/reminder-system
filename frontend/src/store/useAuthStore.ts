import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";

// Define interfaces for type safety
interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
}

// Interface for API response data
interface LoginResponse {
  user: User;
}

// Function to extract error message from Axios errors
export function getAxiosErrorMessage(
  error: unknown,
  fallback = "Something went wrong"
) {
  if (axios.isAxiosError(error) && error.response?.data?.error) {
    return error.response.data.error;
  }
  return fallback;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  setError: (error: string | null) => void;
  setUser: (user: User) => void;
}

// Create the Zustand store with persistence
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      error: null,

      login: async (credentials) => {
        try {
          const response = await axios.post<LoginResponse>(
            "/api/auth/login",
            credentials,
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true, // Equivalent to credentials: 'include'
            }
          );

          const user = response.data.user;
          set({
            user,
            isAuthenticated: true,
            error: null,
          });
        } catch (err: unknown) {
          const errorMessage = getAxiosErrorMessage(err, "Login failed");
          set({ error: errorMessage });
          throw new Error(errorMessage);
        }
      },

      logout: async () => {
        try {
          await axios.post(
            "/api/auth/logout",
            {},
            {
              withCredentials: true, // Equivalent to credentials: 'include'
            }
          );
          set({
            user: null,
            isAuthenticated: false,
            error: null,
          });
        } catch (err: unknown) {
          const errorMessage = getAxiosErrorMessage(err, "Logout failed");
          set({ error: errorMessage });
          throw new Error(errorMessage);
        }
      },

      setError: (error) => set({ error }),

      setUser: (user) =>
        set({
          user,
          isAuthenticated: true,
          error: null,
        }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
