import Link from "next/link"

const topRoutes = [
  {
    from: "New Delhi",
    to: "Ayodhya",
    href: "/trains/new-delhi-to-ayodhya",
  },
  {
    from: "Varanasi",
    to: "Ayodhya",
    href: "/trains/varanasi-to-ayodhya",
  },
  {
    from: "Mumbai",
    to: "Goa",
    href: "/trains/mumbai-to-goa",
  },
]

export function TopTrainRoutes() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold mb-4">Top Train Routes</h2>
      <div className="space-y-3">
        {topRoutes.map((route, index) => (
          <Link key={index} href={route.href} className="block text-primary hover:underline">
            {route.from} to {route.to} Trains
          </Link>
        ))}
      </div>
    </div>
  )
}
