"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export function VandeBharatTrainsList() {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <Link href="/trains/22962" className="text-primary hover:underline text-lg font-semibold">
            22962 Vande Bharat Exp
          </Link>
          <div className="text-sm text-gray-600">
            Runs on: <span className="font-medium">S M T W T F S</span>
            <Link href="/running-status/22962" className="ml-2 text-primary hover:underline">
              ( 22962 Running Status )
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center mt-4">
          <div>
            <div className="text-gray-600">ADI</div>
            <div className="text-2xl font-semibold">06:10</div>
          </div>

          <div className="flex flex-col items-center">
            <div className="text-sm text-gray-600">5hr 25min</div>
            <div className="relative w-32 h-0.5 bg-gray-300 my-2">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-500"></div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-500"></div>
            </div>
            <div className="text-sm text-gray-600">491 km</div>
          </div>

          <div>
            <div className="text-gray-600">MMCT</div>
            <div className="text-2xl font-semibold">11:35</div>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Button variant="outline" className="text-primary border-primary">
            SHOW AVAILABILITY
          </Button>
        </div>
      </div>
    </div>
  )
}
