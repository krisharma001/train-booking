// API endpoints
const API_BASE_URL = "https://indianrailapi.com/api"
const API_KEY = "your-api-key" // Replace with your actual API key

// Types
export interface StationSearchResult {
  code: string
  name: string
  state: string
}

export interface PnrStatusResult {
  pnrNumber: string
  trainNumber: string
  trainName: string
  dateOfJourney: string
  boardingPoint: string
  destinationPoint: string
  reservationUpTo: string
  passengerCount: number
  passengers: {
    bookingStatus: string
    currentStatus: string
    coachPosition: string
  }[]
  chartStatus: string
}

export interface TrainFareResult {
  trainNumber: string
  trainName: string
  source: string
  destination: string
  fare: {
    classType: string
    fare: number
  }[]
}

export interface SeatAvailabilityResult {
  trainNumber: string
  trainName: string
  source: string
  destination: string
  date: string
  classType: string
  availability: {
    date: string
    status: string
    availableSeats?: number
  }[]
}

export interface TrainInfoResult {
  trainNumber: string
  trainName: string
  runningDays: {
    sunday: boolean
    monday: boolean
    tuesday: boolean
    wednesday: boolean
    thursday: boolean
    friday: boolean
    saturday: boolean
  }
  classes: string[]
  pantry: boolean
  route: {
    stationName: string
    stationCode: string
    arrivalTime: string
    departureTime: string
    distance: number
    day: number
    haltTime: string
  }[]
}

// Mock data for stations
const mockStations: StationSearchResult[] = [
  { code: "NDLS", name: "New Delhi", state: "Delhi" },
  { code: "DLI", name: "Delhi", state: "Delhi" },
  { code: "DSA", name: "Delhi Shahdara", state: "Delhi" },
  { code: "DEE", name: "Delhi Sarai Rohilla", state: "Delhi" },
  { code: "CNB", name: "Kanpur Central", state: "Uttar Pradesh" },
  { code: "LKO", name: "Lucknow", state: "Uttar Pradesh" },
  { code: "GZB", name: "Ghaziabad", state: "Uttar Pradesh" },
  { code: "MUV", name: "Manduadih", state: "Uttar Pradesh" },
  { code: "BSB", name: "Varanasi Junction", state: "Uttar Pradesh" },
  { code: "AFR", name: "Asafpur", state: "Uttar Pradesh" },
  { code: "MMCT", name: "Mumbai Central", state: "Maharashtra" },
  { code: "BCT", name: "Mumbai Chhatrapati Shivaji Terminus", state: "Maharashtra" },
  { code: "BRC", name: "Vadodara", state: "Gujarat" },
  { code: "ADI", name: "Ahmedabad Junction", state: "Gujarat" },
  { code: "HWH", name: "Howrah Junction", state: "West Bengal" },
  { code: "SDAH", name: "Sealdah", state: "West Bengal" },
  { code: "MAS", name: "Chennai Central", state: "Tamil Nadu" },
  { code: "SBC", name: "Bengaluru City Junction", state: "Karnataka" },
  { code: "SC", name: "Secunderabad Junction", state: "Telangana" },
  { code: "HYB", name: "Hyderabad", state: "Telangana" },
]

// Mock data for train info
const mockTrainInfo: Record<string, TrainInfoResult> = {
  "12036": {
    trainNumber: "12036",
    trainName: "PURANGIRI JANST",
    runningDays: {
      sunday: true,
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
    },
    classes: ["CC", "2S"],
    pantry: true,
    route: [
      {
        stationName: "Delhi",
        stationCode: "DLI",
        arrivalTime: "-",
        departureTime: "06:25",
        distance: 0,
        day: 1,
        haltTime: "-",
      },
      {
        stationName: "Delhi Shahdara",
        stationCode: "DSA",
        arrivalTime: "06:36",
        departureTime: "06:38",
        distance: 7,
        day: 1,
        haltTime: "2 min",
      },
      {
        stationName: "Ghaziabad",
        stationCode: "GZB",
        arrivalTime: "06:58",
        departureTime: "07:00",
        distance: 24,
        day: 1,
        haltTime: "2 min",
      },
      {
        stationName: "Moradabad",
        stationCode: "MB",
        arrivalTime: "08:55",
        departureTime: "09:00",
        distance: 154,
        day: 1,
        haltTime: "5 min",
      },
      {
        stationName: "Rampur",
        stationCode: "RMU",
        arrivalTime: "09:28",
        departureTime: "09:30",
        distance: 186,
        day: 1,
        haltTime: "2 min",
      },
      {
        stationName: "Bareilly",
        stationCode: "BE",
        arrivalTime: "10:20",
        departureTime: "10:25",
        distance: 250,
        day: 1,
        haltTime: "5 min",
      },
      {
        stationName: "Asafpur",
        stationCode: "AFR",
        arrivalTime: "11:13",
        departureTime: "11:15",
        distance: 291,
        day: 1,
        haltTime: "2 min",
      },
      {
        stationName: "Tanakpur",
        stationCode: "TPU",
        arrivalTime: "12:30",
        departureTime: "-",
        distance: 343,
        day: 1,
        haltTime: "-",
      },
    ],
  },
  "12486": {
    trainNumber: "12486",
    trainName: "SGNR - ANDI EXPRESS",
    runningDays: {
      sunday: true,
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
    },
    classes: ["SL", "3A", "2A"],
    pantry: true,
    route: [
      {
        stationName: "Sri Ganganagar",
        stationCode: "SGNR",
        arrivalTime: "-",
        departureTime: "23:45",
        distance: 0,
        day: 1,
        haltTime: "-",
      },
      {
        stationName: "Abohar",
        stationCode: "ABS",
        arrivalTime: "00:43",
        departureTime: "00:45",
        distance: 57,
        day: 2,
        haltTime: "2 min",
      },
      {
        stationName: "Bathinda Junction",
        stationCode: "BTI",
        arrivalTime: "02:30",
        departureTime: "02:40",
        distance: 170,
        day: 2,
        haltTime: "10 min",
      },
      {
        stationName: "Ambala Cantt Junction",
        stationCode: "UMB",
        arrivalTime: "06:15",
        departureTime: "06:25",
        distance: 365,
        day: 2,
        haltTime: "10 min",
      },
      {
        stationName: "New Delhi",
        stationCode: "NDLS",
        arrivalTime: "10:05",
        departureTime: "10:25",
        distance: 498,
        day: 2,
        haltTime: "20 min",
      },
      {
        stationName: "Aligarh Junction",
        stationCode: "ALJN",
        arrivalTime: "13:03",
        departureTime: "13:05",
        distance: 625,
        day: 2,
        haltTime: "2 min",
      },
      {
        stationName: "Tundla Junction",
        stationCode: "TDL",
        arrivalTime: "14:32",
        departureTime: "14:34",
        distance: 691,
        day: 2,
        haltTime: "2 min",
      },
      {
        stationName: "Kanpur Central",
        stationCode: "CNB",
        arrivalTime: "17:25",
        departureTime: "17:35",
        distance: 830,
        day: 2,
        haltTime: "10 min",
      },
      {
        stationName: "Lucknow",
        stationCode: "LKO",
        arrivalTime: "19:20",
        departureTime: "19:35",
        distance: 914,
        day: 2,
        haltTime: "15 min",
      },
      {
        stationName: "Gonda Junction",
        stationCode: "GD",
        arrivalTime: "21:48",
        departureTime: "21:50",
        distance: 1024,
        day: 2,
        haltTime: "2 min",
      },
      {
        stationName: "Anand Vihar Terminal",
        stationCode: "ANVT",
        arrivalTime: "09:15",
        departureTime: "-",
        distance: 1186,
        day: 3,
        haltTime: "-",
      },
    ],
  },
  "12555": {
    trainNumber: "12555",
    trainName: "GORAKHDHAM EXPRESS",
    runningDays: {
      sunday: true,
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
    },
    classes: ["SL", "3A", "2A", "1A"],
    pantry: true,
    route: [
      {
        stationName: "Hisar Junction",
        stationCode: "HSR",
        arrivalTime: "-",
        departureTime: "05:25",
        distance: 0,
        day: 1,
        haltTime: "-",
      },
      {
        stationName: "Delhi",
        stationCode: "DLI",
        arrivalTime: "09:10",
        departureTime: "09:20",
        distance: 170,
        day: 1,
        haltTime: "10 min",
      },
      {
        stationName: "Moradabad",
        stationCode: "MB",
        arrivalTime: "12:35",
        departureTime: "12:40",
        distance: 324,
        day: 1,
        haltTime: "5 min",
      },
      {
        stationName: "Lucknow",
        stationCode: "LKO",
        arrivalTime: "17:35",
        departureTime: "17:45",
        distance: 626,
        day: 1,
        haltTime: "10 min",
      },
      {
        stationName: "Gorakhpur Junction",
        stationCode: "GKP",
        arrivalTime: "22:15",
        departureTime: "-",
        distance: 832,
        day: 1,
        haltTime: "-",
      },
    ],
  },
  "12556": {
    trainNumber: "12556",
    trainName: "GORAKHDHAM EXPRESS",
    runningDays: {
      sunday: true,
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
    },
    classes: ["SL", "3A", "2A", "1A"],
    pantry: true,
    route: [
      {
        stationName: "Gorakhpur Junction",
        stationCode: "GKP",
        arrivalTime: "-",
        departureTime: "05:30",
        distance: 0,
        day: 1,
        haltTime: "-",
      },
      {
        stationName: "Lucknow",
        stationCode: "LKO",
        arrivalTime: "10:05",
        departureTime: "10:15",
        distance: 206,
        day: 1,
        haltTime: "10 min",
      },
      {
        stationName: "Moradabad",
        stationCode: "MB",
        arrivalTime: "15:10",
        departureTime: "15:15",
        distance: 508,
        day: 1,
        haltTime: "5 min",
      },
      {
        stationName: "Delhi",
        stationCode: "DLI",
        arrivalTime: "18:45",
        departureTime: "18:55",
        distance: 662,
        day: 1,
        haltTime: "10 min",
      },
      {
        stationName: "Hisar Junction",
        stationCode: "HSR",
        arrivalTime: "22:45",
        departureTime: "-",
        distance: 832,
        day: 1,
        haltTime: "-",
      },
    ],
  },
  "12910": {
    trainNumber: "12910",
    trainName: "BANDRA GARIB RATH",
    runningDays: {
      sunday: true,
      monday: false,
      tuesday: true,
      wednesday: false,
      thursday: true,
      friday: false,
      saturday: true,
    },
    classes: ["3A"],
    pantry: true,
    route: [
      {
        stationName: "Bandra Terminus",
        stationCode: "BDTS",
        arrivalTime: "-",
        departureTime: "12:25",
        distance: 0,
        day: 1,
        haltTime: "-",
      },
      {
        stationName: "Vadodara",
        stationCode: "BRC",
        arrivalTime: "16:43",
        departureTime: "16:48",
        distance: 392,
        day: 1,
        haltTime: "5 min",
      },
      {
        stationName: "Ratlam Junction",
        stationCode: "RTM",
        arrivalTime: "19:53",
        departureTime: "19:58",
        distance: 591,
        day: 1,
        haltTime: "5 min",
      },
      {
        stationName: "Kota Junction",
        stationCode: "KOTA",
        arrivalTime: "23:48",
        departureTime: "23:53",
        distance: 789,
        day: 1,
        haltTime: "5 min",
      },
      {
        stationName: "New Delhi",
        stationCode: "NDLS",
        arrivalTime: "07:30",
        departureTime: "-",
        distance: 1383,
        day: 2,
        haltTime: "-",
      },
    ],
  },
}

// API functions
export async function searchStations(query: string): Promise<StationSearchResult[]> {
  try {
    // Use mock data instead of API call
    return mockStations
      .filter(
        (station) =>
          station.name.toLowerCase().includes(query.toLowerCase()) ||
          station.code.toLowerCase().includes(query.toLowerCase()) ||
          station.state.toLowerCase().includes(query.toLowerCase()),
      )
      .slice(0, 10) // Limit to 10 results
  } catch (error) {
    console.error("Error searching stations:", error)
    return []
  }
}

export async function checkPnrStatus(pnrNumber: string): Promise<PnrStatusResult | null> {
  try {
    // Mock PNR status data
    return {
      pnrNumber,
      trainNumber: "12486",
      trainName: "SGNR - ANDI EXPRESS",
      dateOfJourney: "30 Apr 2024",
      boardingPoint: "New Delhi (NDLS)",
      destinationPoint: "Lucknow (LKO)",
      reservationUpTo: "Lucknow (LKO)",
      passengerCount: 2,
      passengers: [
        {
          bookingStatus: "RAC 21",
          currentStatus: "CNF B1/62",
          coachPosition: "B1",
        },
        {
          bookingStatus: "WL 45",
          currentStatus: "CNF B1/63",
          coachPosition: "B1",
        },
      ],
      chartStatus: "PREPARED",
    }
  } catch (error) {
    console.error("Error checking PNR status:", error)
    return null
  }
}

export async function getTrainFare(
  trainNumber: string,
  source: string,
  destination: string,
  classType: string,
  quota: string,
  date: string,
): Promise<TrainFareResult | null> {
  try {
    // Mock train fare data
    const trainInfo = mockTrainInfo[trainNumber]
    if (!trainInfo) {
      throw new Error(`Train ${trainNumber} not found`)
    }

    return {
      trainNumber,
      trainName: trainInfo.trainName,
      source,
      destination,
      fare: [
        { classType: "SL", fare: 420 },
        { classType: "3A", fare: 1100 },
        { classType: "2A", fare: 1600 },
        { classType: "1A", fare: 2800 },
        { classType: "CC", fare: 550 },
        { classType: "2S", fare: 180 },
      ],
    }
  } catch (error) {
    console.error("Error getting train fare:", error)
    return null
  }
}

export async function checkSeatAvailability(
  trainNumber: string,
  source: string,
  destination: string,
  date: string,
  classType: string,
  quota: string,
): Promise<SeatAvailabilityResult | null> {
  try {
    // Mock seat availability data
    const trainInfo = mockTrainInfo[trainNumber]
    if (!trainInfo) {
      throw new Error(`Train ${trainNumber} not found`)
    }

    // Generate mock availability for next 7 days
    const availability = []
    const baseDate = new Date(date)

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(baseDate)
      currentDate.setDate(baseDate.getDate() + i)

      const formattedDate = currentDate.toISOString().split("T")[0]

      // Randomly determine availability status
      const random = Math.random()
      let status: string
      let availableSeats: number | undefined

      if (random < 0.6) {
        status = "AVL"
        availableSeats = Math.floor(Math.random() * 50) + 1
      } else if (random < 0.8) {
        status = "RAC"
        availableSeats = Math.floor(Math.random() * 20) + 1
      } else {
        status = "WL"
        availableSeats = Math.floor(Math.random() * 30) + 1
      }

      availability.push({
        date: formattedDate,
        status,
        availableSeats,
      })
    }

    return {
      trainNumber,
      trainName: trainInfo.trainName,
      source,
      destination,
      date,
      classType,
      availability,
    }
  } catch (error) {
    console.error("Error checking seat availability:", error)
    return null
  }
}

export async function getTrainInfo(trainNumber: string): Promise<TrainInfoResult | null> {
  try {
    // Use mock data instead of API call
    const trainInfo = mockTrainInfo[trainNumber]
    if (!trainInfo) {
      throw new Error(`Train ${trainNumber} not found`)
    }
    return trainInfo
  } catch (error) {
    console.error("Error getting train information:", error)
    return null
  }
}
