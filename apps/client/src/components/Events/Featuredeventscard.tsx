"use client";

import React from "react";
import { CalendarIcon, MapPinIcon } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Event {
  _id: string;
  eventTitle: string;
  startDate: string;
  venueName: string;
  description: string;
  images: string[];
  address:string;
  // Add other fields as necessary
}

interface EventcardProps {
  event: Event;
}

export default function Eventcard({ event }: EventcardProps) {
  return (
    <Link href={`/event/${event._id}`}>
      <Card className="h-full transition-shadow hover:shadow-md w-full sm:w-[100%] max-w-sm mx-auto font-sans">
        <CardHeader className="p-0">
          <img
            src={event.images[0] || "https://via.placeholder.com/150"} // Fallback if no image is available
            alt={`${event.eventTitle} banner`}
            className="w-full h-44 object-cover rounded-t-lg transition duration-300 ease-in-out hover:opacity-80"
          />
        </CardHeader>
        <CardContent className="p-4">
          <h2 className="text-xl sm:text-[21px] font-bold text-gray-800 group-hover:text-blue-700 transition-colors duration-300 mb-2">
            {event.eventTitle} event event evnt
          </h2>
          <div className="text-sm sm:text-[17px] text-gray-600 space-y-1">
            <p className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-[#054687] flex-shrink-0" />
              <span>{new Date(event.startDate).toLocaleString()}</span>
            </p>
            <p className="flex items-center gap-2">
              <MapPinIcon className="h-4 w-4 text-[#054687] flex-shrink-0" />
              <span>{event.address}</span>
            </p>
          </div>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            {event.description}
          </p>
        </CardContent>
      
      </Card>
    </Link>
  );
}
