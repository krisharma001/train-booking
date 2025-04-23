import { Suspense } from "react"
import Image from "next/image"
import { SearchForm } from "@/components/search-form"
import { Features } from "@/components/features"
import { PromoSection } from "@/components/promo-section"
import { Header } from "@/components/header"
import { NavigationTabs } from "@/components/navigation-tabs"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <NavigationTabs activeTab="trains" />

        <div className="mt-4 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <h1 className="text-xl font-semibold text-gray-900 mb-4">Train Ticket Booking</h1>
            <div className="flex items-center text-sm text-gray-600 mb-4">
              <Image src="/irctc-logo.svg" alt="IRCTC" width={24} height={24} className="mr-2" />
              IRCTC Authorised Partner
            </div>

            <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading search form...</div>}>
              <SearchForm />
            </Suspense>
          </div>
        </div>

        <PromoSection />
        <Features />
      </div>
    </main>
  )
}
