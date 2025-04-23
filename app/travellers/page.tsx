import { Header } from "@/components/header"
import { TravellersContent } from "@/components/travellers-content"

export default function TravellersPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <TravellersContent />
    </main>
  )
}
