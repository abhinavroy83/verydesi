"use client";

import { useState } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Country = "USA" | "Canada";

type City = {
  name: string;
  country: Country;
};

const cities: City[] = [
  // USA Cities
  { name: "New York", country: "USA" },
  { name: "Los Angeles", country: "USA" },
  { name: "Chicago", country: "USA" },
  { name: "Houston", country: "USA" },
  { name: "Phoenix", country: "USA" },
  { name: "Philadelphia", country: "USA" },
  { name: "San Antonio", country: "USA" },
  { name: "San Diego", country: "USA" },
  { name: "Dallas", country: "USA" },
  { name: "San Jose", country: "USA" },
  // Canadian Cities
  { name: "Toronto", country: "Canada" },
  { name: "Montreal", country: "Canada" },
  { name: "Vancouver", country: "Canada" },
  { name: "Calgary", country: "Canada" },
  { name: "Edmonton", country: "Canada" },
  { name: "Ottawa", country: "Canada" },
  { name: "Winnipeg", country: "Canada" },
  { name: "Quebec City", country: "Canada" },
  { name: "Hamilton", country: "Canada" },
  { name: "Kitchener", country: "Canada" },
];

export default function Area() {
  const [selectedCountry, setSelectedCountry] = useState<Country>("USA");
  const [selectedCity, setSelectedCity] = useState<City>(cities[0]);
  const [isOpen, setIsOpen] = useState(false);

  const filteredCities = cities.filter(
    (city) => city.country === selectedCountry
  );

  return (
    <div className="relative">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          >
            <Globe className="h-5 w-5" />
            <span className="font-medium px-1">{selectedCity.name}</span>
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[300px] p-4 bg-white rounded-xl shadow-xl border-none"
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <div className="flex justify-between mb-4">
            {(["USA", "Canada"] as Country[]).map((country) => (
              <Button
                key={country}
                variant={selectedCountry === country ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCountry(country)}
                className={`flex-1 ${
                  selectedCountry === country
                    ? "bg-blue-600 text-white hover:bg-blue-800"
                    : "bg-white text-primary hover:bg-blue-800 hover:text-white"
                } transition-colors duration-200`}
              >
                {country}
              </Button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-2">
            {filteredCities.map((city) => (
              <Button
                key={city.name}
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedCity(city);
                  setIsOpen(false);
                }}
                className={`justify-start px-3 py-2 rounded-md text-left ${
                  city.name === selectedCity.name
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-primary/10"
                } transition-colors duration-200`}
              >
                {city.name}
              </Button>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
