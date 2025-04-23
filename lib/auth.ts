// This is a simple client-side auth implementation
// In a real app, you would use a proper auth solution like NextAuth.js or Auth.js

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  avatar?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (firstName: string, lastName: string, email: string, password: string) => Promise<void>
  logout: () => void
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true })

        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000))

          // For demo purposes, we'll just check if the email contains "test"
          if (!email.includes("@")) {
            throw new Error("Invalid email format")
          }

          // Mock successful login
          const user: User = {
            id: "1",
            firstName: "Krish",
            lastName: "Sharma",
            email: email,
            avatar: "/placeholder-user.jpg",
          }

          set({ user, isAuthenticated: true, isLoading: false })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      signup: async (firstName: string, lastName: string, email: string, password: string) => {
        set({ isLoading: true })

        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000))

          // For demo purposes, we'll just check if the email contains "@"
          if (!email.includes("@")) {
            throw new Error("Invalid email format")
          }

          // Mock successful signup
          const user: User = {
            id: "1",
            firstName,
            lastName,
            email,
            avatar: "/placeholder-user.jpg",
          }

          set({ user, isAuthenticated: true, isLoading: false })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false })
      },
    }),
    {
      name: "trainiac-auth", // name of the item in localStorage
    },
  ),
)
