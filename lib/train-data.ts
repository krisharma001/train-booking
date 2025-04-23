import type { Station } from "@/lib/stations"

export interface Train {
  trainNo: string
  trainName: string
  sourceStationName: string
  destinationStationName: string
  days: string[]
}

// Cache the train data to avoid fetching it multiple times
let trainDataCache: Train[] | null = null

export async function fetchTrainData(): Promise<Train[]> {
  if (trainDataCache) {
    return trainDataCache
  }

  try {
    // Fetch all parts of the train data
    const [part1_1, part1_2, part2_1, part2_2] = await Promise.all([
      fetch("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/part1.1-8RzWZQFKiFUBA7OSrd9wTh20cbONlv.csv").then(
        (res) => res.text(),
      ),
      fetch("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/part1.2-JywStMc5wYU2fwFDATYeZr88M0zSQD.csv").then(
        (res) => res.text(),
      ),
      fetch("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/part2.1-INuB2ZLVPluiVZnMbqv19H7CRCVPUD.csv").then(
        (res) => res.text(),
      ),
      fetch("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/part2.2-7eYo0AT08rRlMyL7hTjtOURgFXBDQQ.csv").then(
        (res) => res.text(),
      ),
    ])

    // Parse all CSV data
    const allTrains: Train[] = [...parseCSV(part1_1), ...parseCSV(part1_2), ...parseCSV(part2_1), ...parseCSV(part2_2)]

    // Remove duplicates based on train number
    const uniqueTrains = allTrains.reduce((acc: Train[], train) => {
      if (!acc.some((t) => t.trainNo === train.trainNo)) {
        acc.push(train)
      }
      return acc
    }, [])

    // Sort by train number
    uniqueTrains.sort((a, b) => a.trainNo.localeCompare(b.trainNo))

    // Cache the result
    trainDataCache = uniqueTrains
    return uniqueTrains
  } catch (error) {
    console.error("Error fetching train data:", error)
    return []
  }
}

function parseCSV(csvText: string): Train[] {
  const lines = csvText.split("\n")
  const headers = lines[0].split(",")

  const trains: Train[] = []

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue

    const values = lines[i].split(",")

    // Parse days string into array
    const daysString = values[4]?.trim() || ""
    const days = parseDays(daysString)

    trains.push({
      trainNo: values[0]?.trim() || "",
      trainName: values[1]?.trim() || "",
      sourceStationName: values[2]?.trim() || "",
      destinationStationName: values[3]?.trim() || "",
      days,
    })
  }

  return trains
}

function parseDays(daysString: string): string[] {
  const days: string[] = []

  // Handle different formats of days
  if (daysString.includes("Sunday")) days.push("Sunday")
  if (daysString.includes("Monday")) days.push("Monday")
  if (daysString.includes("Tuesday")) days.push("Tuesday")
  if (daysString.includes("Wednesday")) days.push("Wednesday")
  if (daysString.includes("Thursday")) days.push("Thursday")
  if (daysString.includes("Friday")) days.push("Friday")
  if (daysString.includes("Saturday")) days.push("Saturday")

  // Handle abbreviated formats
  if (daysString.includes("Sun")) days.push("Sunday")
  if (daysString.includes("Mon")) days.push("Monday")
  if (daysString.includes("Tue")) days.push("Tuesday")
  if (daysString.includes("Wed")) days.push("Wednesday")
  if (daysString.includes("Thu")) days.push("Thursday")
  if (daysString.includes("Fri")) days.push("Friday")
  if (daysString.includes("Sat")) days.push("Saturday")

  // Handle single letter formats
  if (daysString.includes("S") && !days.includes("Sunday") && !days.includes("Saturday")) {
    days.push("Sunday")
    days.push("Saturday")
  }
  if (daysString.includes("M") && !days.includes("Monday")) days.push("Monday")
  if (daysString.includes("T") && !days.includes("Tuesday") && !days.includes("Thursday")) {
    days.push("Tuesday")
    days.push("Thursday")
  }
  if (daysString.includes("W") && !days.includes("Wednesday")) days.push("Wednesday")
  if (daysString.includes("F") && !days.includes("Friday")) days.push("Friday")

  return days
}

export function searchTrainsByNumber(trainNo: string, trains: Train[]): Train[] {
  if (!trainNo.trim()) return []

  return trains.filter((train) => train.trainNo.includes(trainNo))
}

export function searchTrainsByName(trainName: string, trains: Train[]): Train[] {
  if (!trainName.trim()) return []

  const lowerQuery = trainName.toLowerCase()
  return trains.filter((train) => train.trainName.toLowerCase().includes(lowerQuery))
}

export function searchTrainsByRoute(source: string, destination: string, trains: Train[]): Train[] {
  if (!source.trim() || !destination.trim()) return []

  const lowerSource = source.toLowerCase()
  const lowerDestination = destination.toLowerCase()

  return trains.filter((train) => {
    const trainSource = train.sourceStationName.toLowerCase()
    const trainDestination = train.destinationStationName.toLowerCase()

    return (
      (trainSource.includes(lowerSource) || lowerSource.includes(trainSource)) &&
      (trainDestination.includes(lowerDestination) || lowerDestination.includes(trainDestination))
    )
  })
}

export function searchTrainsByDay(day: string, trains: Train[]): Train[] {
  if (!day.trim()) return []

  return trains.filter((train) => train.days.some((d) => d.toLowerCase().includes(day.toLowerCase())))
}

export function formatDaysString(days: string[]): string {
  if (days.length === 7) return "Daily"

  // Convert to short form
  const shortDays = days.map((day) => day.substring(0, 1)).join("")
  return shortDays
}

export function getPopularTrains(limit = 10): Promise<Train[]> {
  return fetchTrainData().then((trains) => {
    // For demo purposes, just return the first few trains
    // In a real app, this would be based on popularity metrics
    return trains.slice(0, limit)
  })
}

export function getTrainsByStations(sourceStation: Station, destinationStation: Station): Promise<Train[]> {
  return fetchTrainData().then((trains) => {
    return trains.filter((train) => {
      const sourceMatch =
        train.sourceStationName.includes(sourceStation.name) || train.sourceStationName.includes(sourceStation.code)
      const destMatch =
        train.destinationStationName.includes(destinationStation.name) ||
        train.destinationStationName.includes(destinationStation.code)

      return sourceMatch && destMatch
    })
  })
}

export function getTrainDetails(trainNo: string): Promise<Train | null> {
  return fetchTrainData().then((trains) => {
    return trains.find((train) => train.trainNo === trainNo) || null
  })
}
