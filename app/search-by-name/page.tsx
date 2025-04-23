import { Header } from "@/components/header"
import { SearchByNameContent } from "@/components/search-by-name-content"

export default function SearchByNamePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <SearchByNameContent />
    </main>
  )
}
