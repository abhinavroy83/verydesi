"use client";
import dynamic from "next/dynamic";
import React, { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sun,
  Cloud,
  MoreHorizontal,
  TreePine,
  Car,
  Building2,
  Users,
  PlusCircle,
  Expand,
  Bookmark,
} from "lucide-react";
import { useRoomFetching } from "@/hooks/use-all-roomfetcing";
import useAuthStore from "@/store/useAuthStore";
import { Skeleton } from "@/components/ui/skeleton";
import { HomeLayout } from "@/components/layout/Home";
import { SkeletonFeaturedCard } from "@/components/skeleton";
import FeaturedCard2 from "@/components/Room/FeaturedCard2";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Featuredeventscard from "@/components/Events/Featuredeventscard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
function WeatherCard() {
  return (
    <Card className="bg-gradient-to-r from-cyan-700 to-blue-700 text-white mb-4">
      <CardHeader className="flex justify-between items-center pb-2">
        <CardTitle className="text-lg font-normal">
          SAINT LOUIS, MISSOURI
        </CardTitle>
        <MoreHorizontal className="h-5 w-5" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center">
          <div className="flex items-center mr-4">
            <Cloud className="h-10 w-10 text-white -ml-4" />
          </div>
          <div className="text-4xl font-light">54°F</div>
          <div className="ml-auto">
            <div>Mostly cloudy</div>
            <div className="flex items-center">
              <Cloud className="h-4 w-4 mr-1 text-blue-300" />
              <span>5%</span>
            </div>
          </div>
        </div>
        <div className="text-xs mt-4">
          Data from Foreca | Updated 5 mins ago
        </div>
      </CardContent>
    </Card>
  );
}
const leftColumnServices = [
  "Home Services",
  "Health & Medical",
  "Food & Restaurants",
  "Auto Care",
  "Insurance",
  "Beauty",
  "Legal",
  "Travel",
  "Clothing",
  "Groceries",
  "Entertainment",
  "Pets",
  "Food /Catering Services",
  "Moving",
  "Phone & Cable",
];

const rightColumnServices = [
  "Govt. Services",
  "Places of Worship",
  "Education & Schools",
  "Music",
  "Sports",
  "Child & Seniors Care",
  "Jobs & Careers",
  "Real Estates",
  "Weddings",
  "Funeral & Rites",
  "Hotels",
  "Taxes & Finance",
  "Desi Associations",
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

const movies = [
  {
    id: 1,
    title: "The Little Things",
    rating: "R",
    duration: "2h 8m",
    year: 2021,
    price: "From $19.99",
    image: "/placeholder.svg?height=600&width=400&text=The+Little+Things",
  },
  {
    id: 2,
    title: "Tenet",
    rating: "R",
    duration: "2h 8m",
    year: 2021,
    price: "From $19.99",
    image: "/placeholder.svg?height=600&width=400&text=The+Little+Things",
  },
  {
    id: 3,
    title: "The Empty Man",
    rating: "R",
    duration: "2h 8m",
    year: 2021,
    price: "From $19.99",
    image: "/placeholder.svg?height=600&width=400&text=The+Little+Things",
  },
  {
    id: 4,
    title: "Greenland",
    rating: "R",
    duration: "2h 8m",
    year: 2021,
    price: "From $19.99",
    image: "/placeholder.svg?height=600&width=400&text=The+Little+Things",
  },
  {
    id: 5,
    title: "Promising Young Woman",
    rating: "R",
    duration: "2h 8m",
    year: 2021,
    price: "From $19.99",
    image: "/placeholder.svg?height=600&width=400&text=The+Little+Things",
  },
];

const newsItems = [
  {
    title: "Before You Buy Sandisk Growers, Stop and Consider These 5 Things",
    source: "The Motley Fool",
    time: "1 day ago",
    price: "$3.50",
    change: "+12.75%",
    positive: true,
  },
  {
    title: "Apple (AAPL) HomePod Mini Secret Sensor for Smart Home Thermostats",
    source: "Bloomberg.com",
    time: "13 hours ago",
    price: "$123.39",
    change: "+2.83%",
    positive: true,
  },
  {
    title:
      "BLR Technology stock sinks 45% after report says Chinese government w...",
    source: "Business Insider",
    time: "9 hours ago",
    price: "$10.15",
    change: "-67.84%",
    positive: false,
  },
  {
    title: "Why AMC Stock Plunges Today",
    source: "The Motley Fool",
    time: "5 hours ago",
    price: "$12.49",
    change: "+10.34%",
    positive: true,
  },
  {
    title: "Ford Spokesperson Dismisses Tesla Model Y as 'Vaporware'",
    source: "Yahoo Finance",
    time: "1 day ago",
    price: "$12.85",
    change: "+0.19%",
    positive: true,
  },
  {
    title: "NDX Inc. ADR falls Monday, underperforms market",
    source: "MarketWatch",
    time: "3 hours ago",
    price: "$42.94",
    change: "-0.99%",
    positive: false,
  },
];
export default function Home() {
  const { currentCity, status } = useAuthStore();
  const { Room, loading, error } = useRoomFetching(currentCity || "Portland");
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };
  const featuredRooms = Room?.slice(0, 6);

  if (loading) {
    return (
      <div className="flex flex-col bg-background max-w-[1370px] lg:max-w-[1600px] mt-[8rem] mx-auto px-4 sm:px-6">
        <div className="w-full justify-between flex items-center font-sans">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-10 w-28" />
        </div>
        <div className="lg:mt-8 mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:mt-3 xl:grid-cols-2 xl:gap-2">
          {[...Array(6)].map((_, index) => (
            <SkeletonFeaturedCard key={index} />
          ))}
        </div>
        <Skeleton className="h-8 w-64 my-4" />
      </div>
    );
  }

  return (
    <div className="flex lg:flex-row flex-col bg-background max-w-[1370px] lg:max-w-[1600px] mt-[8rem] mx-auto px-4 sm:px-6 font-sans lg:mb-[3rem] mb-[32rem]">
      <div className="w-full lg:w-4/5 mr-4">
        <h2 className="text-[25px] font-sans font-bold text-gray-800">
          Events{" "}
        </h2>
        <div className="w-full max-w-[79rem] mt-3 mx-auto">
          <Carousel
            opts={{
              align: "start",
            }}
            className=""
          >
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                  <div className="w-full ">
                    <Featuredeventscard key={index} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-[-12] top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute right-[-12] top-1/2 -translate-y-1/2" />
          </Carousel>
        </div>
        <div>Featured Rooms</div>
        <h2 className="text-[25px] font-sans font-bold text-gray-800">
          Rooms & Roommates{" "}
        </h2>
        <div className="lg:mt-8 mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:mt-3 xl:grid-cols-2 xl:gap-2">
          {featuredRooms?.map((room, index) => (
            <FeaturedCard2 key={index} room={room} />
          ))}
        </div>
        <div className="w-full">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">Movies</h2>
            <div className="flex space-x-4 overflow-x-auto pb-4">
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  className="flex-shrink-0 w-[150px] transition-all duration-300 ease-in-out hover:w-[400px]"
                >
                  <Card className="h-[300px] border-0 bg-transparent relative group overflow-hidden">
                    <div className="absolute inset-0">
                      <img
                        src={movie.image}
                        alt={movie.title}
                        className="object-cover w-full h-full rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute top-2 right-2 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label={`Bookmark ${movie.title}`}
                      >
                        <Bookmark className="h-6 w-6" />
                      </Button>
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="space-y-2 text-white">
                          <div className="flex items-center gap-2">
                            <span className="text-xs border px-1 rounded">
                              {movie.rating}
                            </span>
                            <span className="text-xs">{movie.duration}</span>
                            <span className="text-xs">• {movie.year}</span>
                          </div>
                          <h3 className="font-bold text-sm">{movie.title}</h3>
                          <p className="text-xs text-gray-200">{movie.price}</p>
                          <div className="flex gap-2 pt-2">
                            <Button
                              size="sm"
                              variant="secondary"
                              className="text-xs bg-white/10 hover:bg-white/20 text-white"
                            >
                              Trailer
                            </Button>
                            <Button
                              size="sm"
                              variant="secondary"
                              className="text-xs bg-white/10 hover:bg-white/20 text-white"
                            >
                              Watch options
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Card className="w-full">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-semibold">Jobs</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-0">
            {newsItems.map((item, index) => (
              <div
                key={index}
                className="flex items-start justify-between py-3 border-b border-gray-200"
              >
                <div className="space-y-1 pr-4">
                  <h3 className="text-sm font-medium leading-none">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground flex items-center">
                    {item.source}
                    <span className="mx-1.5 text-gray-300">·</span>
                    {item.time}
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-4 shrink-0">
                  <div className="text-right flex lg:flex-row flex-col gap-3">
                    <div className="text-sm font-medium">{item.price}</div>
                    <div
                      className={`text-xs px-1.5 rounded-full inline-flex items-center justify-center ${
                        item.positive
                          ? "text-green-700 bg-green-100"
                          : "text-red-700 bg-red-100"
                      }`}
                    >
                      {item.change}
                    </div>
                  </div>
                  <button className="ml-2 rounded-full p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
                    <PlusCircle className="h-4 w-4" />
                    <span className="sr-only">More information</span>
                  </button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* //this is the right side */}

      <div className="w-full mt-2 lg:max-w-[300px] max-w-full lg:ml-0 h-[725px] flex flex-col gap-6">
        <div className="max-w-md mx-auto">
          <WeatherCard />
          <Card className="w-full max-w-md bg-gradient-to-r from-cyan-700 to-blue-700 text-white">
            <CardHeader>
              <CardTitle className="text-xl font-medium text-center">
                About Portland
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
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
              <div className="pt-2">
                <p className="text-sm leading-relaxed">
                  Portland is known for its parks, bridges and bicycle paths, as
                  well as for its eco-friendliness and microbreweries. Sitting
                  in the shadow of Mount Hood, it's one of the most
                  environmentally conscious cities in the world.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-5">
            <CardContent className="p-0">
              <h2 className="text-[25px] font-bold p-4 pb-2">Services &</h2>
              <div className="bg-yellow-300 rounded-b-lg p-4">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <div>
                    {leftColumnServices.map((service, index) => (
                      <div key={index} className="text-sm">
                        {service}
                      </div>
                    ))}
                  </div>
                  <div>
                    {rightColumnServices.map((service, index) => (
                      <div key={index} className="text-sm">
                        {service}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="w-full max-w-3xl mt-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold">
                MOST RECENT SEARCHES
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-1">
              {recommendedSearches.map((search, index) => (
                <Button
                  key={index}
                  variant="link"
                  className="h-auto p-0 text-sm font-normal text-blue-500 hover:text-blue-700"
                >
                  {search}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
