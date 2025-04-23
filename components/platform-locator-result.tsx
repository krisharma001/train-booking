"use client"

import { Button } from "@/components/ui/button"
import { TrainInfo } from "@/components/train-info"
import Link from "next/link"

const stationsList = [
  {
    code: "DLI",
    name: "Old Delhi",
    platform: "14",
    arrives: "-",
    halt: "-",
    departs: "06:25",
    day: "1",
  },
  {
    code: "DSA",
    name: "Delhi Shahdara",
    platform: "3",
    arrives: "06:36",
    halt: "2",
    departs: "06:38",
    day: "1",
  },
]

export function PlatformLocatorResult() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <TrainInfo />
          <div className="flex justify-end mt-4">
            <Link href="/running-status/12036" className="text-primary hover:underline">
              View Running Status
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Station</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Platform</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Arrives</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Halt</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Departs</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Day</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {stationsList.map((station, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      {index === 0 && <div className="w-3 h-3 rounded-full bg-orange-500 mr-3"></div>}
                      <div>
                        <div className="font-medium">
                          {station.code} - {station.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm">{station.platform}</td>
                  <td className="px-4 py-4 text-sm">{station.arrives}</td>
                  <td className="px-4 py-4 text-sm">{station.halt}</td>
                  <td className="px-4 py-4 text-sm">{station.departs}</td>
                  <td className="px-4 py-4 text-sm">{station.day}</td>
                  <td className="px-4 py-4">
                    <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/5">
                      <Link href={`/book/12036/${station.code}`}>BOOK</Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
