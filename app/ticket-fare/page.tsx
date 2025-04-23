import { Header } from "@/components/header"
import { TicketFareForm } from "@/components/ticket-fare-form"

export default function TicketFarePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-6">Train Ticket Fare Calculator</h1>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <TicketFareForm />
          </div>
        </div>
      </div>
    </main>
  )
}
