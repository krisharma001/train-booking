"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserNav } from "@/components/user/user-nav"
import { User, Mail, Phone, MapPin, Calendar, CreditCard, Bell, Shield, Lock } from "lucide-react"

export function UserProfileContent() {
  const [activeTab, setActiveTab] = useState("personal")
  const [isEditing, setIsEditing] = useState(false)

  const [formData, setFormData] = useState({
    firstName: "Krish",
    lastName: "Sharma",
    email: "krish.sharma@example.com",
    phone: "+91 98765 43210",
    dateOfBirth: "1990-05-15",
    address: "123 Railway Colony, New Delhi",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110001",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    // In a real app, you would save the data to the server here
    setIsEditing(false)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64">
          <UserNav activeItem="profile" />

          <div className="bg-white rounded-lg shadow-sm mt-6 overflow-hidden">
            <div className="p-4 border-b">
              <h3 className="font-medium">Account Settings</h3>
            </div>
            <div className="p-0">
              <button
                className={`w-full text-left px-4 py-3 ${activeTab === "personal" ? "bg-orange-50 text-orange-600" : "hover:bg-gray-50"}`}
                onClick={() => setActiveTab("personal")}
              >
                Personal Information
              </button>
              <button
                className={`w-full text-left px-4 py-3 ${activeTab === "security" ? "bg-orange-50 text-orange-600" : "hover:bg-gray-50"}`}
                onClick={() => setActiveTab("security")}
              >
                Security
              </button>
              <button
                className={`w-full text-left px-4 py-3 ${activeTab === "payment" ? "bg-orange-50 text-orange-600" : "hover:bg-gray-50"}`}
                onClick={() => setActiveTab("payment")}
              >
                Payment Methods
              </button>
              <button
                className={`w-full text-left px-4 py-3 ${activeTab === "notifications" ? "bg-orange-50 text-orange-600" : "hover:bg-gray-50"}`}
                onClick={() => setActiveTab("notifications")}
              >
                Notifications
              </button>
              <button
                className={`w-full text-left px-4 py-3 ${activeTab === "privacy" ? "bg-orange-50 text-orange-600" : "hover:bg-gray-50"}`}
                onClick={() => setActiveTab("privacy")}
              >
                Privacy
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">
                {activeTab === "personal" && "Personal Information"}
                {activeTab === "security" && "Security Settings"}
                {activeTab === "payment" && "Payment Methods"}
                {activeTab === "notifications" && "Notification Preferences"}
                {activeTab === "privacy" && "Privacy Settings"}
              </h2>

              {activeTab === "personal" && (
                <Button
                  variant={isEditing ? "default" : "outline"}
                  onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                >
                  {isEditing ? "Save Changes" : "Edit Profile"}
                </Button>
              )}
            </div>

            {activeTab === "personal" && (
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
                      <Image
                        src="/placeholder-user.jpg"
                        alt="Profile"
                        width={128}
                        height={128}
                        className="object-cover"
                      />
                    </div>
                    {isEditing && (
                      <Button size="sm" className="absolute bottom-0 right-0">
                        Change
                      </Button>
                    )}
                  </div>

                  <div className="flex-1 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="pl-10"
                            disabled={!isEditing}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="pl-10"
                            disabled={!isEditing}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="pl-10"
                            disabled={!isEditing}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="pl-10"
                            disabled={!isEditing}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="dateOfBirth"
                            name="dateOfBirth"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            className="pl-10"
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          className="pl-10"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="pincode">PIN Code</Label>
                        <Input
                          id="pincode"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="p-6 space-y-6">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Lock className="h-5 w-5 text-gray-500 mr-3" />
                      <div>
                        <h3 className="font-medium">Password</h3>
                        <p className="text-sm text-gray-500">Last changed 3 months ago</p>
                      </div>
                    </div>
                    <Button variant="outline">Change Password</Button>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-gray-500 mr-3" />
                      <div>
                        <h3 className="font-medium">Two-Factor Authentication</h3>
                        <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                      </div>
                    </div>
                    <Button variant="outline">Enable</Button>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 text-gray-500 mr-3" />
                      <div>
                        <h3 className="font-medium">Connected Accounts</h3>
                        <p className="text-sm text-gray-500">Manage your connected social accounts</p>
                      </div>
                    </div>
                    <Button variant="outline">Manage</Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "payment" && (
              <div className="p-6">
                <div className="text-center py-8">
                  <CreditCard className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No payment methods added yet</h3>
                  <p className="text-gray-500 mb-4">Add a payment method to enable faster checkout</p>
                  <Button>Add Payment Method</Button>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="p-6 space-y-6">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Bell className="h-5 w-5 text-gray-500 mr-3" />
                      <div>
                        <h3 className="font-medium">Email Notifications</h3>
                        <p className="text-sm text-gray-500">Receive booking confirmations and updates</p>
                      </div>
                    </div>
                    <div className="relative inline-block w-12 h-6 rounded-full bg-gray-200">
                      <input type="checkbox" className="sr-only" id="email-toggle" defaultChecked />
                      <span className="absolute inset-y-0 left-0 w-6 h-6 rounded-full bg-white border border-gray-300 transition-transform duration-300 ease-in-out transform translate-x-0 checked:translate-x-6"></span>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Bell className="h-5 w-5 text-gray-500 mr-3" />
                      <div>
                        <h3 className="font-medium">SMS Notifications</h3>
                        <p className="text-sm text-gray-500">Receive booking alerts on your phone</p>
                      </div>
                    </div>
                    <div className="relative inline-block w-12 h-6 rounded-full bg-gray-200">
                      <input type="checkbox" className="sr-only" id="sms-toggle" />
                      <span className="absolute inset-y-0 left-0 w-6 h-6 rounded-full bg-white border border-gray-300 transition-transform duration-300 ease-in-out transform translate-x-0"></span>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Bell className="h-5 w-5 text-gray-500 mr-3" />
                      <div>
                        <h3 className="font-medium">Marketing Communications</h3>
                        <p className="text-sm text-gray-500">Receive offers and promotional emails</p>
                      </div>
                    </div>
                    <div className="relative inline-block w-12 h-6 rounded-full bg-gray-200">
                      <input type="checkbox" className="sr-only" id="marketing-toggle" />
                      <span className="absolute inset-y-0 left-0 w-6 h-6 rounded-full bg-white border border-gray-300 transition-transform duration-300 ease-in-out transform translate-x-0"></span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "privacy" && (
              <div className="p-6 space-y-6">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-gray-500 mr-3" />
                      <div>
                        <h3 className="font-medium">Profile Visibility</h3>
                        <p className="text-sm text-gray-500">Control who can see your profile information</p>
                      </div>
                    </div>
                    <Button variant="outline">Manage</Button>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-gray-500 mr-3" />
                      <div>
                        <h3 className="font-medium">Data Usage</h3>
                        <p className="text-sm text-gray-500">Manage how your data is used</p>
                      </div>
                    </div>
                    <Button variant="outline">Manage</Button>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-gray-500 mr-3" />
                      <div>
                        <h3 className="font-medium">Delete Account</h3>
                        <p className="text-sm text-gray-500">Permanently delete your account and all data</p>
                      </div>
                    </div>
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
