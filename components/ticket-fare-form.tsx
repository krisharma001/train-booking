"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RefreshCw, Search } from "lucide-react"
import { StationSearch, type Station } from "@/components/station-search"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { getTrainFare, type TrainFareResult } from "@/lib/api-service"
import { useToast } from "@/components/ui/use-toast"

interface TicketFareFormProps {
  trainNumber?: string
}

export function TicketFareForm({ trainNumber }: TicketFareFormProps) {
  const [fromStation, setFromStation] = useState("")
  const [toStation, setToStation] = useState("")
  const [fromStationObj, setFromStationObj] = useState<Station | undefined>()
  const [toStationObj, setToStationObj] = useState<Station | undefined>()
  const [trainNum, setTrainNum] = useState(trainNumber || "")
  const [classType, setClassType] = useState("SL")
  const [quota, setQuota] = useState("GN")
  const [date, setDate] = useState<Date>(new Date())
  const [isLoading, setIsLoading] = useState(false)
  const [fareResult, setFareResult] = useState<TrainFareResult | null>(null)
  const [isSwapping, setIsSwapping] = useState(false)
  const { toast } = useToast()

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!trainNum || !fromStationObj?.code || !toStationObj?.code) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const formattedDate = format(date, "yyyy-MM-dd")
      const result = await getTrainFare(
        trainNum,
        fromStationObj.code,
        toStationObj.code,
        classType,
        quota,
        formattedDate,
      )

      if (result) {
        setFareResult(result)
      } else {
        toast({
          title: "Error",
          description: "Unable to fetch fare information. Please check your inputs and try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error fetching fare:", error)
      toast({
        title: "Error",
        description: "An error occurred while fetching fare information.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="train-number">Train Number</Label>
            <input
              id="train-number"
              value={trainNum}
              onChange={(e) => setTrainNum(e.target.value)}
              placeholder="Enter train number"
              className="w-full p-2 border rounded-md"
              required
              disabled={!!trainNumber}
            />
          </div>

          <div className="space-y-2">
            <Label>Journey Date</Label>
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

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-end">
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
            </Button>
          </div>

          <StationSearch label="To" value={toStation} onChange={handleToStationChange} required disabled={isSwapping} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="class-type">Class Type</Label>
            <Select value={classType} onValueChange={setClassType}>
              <SelectTrigger id="class-type">
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SL">Sleeper (SL)</SelectItem>
                <SelectItem value="3A">AC 3 Tier (3A)</SelectItem>
                <SelectItem value="2A">AC 2 Tier (2A)</SelectItem>
                <SelectItem value="1A">AC First Class (1A)</SelectItem>
                <SelectItem value="CC">Chair Car (CC)</SelectItem>
                <SelectItem value="2S">Second Sitting (2S)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quota">Quota</Label>
            <Select value={quota} onValueChange={setQuota}>
              <SelectTrigger id="quota">
                <SelectValue placeholder="Select quota" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GN">General (GN)</SelectItem>
                <SelectItem value="TQ">Tatkal (TQ)</SelectItem>
                <SelectItem value="LD">Ladies (LD)</SelectItem>
                <SelectItem value="SS">Senior Citizen (SS)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              "Calculating..."
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Check Fare
              </>
            )}
          </Button>
        </div>
      </form>

      {fareResult && (
        <div className="mt-6 border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Fare Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">Train</p>
              <p className="font-medium">
                {fareResult.trainNumber} - {fareResult.trainName}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Route</p>
              <p className="font-medium">
                {fareResult.source} to {fareResult.destination}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Class
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fare (₹)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {fareResult.fare.map((item, index) => (
                  <tr key={index} className={item.classType === classType ? "bg-blue-50" : ""}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{item.classType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">₹{item.fare}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
