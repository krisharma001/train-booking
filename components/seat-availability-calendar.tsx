"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield } from "lucide-react"

type AvailabilityStatus = "AVL" | "WL" | "RAC" | "DEPARTED" | "REGRET"
type AvailabilityType = "success" | "warning" | "error" | "default"

interface DayAvailability {
  date: string
  day: string
  status: AvailabilityStatus
  number?: number
  hasGuarantee?: boolean
}

interface SeatAvailabilityCalendarProps {
  trainNumber: string
  fromStation: string
  toStation: string
  classType: string
}

const getStatusType = (status: AvailabilityStatus): AvailabilityType => {
  switch (status) {
    case "AVL":
      return "success"
    case "WL":
    case "RAC":
      return "warning"
    case "DEPARTED":
    case "REGRET":
      return "error"
    default:
      return "default"
  }
}

const getStatusText = (status: AvailabilityStatus, number?: number): string => {
  switch (status) {
    case "AVL":
      return `AVL${number ? number : ""}`
    case "WL":
      return `WL ${number || ""}`
    case "RAC":
      return `RAC ${number || ""}`
    case "DEPARTED":
      return "Train Departed"
    case "REGRET":
      return "REGRET"
    default:
      return status
  }
}

const aprilData: DayAvailability[] = [
  { date: "01", day: "Thu", status: "DEPARTED" },
  { date: "02", day: "Fri", status: "WL", number: 8, hasGuarantee: false },
  { date: "03", day: "Sat", status: "AVL", number: 26 },
  { date: "04", day: "Sun", status: "AVL", number: 10 },
  { date: "05", day: "Mon", status: "AVL", number: 38 },
  { date: "06", day: "Tue", status: "WL", number: 3, hasGuarantee: true },
  { date: "07", day: "Wed", status: "AVL", number: 46 },
  { date: "08", day: "Thu", status: "AVL", number: 62 },
  { date: "09", day: "Fri", status: "AVL", number: 60 },
  { date: "10", day: "Sat", status: "WL", number: 9, hasGuarantee: true },
  { date: "11", day: "Sun", status: "AVL", number: 24 },
  { date: "12", day: "Mon", status: "WL", number: 4, hasGuarantee: true },
  { date: "13", day: "Tue", status: "AVL", number: 31 },
  { date: "14", day: "Wed", status: "AVL", number: 47 },
]

export function SeatAvailabilityCalendar({
  trainNumber,
  fromStation,
  toStation,
  classType,
}: SeatAvailabilityCalendarProps) {
  const [activeTab, setActiveTab] = useState(classType.toLowerCase() || "cc")
  const router = useRouter()

  const handleBook = (date: string, day: string) => {
    // Format date for URL
    const formattedDate = `2024-04-${date}`

    router.push(
      `/booking/new?train=${trainNumber}&from=${fromStation}&to=${toStation}&date=${formattedDate}&class=${activeTab.toUpperCase()}`,
    )
  }

  return (
    <div>
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="cc" className={activeTab === "cc" ? "border-b-2 border-primary" : ""}>
            CC
          </TabsTrigger>
          <TabsTrigger value="2s" className={activeTab === "2s" ? "border-b-2 border-primary" : ""}>
            2S
          </TabsTrigger>
          <TabsTrigger value="sl" className={activeTab === "sl" ? "border-b-2 border-primary" : ""}>
            SL
          </TabsTrigger>
          <TabsTrigger value="3a" className={activeTab === "3a" ? "border-b-2 border-primary" : ""}>
            3A
          </TabsTrigger>
          <TabsTrigger value="2a" className={activeTab === "2a" ? "border-b-2 border-primary" : ""}>
            2A
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cc" className="mt-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {aprilData.map((day, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  day.status === "DEPARTED" ? "bg-gray-100" : day.status.startsWith("AVL") ? "bg-green-50" : "bg-red-50"
                }`}
              >
                <div className="text-center mb-2">
                  <div className="font-medium">
                    {day.day}, {day.date} Apr
                  </div>
                </div>
                <div
                  className={`text-center font-semibold ${
                    day.status === "DEPARTED"
                      ? "text-gray-500"
                      : day.status.startsWith("AVL")
                        ? "text-green-600"
                        : "text-red-600"
                  }`}
                >
                  {getStatusText(day.status, day.number)}
                </div>
                {day.hasGuarantee && (
                  <div className="flex justify-center mt-2">
                    <Badge variant="outline" className="text-xs flex items-center gap-1 bg-green-50 border-green-200">
                      <Shield className="h-3 w-3" />
                      Travel Guarantee
                    </Badge>
                  </div>
                )}
                <div className="text-center text-xs text-gray-500 mt-2">a moment ago</div>

                {day.status !== "DEPARTED" && (
                  <div className="mt-3">
                    <Button
                      size="sm"
                      className="w-full bg-orange-500 hover:bg-orange-600"
                      disabled={day.status === "REGRET"}
                      onClick={() => handleBook(day.date, day.day)}
                    >
                      BOOK
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="2s" className="mt-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {aprilData.map((day, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  day.status === "DEPARTED" ? "bg-gray-100" : day.status.startsWith("AVL") ? "bg-green-50" : "bg-red-50"
                }`}
              >
                <div className="text-center mb-2">
                  <div className="font-medium">
                    {day.day}, {day.date} Apr
                  </div>
                </div>
                <div
                  className={`text-center font-semibold ${
                    day.status === "DEPARTED"
                      ? "text-gray-500"
                      : day.status.startsWith("AVL")
                        ? "text-green-600"
                        : "text-red-600"
                  }`}
                >
                  {getStatusText(day.status, day.number)}
                </div>
                {day.hasGuarantee && (
                  <div className="flex justify-center mt-2">
                    <Badge variant="outline" className="text-xs flex items-center gap-1 bg-green-50 border-green-200">
                      <Shield className="h-3 w-3" />
                      Travel Guarantee
                    </Badge>
                  </div>
                )}
                <div className="text-center text-xs text-gray-500 mt-2">a moment ago</div>

                {day.status !== "DEPARTED" && (
                  <div className="mt-3">
                    <Button
                      size="sm"
                      className="w-full bg-orange-500 hover:bg-orange-600"
                      disabled={day.status === "REGRET"}
                      onClick={() => handleBook(day.date, day.day)}
                    >
                      BOOK
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sl" className="mt-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {aprilData.map((day, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  day.status === "DEPARTED" ? "bg-gray-100" : day.status.startsWith("AVL") ? "bg-green-50" : "bg-red-50"
                }`}
              >
                <div className="text-center mb-2">
                  <div className="font-medium">
                    {day.day}, {day.date} Apr
                  </div>
                </div>
                <div
                  className={`text-center font-semibold ${
                    day.status === "DEPARTED"
                      ? "text-gray-500"
                      : day.status.startsWith("AVL")
                        ? "text-green-600"
                        : "text-red-600"
                  }`}
                >
                  {getStatusText(day.status, day.number)}
                </div>
                {day.hasGuarantee && (
                  <div className="flex justify-center mt-2">
                    <Badge variant="outline" className="text-xs flex items-center gap-1 bg-green-50 border-green-200">
                      <Shield className="h-3 w-3" />
                      Travel Guarantee
                    </Badge>
                  </div>
                )}
                <div className="text-center text-xs text-gray-500 mt-2">a moment ago</div>

                {day.status !== "DEPARTED" && (
                  <div className="mt-3">
                    <Button
                      size="sm"
                      className="w-full bg-orange-500 hover:bg-orange-600"
                      disabled={day.status === "REGRET"}
                      onClick={() => handleBook(day.date, day.day)}
                    >
                      BOOK
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="3a" className="mt-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {aprilData.map((day, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  day.status === "DEPARTED" ? "bg-gray-100" : day.status.startsWith("AVL") ? "bg-green-50" : "bg-red-50"
                }`}
              >
                <div className="text-center mb-2">
                  <div className="font-medium">
                    {day.day}, {day.date} Apr
                  </div>
                </div>
                <div
                  className={`text-center font-semibold ${
                    day.status === "DEPARTED"
                      ? "text-gray-500"
                      : day.status.startsWith("AVL")
                        ? "text-green-600"
                        : "text-red-600"
                  }`}
                >
                  {getStatusText(day.status, day.number)}
                </div>
                {day.hasGuarantee && (
                  <div className="flex justify-center mt-2">
                    <Badge variant="outline" className="text-xs flex items-center gap-1 bg-green-50 border-green-200">
                      <Shield className="h-3 w-3" />
                      Travel Guarantee
                    </Badge>
                  </div>
                )}
                <div className="text-center text-xs text-gray-500 mt-2">a moment ago</div>

                {day.status !== "DEPARTED" && (
                  <div className="mt-3">
                    <Button
                      size="sm"
                      className="w-full bg-orange-500 hover:bg-orange-600"
                      disabled={day.status === "REGRET"}
                      onClick={() => handleBook(day.date, day.day)}
                    >
                      BOOK
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="2a" className="mt-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {aprilData.map((day, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  day.status === "DEPARTED" ? "bg-gray-100" : day.status.startsWith("AVL") ? "bg-green-50" : "bg-red-50"
                }`}
              >
                <div className="text-center mb-2">
                  <div className="font-medium">
                    {day.day}, {day.date} Apr
                  </div>
                </div>
                <div
                  className={`text-center font-semibold ${
                    day.status === "DEPARTED"
                      ? "text-gray-500"
                      : day.status.startsWith("AVL")
                        ? "text-green-600"
                        : "text-red-600"
                  }`}
                >
                  {getStatusText(day.status, day.number)}
                </div>
                {day.hasGuarantee && (
                  <div className="flex justify-center mt-2">
                    <Badge variant="outline" className="text-xs flex items-center gap-1 bg-green-50 border-green-200">
                      <Shield className="h-3 w-3" />
                      Travel Guarantee
                    </Badge>
                  </div>
                )}
                <div className="text-center text-xs text-gray-500 mt-2">a moment ago</div>

                {day.status !== "DEPARTED" && (
                  <div className="mt-3">
                    <Button
                      size="sm"
                      className="w-full bg-orange-500 hover:bg-orange-600"
                      disabled={day.status === "REGRET"}
                      onClick={() => handleBook(day.date, day.day)}
                    >
                      BOOK
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
