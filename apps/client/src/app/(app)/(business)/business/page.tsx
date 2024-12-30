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
      <div className="w-full max-w-[1370px] lg:max-w-[1600px] mx-auto mb-9 lg:pl-3 font-sans">
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
        <div className="w-full mt-3 lg:max-w-[300px] max-w-full lg:ml-0 h-[725px] flex flex-col gap-6">
          <div className="max-w-md mx-auto">
            <div className="rounded-xl border bg-card text-card-foreground shadow w-full py-2 max-w-md bg-gradient-to-r from-cyan-700 to-blue-700 text-white">
              <div className="font-semibold leading-none tracking-tight">
                <h1 className="text-xl py-2 font-medium text-center">
                  About Portland
                </h1>
              </div>
              <div className="space-y-4 p-3 pt-0">
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    <div>
                      <p className="text-sm text-white/80">Population</p>
                      <p className="font-medium">652,503</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    <div>
                      <p className="text-sm text-white/80">Metro Area</p>
                      <p className="font-medium">2.5M</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <TreePine className="h-5 w-5" />
                    <div>
                      <p className="text-sm text-white/80">Parks</p>
                      <p className="font-medium">279</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Car className="h-5 w-5" />
                    <div>
                      <p className="text-sm text-white/80">Transit Lines</p>
                      <p className="font-medium">85</p>
                    </div>
                  </div>
                </div>
                <div className="">
                  <p className="text-sm leading-relaxed">
                    Portland is known for its parks, bridges and bicycle paths,
                    as well as for its eco-friendliness and microbreweries.
                    Sitting in the shadow of Mount Hood, it's one of the most
                    environmentally conscious cities in the world.
                  </p>
                </div>
              </div>
            </div>
            <Card className="mt-3">
              <CardContent className="p-0">
                {/* <h2 className="text-[25px] font-bold p-4 pb-2">Services &</h2> */}
                <div className="bg-yellow-400 rounded-lg p-1">
                  <div className="p-1 space-y-2">
                    <div className="space-y-1">
                      {Object.entries(categories).map(([section, items]) => (
                        <div key={section} className="space-y-4">
                          <h3 className="text-xl font-semibold text-muted-foreground">
                            {section}
                          </h3>
                          <div className="flex flex-wrap gap-1">
                            {items.map((category) => (
                              <div
                                key={category}
                                className="cursor-pointer bg-white p-1 px-2 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                              >
                                {category}
                              </div>
                            ))}
                          </div>
                          <p className="flex w-full justify-end cursor-pointer">
                            View All Category
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="w-full max-w-3xl mt-3 border rounded-xl">
              <div className="p-2">
                <CardTitle className="text-[20px] font-bold">
                  TRENDING IN PORTLAND
                </CardTitle>
              </div>
              <div className="flex flex-wrap gap-1 px-2 pb-3">
                {recommendedSearches.map((search, index) => (
                  <Button
                    key={index}
                    variant="link"
                    className="h-auto p-0 text-sm font-normal text-blue-500 hover:text-blue-700"
                  >
                    {search}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
