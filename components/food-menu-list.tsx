"use client"

import { useState } from "react"
import Image from "next/image"
import { Clock, Filter, MapPin, Plus, Star, Utensils, Vegan } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// This would typically come from an API
const mockRestaurants = [
  {
    id: 1,
    name: "Comesum Restaurant",
    rating: 4.2,
    deliveryTime: "30-40 min",
    cuisines: ["North Indian", "South Indian", "Chinese"],
    isVeg: false,
    station: "New Delhi (NDLS)",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "Domino's Pizza",
    rating: 4.5,
    deliveryTime: "25-35 min",
    cuisines: ["Pizza", "Italian", "Fast Food"],
    isVeg: false,
    station: "New Delhi (NDLS)",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "Bikanervala",
    rating: 4.3,
    deliveryTime: "20-30 min",
    cuisines: ["Sweets", "North Indian", "Snacks"],
    isVeg: true,
    station: "New Delhi (NDLS)",
    image: "/placeholder.svg?height=80&width=80",
  },
]

const mockMenuItems = [
  {
    id: 1,
    name: "Veg Thali",
    description: "Rice, 3 Rotis, Dal, Paneer, Curd, Pickle, Sweet",
    price: 180,
    isVeg: true,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Chicken Biryani",
    description: "Aromatic basmati rice cooked with tender chicken pieces and spices",
    price: 220,
    isVeg: false,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Masala Dosa",
    description: "Crispy rice pancake served with potato masala, sambhar and chutney",
    price: 150,
    isVeg: true,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "Paneer Butter Masala",
    description: "Cottage cheese cubes in rich tomato gravy with butter",
    price: 190,
    isVeg: true,
    image: "/placeholder.svg?height=100&width=100",
  },
]

export function FoodMenuList() {
  const [restaurants] = useState(mockRestaurants)
  const [menuItems] = useState(mockMenuItems)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Available Restaurants</h2>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {restaurants.map((restaurant) => (
          <Card key={restaurant.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4 flex items-center gap-4">
                <div className="relative h-20 w-20 rounded-md overflow-hidden">
                  <Image
                    src={restaurant.image || "/placeholder.svg"}
                    alt={restaurant.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-center">
                    <h3 className="font-semibold">{restaurant.name}</h3>
                    {restaurant.isVeg && (
                      <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                        <Vegan className="h-3 w-3 mr-1" />
                        Pure Veg
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <div className="flex items-center bg-green-50 text-green-700 px-1.5 py-0.5 rounded">
                      <Star className="h-3 w-3 fill-green-500 text-green-500 mr-1" />
                      {restaurant.rating}
                    </div>
                    <span className="mx-2">•</span>
                    <Clock className="h-3 w-3 mr-1" />
                    {restaurant.deliveryTime}
                  </div>

                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    {restaurant.station}
                  </div>

                  <div className="flex flex-wrap gap-1 mt-2">
                    {restaurant.cuisines.map((cuisine, index) => (
                      <span key={index} className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                        {cuisine}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 border-t">
              <Button variant="outline" className="w-full">
                <Utensils className="h-4 w-4 mr-2" />
                View Menu
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Popular Menu Items</h2>

        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="veg">Vegetarian</TabsTrigger>
            <TabsTrigger value="non-veg">Non-Vegetarian</TabsTrigger>
            <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
            <TabsTrigger value="meals">Meals</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {menuItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="relative h-24 w-24 rounded-md overflow-hidden">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">{item.name}</h3>
                          <Badge variant={item.isVeg ? "outline" : "default"} className="ml-2">
                            {item.isVeg ? "Veg" : "Non-Veg"}
                          </Badge>
                        </div>

                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>

                        <div className="flex items-center justify-between mt-3">
                          <div className="font-medium">₹{item.price}</div>
                          <Button size="sm" variant="outline">
                            <Plus className="h-4 w-4 mr-1" />
                            Add
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="veg" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {menuItems
                .filter((item) => item.isVeg)
                .map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="relative h-24 w-24 rounded-md overflow-hidden">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold">{item.name}</h3>
                            <Badge variant="outline" className="ml-2">
                              Veg
                            </Badge>
                          </div>

                          <p className="text-sm text-gray-600 mt-1">{item.description}</p>

                          <div className="flex items-center justify-between mt-3">
                            <div className="font-medium">₹{item.price}</div>
                            <Button size="sm" variant="outline">
                              <Plus className="h-4 w-4 mr-1" />
                              Add
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          {/* Other tab contents would follow the same pattern */}
        </Tabs>
      </div>
    </div>
  )
}
