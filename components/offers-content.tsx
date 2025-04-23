"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Offer {
  id: string
  type: "flights" | "hotels" | "bus"
  title: string
  description?: string
  expiry?: string
  image: string
  tag?: string
  code?: string
  codeRequired: boolean
}

export function OffersContent() {
  const [activeTab, setActiveTab] = useState("all")
  const [selectedJourney, setSelectedJourney] = useState<string | null>(null)
  const [selectedBanks, setSelectedBanks] = useState<string[]>([])

  const offers: Offer[] = [
    {
      id: "1",
      type: "flights",
      title: "Get Flat 8% Off On International Flights with OneCard Credit Card + Interest Free EMI",
      expiry: "Wed, 30 Apr",
      image: "/placeholder.svg?height=200&width=400",
      tag: "1",
      code: "ONEEMIN",
      codeRequired: true,
    },
    {
      id: "2",
      type: "flights",
      title: "Akasa Air Payday Sale is Live Now!",
      image: "/placeholder.svg?height=200&width=400",
      codeRequired: false,
    },
    {
      id: "3",
      type: "flights",
      title: "Fly to Vietnam starting at just ₹3,000 with Vietnam Airlines",
      image: "/placeholder.svg?height=200&width=400",
      tag: "Just Launched",
      codeRequired: false,
    },
    {
      id: "4",
      type: "flights",
      title: "Book your matchday Flights & get up to ₹1000 off",
      expiry: "Sun, 25 May",
      image: "/placeholder.svg?height=200&width=400",
      codeRequired: false,
    },
    {
      id: "5",
      type: "hotels",
      title: "Get Flat 15% Off up to ₹1000 on Hotel Bookings",
      expiry: "Wed, 31 Dec",
      image: "/placeholder.svg?height=200&width=400",
      codeRequired: false,
    },
    {
      id: "6",
      type: "hotels",
      title: "Lenskart Gold Membership T&Cs",
      expiry: "Mon, 30 Jun",
      image: "/placeholder.svg?height=200&width=400",
      tag: "FREE Lenskart GOLD MAX",
      codeRequired: false,
    },
  ]

  const filteredOffers = offers.filter((offer) => {
    if (activeTab !== "all" && offer.type !== activeTab) return false
    if (selectedJourney === "domestic" && offer.title.includes("International")) return false
    if (selectedJourney === "international" && !offer.title.includes("International")) return false
    if (selectedBanks.length > 0) {
      const bankMatches = selectedBanks.some((bank) => {
        if (bank === "onecard" && offer.title.includes("OneCard")) return true
        if (bank === "au" && offer.title.includes("AU")) return true
        if (bank === "kotak" && offer.title.includes("Kotak")) return true
        if (bank === "federal" && offer.title.includes("Federal")) return true
        if (bank === "upi" && offer.title.includes("UPI")) return true
        return false
      })
      if (!bankMatches) return false
    }
    return true
  })

  const toggleBank = (bank: string) => {
    if (selectedBanks.includes(bank)) {
      setSelectedBanks(selectedBanks.filter((b) => b !== bank))
    } else {
      setSelectedBanks([...selectedBanks, bank])
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center text-sm mb-4">
        <Link href="/" className="text-blue-600 hover:underline">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">Offers</span>
      </div>

      <div className="flex justify-end mb-6">
        <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-auto">
          <TabsList className="bg-white border rounded-full p-1">
            <TabsTrigger value="all" className="rounded-full px-4 py-2 data-[state=active]:bg-blue-50">
              All Offers
            </TabsTrigger>
            <TabsTrigger value="flights" className="rounded-full px-4 py-2 data-[state=active]:bg-blue-50">
              Flights
            </TabsTrigger>
            <TabsTrigger value="trains" className="rounded-full px-4 py-2 data-[state=active]:bg-blue-50">
              Trains
            </TabsTrigger>
            <TabsTrigger value="hotels" className="rounded-full px-4 py-2 data-[state=active]:bg-blue-50">
              Hotels
            </TabsTrigger>
            <TabsTrigger value="bus" className="rounded-full px-4 py-2 data-[state=active]:bg-blue-50">
              Bus Offers
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <h1 className="text-3xl font-bold mb-8">Trainiac Offers | Flight, Train, Bus and Hotel Deals</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-6">Filters</h2>

            <div className="border-t pt-4 pb-6">
              <h3 className="font-medium mb-4">Journey Type</h3>
              <div className="grid grid-cols-2 gap-4">
                <div
                  className={`border rounded-lg p-3 text-center cursor-pointer ${selectedJourney === "domestic" ? "border-primary bg-primary/5" : ""}`}
                  onClick={() => setSelectedJourney(selectedJourney === "domestic" ? null : "domestic")}
                >
                  <div className="font-medium">Domestic</div>
                  <div className="text-sm text-gray-500">23 Offers</div>
                </div>
                <div
                  className={`border rounded-lg p-3 text-center cursor-pointer ${selectedJourney === "international" ? "border-primary bg-primary/5" : ""}`}
                  onClick={() => setSelectedJourney(selectedJourney === "international" ? null : "international")}
                >
                  <div className="font-medium">International</div>
                  <div className="text-sm text-gray-500">24 Offers</div>
                </div>
              </div>
            </div>

            <div className="border-t pt-4 pb-6">
              <h3 className="font-medium mb-4">Popular Banks</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white mr-3">
                      1
                    </div>
                    <span>OneCard</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-2">3 Offers</span>
                    <Checkbox
                      checked={selectedBanks.includes("onecard")}
                      onCheckedChange={() => toggleBank("onecard")}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white mr-3">
                      AU
                    </div>
                    <span>AU Bank</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-2">2 Offers</span>
                    <Checkbox checked={selectedBanks.includes("au")} onCheckedChange={() => toggleBank("au")} />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white mr-3">
                      K
                    </div>
                    <span>Kotak Bank</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-2">2 Offers</span>
                    <Checkbox checked={selectedBanks.includes("kotak")} onCheckedChange={() => toggleBank("kotak")} />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white mr-3">
                      F
                    </div>
                    <span>Federal Bank Credit Card EMI</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-2">2 Offers</span>
                    <Checkbox
                      checked={selectedBanks.includes("federal")}
                      onCheckedChange={() => toggleBank("federal")}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 mr-3">
                      UPI
                    </div>
                    <span>UPI</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-2">1 Offer</span>
                    <Checkbox checked={selectedBanks.includes("upi")} onCheckedChange={() => toggleBank("upi")} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredOffers.map((offer) => (
              <div key={offer.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="relative">
                  <Image
                    src={offer.image || "/placeholder.svg"}
                    alt={offer.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  {offer.expiry && (
                    <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                      Expiry : {offer.expiry}
                    </div>
                  )}
                  {offer.tag && (
                    <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-2 py-1 rounded">
                      {offer.tag}
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex items-center mb-3">
                    <div className="bg-blue-100 text-blue-600 rounded-full px-3 py-1 text-sm">
                      <div className="flex items-center">
                        <Image
                          src="/placeholder.svg?height=16&width=16"
                          alt="Flight"
                          width={16}
                          height={16}
                          className="mr-1"
                        />
                        {offer.type.charAt(0).toUpperCase() + offer.type.slice(1)}
                      </div>
                    </div>
                  </div>

                  <h3 className="font-bold text-lg mb-4">{offer.title}</h3>

                  {offer.code && (
                    <div className="flex items-center mb-4">
                      <div className="bg-gray-100 border px-3 py-2 rounded flex-1 font-mono">{offer.code}</div>
                      <Button variant="ghost" className="ml-2">
                        <Image src="/placeholder.svg?height=24&width=24" alt="Copy" width={24} height={24} />
                      </Button>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    {offer.codeRequired ? <div className="text-sm">No Offer Code Required</div> : <div></div>}
                    <Button variant="link" className="text-orange-500 flex items-center">
                      Details <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
