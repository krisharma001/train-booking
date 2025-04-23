import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Check if the path is a protected route
  const protectedRoutes = ["/user/profile", "/my-trips", "/wallet", "/travellers"]
  const isProtectedRoute = protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))

  // If it's a protected route, check for authentication
  if (isProtectedRoute) {
    // In a real app, you would check for a session token or JWT
    // For this demo, we'll just check for a cookie
    const authCookie = request.cookies.get("trainiac-auth")

    // If no auth cookie is found, redirect to login
    if (!authCookie) {
      const loginUrl = new URL("/auth/login", request.url)
      loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/user/:path*", "/my-trips/:path*", "/wallet/:path*", "/travellers/:path*"],
}
