"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/auth"

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { resetPassword } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)
      
      // Use Supabase reset password functionality
      await resetPassword(email)

      setIsSubmitted(true)
      toast({
        title: "Password reset email sent",
        description: "Check your inbox for instructions to reset your password",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center">
        <div className="bg-green-50 text-green-700 p-4 rounded-lg mb-6">
          <h3 className="font-medium">Password reset email sent!</h3>
          <p className="text-sm mt-1">
            We've sent instructions to reset your password to {email}. Please check your inbox.
          </p>
        </div>
        <p className="text-sm text-gray-600">
          Didn't receive the email? Check your spam folder or{" "}
          <button className="text-primary font-medium hover:underline" onClick={() => setIsSubmitted(false)}>
            try again
          </button>
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10"
            required
          />
        </div>
      </div>

      <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
        {isLoading ? "Sending..." : "Reset Password"}
      </Button>
    </form>
  )
}