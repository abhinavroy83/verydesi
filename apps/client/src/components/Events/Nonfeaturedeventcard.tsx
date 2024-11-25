"use client";

import React from "react";
import { MdOutlineDateRange } from "react-icons/md";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { Heart } from "lucide-react";

interface Event {
  _id: string;
  eventTitle: string;
  startDate: string;
  venueName: string;
  description: string;
  eventpostingcity:string;
  images: string[];
  address:string;
  state:string;
  // Add other fields as necessary
}

interface EventNonfeaturedCardProps {
  event: Event;
} 
function EventNonfeaturedCard({ event }: EventNonfeaturedCardProps) {
  return (
    <article className="font-sans flex flex-col sm:flex-row w-full sm:h-[80px] hover:cursor-pointer justify-start border shadow-md rounded-xl hover:shadow-lg relative">
      <div className="w-full sm:w-auto">
        <img
          src={
            event.images && event.images.length > 0
              ? event.images[0]
              : "https://envira.es/wp-content/uploads/2019/10/ruido-nocturno.jpg" // Fallback image
          }
          alt="Event image"
          className="rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none w-full sm:w-[7rem] h-48 sm:h-full object-cover transition duration-300 ease-in-out hover:opacity-80"
        />
      </div>
      <div className="p-3 sm:p-2 flex flex-col justify-between flex-grow">
        <div>
          <h2 className="text-[21px] font-bold line-clamp-1">
          {event.eventTitle}
          </h2>
          <div className="flex flex-col sm:flex-row gap-1 text-sm sm:text-[17px] text-gray-600 mt-1">
            <p className="flex items-center gap-1">
              <MdOutlineDateRange
                className="text-[#054687] flex-shrink-0"
                size={20}
              />
              <span>{new Date(event.startDate).toLocaleString()}</span>
            </p>
            <span className="hidden sm:inline">|</span>
            <p className="flex items-center gap-1">
              <HiOutlineLocationMarker
                className="text-[#054687] flex-shrink-0"
                size={17}
              />
              <span className="flex flex-wrap gap-1">
                <span>{event.address}</span>
                <span className="text-gray-600">- {event.eventpostingcity}, {event.state}</span>
              </span>
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center mt-2 sm:mt-0 absolute lg:right-11 lg:bottom-6 bottom-2 right-3">
          <div className="flex items-center gap-2">
            <Heart className="fill-red-600 stroke-red-500 cursor-pointer transition-colors duration-200 ease-in-out" />
            <p className="text-lg sm:text-[22px] font-bold text-green-700">
              Free
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default EventNonfeaturedCard;
