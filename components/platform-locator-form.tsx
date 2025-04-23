"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Train } from "lucide-react"
import { StationSearch } from "@/components/station-search"
import type { Station } from "@/lib/stations"

export function PlatformLocatorForm() {
  const [trainNumber, setTrainNumber] = useState("")
  const [station, setStation] = useState("")

  const handleStationChange = (value: string, station?: Station) => {
    setStation(value)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4">
      <div>
        <div className="text-xs font-medium uppercase text-gray-500 mb-1">Train name or number</div>
        <div className="relative">
          <Train className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <Input
            value={trainNumber}
            onChange={(e) => setTrainNumber(e.target.value)}
            placeholder="Enter the train name or number"
            className="h-12 pl-9"
          />
        </div>
      </div>

      <div>
        <div className="text-xs font-medium uppercase text-gray-500 mb-1">Station (optional)</div>
        <StationSearch label="" value={station} onChange={handleStationChange} placeholder="Select station" />
      </div>

      <Button className="h-12 px-8 bg-primary hover:bg-primary/90 text-white self-end">SEARCH PLATFORM</Button>
    </div>
  )
}
