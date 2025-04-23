"use client"

import { useState } from "react"
import { Search, Train } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function FoodOrderForm() {
  const [orderType, setOrderType] = useState("pnr")

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Order Food</h2>

      <RadioGroup defaultValue="pnr" className="grid grid-cols-2 gap-2" onValueChange={setOrderType}>
        <div
          className={`flex items-center justify-center space-x-2 border rounded-md px-4 py-3 cursor-pointer ${orderType === "pnr" ? "bg-primary/5 border-primary" : "bg-white"}`}
        >
          <RadioGroupItem value="pnr" id="pnr" />
          <Label htmlFor="pnr" className="cursor-pointer">
            By PNR
          </Label>
        </div>
        <div
          className={`flex items-center justify-center space-x-2 border rounded-md px-4 py-3 cursor-pointer ${orderType === "train" ? "bg-primary/5 border-primary" : "bg-white"}`}
        >
          <RadioGroupItem value="train" id="train" />
          <Label htmlFor="train" className="cursor-pointer">
            By Train
          </Label>
        </div>
      </RadioGroup>

      {orderType === "pnr" ? (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pnr-number">Enter PNR Number</Label>
            <Input id="pnr-number" placeholder="e.g., 1234567890" maxLength={10} pattern="[0-9]{10}" />
          </div>

          <Button className="w-full">
            <Search className="mr-2 h-4 w-4" />
            Find My Train
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="train-number">Train Number/Name</Label>
            <div className="relative">
              <Train className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input id="train-number" className="pl-9" placeholder="e.g., 12302 or Rajdhani" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="journey-date">Journey Date</Label>
              <Input id="journey-date" type="date" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="boarding-station">Boarding Station</Label>
              <Select>
                <SelectTrigger id="boarding-station">
                  <SelectValue placeholder="Select station" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ndls">New Delhi (NDLS)</SelectItem>
                  <SelectItem value="cnb">Kanpur Central (CNB)</SelectItem>
                  <SelectItem value="ald">Allahabad Jn (ALD)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button className="w-full">
            <Search className="mr-2 h-4 w-4" />
            Find Restaurants
          </Button>
        </div>
      )}

      <div className="text-center text-sm text-gray-500">
        <p>Order food from IRCTC authorized vendors</p>
        <p>Delivered directly to your seat</p>
      </div>
    </div>
  )
}
