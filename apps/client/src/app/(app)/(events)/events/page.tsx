"use client";

import { HomeLayout } from "@/components/layout/Home";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import Featuredeventscard from "@/components/Events/Featuredeventscard";
import SkeletonFeaturedeventscard from "@/components/skeleton/FeaturedEventsSkeletonCard";
import SkeletonNonfeaturedeventcard from "@/components/skeleton/NonFeaturedEventsCardSkeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import EventNonfeaturedCard from "@/components/Events/Nonfeaturedeventcard";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";
import axios from "axios";
type SortOption = "Recommended" | "Highest Rated" | "Most Reviewed";
export default function Component() {
  const [showAll, setShowAll] = useState(false);
  const { currentCity } = useAuthStore();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [selectedOption, setSelectedOption] =
    useState<SortOption>("Recommended");

  const options: SortOption[] = [
    "Recommended",
    "Highest Rated",
    "Most Reviewed",
  ];
  interface Event {
    _id: string;
    eventpostingcity: string;
    eventTitle: string;
    startDate: string;
    venueName: string;
    description: string;
    images: string[];
    address: string;
    state: string;
  }
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([]);
  const [nonFeaturedEvents, setNonFeaturedEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string | null>(null);


  const handleSelect = (option: SortOption) => {
    setSelectedOption(option);
    setIsOpen(false);
    // Here you would typically call a function to actually sort the items
    console.log(`Sorting by: ${option}`);
  };
  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(nonFeaturedEvents.length / itemsPerPage);

  useEffect(() => {
    const fetchEvents = async () => {
        setLoading(true); // Start loading
        try {
            const city = currentCity || "Portland";
            const response = await axios.get(
                `https://apiv2.verydesi.com/event/getEventByArea/${city}`
            );
            const events: Event[] = response.data;

            const filteredFeaturedEvents = events
                .filter(event => event.eventpostingcity === city && new Date(event.startDate) >= new Date())
                .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
                .slice(0, 10);

            const remainingEvents = events
                .filter(event => !filteredFeaturedEvents.includes(event))
                .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

            setFeaturedEvents(filteredFeaturedEvents);
            setNonFeaturedEvents(remainingEvents);
        } catch (error) {
            console.error("Error fetching events:", error);
            setError("Could not load events.");
        } finally {
            setLoading(false); // Stop loading
        }
    };
    fetchEvents();
}, []);

  const paginatedEvents = nonFeaturedEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    <HomeLayout>
      <div className="w-full max-w-[1370px] lg:max-w-[1600px] mx-auto mb-9 lg:pl-3 font-sans">
        <div>
          <div className="flex lg:flex-row flex-col justify-between lg:items-center gap-1">
            <h1 className="capitalize text-[23px] lg:text-[23px] font-bold">
              <p>Featured Events In </p>
            </h1>
            <div className="flex gap-3 items-center">
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
                onClick={() => {
                  router.push("/post-events");
                }}
                className="rounded-md bg-green-800 font-bold whitespace-nowrap py-2 px-3 lg:px-2 text-[16px] items-center text-white shadow-sm shadow-[#ccc] hover:bg-green-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Post Events
              </button>
            </div>
          </div>
        </div>


<div className="w-full max-w-[79rem] mt-3 mx-auto">
  <Carousel
    opts={{
      align: "start",
    }}
    className=""
  >
    <CarouselContent>
      {loading ? (
        // Display skeleton cards while loading
        [...Array(10)].map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
            <div className="w-full">
          
              <SkeletonFeaturedeventscard key={index}/>
            </div>
          </CarouselItem>
        ))
      ) : (
        // Display actual featured events after loading completes
        featuredEvents.map((event) => (
          <CarouselItem key={event._id} className="md:basis-1/2 lg:basis-1/4">
            <div className="w-full">
              <Featuredeventscard key={event._id} event={event} />
            </div>
          </CarouselItem>
        ))
      )}
    </CarouselContent>
    <CarouselPrevious className="absolute left-[-12] top-1/2 -translate-y-1/2" />
    <CarouselNext className="absolute right-[-12] top-1/2 -translate-y-1/2" />
  </Carousel>
</div>
      </div>
      <h1 className="capitalize text-[23px] lg:text-[23px] font-bold mt-0">
        <p>More Featured Events In </p>
      </h1>



      <div className="flex flex-col gap-2 mt-2 mb-10">
  {loading ? (
    // Render skeleton cards while loading
    [...Array(itemsPerPage)].map((_, index) => (

      <SkeletonNonfeaturedeventcard key={index} />
    ))
  ) : (
    // Render actual non-featured events after loading completes
    paginatedEvents.map((event) => (
      <EventNonfeaturedCard key={event._id} event={event} />
    ))
  )}
</div>

      {/* Pagination Component */}
      <div className="flex justify-center mb-4">
        <Pagination>
          <PaginationContent>
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={() => setCurrentPage(index + 1)}
                  isActive={currentPage === index + 1}
                  className={currentPage === index + 1 ? "border-2 border-black" : ""}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          </PaginationContent>
        </Pagination>
      </div>
    </HomeLayout>
  );
}
