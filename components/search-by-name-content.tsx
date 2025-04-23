"use client"

import { Button } from "@/components/ui/button"

import type React from "react"

import { useState, useEffect } from "react"
import { ChevronLeft, Search, Train } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { TrainInfo } from "@/components/train-info"
import { SearchByNameForm } from "@/components/search-by-name-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { fetchTrainData, searchTrainsByName, searchTrainsByNumber, type Train as TrainType } from "@/lib/train-data"

interface PopularTrain {
  id: string
  number: string
  name: string
  from: string
  fromCode: string
  to: string
  toCode: string
}

export function SearchByNameContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchPerformed, setSearchPerformed] = useState(false)
  const [searchResults, setSearchResults] = useState<TrainType[]>([])
  const [loading, setLoading] = useState(false)
  const [popularTrains, setPopularTrains] = useState<PopularTrain[]>([
    {
      id: "1",
      number: "19037",
      name: "Avadh Exp",
      from: "Bandra Terminus",
      fromCode: "BDTS",
      to: "Barauni Jn",
      toCode: "BJU",
    },
    {
      id: "2",
      number: "12322",
      name: "Kolkata Mail",
      from: "C Shivaji Mah T",
      fromCode: "CSMT",
      to: "Howrah Jn",
      toCode: "HWH",
    },
    {
      id: "3",
      number: "11061",
      name: "Ltt Jaynagar Exp",
      from: "Lokmanyatilak T",
      fromCode: "LTT",
      to: "Jaynagar",
      toCode: "JYG",
    },
    {
      id: "4",
      number: "22503",
      name: "Dbrg Vivek Exp",
      from: "Kanyakumari",
      fromCode: "CAPE",
      to: "DIBRUGARH",
      toCode: "DBRG",
    },
    {
      id: "5",
      number: "22538",
      name: "Kushinagar Exp",
      from: "Lokmanyatilak T",
      fromCode: "LTT",
      to: "Gorakhpur Jn",
      toCode: "GKP",
    },
    {
      id: "6",
      number: "20103",
      name: "Ltt Gkp Sf Exp",
      from: "Lokmanyatilak T",
      fromCode: "LTT",
      to: "Gorakhpur Jn",
      toCode: "GKP",
    },
    {
      id: "7",
      number: "19483",
      name: "Adi Bju Exp",
      from: "Ahmedabad Jn",
      fromCode: "ADI",
      to: "Barauni Jn",
      toCode: "BJU",
    },
  ])

  // Load real train data for popular trains
  useEffect(() => {
    const loadPopularTrains = async () => {
      try {
        const trainData = await fetchTrainData()
        // Update popular trains with real data if available
        if (trainData.length > 0) {
          const updatedPopularTrains = popularTrains.map((train) => {
            const matchedTrain = trainData.find((t) => t.trainNo === train.number)
            if (matchedTrain) {
              return {
                ...train,
                name: matchedTrain.trainName,
                from: matchedTrain.sourceStationName,
                to: matchedTrain.destinationStationName,
              }
            }
            return train
          })
          setPopularTrains(updatedPopularTrains)
        }
      } catch (error) {
        console.error("Error loading popular trains:", error)
      }
    }

    loadPopularTrains()
  }, [])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setLoading(true)
      try {
        const trainData = await fetchTrainData()

        // Search by train number first
        let results = searchTrainsByNumber(searchQuery, trainData)

        // If no results, search by train name
        if (results.length === 0) {
          results = searchTrainsByName(searchQuery, trainData)
        }

        setSearchResults(results)
        setSearchPerformed(true)
      } catch (error) {
        console.error("Error searching trains:", error)
      } finally {
        setLoading(false)
      }
    }
  }

  const handlePopularTrainClick = async (train: PopularTrain) => {
    setSearchQuery(`${train.number} ${train.name}`)

    try {
      setLoading(true)
      const trainData = await fetchTrainData()
      const results = trainData.filter((t) => t.trainNo === train.number)
      setSearchResults(results)
      setSearchPerformed(true)
    } catch (error) {
      console.error("Error fetching train details:", error)
    } finally {
      setLoading(false)
    }
  }

  if (searchPerformed) {
    // If no results found
    if (searchResults.length === 0) {
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center text-sm mb-4">
            <Link href="/" className="text-primary hover:underline">
              Home
            </Link>
            <span className="mx-2">›</span>
            <Link href="/search-by-name" className="text-primary hover:underline">
              Search Trains
            </Link>
            <span className="mx-2">›</span>
            <span className="text-gray-700">Search Results</span>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <h2 className="text-xl font-bold mb-4">No trains found matching "{searchQuery}"</h2>
            <p className="text-gray-600 mb-6">Please try a different search term or check the train number.</p>
            <Button onClick={() => setSearchPerformed(false)}>Back to Search</Button>
          </div>
        </div>
      )
    }

    // Display the first train result
    const train = searchResults[0]

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center text-sm mb-4">
          <Link href="/" className="text-primary hover:underline">
            Home
          </Link>
          <span className="mx-2">›</span>
          <Link href="/trains" className="text-primary hover:underline">
            Trains
          </Link>
          <span className="mx-2">›</span>
          <span className="text-gray-700">
            {train.trainName} - {train.trainNo}
          </span>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <Tabs defaultValue="overview">
            <TabsList className="w-full justify-start border-b rounded-none p-0">
              <TabsTrigger
                value="overview"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none py-3 px-6"
              >
                OVERVIEW
              </TabsTrigger>
              <TabsTrigger
                value="availability"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none py-3 px-6"
              >
                AVAILABILITY
              </TabsTrigger>
              <TabsTrigger
                value="schedule"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none py-3 px-6"
              >
                TRAIN SCHEDULE
              </TabsTrigger>
              <TabsTrigger
                value="coach"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none py-3 px-6"
              >
                COACH POSITION
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="p-6">
              <TrainInfo trainData={train} />

              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">
                  {train.trainName} {train.trainNo} Train Information
                </h2>
                <p className="text-gray-700 mb-4">
                  {train.trainName} ({train.trainNo}) train runs from {train.sourceStationName} to{" "}
                  {train.destinationStationName}. This train covers a distance of about 395 km. The fare classes on{" "}
                  {train.trainNo} train are CC,2S. The following train ticket quotas are available on {train.trainName}:
                  GN,TQ,SS,LD.
                </p>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">
                  {train.trainName} {train.trainNo} Ticket Prices
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <SearchByNameForm />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="availability" className="p-0">
              {/* Availability content would go here */}
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Seat Availability</h2>
                <p className="text-gray-600">Check seat availability for upcoming dates</p>
              </div>
            </TabsContent>

            <TabsContent value="schedule" className="p-0">
              {/* Schedule content would go here */}
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Train Schedule</h2>
                <p className="text-gray-600">View complete schedule with all stations</p>
              </div>
            </TabsContent>

            <TabsContent value="coach" className="p-0">
              {/* Coach position content would go here */}
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Coach Position</h2>
                <p className="text-gray-600">View coach arrangement for this train</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">{/* Additional train information would go here */}</div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-medium mb-4">
                {train.sourceStationName} to {train.destinationStationName} Trains Seat Availability
              </h3>
              <Link href={`/seat-availability/${train.trainNo}`} className="text-primary hover:underline block mb-2">
                {train.trainName} - {train.trainNo} Seat Availability
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-medium mb-4">
                {train.sourceStationName} to {train.destinationStationName} Trains Running Status
              </h3>
              <Link href={`/running-status/${train.trainNo}`} className="text-primary hover:underline block mb-2">
                {train.trainName} - {train.trainNo} Running Status
              </Link>
            </div>

            {searchResults.length > 1 && (
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="font-medium mb-4">Other Matching Trains</h3>
                {searchResults.slice(1, 4).map((otherTrain, index) => (
                  <Link
                    key={index}
                    href={`/trains/${otherTrain.trainNo}`}
                    className="text-primary hover:underline block mb-2"
                  >
                    {otherTrain.trainName} - {otherTrain.trainNo}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="flex items-center mb-6">
        <Link href="/" className="mr-2">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-medium">Search trains by name or number</h1>
      </div>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search trains by name or number"
            className="pl-10 pr-4 py-6 rounded-full"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          {loading && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full"></div>
            </div>
          )}
        </div>
      </form>

      <h2 className="text-xl font-bold mb-4">Popular Trains</h2>

      <div className="space-y-4">
        {popularTrains.map((train) => (
          <div
            key={train.id}
            className="bg-white rounded-lg p-4 flex items-center border hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handlePopularTrainClick(train)}
          >
            <div className="mr-4">
              <Train className="h-6 w-6 text-gray-500" />
            </div>
            <div>
              <div className="font-medium">
                {train.number} {train.name}
              </div>
              <div className="text-sm text-gray-600">
                {train.from} ({train.fromCode}) - {train.to} ({train.toCode})
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
