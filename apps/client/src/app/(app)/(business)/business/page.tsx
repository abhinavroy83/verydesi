"use client";

import { HomeLayout } from "@/components/layout/Home";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  Wrench,
  Zap,
  Lock,
  SprayCan,
  Truck,
  Wind,
  Droplet,
  Car,
  Scissors,
  Utensils,
  Briefcase,
  Camera,
  Pen,
  Book,
  Laptop,
  Shirt,
  Leaf,
  Dog,
  Music,
  Palette,
  Dumbbell,
  Heart,
  Plane,
  Sun,
  Coffee,
  Wifi,
  Phone,
  ShoppingCart,
  Tv,
  ChevronUp,
} from "lucide-react";
import { FeaturedBusinessCard } from "@/components/Business";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

type SortOption = "Recommended" | "Highest Rated" | "Most Reviewed";
export default function Component() {
  const [showAll, setShowAll] = useState(false);
  const router = useRouter();

  const categories = [
    { name: "Landscaping", icon: <Leaf className="h-4 w-4" /> },
    { name: "Contractors", icon: <Wrench className="h-4 w-4" /> },
    { name: "Electricians", icon: <Zap className="h-4 w-4" /> },
    { name: "Locksmiths", icon: <Lock className="h-4 w-4" /> },
    { name: "Home Cleaners", icon: <SprayCan className="h-4 w-4" /> },
    { name: "Movers", icon: <Truck className="h-4 w-4" /> },
    { name: "HVAC", icon: <Wind className="h-4 w-4" /> },
    { name: "Plumbers", icon: <Droplet className="h-4 w-4" /> },
    { name: "Auto Repair", icon: <Car className="h-4 w-4" /> },
    { name: "Hair Stylists", icon: <Scissors className="h-4 w-4" /> },
    { name: "Restaurants", icon: <Utensils className="h-4 w-4" /> },
    { name: "Business Services", icon: <Briefcase className="h-4 w-4" /> },
    { name: "Photographers", icon: <Camera className="h-4 w-4" /> },
    { name: "Tutors", icon: <Pen className="h-4 w-4" /> },
    { name: "Bookstores", icon: <Book className="h-4 w-4" /> },
    { name: "IT Services", icon: <Laptop className="h-4 w-4" /> },
    { name: "Dry Cleaning", icon: <Shirt className="h-4 w-4" /> },
    { name: "Pet Care", icon: <Dog className="h-4 w-4" /> },
    { name: "Music Lessons", icon: <Music className="h-4 w-4" /> },
    { name: "Art Galleries", icon: <Palette className="h-4 w-4" /> },
    { name: "Fitness", icon: <Dumbbell className="h-4 w-4" /> },
    { name: "Healthcare", icon: <Heart className="h-4 w-4" /> },
    { name: "Travel", icon: <Plane className="h-4 w-4" /> },
    { name: "Solar Installation", icon: <Sun className="h-4 w-4" /> },
    { name: "Cafes", icon: <Coffee className="h-4 w-4" /> },
    { name: "Internet Providers", icon: <Wifi className="h-4 w-4" /> },
    { name: "Phone Repair", icon: <Phone className="h-4 w-4" /> },
    { name: "Grocery Delivery", icon: <ShoppingCart className="h-4 w-4" /> },
    { name: "TV Installation", icon: <Tv className="h-4 w-4" /> },
    { name: "Home Renovation", icon: <Home className="h-4 w-4" /> },
  ];

  const visibleCategories = showAll ? categories : categories.slice(0, 12);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] =
    useState<SortOption>("Recommended");

  const options: SortOption[] = [
    "Recommended",
    "Highest Rated",
    "Most Reviewed",
  ];

  const handleSelect = (option: SortOption) => {
    setSelectedOption(option);
    setIsOpen(false);
    // Here you would typically call a function to actually sort the items
    console.log(`Sorting by: ${option}`);
  };

  return (
    <HomeLayout>
      <div className="w-full max-w-[1370px] lg:max-w-[1600px] mx-auto mb-9">
        <h2 className="text-2xl font-bold mb-4">Categories</h2>
        <div className="flex flex-wrap gap-2">
          {visibleCategories.map((category) => (
            <Badge
              key={category.name}
              variant="secondary"
              className="flex items-center gap-1 py-1 text-xs cursor-pointer bg-gray-200 hover:bg-green-200"
            >
              {category.icon}
              <span>{category.name}</span>
            </Badge>
          ))}
          <Button
            variant="outline"
            size="sm"
            // onClick={() => setShowAll(!showAll)}
            onClick={() => router.push('business-all-category')}
            className=""
          >
            {showAll ? (
              <>
                Less <ChevronUp className="ml-1 h-4 w-4" />
              </>
            ) : (
              <>
                More <ChevronDown className="ml-1 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
        <div>
          <div className="flex lg:flex-row flex-col justify-between lg:items-center gap-1">
            <h1 className="capitalize text-[23px] lg:text-[23px] font-bold mt-4">
              <p>Featured Business In </p>
            </h1>
            <div className="flex  gap-3 items-center">
              <div className="relative inline-block text-left">
                <Button
                  variant="outline"
                  onClick={() => setIsOpen(!isOpen)}
                  className="inline-flex justify-between items-center w-full px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                  aria-haspopup="listbox"
                  aria-expanded={isOpen}
                >
                  <span>Sort: {selectedOption}</span>
                  <ChevronDown
                    className="w-5 h-5 ml-2 -mr-1"
                    aria-hidden="true"
                  />
                </Button>
                {isOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-[10rem] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div
                      className="py-1"
                      role="listbox"
                      aria-labelledby="options-menu"
                    >
                      {options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleSelect(option)}
                          className={`${
                            selectedOption === option
                              ? "bg-blue-100 text-gray-900"
                              : "text-gray-700"
                          } block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900`}
                          role="option"
                          aria-selected={selectedOption === option}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="rounded-md bg-green-800 whitespace-nowrap py-2 px-3 lg:px-2 text-[1rem] lg:text-[1.1rem] items-center text-white shadow-sm shadow-[#ccc] hover:bg-green-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Post Business
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 mt-4">
          {[...Array(6)].map((_, index) => (
            <FeaturedBusinessCard key={index} />
          ))}
        </div>
      </div>
    </HomeLayout>
  );
}
