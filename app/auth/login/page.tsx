import { LoginForm } from "@/components/auth/login-form"
import { Header } from "@/components/header"
import Image from "next/image"
import Link from "next/link"

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
          <div className="w-full max-w-md">
            <div className="bg-white shadow-md rounded-xl p-8">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Welcome back to Trainiac</h1>
                <p className="text-gray-600 mt-2">Log in to access your account</p>
              </div>

              <LoginForm />

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link href="/auth/signup" className="text-primary font-medium hover:underline">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <div className="hidden md:block w-full max-w-md">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">Experience seamless train travel with Trainiac</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 bg-white rounded-full flex items-center justify-center text-orange-500 mr-3">
                    ✓
                  </div>
                  <p>Book train tickets with zero payment gateway charges</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 bg-white rounded-full flex items-center justify-center text-orange-500 mr-3">
                    ✓
                  </div>
                  <p>Get instant refunds and 24x7 customer support</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 bg-white rounded-full flex items-center justify-center text-orange-500 mr-3">
                    ✓
                  </div>
                  <p>Check PNR status and live train running information</p>
                </li>
              </ul>

              <div className="mt-8 relative h-48">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Train travel illustration"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
