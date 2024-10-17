import React, { useEffect, useState } from "react";
import { ChevronDown, Globe, MapPin } from "lucide-react";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";
import useAuthStore from "@/store/useAuthStore";
import { useCityData } from "@/hooks/use-city-hooks";

interface CityResponse {
  city: { area: string }[];
}

function Avalableloc() {
  const [cty, setCty] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("Portland");
  const [isOpen, setIsOpen] = useState(false);
  const { status, currentCity, updateCity } = useAuthStore();
  // Fetch city data on component mount
  const { cities, isLoading, error } = useCityData();

  const handleLocation = (city: string) => {
    setSelectedCity(city);
    updateCity(city);
    console.log("Selected location:", city);
    setIsOpen(false);
  };

  return (
    <div className="relative text-[20px]">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 "
          >
            <MapPin className="h-5 w-5 " />
            <span className="font-medium px-1">
              {currentCity || "Portland"}
            </span>
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[300px] p-4 bg-white rounded-xl shadow-xl border-none "
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-2">
            {cities.map((city) => (
              <Button
                key={city}
                variant="ghost"
                size="sm"
                onClick={() => handleLocation(city)}
                className={`justify-start px-3 py-2 rounded-md text-left  ${
                  city === selectedCity
                    ? "bg-[#054687] text-white text-[15px]"
                    : "text-gray-700 hover:bg-primary/10 text-[15px]"
                } transition-colors duration-200`}
              >
                {city}
              </Button>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default Avalableloc;
