"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { StationSearch } from "@/components/station-search"
import type { Station } from "@/lib/stations"
import { useRouter } from "next/navigation"

export function SearchByStationForm() {
  const router = useRouter()
  const [stationName, setStationName] = useState("")
  const [stationObj, setStationObj] = useState<Station | undefined>()

  const handleStationChange = (value: string, station?: Station) => {
    setStationName(value)
    setStationObj(station)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (stationObj?.code) {
      router.push(`/search-by-station/results?station=${encodeURIComponent(stationObj.code)}`)
    }
  }

  return (
    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <StationSearch
          label="STATION NAME/CODE"
          value={stationName}
          onChange={handleStationChange}
          placeholder="Enter the station name or code"
          required
        />
      </div>
      <Button type="submit" className="h-12 px-8 bg-primary hover:bg-primary/90 text-white self-end">
        SEARCH
      </Button>
    </form>
  )
}
