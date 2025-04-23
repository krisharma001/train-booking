"use client"

import Link from "next/link"
import Image from "next/image"
import { BarChart3, Users, HeadphonesIcon, Wallet, ShieldCheck, FileText, LogOut, ChevronRight } from "lucide-react"

export function ProfileContent() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="bg-gradient-to-r from-purple-900 to-red-600 rounded-lg p-6 text-white mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Krish Sharma</h1>
            <Link href="/profile/edit" className="text-sm flex items-center mt-2 hover:underline">
              VIEW PROFILE <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="relative w-20 h-20 bg-white rounded-full overflow-hidden">
            <Image src="/placeholder-user.jpg" alt="Profile" fill className="object-cover" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Link href="/fare-alerts" className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
          <div className="flex items-center">
            <BarChart3 className="h-5 w-5 text-orange-500 mr-3" />
            <span>Fare alerts</span>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </Link>

        <Link href="/travellers" className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
          <div className="flex items-center">
            <Users className="h-5 w-5 text-orange-500 mr-3" />
            <span>Travellers</span>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </Link>

        <Link href="/customer-service" className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
          <div className="flex items-center">
            <HeadphonesIcon className="h-5 w-5 text-orange-500 mr-3" />
            <span>Customer Service</span>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </Link>

        <Link href="/wallet" className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
          <div className="flex items-center">
            <Wallet className="h-5 w-5 text-orange-500 mr-3" />
            <span>Ixigo Money</span>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </Link>

        <Link href="/privacy-policy" className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
          <div className="flex items-center">
            <ShieldCheck className="h-5 w-5 text-orange-500 mr-3" />
            <span>Privacy policy</span>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </Link>

        <Link href="/terms" className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
          <div className="flex items-center">
            <FileText className="h-5 w-5 text-orange-500 mr-3" />
            <span>Terms of use</span>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </Link>

        <button className="flex items-center w-full justify-between p-4 bg-white rounded-lg shadow-sm">
          <div className="flex items-center">
            <LogOut className="h-5 w-5 text-orange-500 mr-3" />
            <span>Logout</span>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </button>
      </div>
    </div>
  )
}
