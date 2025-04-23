"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

const trainsList = [
  {
    number: "12035",
    name: "PURNAGIRI JANST",
    arrives: "21:07",
    departs: "21:09",
    duration: "2 mins",
    days: "SMTWTFS",
  },
  {
    number: "12036",
    name: "PURANGIRI JANST",
    arrives: "16:43",
    departs: "16:45",
    duration: "2 mins",
    days: "SMTWTFS",
  },
  {
    number: "64177",
    name: "BAREILLY - MORADABAD MEMU",
    arrives: "21:50",
    departs: "21:52",
    duration: "2 mins",
    days: "SMTWTFS",
  },
]

export function StationTrainsList() {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Train Name/No.</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Arrives</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Departs</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Duration</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Day of Run</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {trainsList.map((train, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-4">
                  <Link href={`/trains/${train.number}`} className="text-primary hover:underline font-medium">
                    {train.number} {train.name}
                  </Link>
                </td>
                <td className="px-4 py-4 text-sm">{train.arrives}</td>
                <td className="px-4 py-4 text-sm">{train.departs}</td>
                <td className="px-4 py-4 text-sm">{train.duration}</td>
                <td className="px-4 py-4 text-sm">{train.days}</td>
                <td className="px-4 py-4">
                  <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/5">
                    <Link href={`/book/${train.number}`}>Book Now</Link>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
