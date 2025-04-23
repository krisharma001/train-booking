"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, ChevronRight, Train } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function MyTripsContent() {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [activeSidebar, setActiveSidebar] = useState("all-bookings")

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex justify-end mb-4">
        <Tabs defaultValue="upcoming" onValueChange={setActiveTab} className="w-auto">
          <TabsList className="grid grid-cols-4 w-auto">
            <TabsTrigger value="upcoming" className="px-4">
              Upcoming
            </TabsTrigger>
            <TabsTrigger value="past" className="px-4">
              Past
            </TabsTrigger>
            <TabsTrigger value="cancelled" className="px-4">
              Cancelled
            </TabsTrigger>
            <TabsTrigger value="failed" className="px-4">
              Failed
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div
            className="p-4 border-b flex items-center justify-between cursor-pointer"
            onClick={() => setActiveSidebar(activeSidebar === "my-trips" ? "" : "my-trips")}
          >
            <div className="flex items-center">
              <Train className="h-5 w-5 mr-2" />
              <span className="font-medium">My Trips</span>
            </div>
            <ChevronDown
              className={`h-5 w-5 transition-transform ${activeSidebar === "my-trips" ? "transform rotate-180" : ""}`}
            />
          </div>

          {activeSidebar === "my-trips" && (
            <div className="p-0">
              <button
                className={`w-full text-left px-4 py-3 ${activeSidebar === "all-bookings" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"}`}
                onClick={() => setActiveSidebar("all-bookings")}
              >
                All Bookings
              </button>
              <button
                className={`w-full text-left px-4 py-3 ${activeSidebar === "flights" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"}`}
                onClick={() => setActiveSidebar("flights")}
              >
                Flights
              </button>
              <button
                className={`w-full text-left px-4 py-3 ${activeSidebar === "trains" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"}`}
                onClick={() => setActiveSidebar("trains")}
              >
                Trains
              </button>
              <button
                className={`w-full text-left px-4 py-3 ${activeSidebar === "hotels" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"}`}
                onClick={() => setActiveSidebar("hotels")}
              >
                Hotels
              </button>
            </div>
          )}
        </div>

        <div>
          {activeTab === "upcoming" && (
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="text-sm text-gray-500 mb-4">Mar 2025</div>

                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <Train className="h-6 w-6 text-blue-600 mr-2" />
                      <div>
                        <h3 className="font-medium">Katihar Jn → Anand Vihar TRM</h3>
                        <div className="text-sm text-gray-600">12487 SEEMANCHAL EXP</div>
                        <div className="text-sm text-gray-600 mt-1">
                          <span className="inline-flex items-center bg-gray-100 px-2 py-0.5 rounded text-xs">
                            M1 55
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">Tue, 25 Mar</div>
                      <Link
                        href="/booking/12487"
                        className="text-primary hover:underline text-sm flex items-center justify-end mt-2"
                      >
                        View Details <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-8">
                  <p className="text-gray-600 mb-2">Want to view your previous bookings?</p>
                  <Button variant="link" className="text-primary">
                    Click here
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "past" && (
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <p className="text-gray-500">No past bookings found</p>
            </div>
          )}

          {activeTab === "cancelled" && (
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <p className="text-gray-500">No cancelled bookings found</p>
            </div>
          )}

          {activeTab === "failed" && (
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <p className="text-gray-500">No failed bookings found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
