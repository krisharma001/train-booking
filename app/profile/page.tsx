import { Header } from "@/components/header"
import { ProfileContent } from "@/components/profile-content"

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <ProfileContent />
    </main>
  )
}
