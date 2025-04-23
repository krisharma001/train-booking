import { Header } from "@/components/header"
import { SearchByStationForm } from "@/components/search-by-station-form"
import { StationTrainsList } from "@/components/station-trains-list"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function SearchByStationPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="w-full bg-gradient-to-r from-purple-900 to-purple-700 py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white text-center mb-8">Asafpur (AFR) Railway Station</h1>

          <div className="bg-white rounded-lg shadow-md overflow-hidden p-4">
            <SearchByStationForm />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center text-sm mb-4">
          <Link href="/" className="text-primary hover:underline">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-1 text-gray-500" />
          <Link href="/stations" className="text-primary hover:underline">
            Stations
          </Link>
          <ChevronRight className="h-4 w-4 mx-1 text-gray-500" />
          <span className="text-gray-700">Asafpur (AFR)</span>
        </div>

        <h2 className="text-2xl font-bold mb-6">Trains from Asafpur (AFR) Railway Station</h2>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Station Details</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Code</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">City</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Total trains</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-700">AFR</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Asafpur</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Asafpur</td>
                    <td className="px-4 py-3 text-sm text-gray-700">18</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <StationTrainsList />

        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Why book Train Tickets with TrainGo?</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="text-primary">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M8 12L11 15L16 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>Seamless Train Ticket Bookings</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-primary">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M8 12L11 15L16 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>Confirmed Ticket or 3X Refund</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-primary">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>Free Cancellation & Instant Refunds</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-primary">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="9"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>Live Train Status with Delay Prediction</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-primary">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12H22"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>IRCTC Authorised Partner</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
