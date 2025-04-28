"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { BookingForm } from "@/components/booking-form"
import { Loader2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getTrainInfo } from "@/lib/api-service"
import Link from "next/link"

export default function NewBookingPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const trainNumber = searchParams.get("train") || ""
  const fromStation = searchParams.get("from") || ""
  const toStation = searchParams.get("to") || ""
  const date = searchParams.get("date") || ""
  const classType = searchParams.get("class") || ""

  const [loading, setLoading] = useState(true)
  const [trainInfo, setTrainInfo] = useState<any>(null)

  useEffect(() => {
    const fetchTrainInfo = async () => {
      if (!trainNumber) {
        router.push("/")
        return
      }

      try {
        setLoading(true)
        const info = await getTrainInfo(trainNumber)
        setTrainInfo(info)
      } catch (error) {
        console.error("Error fetching train info:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTrainInfo()
  }, [trainNumber, router])

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8 flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
          <span>Loading booking details...</span>
        </div>
      </main>
    )
  }

  if (!trainInfo) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Train Not Found</h1>
          <p className="mb-6">Sorry, we couldn't find information for the requested train.</p>
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <Button variant="ghost" className="mb-4" asChild>
            <Link href="/search-results">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to search results
            </Link>
          </Button>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h1 className="text-2xl font-bold text-orange-500 mb-4">
              {trainInfo.trainNumber} {trainInfo.trainName}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
              <div>
                <div className="text-gray-600">{fromStation}</div>
                <div className="text-xl font-semibold">
                  {trainInfo.route.find((r: any) => r.stationCode === fromStation)?.departureTime || "N/A"}
                </div>
                <div className="text-sm text-gray-600">
                  {trainInfo.route.find((r: any) => r.stationCode === fromStation)?.stationName || fromStation}
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="text-sm text-gray-600">{date}</div>
                <div className="relative w-32 h-0.5 bg-gray-300 my-2">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-500"></div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-500"></div>
                </div>
                <div className="text-sm font-medium text-primary">{classType}</div>
              </div>

              <div>
                <div className="text-gray-600">{toStation}</div>
                <div className="text-xl font-semibold">
                  {trainInfo.route.find((r: any) => r.stationCode === toStation)?.arrivalTime || "N/A"}
                </div>
                <div className="text-sm text-gray-600">
                  {trainInfo.route.find((r: any) => r.stationCode === toStation)?.stationName || toStation}
                </div>
              </div>
            </div>
          </div>
        </div>

        <BookingForm
          trainNumber={trainNumber}
          trainName={trainInfo.trainName}
          fromStation={fromStation}
          toStation={toStation}
          date={date}
          classType={classType}
        />
      </div>
    </main>
  )
}
