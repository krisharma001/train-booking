import { Header } from "@/components/header"
import { TrainInfo } from "@/components/train-info"
import { TicketFareForm } from "@/components/ticket-fare-form"
import { SeatAvailabilityForm } from "@/components/seat-availability-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TrainDetailsPageProps {
  params: {
    trainId: string
  }
}

export default function TrainDetailsPage({ params }: TrainDetailsPageProps) {
  const { trainId } = params

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-6">Train Details</h1>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <TrainInfo trainId={trainId} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <Tabs defaultValue="availability" className="w-full">
            <div className="border-b">
              <TabsList className="flex h-10 items-center justify-start px-4 w-full bg-transparent">
                <TabsTrigger
                  value="availability"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                  Seat Availability
                </TabsTrigger>
                <TabsTrigger
                  value="fare"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                  Fare Calculator
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="availability" className="p-6">
              <SeatAvailabilityForm trainNumber={trainId} />
            </TabsContent>
            <TabsContent value="fare" className="p-6">
              <TicketFareForm trainNumber={trainId} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}
