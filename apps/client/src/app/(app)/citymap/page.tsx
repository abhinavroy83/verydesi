"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Portland districts data
const districts = [
  {
    id: "pearl",
    name: "Pearl District",
    description: "Known for its art galleries, boutiques, and converted warehouses, the Pearl District is Portland's premier arts and culture neighborhood.",
    coordinates: "M50,100 L100,100 L100,150 L50,150 Z" // Simplified path
  },
  {
    id: "downtown",
    name: "Downtown Portland",
    description: "The heart of Portland featuring Pioneer Courthouse Square, countless food carts, and the famous Powell's City of Books.",
    coordinates: "M150,100 L200,100 L200,150 L150,150 Z"
  },
  {
    id: "northwest",
    name: "Northwest District",
    description: "Home to the historic Nob Hill neighborhood and the trendy NW 23rd Avenue, known for its Victorian-era houses and chic shopping.",
    coordinates: "M250,100 L300,100 L300,150 L250,150 Z"
  },
  {
    id: "eastside",
    name: "Eastside",
    description: "A vibrant area across the Willamette River featuring quirky neighborhoods, craft breweries, and food scenes of Hawthorne and Division Streets.",
    coordinates: "M350,100 L400,100 L400,150 L350,150 Z"
  }
]

export default function Component() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentDistrict = districts[currentIndex]

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % districts.length)
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + districts.length) % districts.length)
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-6 max-w-7xl mt-32 mx-auto">
      <div className="flex-1 space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrevious}
            className="rounded-full"
            aria-label="Previous district"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h2 className="text-4xl font-bold">{currentDistrict.name}</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNext}
            className="rounded-full"
            aria-label="Next district"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
        <p className="text-lg text-muted-foreground">{currentDistrict.description}</p>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          VIEW DISTRICT
        </Button>
      </div>

      <Card className="flex-1">
        <CardContent className="p-6">
          <svg
            viewBox="0 0 500 500"
            className="w-full h-full"
            style={{ maxHeight: "600px" }}
          >
            {districts.map((district) => (
              <path
                key={district.id}
                d={district.coordinates}
                fill={district.id === currentDistrict.id ? "hsl(var(--primary))" : "hsl(var(--muted))"}
                stroke="white"
                strokeWidth="2"
                className="transition-colors duration-300"
              />
            ))}
          </svg>
        </CardContent>
      </Card>
    </div>
  )
}