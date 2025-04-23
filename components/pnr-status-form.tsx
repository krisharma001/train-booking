"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { checkPnrStatus, type PnrStatusResult } from "@/lib/api-service"
import { useToast } from "@/components/ui/use-toast"

export function PnrStatusForm() {
  const [pnrNumber, setPnrNumber] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [pnrResult, setPnrResult] = useState<PnrStatusResult | null>(null)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!pnrNumber || pnrNumber.length !== 10) return

    setIsSubmitting(true)

    try {
      const result = await checkPnrStatus(pnrNumber)

      if (result) {
        setPnrResult(result)
      } else {
        toast({
          title: "Error",
          description: "Unable to fetch PNR status. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error checking PNR status:", error)
      toast({
        title: "Error",
        description: "An error occurred while checking PNR status.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="pnr-number">Enter 10 digit PNR Number</Label>
          <Input
            id="pnr-number"
            value={pnrNumber}
            onChange={(e) => setPnrNumber(e.target.value)}
            placeholder="e.g., 1234567890"
            maxLength={10}
            pattern="[0-9]{10}"
            required
          />
          <p className="text-xs text-gray-500">You can find your PNR number on your e-ticket or SMS confirmation</p>
        </div>

        <Button type="submit" disabled={isSubmitting || pnrNumber.length !== 10}>
          {isSubmitting ? (
            <>Processing...</>
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Check PNR Status
            </>
          )}
        </Button>
      </form>

      {pnrResult && (
        <div className="mt-6 border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">PNR Status Result</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">PNR Number</p>
              <p className="font-medium">{pnrResult.pnrNumber}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Train</p>
              <p className="font-medium">
                {pnrResult.trainNumber} - {pnrResult.trainName}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Date of Journey</p>
              <p className="font-medium">{pnrResult.dateOfJourney}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">From - To</p>
              <p className="font-medium">
                {pnrResult.boardingPoint} - {pnrResult.destinationPoint}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Chart Status</p>
              <p className="font-medium">{pnrResult.chartStatus}</p>
            </div>
          </div>

          <h4 className="text-md font-semibold mt-4 mb-2">Passenger Details</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    No.
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Booking Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Coach Position
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pnrResult.passengers.map((passenger, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{passenger.bookingStatus}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{passenger.currentStatus}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{passenger.coachPosition}</td>
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
