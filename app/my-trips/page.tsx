import { Header } from "@/components/header"
import { MyTripsContent } from "@/components/my-trips-content"

export default function MyTripsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <MyTripsContent />
    </main>
  )
}
