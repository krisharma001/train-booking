"use client"
import { useEffect, useState } from "react"
import { Clock, Coffee, Moon, Utensils, Loader2 } from "lucide-react"
import { getTrainInfo, type TrainInfoResult } from "@/lib/api-service"
import { useToast } from "@/components/ui/use-toast"

interface TrainInfoProps {
  trainId?: string
  trainData?: TrainInfoResult
}

export function TrainInfo({ trainId, trainData: initialTrainData }: TrainInfoProps) {
  const [loading, setLoading] = useState(!initialTrainData && !!trainId)
  const [trainData, setTrainData] = useState<TrainInfoResult | null>(initialTrainData || null)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchTrainInfo = async () => {
      if (!trainId || initialTrainData) return

      setLoading(true)
      setError(null)

      try {
        const data = await getTrainInfo(trainId)

        if (data) {
          setTrainData(data)
        } else {
          setError("Train information not found")
          toast({
            title: "Error",
            description: "Train information not found. Please check the train number and try again.",
            variant: "destructive",
          })
        }
      } catch (err) {
        console.error("Error fetching train info:", err)
        setError("Failed to fetch train information")
        toast({
          title: "Error",
          description: "Failed to fetch train information. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchTrainInfo()
  }, [trainId, initialTrainData, toast])

  if (loading) {
    return (
      <div className="flex justify-center items-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading train information...</span>
      </div>
    )
  }

  if (error || !trainData) {
    return (
      <div className="border rounded-lg p-6 text-center text-red-500">
        <p>{error || "Train information not available"}</p>
      </div>
    )
  }

  // Get source and destination from the route
  const sourceStation = trainData.route[0]
  const destinationStation = trainData.route[trainData.route.length - 1]

  // Format days for display
  const runningDays = []
  if (trainData.runningDays.sunday) runningDays.push("S")
  if (trainData.runningDays.monday) runningDays.push("M")
  if (trainData.runningDays.tuesday) runningDays.push("T")
  if (trainData.runningDays.wednesday) runningDays.push("W")
  if (trainData.runningDays.thursday) runningDays.push("T")
  if (trainData.runningDays.friday) runningDays.push("F")
  if (trainData.runningDays.saturday) runningDays.push("S")

  const formattedDays = runningDays.join(" ")

  return (
    <div className="border rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-amber-100 text-amber-800 font-semibold px-2 py-1 rounded text-sm">2.7</div>
        <h2 className="text-xl font-semibold">
          {trainData.trainName} {trainData.trainNumber} Train
        </h2>
        <div className="ml-auto text-sm text-gray-600">
          Runs on: <span className="font-medium">{formattedDays}</span>
          <span className="ml-2 text-xs text-primary">(हिंदी में देखें)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
        <div>
          <div className="text-gray-600">{sourceStation.stationCode}</div>
          <div className="text-3xl font-semibold">{sourceStation.departureTime}</div>
          <div className="text-sm text-gray-600">{sourceStation.stationName}</div>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-sm text-gray-600">{destinationStation.distance - sourceStation.distance} km</div>
          <div className="relative w-32 h-0.5 bg-gray-300 my-2">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-500"></div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-500"></div>
          </div>
          <div className="text-sm text-gray-600">{trainData.route.length - 2} Stops</div>
        </div>

        <div>
          <div className="text-gray-600">{destinationStation.stationCode}</div>
          <div className="text-3xl font-semibold">{destinationStation.arrivalTime}</div>
          <div className="text-sm text-gray-600">{destinationStation.stationName}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="flex items-center gap-2">
          <Utensils className={`h-5 w-5 ${trainData.pantry ? "text-red-500" : "text-gray-400"}`} />
          <span className={`text-sm ${trainData.pantry ? "" : "text-gray-400"}`}>Pantry</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-green-600" />
          <span className="text-sm">Superfast</span>
        </div>
        <div className="flex items-center gap-2">
          <Moon className="h-5 w-5 text-blue-600" />
          <span className="text-sm">Overnight</span>
        </div>
        <div className="flex items-center gap-2">
          <Coffee className="h-5 w-5 text-gray-400" />
          <span className="text-sm text-gray-400">Catering</span>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-medium mb-2">Available Classes</h3>
        <div className="flex flex-wrap gap-2">
          {trainData.classes.map((classType) => (
            <div key={classType} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
              {classType}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-medium mb-2">Route Information</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Station
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Arrival
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Departure
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Halt</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Distance
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {trainData.route.map((station, index) => (
                <tr key={`${station.stationCode}-${index}`}>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <div className="font-medium">{station.stationName}</div>
                    <div className="text-xs text-gray-500">{station.stationCode}</div>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">{station.arrivalTime || "-"}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{station.departureTime || "-"}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{station.haltTime || "-"}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{station.day}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{station.distance} km</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
