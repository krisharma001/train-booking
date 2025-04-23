"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"

export function SearchFilters() {
  const [departureTimeFilter, setDepartureTimeFilter] = useState<[number, number]>([0, 24])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000])
  const [selectedClasses, setSelectedClasses] = useState<string[]>(["SL", "3A", "2A"])
  const [selectedQuotas, setSelectedQuotas] = useState<string[]>(["GN"])

  const handleClassToggle = (className: string) => {
    setSelectedClasses((prev) =>
      prev.includes(className) ? prev.filter((c) => c !== className) : [...prev, className],
    )
  }

  const handleQuotaToggle = (quota: string) => {
    setSelectedQuotas((prev) => (prev.includes(quota) ? prev.filter((q) => q !== quota) : [...prev, quota]))
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
      <div>
        <h3 className="font-medium mb-3">Departure Time</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-2 text-xs text-center">
            <div>00:00 - 06:00</div>
            <div>06:00 - 12:00</div>
            <div>12:00 - 18:00</div>
            <div>18:00 - 24:00</div>
          </div>
          <Slider
            defaultValue={[0, 24]}
            max={24}
            step={1}
            value={departureTimeFilter}
            onValueChange={(value) => setDepartureTimeFilter(value as [number, number])}
            className="mt-6"
          />
          <div className="flex justify-between">
            <div className="text-sm">{departureTimeFilter[0]}:00</div>
            <div className="text-sm">{departureTimeFilter[1]}:00</div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">Price Range</h3>
        <div className="space-y-4">
          <Slider
            defaultValue={[0, 5000]}
            max={5000}
            step={100}
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
          />
          <div className="flex justify-between items-center">
            <Input
              type="number"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number.parseInt(e.target.value), priceRange[1]])}
              className="w-20 h-8"
            />
            <span className="text-sm text-gray-500">to</span>
            <Input
              type="number"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
              className="w-20 h-8"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">Train Class</h3>
        <div className="space-y-2">
          {["SL", "3A", "2A", "1A", "CC", "2S"].map((classType) => (
            <div key={classType} className="flex items-center">
              <Checkbox
                id={`class-${classType}`}
                checked={selectedClasses.includes(classType)}
                onCheckedChange={() => handleClassToggle(classType)}
              />
              <Label htmlFor={`class-${classType}`} className="ml-2 text-sm">
                {classType === "SL"
                  ? "Sleeper (SL)"
                  : classType === "3A"
                    ? "AC 3 Tier (3A)"
                    : classType === "2A"
                      ? "AC 2 Tier (2A)"
                      : classType === "1A"
                        ? "AC First Class (1A)"
                        : classType === "CC"
                          ? "Chair Car (CC)"
                          : "Second Sitting (2S)"}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">Quota</h3>
        <div className="space-y-2">
          {[
            { id: "GN", label: "General (GN)" },
            { id: "TQ", label: "Tatkal (TQ)" },
            { id: "LD", label: "Ladies (LD)" },
            { id: "SS", label: "Senior Citizen (SS)" },
          ].map((quota) => (
            <div key={quota.id} className="flex items-center">
              <Checkbox
                id={`quota-${quota.id}`}
                checked={selectedQuotas.includes(quota.id)}
                onCheckedChange={() => handleQuotaToggle(quota.id)}
              />
              <Label htmlFor={`quota-${quota.id}`} className="ml-2 text-sm">
                {quota.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">Train Types</h3>
        <div className="space-y-2">
          {["All Trains", "Rajdhani Express", "Shatabdi Express", "Duronto Express", "Vande Bharat", "Passenger"].map(
            (type) => (
              <div key={type} className="flex items-center">
                <Checkbox id={`type-${type}`} />
                <Label htmlFor={`type-${type}`} className="ml-2 text-sm">
                  {type}
                </Label>
              </div>
            ),
          )}
        </div>
      </div>

      <Button className="w-full">Apply Filters</Button>
    </div>
  )
}
