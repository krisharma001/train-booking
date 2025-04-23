"use client"

import { useState } from "react"
import { ChevronLeft, Edit, Plus, Trash2 } from "lucide-react"
import { EditTravellerForm } from "@/components/edit-traveller-form"
import Link from "next/link"

interface Traveller {
  id: string
  firstName: string
  lastName: string
  gender: "male" | "female"
  dateOfBirth?: string
  nationality?: string
  passportNumber?: string
  passportCountry?: string
}

export function TravellersContent() {
  const [travellers, setTravellers] = useState<Traveller[]>([
    {
      id: "1",
      firstName: "Karan",
      lastName: "Kumar",
      gender: "male",
      dateOfBirth: "",
      nationality: "India",
    },
  ])

  const [editingTraveller, setEditingTraveller] = useState<Traveller | null>(null)
  const [isAdding, setIsAdding] = useState(false)

  const handleEdit = (traveller: Traveller) => {
    setEditingTraveller(traveller)
    setIsAdding(false)
  }

  const handleAdd = () => {
    setIsAdding(true)
    setEditingTraveller(null)
  }

  const handleSave = (traveller: Traveller) => {
    if (isAdding) {
      setTravellers([...travellers, { ...traveller, id: Date.now().toString() }])
    } else if (editingTraveller) {
      setTravellers(travellers.map((t) => (t.id === traveller.id ? traveller : t)))
    }
    setEditingTraveller(null)
    setIsAdding(false)
  }

  const handleDelete = (id: string) => {
    setTravellers(travellers.filter((t) => t.id !== id))
  }

  const handleCancel = () => {
    setEditingTraveller(null)
    setIsAdding(false)
  }

  if (editingTraveller || isAdding) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="bg-purple-800 text-white p-4 flex items-center rounded-t-lg">
          <button onClick={handleCancel} className="mr-2">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-medium">{isAdding ? "Add Traveller" : "Edit Traveller"}</h1>
          {!isAdding && (
            <button onClick={() => handleDelete(editingTraveller.id)} className="ml-auto">
              <Trash2 className="h-5 w-5" />
            </button>
          )}
        </div>
        <div className="bg-white rounded-b-lg shadow-sm">
          <EditTravellerForm
            traveller={
              editingTraveller || {
                id: "",
                firstName: "",
                lastName: "",
                gender: "male",
                dateOfBirth: "",
                nationality: "",
                passportNumber: "",
                passportCountry: "",
              }
            }
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="bg-purple-800 text-white p-4 flex items-center rounded-t-lg">
        <Link href="/" className="mr-2">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-medium">Travellers</h1>
      </div>

      <div className="bg-white rounded-b-lg shadow-sm">
        <button onClick={handleAdd} className="w-full p-4 border-b flex items-center text-primary">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
            <Plus className="h-5 w-5 text-primary" />
          </div>
          <span>Add New Traveller</span>
        </button>

        {travellers.map((traveller) => (
          <div key={traveller.id} className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                {traveller.firstName.charAt(0)}
              </div>
              <span>
                {traveller.firstName} {traveller.lastName}
              </span>
            </div>
            <button onClick={() => handleEdit(traveller)}>
              <Edit className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
