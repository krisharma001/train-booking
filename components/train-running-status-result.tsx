"use client"

import { useState } from "react"
import { AlertTriangle, Clock, MapPin, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// This would typically come from an API
const mockTrainData = {
  trainNumber: "12302",
  trainName: "Howrah Rajdhani",
  fromStation: "New Delhi (NDLS)",
  toStation: "Howrah Junction (HWH)",
  scheduledDeparture: "16:25",
  actualDeparture: "16:40",
  delay: "15 min",
  status: "Running",
  lastUpdated: "10 minutes ago",
  journeyDate: "29 Mar 2024",
  progressPercent: 42,
  nextStation: "Gaya Junction (GAYA)",
  expectedArrival: "03:15",
  stations: [
    {
      name: "New Delhi (NDLS)",
      scheduledArrival: "-",
      scheduledDeparture: "16:25",
      actualArrival: "-",
      actualDeparture: "16:40",
      delay: "15 min",
      distance: "0 km",
      status: "DEPARTED",
      platform: "9",
    },
    {
      name: "Kanpur Central (CNB)",
      scheduledArrival: "21:05",
      scheduledDeparture: "21:10",
      actualArrival: "21:25",
      actualDeparture: "21:30",
      delay: "20 min",
      distance: "440 km",
      status: "DEPARTED",
      platform: "1",
    },
    {
      name: "Allahabad Junction (ALD)",
      scheduledArrival: "23:30",
      scheduledDeparture: "23:35",
      actualArrival: "23:45",
      actualDeparture: "23:50",
      delay: "15 min",
      distance: "642 km",
      status: "DEPARTED",
      platform: "5",
    },
    {
      name: "Gaya Junction (GAYA)",
      scheduledArrival: "03:00",
      scheduledDeparture: "03:05",
      actualArrival: "Expected 03:15",
      actualDeparture: "Expected 03:20",
      delay: "15 min",
      distance: "997 km",
      status: "UPCOMING",
      platform: "3",
    },
    {
      name: "Dhanbad Junction (DHN)",
      scheduledArrival: "05:05",
      scheduledDeparture: "05:10",
      actualArrival: "-",
      actualDeparture: "-",
      delay: "-",
      distance: "1158 km",
      status: "NOT STARTED",
      platform: "-",
    },
    {
      name: "Howrah Junction (HWH)",
      scheduledArrival: "09:55",
      scheduledDeparture: "-",
      actualArrival: "-",
      actualDeparture: "-",
      delay: "-",
      distance: "1451 km",
      status: "NOT STARTED",
      platform: "-",
    },
  ],
}

export function TrainRunningStatusResult() {
  const [data] = useState(mockTrainData)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-blue-50">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg font-semibold">
                {data.trainNumber} - {data.trainName}
              </CardTitle>
              <p className="text-sm text-gray-600">{data.journeyDate}</p>
            </div>
            <div className="flex items-center">
              <Badge variant={data.status === "Running" ? "success" : "outline"} className="mr-2">
                {data.status}
              </Badge>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex flex-col items-center mr-4">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="w-0.5 h-16 bg-gray-300"></div>
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
              </div>

              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-green-500 mr-1" />
                    <h4 className="font-medium">{data.fromStation}</h4>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 ml-5">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>Scheduled: {data.scheduledDeparture}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 ml-5">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>Actual: {data.actualDeparture}</span>
                    <span className="ml-2 text-orange-600">Delayed by {data.delay}</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-red-500 mr-1" />
                    <h4 className="font-medium">{data.toStation}</h4>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Journey Progress</p>
              <Progress value={data.progressPercent} className="h-2" />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <p>Departed from {data.fromStation}</p>
                <p>{data.progressPercent}% completed</p>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
              <div>
                <h4 className="font-medium">Next Station: {data.nextStation}</h4>
                <p className="text-sm">Expected arrival at {data.expectedArrival}</p>
                <p className="text-xs text-gray-600 mt-1">Last updated: {data.lastUpdated}</p>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Station-wise Status</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-2 px-3 text-left">Station</th>
                      <th className="py-2 px-3 text-left">Scheduled</th>
                      <th className="py-2 px-3 text-left">Actual</th>
                      <th className="py-2 px-3 text-left">Delay</th>
                      <th className="py-2 px-3 text-left">Platform</th>
                      <th className="py-2 px-3 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.stations.map((station, index) => (
                      <tr key={index} className="border-t">
                        <td className="py-3 px-3">
                          <div className="font-medium">{station.name}</div>
                          <div className="text-xs text-gray-500">{station.distance}</div>
                        </td>
                        <td className="py-3 px-3">
                          <div>{station.scheduledArrival}</div>
                          <div>{station.scheduledDeparture}</div>
                        </td>
                        <td className="py-3 px-3">
                          <div>{station.actualArrival}</div>
                          <div>{station.actualDeparture}</div>
                        </td>
                        <td className="py-3 px-3">{station.delay}</td>
                        <td className="py-3 px-3">{station.platform}</td>
                        <td className="py-3 px-3">
                          <Badge
                            variant={
                              station.status === "DEPARTED"
                                ? "success"
                                : station.status === "UPCOMING"
                                  ? "warning"
                                  : "outline"
                            }
                          >
                            {station.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
