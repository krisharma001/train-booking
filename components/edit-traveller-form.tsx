"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Info } from "lucide-react"

interface Traveller {
  id: string
  firstName: string
  lastName: string
  gender: "male" | "female"
  dateOfBirth?: string
  nationality?: string
  passportNumber?: string
  passportCountry?: string
}

interface EditTravellerFormProps {
  traveller: Traveller
  onSave: (traveller: Traveller) => void
  onCancel: () => void
}

export function EditTravellerForm({ traveller, onSave, onCancel }: EditTravellerFormProps) {
  const [formData, setFormData] = useState<Traveller>(traveller)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="bg-amber-100 border-l-4 border-amber-500 p-4 mb-4 flex items-start">
        <Info className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
        <div className="text-sm">
          Enter your name as mentioned on your Passport or Govt. ID proof
          <button className="text-primary block hover:underline">View Sample</button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>

        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>

        <div>
          <Label>Gender</Label>
          <RadioGroup
            value={formData.gender}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, gender: value as "male" | "female" }))}
            className="flex gap-4 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">Female</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth || ""}
            onChange={handleChange}
            placeholder="Select Date"
          />
        </div>
      </div>

      <div className="mt-8 mb-4">
        <h2 className="text-xl font-bold">Optional Details</h2>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="nationality">Nationality</Label>
          <Select
            value={formData.nationality || ""}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, nationality: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select nationality" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="India">India</SelectItem>
              <SelectItem value="USA">USA</SelectItem>
              <SelectItem value="UK">UK</SelectItem>
              <SelectItem value="Canada">Canada</SelectItem>
              <SelectItem value="Australia">Australia</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="passportNumber">Passport Number</Label>
          <Input
            id="passportNumber"
            name="passportNumber"
            value={formData.passportNumber || ""}
            onChange={handleChange}
            placeholder="Enter passport number"
          />
        </div>

        <div>
          <Label htmlFor="passportCountry">Passport Issuing Country</Label>
          <Select
            value={formData.passportCountry || ""}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, passportCountry: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="India">India</SelectItem>
              <SelectItem value="USA">USA</SelectItem>
              <SelectItem value="UK">UK</SelectItem>
              <SelectItem value="Canada">Canada</SelectItem>
              <SelectItem value="Australia">Australia</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-8">
        <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
          SAVE
        </Button>
      </div>
    </form>
  )
}
