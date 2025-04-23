import { Header } from "@/components/header"
import { SeatAvailabilitySearch } from "@/components/seat-availability-search"
import { RecentSearches } from "@/components/recent-searches"
import { RailwayInformation } from "@/components/railway-information"
import { TopTrainRoutes } from "@/components/top-train-routes"
import { SeatAvailabilityTabs } from "@/components/seat-availability-tabs"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function SeatAvailabilityPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm mb-4">
          <Link href="/" className="text-primary hover:underline">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-1 text-gray-500" />
          <Link href="/trains" className="text-primary hover:underline">
            Trains
          </Link>
          <ChevronRight className="h-4 w-4 mx-1 text-gray-500" />
          <span className="text-gray-700">Train Seat Availability</span>
        </div>

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Check Seat Availability</h1>
          <div className="flex items-center text-blue-800">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path
                d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-semibold">IRCTC Authorised Partner</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <SeatAvailabilityTabs activeTab="seat-availability" />

        {/* Search Box */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <SeatAvailabilitySearch />
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <RecentSearches />

            <div>
              <h2 className="text-xl font-bold mb-4">Train Seat Availability</h2>
              <p className="text-gray-700 mb-4">
                Whenever it's travel time, everyone seems to go in overdrive for finding out{" "}
                <strong>train seat availability</strong>. So beat the crowd and book your ticket as early as possible.
                However, booking tickets in advance is a good option only if you are sure about your travel plans. For
                many travellers, this is often not the case.
              </p>

              <h2 className="text-xl font-bold mb-4">Check Train Seat Availability Online</h2>
              <p className="text-gray-700 mb-2">
                To check train <strong>seat availability</strong>, follow the steps mentioned below:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Enter your Source and destination station</li>
                <li>
                  Choose the date of journey. In case your travel date is tomorrow, you can also opt for the{" "}
                  <Link href="/tatkal-reservation" className="text-primary hover:underline">
                    tatkal ticket booking
                  </Link>
                </li>
                <li>
                  Enter "Search Trains" and the list of trains, running dates, and their seat availability will be
                  displayed on the screen.
                </li>
                <li>
                  Choose your train and preferred class from the list to complete your{" "}
                  <Link href="/" className="text-primary hover:underline">
                    train ticket booking
                  </Link>
                  .
                </li>
              </ul>
              <p className="text-gray-700">
                Train Seat Availability in a train may differ for you while choosing from different train ticket booking
                quotas.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <RailwayInformation />
            <TopTrainRoutes />
          </div>
        </div>
      </div>
    </main>
  )
}
