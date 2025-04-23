import { Header } from "@/components/header"
import { SeatAvailabilityForm } from "@/components/seat-availability-form"
import { TrainInfo } from "@/components/train-info"

interface SeatAvailabilityPageProps {
  params: {
    trainId: string
  }
}

export default function SeatAvailabilityPage({ params }: SeatAvailabilityPageProps) {
  const { trainId } = params

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
      </div>
    </main>
  )
}
