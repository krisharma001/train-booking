"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { SearchResultsList } from "@/components/search-results-list"
import { SearchFilters } from "@/components/search-filters"
import { Loader2 } from "lucide-react"
import { getTrainInfo } from "@/lib/api-service"
import { useToast } from "@/components/ui/use-toast"

export default function SearchResultsPage() {
  const searchParams = useSearchParams()
  const from = searchParams.get("from") || ""
  const to = searchParams.get("to") || ""
  const date = searchParams.get("date") || ""
  const bookingType = searchParams.get("type") || "regular"

  const [loading, setLoading] = useState(true)
  const [trains, setTrains] = useState<any[]>([])
  const { toast } = useToast()

  useEffect(() => {
    const fetchTrains = async () => {
      setLoading(true)

      try {
        // In a real app, we would call an API to search trains between stations
        // For now, we'll use mock data based on the train info API

        // Mock train numbers that we'll fetch details for
        const mockTrainNumbers = ["12036", "12486", "12555", "12556", "12910"]

        const trainsData = await Promise.all(
          mockTrainNumbers.map(async (trainNumber) => {
            try {
              const trainInfo = await getTrainInfo(trainNumber)
              return trainInfo
            } catch (error) {
              console.error(`Error fetching train ${trainNumber}:`, error)
              return null
            }
          }),
        )

        // Filter out any null results
        setTrains(trainsData.filter(Boolean))
      } catch (error) {
        console.error("Error fetching trains:", error)
        toast({
          title: "Error",
          description: "Failed to fetch train results. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchTrains()
  }, [from, to, date, bookingType, toast])

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Train Search Results</h1>
          <p className="text-gray-600">
            {from} to {to} • {date} •{" "}
            {bookingType === "regular" ? "Regular" : bookingType === "tatkal" ? "Tatkal" : "Premium Tatkal"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
          <div>
            <SearchFilters />
          </div>

          <div>
            {loading ? (
              <div className="flex justify-center items-center p-12 bg-white rounded-lg shadow-sm">
                <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
                <span>Searching for trains...</span>
              </div>
            ) : trains.length > 0 ? (
              <SearchResultsList trains={trains} date={date} from={from} to={to} />
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <h2 className="text-xl font-semibold mb-2">No trains found</h2>
                <p className="text-gray-600">
                  We couldn't find any trains matching your search criteria. Please try different stations or dates.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
