import { Header } from "@/components/header"
import { SeatAvailabilityForm } from "@/components/seat-availability-form"
import { TrainInfo } from "@/components/train-info"
import { SeatAvailabilityCalendar } from "@/components/seat-availability-calendar"

interface SeatAvailabilityPageProps {
  params: {
    trainId: string
  }
  searchParams: {
    from?: string
    to?: string
    class?: string
  }
}

export default function SeatAvailabilityPage({ params, searchParams }: SeatAvailabilityPageProps) {
  const { trainId } = params
  const fromStation = searchParams.from || ""
  const toStation = searchParams.to || ""
  const classType = searchParams.class || ""

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-6">Seat Availability</h1>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <TrainInfo trainId={trainId} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Check Seat Availability</h2>
            <SeatAvailabilityForm trainNumber={trainId} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Available Seats</h2>
            <SeatAvailabilityCalendar
              trainNumber={trainId}
              fromStation={fromStation}
              toStation={toStation}
              classType={classType}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
