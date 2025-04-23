"use client"

import type React from "react"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Train, FileText, Activity, Calendar, Clock, Map } from "lucide-react"

type Tab = {
  id: string
  label: string
  icon: React.ReactNode
  href: string
}

const tabs: Tab[] = [
  {
    id: "irctc-booking",
    label: "IRCTC Train Booking",
    icon: <Train className="h-5 w-5" />,
    href: "/",
  },
  {
    id: "pnr-status",
    label: "PNR Status",
    icon: <FileText className="h-5 w-5" />,
    href: "/pnr-status",
  },
  {
    id: "running-status",
    label: "Running Status",
    icon: <Activity className="h-5 w-5" />,
    href: "/running-status",
  },
  {
    id: "seat-availability",
    label: "Seat Availability",
    icon: <Calendar className="h-5 w-5" />,
    href: "/seat-availability",
  },
  {
    id: "tatkal-booking",
    label: "Tatkal Ticket Booking",
    icon: <Clock className="h-5 w-5" />,
    href: "/tatkal-reservation",
  },
  {
    id: "platform-locator",
    label: "Platform Locator",
    icon: <Map className="h-5 w-5" />,
    href: "/platform-locator",
  },
]

interface SeatAvailabilityTabsProps {
  activeTab: string
}

export function SeatAvailabilityTabs({ activeTab }: SeatAvailabilityTabsProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
      <div className="flex overflow-x-auto">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            href={tab.href}
            className={cn(
              "flex items-center px-4 py-3 whitespace-nowrap transition-colors border-b-2",
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50",
            )}
          >
            {tab.icon}
            <span className="ml-2 font-medium">{tab.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
