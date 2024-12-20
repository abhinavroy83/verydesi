import React, { useEffect, useState, useRef } from "react";
import { ChevronDown, MapPin, ArrowDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/store/useAuthStore";
import { useCityData } from "@/hooks/use-city-hooks";

interface AvailableLocProps {
  bgcolour: string;
  textcolour: string;
}

function Avalableloc({ bgcolour, textcolour }: AvailableLocProps) {
  const [selectedCity, setSelectedCity] = useState<string>("Portland");
  const [isOpen, setIsOpen] = useState(false);
  const { currentCity, updateCity } = useAuthStore();
  const { cities, isLoading, error } = useCityData();

  const handleLocation = (city: string) => {
    setSelectedCity(city);
    updateCity(city);
    console.log("Selected location:", city);
    setIsOpen(false);
  };

  return (
    <div className="relative text-[20px] font-sans">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={`${textcolour} hover:text-gray-900 ${bgcolour} border-white border-2 rounded-md`}
          >
            <MapPin className="h-4 w-4 lg:h-5 lg:w-5" />
            <span className="lg:text-[16px] text-[12px] px-1">
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
          className="w-[370px] p-1 bg-white rounded-xl shadow-xl border-none font-sans mt-70"
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <div className="relative">
            <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-2">
              {cities.map((city) => (
                <div
                  key={city}
                  onClick={() => handleLocation(city)}
                  className={`w-full text-start px-3 py-2 text-[16px] rounded hover:bg-primary hover:text-primary-foreground focus:outline-none transition duration-150 ease-in-out ${
                    selectedCity === city
                      ? "bg-primary text-primary-foreground"
                      : "text-gray-700"
                  }`}
                >
                  {city}
                </div>
              ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center h-8 bg-gradient-to-t from-white to-transparent pointer-events-none">
              <ArrowDown className="h-4 w-4 text-gray-500 animate-bounce" />
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default Avalableloc;
