"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowRight, CreditCard, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function WalletContent() {
  const [activeTab, setActiveTab] = useState("trainiac-money")

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="bg-black text-white rounded-lg p-8 text-center mb-6">
        <h2 className="text-lg font-medium mb-2">Available Balance</h2>
        <div className="text-5xl font-bold mb-6">₹0</div>

        <Button className="bg-white text-black hover:bg-gray-100 rounded-full">
          <div className="flex items-center">
            <Image
              src="/placeholder.svg?height=24&width=24"
              alt="AU"
              width={24}
              height={24}
              className="rounded-full mr-2"
            />
            <span>Get the Trainiac AU credit card to save flat 10%</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </div>
        </Button>
      </div>

      <div className="bg-white rounded-full shadow-md p-1 mb-8 flex justify-center">
        <Tabs defaultValue="trainiac-money" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="trainiac-money" className="rounded-full py-3">
              <Wallet className="h-5 w-5 mr-2" />
              Trainiac money
            </TabsTrigger>
            <TabsTrigger value="trainiac-card" className="rounded-full py-3">
              <CreditCard className="h-5 w-5 mr-2" />
              Trainiac AU Card
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Featured Options</h2>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-full mr-4">
                <Image src="/placeholder.svg?height=32&width=32" alt="Loan" width={32} height={32} />
              </div>
              <div>
                <h3 className="font-medium">Personal Loan</h3>
                <p className="text-sm text-gray-600">Instant loans powered by Moneyfy</p>
              </div>
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600">Apply Now</Button>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Offers for you</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-purple-100 rounded-lg overflow-hidden relative h-48">
            <div className="p-4">
              <Image
                src="/placeholder.svg?height=24&width=80"
                alt="Akasa Air"
                width={80}
                height={24}
                className="mb-2"
              />
              <p className="font-medium">Domestic fares starting @ ₹1,699</p>
              <p className="text-sm mt-2">
                Up to <span className="font-bold">15% Off</span> on International Flights
              </p>
              <p className="text-xs mt-4">Valid till 2nd Apr'25</p>
            </div>
            <div className="absolute right-0 bottom-0">
              <Image src="/placeholder.svg?height=120&width=120" alt="Offer" width={120} height={120} />
            </div>
          </div>

          <div className="bg-black rounded-lg overflow-hidden relative h-48 text-white">
            <div className="p-4">
              <h3 className="font-bold text-lg">
                Lifetime Free<sup>*</sup>
              </h3>
              <p className="font-medium">Trainiac AU Credit Card</p>
              <ul className="mt-4 space-y-1 text-sm">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                  ₹1500 Joining Bonus
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                  10% Off on Bookings
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                  Zero Forex Markup
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                  Free Lounge Access
                </li>
              </ul>
            </div>
            <div className="absolute right-0 bottom-0">
              <Image src="/placeholder.svg?height=80&width=80" alt="Card" width={80} height={80} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">What's New?</h2>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <Image
            src="/placeholder.svg?height=200&width=100%"
            alt="New Feature"
            width={800}
            height={200}
            className="w-full h-auto rounded"
          />
        </div>
      </div>
    </div>
  )
}
