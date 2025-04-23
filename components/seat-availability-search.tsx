"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { getTrainInfo } from "@/lib/api-service"
import { useToast } from "@/components/ui/use-toast"

export function SeatAvailabilitySearch() {
  const [trainQuery, setTrainQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!trainQuery.trim()) return

    setIsSearching(true)

    try {
      // Check if the input is a train number (numeric)
      if (/^\d+$/.test(trainQuery.trim())) {
        const trainInfo = await getTrainInfo(trainQuery.trim())

        if (trainInfo) {
          router.push(`/seat-availability/${trainQuery.trim()}`)
        } else {
          toast({
            title: "Train Not Found",
            description: "No train found with the provided number. Please check and try again.",
            variant: "destructive",
          })
        }
      } else {
        // If not a train number, just navigate to the search page
        router.push(`/seat-availability/${trainQuery.trim()}`)
      }
    } catch (error) {
      console.error("Error searching train:", error)
      toast({
        title: "Error",
        description: "An error occurred while searching for the train.",
        variant: "destructive",
      })
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-4 h-4 w-4 text-gray-400" />
        <Input
          value={trainQuery}
          onChange={(e) => setTrainQuery(e.target.value)}
          placeholder="Enter the train number or name"
          className="flex-1 h-12 bg-gray-50 pl-9"
        />
      </div>
      <Button
        type="submit"
        className="h-12 px-8 bg-primary hover:bg-primary/90 text-white"
        disabled={isSearching || !trainQuery.trim()}
      >
        {isSearching ? "Searching..." : "Check Availability"}
      </Button>
    </form>
  )
}
