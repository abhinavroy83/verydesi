import React, { useEffect, useState } from "react";
import { ChevronDown, Globe } from "lucide-react";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";
import useAuthStore from "@/store/useAuthStore";

interface CityResponse {
  city: { area: string }[];
}

function Avalableloc() {
  const [cty, setCty] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("Portland");
  const [isOpen, setIsOpen] = useState(false);
  const { status, currentCity, updateCity } = useAuthStore();
  // Fetch city data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<CityResponse>(
          "https://api.verydesi.com/api/admin/getallcity"
        );
        const uniqueCities = Array.from(
          new Set(res.data.city.map((item) => item.area))
        );
        uniqueCities.sort((a, b) => a.localeCompare(b));
        setCty(uniqueCities);
      } catch (error) {
        console.error("Error fetching city data:", error);
      }
    };
    fetchData();
  }, []);

  const handleLocation = (city: string) => {
    setSelectedCity(city);
    updateCity(city);
    console.log("Selected location:", city);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          >
            <Globe className="h-5 w-5" />
            <span className="font-medium px-1">{currentCity}</span>
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[300px] p-4 bg-white rounded-xl shadow-xl border-none"
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-2">
            {cty.map((city) => (
              <Button
                key={city}
                variant="ghost"
                size="sm"
                onClick={() => handleLocation(city)}
                className={`justify-start px-3 py-2 rounded-md text-left ${
                  city === selectedCity
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-primary/10"
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
