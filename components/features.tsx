import Link from "next/link"
import { Activity, FileText, Search, MapPin, Map, Clock, Train, Utensils } from "lucide-react"

const features = [
  {
    id: "running-status",
    icon: <Activity className="h-6 w-6 text-blue-500" />,
    label: "Running Status",
    href: "/running-status",
    badge: "LIVE",
  },
  {
    id: "pnr-status",
    icon: <FileText className="h-6 w-6 text-blue-500" />,
    label: "PNR Status Enquiry",
    href: "/pnr-status",
  },
  {
    id: "seat-availability",
    icon: <Clock className="h-6 w-6 text-blue-500" />,
    label: "Train Seat Availability",
    href: "/seat-availability",
  },
  {
    id: "search-by-name",
    icon: <Search className="h-6 w-6 text-blue-500" />,
    label: "Search By Name/Number",
    href: "/search-by-name",
  },
  {
    id: "search-by-station",
    icon: <MapPin className="h-6 w-6 text-blue-500" />,
    label: "Search By Station",
    href: "/search-by-station",
  },
  {
    id: "platform-locator",
    icon: <Map className="h-6 w-6 text-blue-500" />,
    label: "Train Platform Locator",
    href: "/platform-locator",
  },
  {
    id: "tatkal-reservation",
    icon: <Clock className="h-6 w-6 text-blue-500" />,
    label: "Tatkal Railway Reservation",
    href: "/tatkal-reservation",
  },
  {
    id: "vande-bharat",
    icon: <Train className="h-6 w-6 text-blue-500" />,
    label: "Vande Bharat Express",
    href: "/vande-bharat",
  },
  {
    id: "irctc-food",
    icon: <Utensils className="h-6 w-6 text-blue-500" />,
    label: "IRCTC Food Booking",
    href: "/irctc-food",
  },
]

export function Features() {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Explore More With TrainGo</h2>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9">
          {features.map((feature) => (
            <Link
              key={feature.id}
              href={feature.href}
              className="flex flex-col items-center justify-center p-4 border-r border-b hover:bg-gray-50 transition-colors text-center h-32"
            >
              <div className="relative">
                {feature.icon}
                {feature.badge && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                    {feature.badge}
                  </span>
                )}
              </div>
              <span className="mt-2 text-sm font-medium text-gray-900">{feature.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
