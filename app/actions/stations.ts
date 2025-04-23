"use server"

import type { Station } from "@/lib/stations"

// Cache the stations data to avoid fetching it multiple times
let stationsCache: Station[] | null = null

export async function fetchStations(): Promise<Station[]> {
  if (stationsCache) {
    return stationsCache
  }

  try {
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/stations-nMptIMJNSeMUcwZwzrFjBLxj0vQInf.csv",
    )
    const csvText = await response.text()

    // Parse CSV
    const lines = csvText.split("\n")
    const headers = lines[0].split(",")

    const stations: Station[] = []

    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue

      const values = lines[i].split(",")

      stations.push({
        id: values[0] || "",
        code: values[1] || "",
        name: values[2] || "",
        zone: values[3] || "",
        address: values[4] || "",
      })
    }

    // Sort stations by name for better usability
    stations.sort((a, b) => a.name.localeCompare(b.name))

    // Cache the result
    stationsCache = stations
    return stations
  } catch (error) {
    console.error("Error fetching stations data:", error)
    return []
  }
}

export async function searchStationsServer(query: string): Promise<Station[]> {
  const stations = await fetchStations()

  if (!query.trim()) return []

  const lowerQuery = query.toLowerCase()

  return stations
    .filter(
      (station) =>
        station.name.toLowerCase().includes(lowerQuery) ||
        station.code.toLowerCase().includes(lowerQuery) ||
        station.address.toLowerCase().includes(lowerQuery),
    )
    .slice(0, 10) // Limit to 10 results for performance
}
