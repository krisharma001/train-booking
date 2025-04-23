import Image from "next/image"
import { Shield } from "lucide-react"

export function PromoSection() {
  return (
    <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 shadow-sm">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="mb-6 md:mb-0 md:mr-6">
          <Image
            src="/placeholder.svg?height=200&width=200"
            alt="Promotional image"
            width={200}
            height={200}
            className="rounded-lg"
          />
        </div>

        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center bg-green-600 text-white px-4 py-2 rounded-full mb-4">
            <Shield className="h-5 w-5 mr-2" />
            <span className="font-medium">Travel Guarantee</span>
          </div>

          <h2 className="text-3xl font-bold mb-2">
            Get Confirmed Ticket <br />
            or 3X Refund<sup className="text-sm">*</sup>
          </h2>

          <p className="text-sm text-gray-600">*T&C Apply</p>
        </div>
      </div>
    </div>
  )
}
