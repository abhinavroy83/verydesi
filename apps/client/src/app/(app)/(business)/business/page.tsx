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
  Building2,
  Users,
  TreePine,
  Umbrella,
  Scale,
  Film,
  UtensilsCrossed,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FeaturedBusinessCard } from "@/components/Business/featuerdcard";
import axios from "axios";
import { BusinessData } from "@myrepo/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

type SortOption = "Recommended" | "Highest Rated" | "Most Reviewed";

export default function BusinessDirectory() {
  const [showAll, setShowAll] = useState(false);
  const router = useRouter();

  const categories = {
    "Business & Services": [
      "Home Services",
      "Beauty",
      "Auto Care",
      "Insurance",
      "Health & Medical",
      "Legal",
      "Food & Restaurants",
      "Travel",
      "Clothing",
      "Groceries",
      "Entertainment",
      "Pets",
      "Food/Catering",
      "Moving",
      "Phone & Cable",
    ],
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] =
    useState<SortOption>("Recommended");
  const [data, setData] = useState<BusinessData[]>([]);

  const options: SortOption[] = [
    "Recommended",
    "Highest Rated",
    "Most Reviewed",
  ];
  const recommendedSearches = [
    "Empty Events You need",
    "India Hire Young",
    "Supporting Coaching Leading Lea...",
    "Zin WeAreHire Employ...",
    "Home That Are Hiring ...",
    "More Graduate Online",
    "Linda Bernardi Sales C...",
    "Write Graduate Online",
  ];

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get(
          `https://apiv2.verydesi.com/business/find-all-business`
        );
        console.log(res.data);
        setData(res.data);
      } catch (error) {
        console.log("error while fetching business", error);
      }
    };

    fetchdata();
  }, []);

  const handleSelect = (option: SortOption) => {
    setSelectedOption(option);
    setIsOpen(false);
    console.log(`Sorting by: ${option}`);
  };

  return (
    <HomeLayout>
      <div className="w-full max-w-[1370px] lg:max-w-[1600px] mx-auto mb-9 font-sans">
        {/* <h2 className="text-2xl font-bold mb-4">Categories</h2> */}
        {/* <div className="flex flex-wrap gap-2">
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
            onClick={() => router.push("business-all-category")}
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
        </div> */}
        <div>
          <div className="flex lg:flex-row flex-col justify-between lg:items-center gap-1">
            <h1 className="capitalize text-[23px] lg:text-[24px] font-bold">
              <p>Featured Business In </p>
            </h1>
            <div className="flex gap-3 items-center">
              <div className="relative inline-block text-left">
                <Button
                  variant="outline"
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-[16px] inline-flex justify-between items-center w-full px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                  aria-haspopup="listbox"
                  aria-expanded={isOpen}
                >
                  <span className="text-[16px]">Sort: {selectedOption}</span>
                  <ChevronDown
                    className="w-5 h-5 ml-2 -mr-1"
                    aria-hidden="true"
                  />
                </Button>
                {isOpen && (
                  <div className="text-[16px] origin-top-right absolute right-0 mt-2 w-[10rem] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
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
                              ? "bg-white text-gray-900"
                              : "text-gray-700"
                          } block w-full text-left px-4 py-2 hover:bg-gray-100 hover:text-gray-900`}
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
              <Button
                onClick={() => router.push("post-business")}
                className="bg-green-800 text-white hover:bg-green-900 text-[16px]"
              >
                Post Business
              </Button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 mt-4">
          {data.map((items, index) => (
            <FeaturedBusinessCard key={index} business={items} />
          ))}
        </div>
      </div>
    </HomeLayout>
  );
}
