"use client"

import { useState, useEffect, useRef } from "react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { searchStations } from "@/lib/api-service"

export interface Station {
  name: string
  code: string
  state: string
}

interface StationSearchProps {
  label?: string
  value: string
  onChange: (value: string, station?: Station) => void
  placeholder?: string
  required?: boolean
  disabled?: boolean
}

export function StationSearch({
  label,
  value,
  onChange,
  placeholder = "Search stations...",
  required = false,
  disabled = false,
}: StationSearchProps) {
  const [open, setOpen] = useState(false)
  const [stations, setStations] = useState<Station[]>([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

  // This effect handles the search when the query changes
  useEffect(() => {
    if (searchQuery.length < 2) {
      setStations([])
      return
    }

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    debounceTimerRef.current = setTimeout(async () => {
      setLoading(true)
      try {
        const results = await searchStations(searchQuery)
        setStations(results)
      } catch (error) {
        console.error("Error searching stations:", error)
        // Provide some default stations in case of error
        setStations([
          { name: "Delhi", code: "DLI", state: "Delhi" },
          { name: "Mumbai Central", code: "MMCT", state: "Maharashtra" },
          { name: "Chennai Central", code: "MAS", state: "Tamil Nadu" },
          { name: "Kolkata", code: "KOAA", state: "West Bengal" },
          { name: "Bengaluru", code: "SBC", state: "Karnataka" },
        ])
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [searchQuery])

  // Reset search query when popover closes
  useEffect(() => {
    if (!open) {
      setSearchQuery("")
    }
  }, [open])

  // Handle external value changes (like from swap button)
  useEffect(() => {
    if (value && !disabled) {
      // Don't trigger a search, just update the display value
      setSearchQuery("")
    }
  }, [value, disabled])

  const handleSelect = (station: Station) => {
    const displayValue = `${station.name} (${station.code})`
    onChange(displayValue, station)
    setOpen(false)
  }

  return (
    <div className="space-y-1">
      {label && (
        <div className="text-xs font-medium uppercase text-gray-500">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </div>
      )}
      <Popover open={open && !disabled} onOpenChange={disabled ? undefined : setOpen}>
        <PopoverTrigger asChild>
          <div
            className={cn(
              "flex items-center justify-between border rounded-md p-2 bg-white",
              disabled ? "opacity-70 cursor-not-allowed" : "cursor-pointer",
              !value && "text-muted-foreground",
            )}
            onClick={disabled ? undefined : () => setOpen(true)}
          >
            {value || placeholder}
            {!disabled && <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />}
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[300px]" align="start">
          <Command>
            <CommandInput
              placeholder={placeholder}
              value={searchQuery}
              onValueChange={setSearchQuery}
              className="h-9"
            />
            {loading && <div className="py-6 text-center text-sm">Loading stations...</div>}
            <CommandList>
              {!loading && stations.length === 0 && searchQuery.length >= 2 && (
                <CommandEmpty>No stations found.</CommandEmpty>
              )}
              {!loading && searchQuery.length < 2 && (
                <div className="py-6 text-center text-sm text-muted-foreground">
                  Type at least 2 characters to search stations
                </div>
              )}
              {!loading && stations.length > 0 && (
                <CommandGroup>
                  {stations.map((station) => (
                    <CommandItem
                      key={station.code}
                      value={`${station.name} ${station.code}`}
                      onSelect={() => handleSelect(station)}
                    >
                      <div className="flex flex-col">
                        <div className="font-medium">
                          {station.name} ({station.code})
                        </div>
                        <div className="text-xs text-muted-foreground">{station.state}</div>
                      </div>
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          value === `${station.name} (${station.code})` ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
