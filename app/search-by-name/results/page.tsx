"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Loader2 } from "lucide-react"
import { getTrainInfo } from "@/lib/api-service"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SearchByNameResultsPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  const [loading, setLoading] = useState(true)
  const [trains, setTrains] = useState<any[]>([])
  const { toast } = useToast()

  useEffect(() => {
    const fetchTrains = async () => {
      setLoading(true)

      try {
        // In a real app, we would call an API to search trains by name
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

        // Filter out any null results and filter by name if query is provided
        const filteredTrains = trainsData
          .filter(Boolean)
          .filter(
            (train) => train.trainName.toLowerCase().includes(query.toLowerCase()) || train.trainNumber.includes(query),
          )

        setTrains(filteredTrains)
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
  }, [query, toast])

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Search Results for "{query}"</h1>
          <p className="text-gray-600">{trains.length} trains found</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center p-12 bg-white rounded-lg shadow-sm">
            <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
            <span>Searching for trains...</span>
          </div>
        ) : trains.length > 0 ? (
          <div className="space-y-4">
            {trains.map((train, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <Link
                  href={`/trains/${train.trainNumber}`}
                  className="text-xl font-semibold text-primary hover:underline"
                >
                  {train.trainNumber} - {train.trainName}
                </Link>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">From</p>
                    <p className="font-medium">
                      {train.route[0].stationName} ({train.route[0].stationCode})
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">To</p>
                    <p className="font-medium">
                      {train.route[train.route.length - 1].stationName} (
                      {train.route[train.route.length - 1].stationCode})
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Runs on</p>
                    <p className="font-medium">
                      {train.runningDays.sunday ? "S" : "-"}
                      {train.runningDays.monday ? "M" : "-"}
                      {train.runningDays.tuesday ? "T" : "-"}
                      {train.runningDays.wednesday ? "W" : "-"}
                      {train.runningDays.thursday ? "T" : "-"}
                      {train.runningDays.friday ? "F" : "-"}
                      {train.runningDays.saturday ? "S" : "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Classes</p>
                    <p className="font-medium">{train.classes.join(", ")}</p>
                  </div>
                </div>

                <div className="mt-4 flex justify-end space-x-3">
                  <Button variant="outline" asChild>
                    <Link href={`/seat-availability/${train.trainNumber}`}>Check Availability</Link>
                  </Button>
                  <Button asChild>
                    <Link href={`/trains/${train.trainNumber}`}>View Details</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <h2 className="text-xl font-semibold mb-2">No trains found</h2>
            <p className="text-gray-600 mb-6">
              We couldn't find any trains matching "{query}". Please try a different search term.
            </p>
            <Button asChild>
              <Link href="/search-by-name">Back to Search</Link>
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}
