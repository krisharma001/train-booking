"use client"

import { useState } from "react"
import { Calendar, Clock, Download, MapPin, Share2, Train, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// This would typically come from an API
const mockPnrData = {
  pnrNumber: "1234567890",
  trainNumber: "12345",
  trainName: "Rajdhani Express",
  fromStation: "New Delhi (NDLS)",
  toStation: "Mumbai Central (MMCT)",
  boardingPoint: "New Delhi (NDLS)",
  reservationUpTo: "Mumbai Central (MMCT)",
  departureDate: "29 Mar 2024",
  departureTime: "16:25",
  arrivalDate: "30 Mar 2024",
  arrivalTime: "08:15",
  class: "3A",
  chartStatus: "PREPARED",
  passengers: [
    {
      number: 1,
      bookingStatus: "RAC 21",
      currentStatus: "CNF B1/62",
    },
    {
      number: 2,
      bookingStatus: "WL 45",
      currentStatus: "CNF B1/63",
    },
  ],
}

export function PnrStatusResult() {
  const [data] = useState(mockPnrData)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-green-50">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold">PNR: {data.pnrNumber}</CardTitle>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
              <Button variant="ghost" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center mb-4">
                <Train className="h-5 w-5 text-gray-500 mr-2" />
                <div>
                  <h3 className="font-semibold">
                    {data.trainNumber} - {data.trainName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Class: {data.class} | Chart: {data.chartStatus}
                  </p>
                </div>
              </div>

              <div className="flex items-start mb-6">
                <div className="flex flex-col items-center mr-4">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="w-0.5 h-16 bg-gray-300"></div>
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                </div>

                <div className="flex-1 grid grid-cols-1 gap-4">
                  <div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-green-500 mr-1" />
                      <h4 className="font-medium">{data.fromStation}</h4>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 ml-5">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{data.departureDate}</span>
                      <Clock className="h-3 w-3 ml-2 mr-1" />
                      <span>{data.departureTime}</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-red-500 mr-1" />
                      <h4 className="font-medium">{data.toStation}</h4>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 ml-5">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{data.arrivalDate}</span>
                      <Clock className="h-3 w-3 ml-2 mr-1" />
                      <span>{data.arrivalTime}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Boarding Point</p>
                  <p className="font-medium">{data.boardingPoint}</p>
                </div>
                <div>
                  <p className="text-gray-600">Reservation Up To</p>
                  <p className="font-medium">{data.reservationUpTo}</p>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center mb-4">
                <User className="h-5 w-5 text-gray-500 mr-2" />
                <h3 className="font-semibold">Passenger Status</h3>
              </div>

              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-2 px-3 text-left">Passenger</th>
                    <th className="py-2 px-3 text-left">Booking Status</th>
                    <th className="py-2 px-3 text-left">Current Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.passengers.map((passenger, index) => (
                    <tr key={index} className="border-t">
                      <td className="py-3 px-3">Passenger {passenger.number}</td>
                      <td className="py-3 px-3">{passenger.bookingStatus}</td>
                      <td className="py-3 px-3">
                        <Badge variant={passenger.currentStatus.startsWith("CNF") ? "success" : "warning"}>
                          {passenger.currentStatus}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-1">Journey Progress</p>
                <Progress value={30} className="h-2" />
                <p className="text-xs text-gray-500 mt-1">Train departed 2 hours ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Fare Breakup</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Base Fare</span>
              <span>₹1,245</span>
            </div>
            <div className="flex justify-between">
              <span>Reservation Charges</span>
              <span>₹40</span>
            </div>
            <div className="flex justify-between">
              <span>Superfast Charges</span>
              <span>₹45</span>
            </div>
            <div className="flex justify-between">
              <span>GST</span>
              <span>₹62</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold">
              <span>Total Fare</span>
              <span>₹1,392</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
