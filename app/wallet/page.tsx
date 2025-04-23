import { Header } from "@/components/header"
import { WalletContent } from "@/components/wallet-content"

export default function WalletPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <WalletContent />
    </main>
  )
}
