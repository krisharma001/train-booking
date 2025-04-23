import { Header } from "@/components/header"
import { FoodOrderForm } from "@/components/food-order-form"
import { FoodMenuList } from "@/components/food-menu-list"

export default function IrctcFoodPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-6">IRCTC Food Booking</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-20">
              <div className="p-6">
                <FoodOrderForm />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <FoodMenuList />
          </div>
        </div>
      </div>
    </main>
  )
}
