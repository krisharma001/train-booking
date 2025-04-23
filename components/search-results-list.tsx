"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface SearchResultsListProps {
  trains: any[]
  date: string
  from: string
  to: string
}

export function SearchResultsList({ trains, date, from, to }: SearchResultsListProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">{trains.length} trains found</div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            Departure ↓
          </Button>
          <Button variant="outline" size="sm">
            Duration ↓
          </Button>
        </div>
      </div>

      {trains.map((train, index) => {
        // Get source and destination from the route
        const sourceStation = train.route[0]
        const destinationStation = train.route[train.route.length - 1]

        // Calculate duration in hours and minutes
        const departureTime = sourceStation.departureTime
        const arrivalTime = destinationStation.arrivalTime

        // For demo purposes, let's create a simple duration
        const durationHours = Math.floor(Math.random() * 10) + 2 // Random duration between 2-12 hours
        const durationMinutes = Math.floor(Math.random() * 60)

        // Calculate distance
        const distance = destinationStation.distance - sourceStation.distance

        return (
          <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <Link
                  href={`/trains/${train.trainNumber}`}
                  className="text-primary hover:underline text-lg font-semibold"
                >
                  {train.trainNumber} {train.trainName}
                </Link>
                <div className="text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{formatDistanceToNow(new Date(), { addSuffix: true })}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center mt-4">
                <div>
                  <div className="text-gray-600">{sourceStation.stationCode}</div>
                  <div className="text-2xl font-semibold">{departureTime}</div>
                  <div className="text-sm text-gray-600">{sourceStation.stationName}</div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="text-sm text-gray-600">
                    {durationHours}h {durationMinutes}m
                  </div>
                  <div className="relative w-32 h-0.5 bg-gray-300 my-2">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-500"></div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-500"></div>
                  </div>
                  <div className="text-sm text-gray-600">{distance} km</div>
                </div>

                <div>
                  <div className="text-gray-600">{destinationStation.stationCode}</div>
                  <div className="text-2xl font-semibold">{arrivalTime}</div>
                  <div className="text-sm text-gray-600">{destinationStation.stationName}</div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center">
                  <Badge variant="outline" className="mr-2">
                    {train.runningDays.sunday ? "S" : "-"}
                    {train.runningDays.monday ? "M" : "-"}
                    {train.runningDays.tuesday ? "T" : "-"}
                    {train.runningDays.wednesday ? "W" : "-"}
                    {train.runningDays.thursday ? "T" : "-"}
                    {train.runningDays.friday ? "F" : "-"}
                    {train.runningDays.saturday ? "S" : "-"}
                  </Badge>
                  <div className="text-sm text-gray-600">
                    <Clock className="h-4 w-4 inline mr-1" />
                    On time
                  </div>
                </div>
                <Button variant="outline" asChild>
                  <Link
                    href={`/seat-availability/${train.trainNumber}?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${encodeURIComponent(date)}`}
                  >
                    Check Availability
                  </Link>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-3 divide-x">
              {train.classes.slice(0, 3).map((classType: string, idx: number) => (
                <div key={idx} className="p-4 text-center">
                  <div className="font-medium">{classType}</div>
                  <div className="text-gray-600">₹{Math.floor(Math.random() * 1000) + 500}</div>
                  <div className="text-green-600 font-medium mt-1">
                    {Math.random() > 0.3
                      ? `AVL ${Math.floor(Math.random() * 50)}`
                      : `WL ${Math.floor(Math.random() * 20)}`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
