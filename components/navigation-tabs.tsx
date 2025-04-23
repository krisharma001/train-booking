"use client"

import type React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

type Tab = {
  id: string
  label: string
  icon: React.ReactNode
  href: string
  badge?: string
}

const tabs: Tab[] = []

interface NavigationTabsProps {
  activeTab: string
}

export function NavigationTabs({ activeTab }: NavigationTabsProps) {
  return (
    <div className="flex overflow-x-auto py-4 no-scrollbar">
      <div className="inline-flex space-x-4">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            href={tab.href}
            className={cn(
              "flex items-center px-4 py-2 rounded-lg transition-colors relative",
              activeTab === tab.id ? "bg-primary text-white" : "bg-white text-gray-700 hover:bg-gray-100",
            )}
          >
            {tab.icon}
            <span className="ml-2 font-medium">{tab.label}</span>
            {tab.badge && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                {tab.badge}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}
