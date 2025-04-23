"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { StationSearch } from "@/components/station-search"
import type { Station } from "@/lib/stations"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export function VandeBharatSearchForm() {
  const [fromStation, setFromStation] = useState("Delhi - All stations(NDLS)")
  const [toStation, setToStation] = useState("Asafpur (AFR)")
  const [fromStationObj, setFromStationObj] = useState<Station | undefined>({
    name: "Delhi - All stations",
    code: "NDLS",
    state: "Delhi",
  })
  const [toStationObj, setToStationObj] = useState<Station | undefined>({
    name: "Asafpur",
    code: "AFR",
    state: "Uttar Pradesh",
  })
  const [date, setDate] = useState<Date>(new Date())
  const [isSwapping, setIsSwapping] = useState(false)

  const handleSwapStations = () => {
    setIsSwapping(true)

    // Swap station names
    const tempFromStation = fromStation
    const tempToStation = toStation
    setFromStation(tempToStation)
    setToStation(tempFromStation)

    // Swap station objects
    const tempFromObj = fromStationObj
    const tempToObj = toStationObj
    setFromStationObj(tempToObj)
    setToStationObj(tempFromObj)

    setTimeout(() => setIsSwapping(false), 300)
  }

  const handleFromStationChange = (value: string, station?: Station) => {
    setFromStation(value)
    setFromStationObj(station)
  }

  const handleToStationChange = (value: string, station?: Station) => {
    setToStation(value)
    setToStationObj(station)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_1fr_auto] gap-4 items-end">
      <StationSearch
        label="From"
        value={fromStation}
        onChange={handleFromStationChange}
        required
        disabled={isSwapping}
      />

      <div className="flex justify-center items-end">
        <Button
          type="button"
          onClick={handleSwapStations}
          variant="outline"
          className="flex items-center justify-center h-12 mb-2"
          disabled={isSwapping}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Swap
        </Button>
      </div>

      <StationSearch label="To" value={toStation} onChange={handleToStationChange} required disabled={isSwapping} />

      <div className="space-y-1">
        <div className="text-xs font-medium uppercase text-gray-500">Departure Date</div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className={cn("w-full justify-start text-left font-normal")}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-500 mr-2"
              >
                <rect
                  x="3"
                  y="4"
                  width="18"
                  height="18"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {date ? format(date, "dd MMM, EEE") : "Select date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={date} onSelect={(d) => d && setDate(d)} initialFocus />
          </PopoverContent>
        </Popover>
      </div>

      <Button className="px-8 bg-primary hover:bg-primary/90 text-white">SEARCH</Button>
    </div>
  )
}
