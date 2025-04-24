"use client"

import { createContext, useContext, useEffect } from "react"
import { useAuth, User } from "@/lib/auth"
import { supabase } from "@/lib/supabase"

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading } = useAuth()
  
  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_OUT") {
          // Handle sign out
          useAuth.getState().logout()
        } else if (event === "SIGNED_IN" && session) {
          // If signed in but no user in state, get user data
          if (!useAuth.getState().user) {
            try {
              // Get profile from database
              const { data: profile } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", session.user.id)
                .single()
              
              if (profile) {
                const user: User = {
                  id: session.user.id,
                  firstName: profile.first_name,
                  lastName: profile.last_name,
                  email: session.user.email || "",
                  avatar: profile.avatar_url,
                }
                useAuth.setState({ user, isAuthenticated: true })
              }
            } catch (error) {
              console.error("Error fetching user profile:", error)
            }
          }
        }
      }
    )

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider")
  }
  return context
}