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
export default function Home() {
  const { currentCity, status } = useAuthStore();
  const { Room, loading, error } = useRoomFetching(currentCity || "Portland");
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
    <div className="flex lg:flex-row flex-col bg-background max-w-[1370px] lg:max-w-[1600px] mt-[8rem] mx-auto px-4 sm:px-6 font-sans">
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
        </div>
      </div>
    </div>
  );
}
