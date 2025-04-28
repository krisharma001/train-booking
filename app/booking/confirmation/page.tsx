"use client"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function BookingConfirmationPage() {
  const searchParams = useSearchParams()
  const pnr = searchParams.get("pnr") || "IRCTC" + Math.floor(Math.random() * 10000000)

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>

          <h1 className="text-2xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600 mb-6">Your ticket has been booked successfully.</p>

          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <div className="mb-4">
              <span className="text-gray-500 text-sm">PNR Number</span>
              <p className="text-xl font-bold">{pnr}</p>
            </div>

            <p className="text-sm text-gray-600">
              You will receive a confirmation email and SMS with your booking details shortly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild>
              <Link href="/">Return to Home</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/my-trips">View My Bookings</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
