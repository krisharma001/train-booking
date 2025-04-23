import { Header } from "@/components/header"
import { UserProfileContent } from "@/components/user/user-profile-content"

export default function UserProfilePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <UserProfileContent />
    </main>
  )
}
