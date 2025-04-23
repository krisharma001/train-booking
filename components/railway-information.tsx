import Link from "next/link"
import { Train, FileText, Activity, Clock } from "lucide-react"

export function RailwayInformation() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold mb-4">Railway Information</h2>
      <div className="space-y-4">
        <Link href="/" className="flex items-center text-primary hover:underline">
          <Train className="h-5 w-5 mr-2 text-primary" />
          IRCTC Train Booking
        </Link>
        <Link href="/pnr-status" className="flex items-center text-primary hover:underline">
          <FileText className="h-5 w-5 mr-2 text-primary" />
          PNR Status Enquiry
        </Link>
        <Link href="/running-status" className="flex items-center text-primary hover:underline">
          <Activity className="h-5 w-5 mr-2 text-primary" />
          Train Running Status
        </Link>
        <Link href="/tatkal-reservation" className="flex items-center text-primary hover:underline">
          <Clock className="h-5 w-5 mr-2 text-primary" />
          Tatkal Railway Reservation
        </Link>
      </div>
    </div>
  )
}
