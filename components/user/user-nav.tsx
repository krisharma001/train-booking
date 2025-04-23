"use client"
import Link from "next/link"
import Image from "next/image"
import { User, Briefcase, CreditCard, Settings, LogOut } from "lucide-react"

interface UserNavProps {
  activeItem: string
}

export function UserNav({ activeItem }: UserNavProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6 flex items-center border-b">
        <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200 mr-4">
          <Image src="/placeholder-user.jpg" alt="Profile" fill className="object-cover" />
        </div>
        <div>
          <h2 className="font-bold text-lg">Krish Sharma</h2>
          <p className="text-sm text-gray-600">krish.sharma@example.com</p>
        </div>
      </div>

      <div className="p-0">
        <Link
          href="/user/profile"
          className={`flex items-center px-6 py-3 hover:bg-gray-50 ${activeItem === "profile" ? "bg-orange-50 text-orange-600" : ""}`}
        >
          <User className="h-5 w-5 mr-3" />
          <span>Profile</span>
        </Link>

        <Link
          href="/my-trips"
          className={`flex items-center px-6 py-3 hover:bg-gray-50 ${activeItem === "trips" ? "bg-orange-50 text-orange-600" : ""}`}
        >
          <Briefcase className="h-5 w-5 mr-3" />
          <span>My Trips</span>
        </Link>

        <Link
          href="/wallet"
          className={`flex items-center px-6 py-3 hover:bg-gray-50 ${activeItem === "wallet" ? "bg-orange-50 text-orange-600" : ""}`}
        >
          <CreditCard className="h-5 w-5 mr-3" />
          <span>Wallet</span>
        </Link>

        <Link
          href="/user/settings"
          className={`flex items-center px-6 py-3 hover:bg-gray-50 ${activeItem === "settings" ? "bg-orange-50 text-orange-600" : ""}`}
        >
          <Settings className="h-5 w-5 mr-3" />
          <span>Settings</span>
        </Link>

        <button className="flex items-center px-6 py-3 hover:bg-gray-50 w-full text-left">
          <LogOut className="h-5 w-5 mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}
