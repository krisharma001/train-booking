"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

const recentSearches = [
  {
    trainNumber: "12036",
    trainName: "Purangiri Janst",
    from: "New Delhi",
    fromCode: "DLI",
    to: "Tanakpur",
    toCode: "TPU",
  },
  {
    trainNumber: "19037",
    trainName: "Avadh Exp",
    from: "Bandra Terminus",
    fromCode: "BDTS",
    to: "Baraunti",
    toCode: "BAU",
  },
]

export function RecentSearches() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Recent Searches</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {recentSearches.map((search, index) => (
          <Link
            key={index}
            href={`/seat-availability/${search.trainNumber}`}
            className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="font-medium text-primary">
              {search.trainNumber} {search.trainName}
            </div>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <span>
                {search.from} ({search.fromCode})
              </span>
              <ArrowRight className="h-3 w-3 mx-2" />
              <span>
                {search.to} ({search.toCode})
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
