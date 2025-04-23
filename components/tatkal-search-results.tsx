"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function TatkalSearchResults() {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <Link href="/trains/12036" className="text-primary hover:underline text-lg font-semibold">
            12036 PURANGIRI JANST
          </Link>
          <div className="text-sm text-gray-600">
            Runs on: <span className="font-medium">S M T W T F S</span>
            <Link href="/running-status/12036" className="ml-2 text-primary hover:underline">
              (12036 Running Status)
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center mt-4">
          <div>
            <div className="text-gray-600">DLI</div>
            <div className="text-2xl font-semibold">06:25</div>
            <div className="text-sm text-gray-600">Tue, 1 Apr</div>
          </div>

          <div className="flex flex-col items-center">
            <div className="text-sm text-gray-600">4hr 48min</div>
            <div className="relative w-32 h-0.5 bg-gray-300 my-2">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-500"></div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-500"></div>
            </div>
            <div className="text-sm text-gray-600">491 km</div>
          </div>

          <div>
            <div className="text-gray-600">AFR</div>
            <div className="text-2xl font-semibold">11:13</div>
            <div className="text-sm text-gray-600">Tue, 1 Apr</div>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Button variant="outline" className="text-primary border-primary">
            SHOW AVAILABILITY
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 divide-x">
        <div className="p-4">
          <div className="text-center font-medium">CC</div>
          <div className="text-center text-gray-600">₹440</div>
          <div className="text-center text-green-600 font-medium mt-1">AVL 35</div>
        </div>
        <div className="p-4">
          <div className="text-center font-medium">2S</div>
          <div className="text-center text-gray-600">₹135</div>
          <div className="text-center text-red-600 font-medium mt-1">WL 35</div>
        </div>
        <div className="p-4 bg-gray-50">
          <div className="text-center font-medium">
            <Badge className="bg-green-600">Tatkal</Badge>
            <span className="ml-1">CC</span>
          </div>
          <div className="text-center text-gray-600">-</div>
          <div className="text-center text-gray-600 font-medium mt-1">NOT AVL</div>
        </div>
      </div>
    </div>
  )
}
