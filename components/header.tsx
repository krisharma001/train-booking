"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { HelpCircle, Menu, X, User, Briefcase, Wallet, Users, LogOut, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/lib/auth"
import { useRouter, usePathname } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

export function Header() {
  const { user, isAuthenticated, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  // This effect ensures hydration is complete before rendering auth-dependent UI
  useEffect(() => {
    setMounted(true)
  }, [])

  // Redirect to login if accessing protected routes while not authenticated
  useEffect(() => {
    if (mounted && !isAuthenticated) {
      const protectedRoutes = ["/user/profile", "/my-trips", "/wallet", "/travellers"]
      if (protectedRoutes.some((route) => pathname?.startsWith(route))) {
        router.push("/auth/login")
        toast({
          title: "Authentication required",
          description: "Please log in to access this page",
          variant: "destructive",
        })
      }
    }
  }, [isAuthenticated, pathname, router, mounted])

  const handleLogout = () => {
    logout()
    router.push("/")
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    })
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <div className="text-2xl font-bold text-primary">Trainiac</div>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/customer-service">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                <HelpCircle className="h-5 w-5 mr-2" />
                Customer Service
              </Button>
            </Link>

            {mounted && isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <div className="relative rounded-full w-8 h-8 bg-gray-200 flex items-center justify-center">
                      {user?.avatar ? (
                        <Image
                          src={user.avatar || "/placeholder.svg"}
                          alt="User"
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      ) : (
                        <User className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                    <span>Hey {user?.firstName || "User"}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72 p-0">
                  <div className="p-4 border-b">
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-gray-500" />
                      <div>
                        <div className="font-medium">{user?.firstName || "User"}</div>
                        <Link href="/user/profile" className="text-sm text-gray-500 hover:text-primary">
                          My Profile
                        </Link>
                      </div>
                    </div>
                  </div>

                  <Link href="/my-trips">
                    <DropdownMenuItem className="p-4 cursor-pointer">
                      <Briefcase className="h-5 w-5 text-gray-500 mr-3" />
                      <div>
                        <div className="font-medium">My Trips</div>
                        <div className="text-sm text-gray-500">View & Manage bookings</div>
                      </div>
                    </DropdownMenuItem>
                  </Link>

                  <Link href="/wallet">
                    <DropdownMenuItem className="p-4 cursor-pointer">
                      <Wallet className="h-5 w-5 text-gray-500 mr-3" />
                      <div>
                        <div className="font-medium">Trainiac money</div>
                        <div className="text-sm text-gray-500">Your virtual currency</div>
                      </div>
                    </DropdownMenuItem>
                  </Link>

                  <Link href="/travellers">
                    <DropdownMenuItem className="p-4 cursor-pointer">
                      <Users className="h-5 w-5 text-gray-500 mr-3" />
                      <div>
                        <div className="font-medium">My Travellers</div>
                        <div className="text-sm text-gray-500">View all saved travellers</div>
                      </div>
                    </DropdownMenuItem>
                  </Link>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem className="p-4 cursor-pointer" onClick={handleLogout}>
                    <LogOut className="h-5 w-5 text-gray-500 mr-3" />
                    <div className="font-medium">Logout</div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth/login">
                <Button>Login</Button>
              </Link>
            )}
          </div>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between border-b pb-4">
                    <p className="font-semibold">Menu</p>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <X className="h-5 w-5" />
                      </Button>
                    </SheetTrigger>
                  </div>
                  <div className="flex flex-col gap-3 py-4">
                    <Link href="/customer-service">
                      <Button variant="ghost" className="justify-start w-full">
                        <HelpCircle className="h-5 w-5 mr-2" />
                        Customer Service
                      </Button>
                    </Link>
                    {mounted && isAuthenticated ? (
                      <>
                        <div className="flex items-center p-2">
                          <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center mr-2">
                            {user?.avatar ? (
                              <Image
                                src={user.avatar || "/placeholder.svg"}
                                alt="User"
                                width={36}
                                height={36}
                                className="rounded-full"
                              />
                            ) : (
                              <User className="h-5 w-5 text-gray-500" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium">Hey {user?.firstName || "User"}</p>
                            <p className="text-xs text-gray-500">{user?.email}</p>
                          </div>
                        </div>
                        <Link href="/user/profile">
                          <Button variant="ghost" className="justify-start w-full">
                            <User className="h-5 w-5 mr-2" />
                            My Profile
                          </Button>
                        </Link>
                        <Link href="/my-trips">
                          <Button variant="ghost" className="justify-start w-full">
                            <Briefcase className="h-5 w-5 mr-2" />
                            My Trips
                          </Button>
                        </Link>
                        <Link href="/wallet">
                          <Button variant="ghost" className="justify-start w-full">
                            <Wallet className="h-5 w-5 mr-2" />
                            Trainiac money
                          </Button>
                        </Link>
                        <Link href="/travellers">
                          <Button variant="ghost" className="justify-start w-full">
                            <Users className="h-5 w-5 mr-2" />
                            My Travellers
                          </Button>
                        </Link>
                        <Button variant="ghost" className="justify-start" onClick={handleLogout}>
                          <LogOut className="h-5 w-5 mr-2" />
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <Link href="/auth/login">
                        <Button className="w-full">Login</Button>
                      </Link>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
