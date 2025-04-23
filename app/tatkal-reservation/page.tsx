import { Header } from "@/components/header"
import { TatkalSearchForm } from "@/components/tatkal-search-form"
import { TatkalSearchResults } from "@/components/tatkal-search-results"

export default function TatkalReservationPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <TatkalSearchForm />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <button className="px-4 py-2 text-sm font-medium bg-white border rounded-md hover:bg-gray-50 active:bg-primary active:text-white">
                DEPARTURE TIME
              </button>
              <button className="px-4 py-2 text-sm font-medium bg-white border rounded-md hover:bg-gray-50">
                ARRIVAL TIME
              </button>
              <button className="px-4 py-2 text-sm font-medium bg-white border rounded-md hover:bg-gray-50">
                DURATION
              </button>
              <button className="px-4 py-2 text-sm font-medium bg-white border rounded-md hover:bg-gray-50">
                NAME
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm">Show trains with confirmed seats</span>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input type="checkbox" name="toggle" id="toggle" className="sr-only" />
                <label htmlFor="toggle" className="block h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                <span className="absolute inset-y-0 left-0 w-6 h-6 rounded-full bg-white border border-gray-300 transition-transform duration-300 ease-in-out"></span>
              </div>
            </div>
          </div>

          <div className="text-xs text-right text-gray-500">*price is per adult & includes IRCTC taxes and fees</div>

          <div className="bg-gradient-to-r from-orange-400 to-orange-600 rounded-lg p-4 flex items-center">
            <input type="checkbox" className="h-5 w-5 mr-3" />
            <div className="text-white font-medium">
              Get a full train fare refund
              <span className="ml-2 text-sm font-normal">₹0 cancellation fee</span>
            </div>
            <div className="ml-auto">
              <img src="/placeholder.svg?height=40&width=40" alt="Shield" className="h-10 w-10" />
            </div>
          </div>

          <TatkalSearchResults />
        </div>
      </div>
    </main>
  )
}
