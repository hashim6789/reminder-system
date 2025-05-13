import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";
import { showErrorToast } from "@/lib";
import { sampleUser } from "@/rough";

// User interface and role type
export interface IUser {
  _id: string;
  email: string;
  name: string;
  role: Role;
  isBlocked: boolean;
  isVerified: boolean;
}

export type Role = "admin" | "user";

interface AuthResponse {
  user: IUser;
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
  user: IUser | null;
  isAuthenticated: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: IUser) => void;
  fetchMe: () => Promise<void>;
}

// Create the Zustand store with persistence
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: sampleUser,
      isAuthenticated: true,
      error: null,

      login: async (credentials) => {
        try {
          const response = await axios.post<AuthResponse>(
            "/api/auth/login",
            credentials,
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true, // Support HTTP-only cookies
            }
          );

          const user = response.data.user;
          set({
            user,
            isAuthenticated: true,
          });
        } catch (err: unknown) {
          const errorMessage = getAxiosErrorMessage(err, "Login failed");
          showErrorToast(errorMessage);
        }
      },

      logout: async () => {
        try {
          await axios.post(
            "/api/auth/logout",
            {},
            {
              withCredentials: true,
            }
          );
          set({
            user: null,
            isAuthenticated: false,
          });
        } catch (err: unknown) {
          const errorMessage = getAxiosErrorMessage(err, "Logout failed");
          showErrorToast(errorMessage);
        }
      },

      setUser: (user) =>
        set({
          user,
          isAuthenticated: true,
        }),

      fetchMe: async () => {
        try {
          // const response = await axios.get<AuthResponse>("/api/auth/me", {
          //   withCredentials: true,
          // });
          // const user = response.data.user;
          const user = sampleUser;
          set({
            user,
            isAuthenticated: true,
          });
        } catch (err: unknown) {
          const errorMessage = getAxiosErrorMessage(
            err,
            "Failed to fetch user"
          );
          set({
            user: null,
            isAuthenticated: false,
          });

          showErrorToast(errorMessage);
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
