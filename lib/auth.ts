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
            console.error("Login error:", error);
            throw error;
          }

          if (!data.user) {
            console.error("No user returned from Supabase");
            throw new Error("No user returned from Supabase");
          }

          // Get user profile from users table
          const { data: profile, error: profileError } = await supabase
            .from('users')
            .select('*')
            .eq('id', data.user.id)
            .single();

          if (profileError) {
            console.error("Profile fetch error:", profileError);
            
            // If the user exists in auth but not in the users table,
            // we can create a profile for them
            if (profileError.code === 'PGRST116') { // No rows returned
              const { error: insertError } = await supabase
                .from('users')
                .insert([
                  {
                    id: data.user.id,
                    first_name: email.split('@')[0], // Use part of email as default name
                    last_name: '',
                    email: email,
                  },
                ]);
              
              if (insertError) {
                console.error("Profile creation error:", insertError);
                throw insertError;
              }
              
              // Set user data with default values
              const user: User = {
                id: data.user.id,
                firstName: email.split('@')[0],
                lastName: '',
                email: email,
              };
              
              set({ user, isAuthenticated: true, isLoading: false });
              return;
            }
            
            throw profileError;
          }

          // Set user data in state
          const user: User = {
            id: data.user.id,
            firstName: profile.first_name,
            lastName: profile.last_name,
            email: data.user.email || '',
            avatar: profile.avatar,
          };

          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          console.error("Login process error:", error);
          set({ isLoading: false });
          throw error;
        }
      },

      signup: async (firstName: string, lastName: string, email: string, password: string) => {
        set({ isLoading: true });

        try {
          console.log("Starting signup process...");
          
          // Check if email already exists
          const { data: existingUsers, error: checkError } = await supabase
            .from('users')
            .select('id')
            .eq('email', email);
            
          if (checkError) {
            console.error("Error checking for existing user:", checkError);
            // Continue anyway as the auth check will catch duplicate emails
          } else if (existingUsers && existingUsers.length > 0) {
            throw new Error("This email is already registered");
          }
          
          // Sign up with Supabase
          console.log("Creating auth user...");
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              // Set user metadata that we can access later if needed
              data: {
                first_name: firstName,
                last_name: lastName
              }
            }
          });

          if (error) {
            console.error("Signup auth error:", error);
            throw error;
          }

          if (!data.user) {
            console.error("No user returned from Supabase signup");
            throw new Error("No user returned from Supabase");
          }
          
          console.log("Auth user created successfully, creating profile...");

          // Create profile in users table
          const { error: profileError } = await supabase
            .from('users')
            .insert([
              {
                id: data.user.id,
                first_name: firstName,
                last_name: lastName,
                email: email,
              },
            ]);

          if (profileError) {
            console.error("Profile creation error:", profileError);
            
            // If this fails, we should clean up the auth user
            try {
              // Note: This might require admin privileges and may not work
              // with normal client credentials
              await supabase.auth.admin.deleteUser(data.user.id);
            } catch (cleanupError) {
              console.error("Failed to clean up auth user after profile creation error:", cleanupError);
            }
            
            throw profileError;
          }
          
          console.log("Profile created successfully");

          // Set user data in state
          const user: User = {
            id: data.user.id,
            firstName,
            lastName,
            email,
          };

          set({ user, isAuthenticated: true, isLoading: false });
          console.log("Signup process completed successfully");
        } catch (error) {
          console.error("Signup process error:", error);
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
          // Check if we're in a browser environment
          const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
          
          // Request password reset with Supabase
          const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${origin}/auth/reset-password`,
          });

          if (error) {
            console.error("Password reset error:", error);
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
      // Only persist certain parts of the state
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);