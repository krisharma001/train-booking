"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { getTrainInfo } from "@/lib/api-service"
import { useToast } from "@/components/ui/use-toast"

export function SearchByNameForm() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (searchTerm.trim().length < 3) {
      toast({
        title: "Invalid Search",
        description: "Please enter at least 3 characters to search.",
        variant: "destructive",
      })
      return
    }

    setIsSearching(true)

    try {
      // If the search term is a train number (all digits)
      if (/^\d+$/.test(searchTerm.trim())) {
        const trainInfo = await getTrainInfo(searchTerm.trim())

        if (trainInfo) {
          router.push(`/trains/${searchTerm.trim()}`)
        } else {
          toast({
            title: "Train Not Found",
            description: "No train found with the provided number. Please check and try again.",
            variant: "destructive",
          })
        }
      } else {
        // If it's a name, navigate to search results page
        router.push(`/search-by-name/results?q=${encodeURIComponent(searchTerm.trim())}`)
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
    <form onSubmit={handleSearch} className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter train number or name"
          className="pl-10"
        />
        {isSearching && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
          </div>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={searchTerm.trim().length < 3 || isSearching}>
        {isSearching ? "Searching..." : "Search"}
      </Button>
    </form>
  )
}
