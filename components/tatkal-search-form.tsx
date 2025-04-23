"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { RefreshCw, Search } from "lucide-react"
import { StationSearch, type Station } from "@/components/station-search"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

export function TatkalSearchForm() {
  const router = useRouter()
  const [fromStation, setFromStation] = useState("New Delhi (NDLS)")
  const [toStation, setToStation] = useState("Asafpur (AFR)")
  const [fromStationObj, setFromStationObj] = useState<Station | undefined>()
  const [toStationObj, setToStationObj] = useState<Station | undefined>()
  const [date, setDate] = useState<Date>(new Date())
  const [selectedClass, setSelectedClass] = useState<string[]>(["SL"])
  const [quota, setQuota] = useState("TQ") // TQ for Tatkal
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

  const handleClassToggle = (value: string) => {
    setSelectedClass(
      selectedClass.includes(value) ? selectedClass.filter((item) => item !== value) : [...selectedClass, value],
    )
  }

  const handleFromStationChange = (value: string, station?: Station) => {
    setFromStation(value)
    setFromStationObj(station)
  }

  const handleToStationChange = (value: string, station?: Station) => {
    setToStation(value)
    setToStationObj(station)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    // Format the date for the URL
    const formattedDate = format(date, "yyyy-MM-dd")

    // Navigate to search results page with query parameters
    router.push(
      `/tatkal-reservation/results?from=${encodeURIComponent(fromStation)}&to=${encodeURIComponent(toStation)}&date=${encodeURIComponent(formattedDate)}&class=${selectedClass.join(",")}&quota=${quota}`,
    )
  }

  return (
    <form onSubmit={handleSearch} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_1fr] gap-4 items-end">
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
            className="flex items-center justify-center h-10 w-10 rounded-full"
            disabled={isSwapping}
          >
            <RefreshCw className="h-4 w-4" />
            <span className="sr-only">Swap</span>
          </Button>
        </div>

        <StationSearch label="To" value={toStation} onChange={handleToStationChange} required disabled={isSwapping} />

        <div className="space-y-2">
          <Label>Departure Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn("w-full justify-start text-left font-normal")}>
                {date ? format(date, "EEE, dd MMM yyyy") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={date} onSelect={(d) => d && setDate(d)} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="font-medium mb-2">Class</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <Checkbox
                id="class-sl"
                checked={selectedClass.includes("SL")}
                onCheckedChange={() => handleClassToggle("SL")}
              />
              <Label htmlFor="class-sl" className="ml-2">
                Sleeper (SL)
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="class-3a"
                checked={selectedClass.includes("3A")}
                onCheckedChange={() => handleClassToggle("3A")}
              />
              <Label htmlFor="class-3a" className="ml-2">
                AC 3 Tier (3A)
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="class-2a"
                checked={selectedClass.includes("2A")}
                onCheckedChange={() => handleClassToggle("2A")}
              />
              <Label htmlFor="class-2a" className="ml-2">
                AC 2 Tier (2A)
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="class-1a"
                checked={selectedClass.includes("1A")}
                onCheckedChange={() => handleClassToggle("1A")}
              />
              <Label htmlFor="class-1a" className="ml-2">
                AC First Class (1A)
              </Label>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Quota</h3>
          <RadioGroup value={quota} onValueChange={setQuota}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="TQ" id="tatkal" />
              <Label htmlFor="tatkal">Tatkal</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="PT" id="premium-tatkal" />
              <Label htmlFor="premium-tatkal">Premium Tatkal</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="GN" id="general" />
              <Label htmlFor="general">General</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="LD" id="ladies" />
              <Label htmlFor="ladies">Ladies</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <h3 className="font-medium mb-2">Departure from</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="border rounded-md p-2 text-center bg-gray-50">
              <div className="text-xs text-gray-600">00:00 - 06:00</div>
              <div className="text-sm">Early Morning</div>
            </div>
            <div className="border rounded-md p-2 text-center bg-gray-50">
              <div className="text-xs text-gray-600">06:00 - 12:00</div>
              <div className="text-sm">Morning</div>
            </div>
            <div className="border rounded-md p-2 text-center bg-gray-50">
              <div className="text-xs text-gray-600">12:00 - 18:00</div>
              <div className="text-sm">Mid Day</div>
            </div>
            <div className="border rounded-md p-2 text-center bg-gray-50">
              <div className="text-xs text-gray-600">18:00 - 24:00</div>
              <div className="text-sm">Night</div>
            </div>
          </div>
          <div className="mt-4 text-right">
            <Button variant="link" className="text-primary">
              MORE FILTERS
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" className="px-8 bg-primary hover:bg-primary/90 text-white">
          <Search className="mr-2 h-4 w-4" />
          SEARCH
        </Button>
      </div>
    </form>
  )
}
