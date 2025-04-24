import { create } from "zustand";
import { persist } from "zustand/middleware";
import { supabase } from "./supabase";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (firstName: string, lastName: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });

        try {
          // Sign in with Supabase
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) {
            throw error;
          }

          if (!data.user) {
            throw new Error("No user returned from Supabase");
          }

          // Get user profile from profiles table
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();

          if (profileError) {
            throw profileError;
          }

          // Set user data in state
          const user: User = {
            id: data.user.id,
            firstName: profile.first_name,
            lastName: profile.last_name,
            email: data.user.email || '',
            avatar: profile.avatar_url,
          };

          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      signup: async (firstName: string, lastName: string, email: string, password: string) => {
        set({ isLoading: true });

        try {
          // Sign up with Supabase
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
          });

          if (error) {
            throw error;
          }

          if (!data.user) {
            throw new Error("No user returned from Supabase");
          }

          // Create profile in profiles table
          const { error: profileError } = await supabase
            .from('profiles')
            .insert([
              {
                id: data.user.id,
                first_name: firstName,
                last_name: lastName,
                email: email,
                avatar_url: '/placeholder-user.jpg',
                created_at: new Date(),
              },
            ]);

          if (profileError) {
            throw profileError;
          }

          // Set user data in state
          const user: User = {
            id: data.user.id,
            firstName,
            lastName,
            email,
            avatar: '/placeholder-user.jpg',
          };

          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: async () => {
        try {
          // Sign out from Supabase
          await supabase.auth.signOut();
          set({ user: null, isAuthenticated: false });
        } catch (error) {
          console.error("Error during logout:", error);
          throw error;
        }
      },

      resetPassword: async (email: string) => {
        try {
          // Request password reset with Supabase
          const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/auth/reset-password`,
          });

          if (error) {
            throw error;
          }
        } catch (error) {
          console.error("Error during password reset:", error);
          throw error;
        }
      },
    }),
    {
      name: "trainiac-auth", // name of the item in localStorage
    }
  )
);