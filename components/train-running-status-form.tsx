"use client"

import type React from "react"

import { useState } from "react"
import { Search, Train } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function TrainRunningStatusForm() {
  const [trainNumber, setTrainNumber] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!trainNumber) return

    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      // Here you would typically update some state or trigger a server action
    }, 1000)
  }

  return (
    <Tabs defaultValue="train-number">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="train-number">By Train Number</TabsTrigger>
        <TabsTrigger value="train-name">By Train Name</TabsTrigger>
      </TabsList>

      <TabsContent value="train-number">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="train-number">Enter Train Number</Label>
            <div className="relative">
              <Train className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                id="train-number"
                value={trainNumber}
                onChange={(e) => setTrainNumber(e.target.value)}
                className="pl-9"
                placeholder="e.g., 12345"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Select Date</Label>
            <RadioGroup defaultValue="today" className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="today" id="today" />
                <Label htmlFor="today">Today</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yesterday" id="yesterday" />
                <Label htmlFor="yesterday">Yesterday</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="tomorrow" id="tomorrow" />
                <Label htmlFor="tomorrow">Tomorrow</Label>
              </div>
            </RadioGroup>
          </div>

          <Button type="submit" disabled={isSubmitting || !trainNumber}>
            {isSubmitting ? (
              <>Processing...</>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Check Running Status
              </>
            )}
          </Button>
        </form>
      </TabsContent>

      <TabsContent value="train-name">
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="train-name">Enter Train Name</Label>
            <div className="relative">
              <Train className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input id="train-name" className="pl-9" placeholder="e.g., Rajdhani Express" required />
            </div>
            <p className="text-xs text-gray-500">Enter at least 3 characters to search</p>
          </div>

          <Button type="submit">
            <Search className="mr-2 h-4 w-4" />
            Search Trains
          </Button>
        </form>
      </TabsContent>
    </Tabs>
  )
}
