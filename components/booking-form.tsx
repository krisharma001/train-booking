"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Plus, Edit, Trash2, Shield } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface Traveller {
  id: string
  name: string
  age: string
  gender: "male" | "female" | "other"
  berth?: string
  idType?: string
  idNumber?: string
}

interface BookingFormProps {
  trainNumber: string
  trainName: string
  fromStation: string
  toStation: string
  date: string
  classType: string
}

export function BookingForm({ trainNumber, trainName, fromStation, toStation, date, classType }: BookingFormProps) {
  const router = useRouter()
  const { toast } = useToast()

  // Generate a random price for demo purposes
  const basePrice = Math.floor(Math.random() * 500) + 300
  const gst = Math.floor(basePrice * 0.05)
  const convenienceFee = 30
  const totalPrice = basePrice + gst + convenienceFee

  const [travellers, setTravellers] = useState<Traveller[]>([
    {
      id: "1",
      name: "Karan Kumar",
      age: "28",
      gender: "male",
      berth: "Lower",
    },
  ])

  const [editingTraveller, setEditingTraveller] = useState<Traveller | null>(null)
  const [isAddingTraveller, setIsAddingTraveller] = useState(false)
  const [contactDetails, setContactDetails] = useState({
    mobile: "",
    email: "",
    address: "",
  })
  const [wantTravelGuarantee, setWantTravelGuarantee] = useState(false)

  const handleAddTraveller = () => {
    setIsAddingTraveller(true)
    setEditingTraveller({
      id: Date.now().toString(),
      name: "",
      age: "",
      gender: "male",
      berth: "",
    })
  }

  const handleEditTraveller = (traveller: Traveller) => {
    setIsAddingTraveller(false)
    setEditingTraveller({ ...traveller })
  }

  const handleDeleteTraveller = (id: string) => {
    setTravellers(travellers.filter((t) => t.id !== id))
  }

  const handleSaveTraveller = () => {
    if (!editingTraveller) return

    if (!editingTraveller.name || !editingTraveller.age) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields for the traveller.",
        variant: "destructive",
      })
      return
    }

    if (isAddingTraveller) {
      setTravellers([...travellers, editingTraveller])
    } else {
      setTravellers(travellers.map((t) => (t.id === editingTraveller.id ? editingTraveller : t)))
    }

    setEditingTraveller(null)
    setIsAddingTraveller(false)
  }

  const handleCancelEditTraveller = () => {
    setEditingTraveller(null)
    setIsAddingTraveller(false)
  }

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setContactDetails((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (travellers.length === 0) {
      toast({
        title: "No Travellers",
        description: "Please add at least one traveller to proceed with booking.",
        variant: "destructive",
      })
      return
    }

    if (!contactDetails.mobile || !contactDetails.email) {
      toast({
        title: "Missing Contact Information",
        description: "Please provide your mobile number and email address.",
        variant: "destructive",
      })
      return
    }

    // In a real app, we would submit the booking to an API
    toast({
      title: "Booking Successful!",
      description: "Your booking has been confirmed. PNR: IRCTC" + Math.floor(Math.random() * 10000000),
    })

    // Redirect to a confirmation page or home
    setTimeout(() => {
      router.push("/")
    }, 2000)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6">
        <div className="space-y-6">
          {/* Travellers Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Travellers</CardTitle>
              <CardDescription>{travellers.length}/6 travellers added</CardDescription>
            </CardHeader>

            <CardContent>
              {editingTraveller ? (
                <div className="space-y-4 border rounded-lg p-4">
                  <h3 className="font-medium text-lg">{isAddingTraveller ? "Add New Traveller" : "Edit Traveller"}</h3>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="traveller-name">Full Name</Label>
                      <Input
                        id="traveller-name"
                        value={editingTraveller.name}
                        onChange={(e) => setEditingTraveller({ ...editingTraveller, name: e.target.value })}
                        placeholder="Enter full name as per ID"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="traveller-age">Age</Label>
                        <Input
                          id="traveller-age"
                          type="number"
                          min="1"
                          max="120"
                          value={editingTraveller.age}
                          onChange={(e) => setEditingTraveller({ ...editingTraveller, age: e.target.value })}
                          placeholder="Age"
                          required
                        />
                      </div>

                      <div>
                        <Label>Gender</Label>
                        <RadioGroup
                          value={editingTraveller.gender}
                          onValueChange={(value) =>
                            setEditingTraveller({
                              ...editingTraveller,
                              gender: value as "male" | "female" | "other",
                            })
                          }
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
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="other" id="other" />
                            <Label htmlFor="other">Other</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="berth-preference">Berth Preference (Optional)</Label>
                      <select
                        id="berth-preference"
                        className="w-full p-2 border rounded-md"
                        value={editingTraveller.berth || ""}
                        onChange={(e) => setEditingTraveller({ ...editingTraveller, berth: e.target.value })}
                      >
                        <option value="">No preference</option>
                        <option value="Lower">Lower</option>
                        <option value="Middle">Middle</option>
                        <option value="Upper">Upper</option>
                        <option value="Side Lower">Side Lower</option>
                        <option value="Side Upper">Side Upper</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 mt-4">
                    <Button type="button" variant="outline" onClick={handleCancelEditTraveller}>
                      Cancel
                    </Button>
                    <Button type="button" onClick={handleSaveTraveller}>
                      Save
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    {travellers.map((traveller) => (
                      <div key={traveller.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                            {traveller.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium">{traveller.name}</div>
                            <div className="text-sm text-gray-600">
                              {traveller.gender === "male"
                                ? "Male"
                                : traveller.gender === "female"
                                  ? "Female"
                                  : "Other"}{" "}
                              • {traveller.age} yrs
                              {traveller.berth && ` • ${traveller.berth} berth`}
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditTraveller(traveller)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          {travellers.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteTraveller(traveller.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {travellers.length < 6 && (
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full mt-4 flex items-center justify-center"
                      onClick={handleAddTraveller}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Traveller
                    </Button>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          {/* Contact Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Contact Details</CardTitle>
              <CardDescription>Your booking details will be sent to these contact details</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  value={contactDetails.mobile}
                  onChange={handleContactChange}
                  placeholder="Enter 10-digit mobile number"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={contactDetails.email}
                  onChange={handleContactChange}
                  placeholder="Enter email address"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Billing Address */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Billing Address</CardTitle>
            </CardHeader>

            <CardContent>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={contactDetails.address}
                  onChange={handleContactChange}
                  placeholder="Enter your address"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Booking Summary */}
        <div className="space-y-6">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="text-xl">Booking Summary</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">Train Details</h3>
                <p className="text-sm text-gray-600">
                  {trainNumber} - {trainName}
                </p>
                <p className="text-sm text-gray-600">
                  {fromStation} → {toStation} • {date} • {classType}
                </p>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium">Fare Details</h3>
                <div className="space-y-2 mt-2">
                  <div className="flex justify-between text-sm">
                    <span>
                      Base Fare ({travellers.length} traveller{travellers.length > 1 ? "s" : ""})
                    </span>
                    <span>₹{basePrice * travellers.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>GST</span>
                    <span>₹{gst * travellers.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Convenience Fee</span>
                    <span>₹{convenienceFee}</span>
                  </div>
                  {wantTravelGuarantee && (
                    <div className="flex justify-between text-sm">
                      <span>Travel Guarantee</span>
                      <span>₹{Math.floor(basePrice * 0.1)}</span>
                    </div>
                  )}
                </div>
                <div className="flex justify-between font-bold mt-4 pt-2 border-t">
                  <span>Total Amount</span>
                  <span>
                    ₹{totalPrice * travellers.length + (wantTravelGuarantee ? Math.floor(basePrice * 0.1) : 0)}
                  </span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200 flex items-start">
                  <Shield className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-800">Travel Guarantee</h4>
                    <p className="text-sm text-green-700">
                      Get a confirmed ticket or 3X refund if ticket remains fully waitlisted
                    </p>

                    <div className="mt-3">
                      <RadioGroup
                        value={wantTravelGuarantee ? "yes" : "no"}
                        onValueChange={(value) => setWantTravelGuarantee(value === "yes")}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="guarantee-yes" />
                          <Label htmlFor="guarantee-yes">Yes, I want Travel Guarantee</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="guarantee-no" />
                          <Label htmlFor="guarantee-no">No, I don't want Travel Guarantee</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
                Proceed to Payment
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </form>
  )
}
