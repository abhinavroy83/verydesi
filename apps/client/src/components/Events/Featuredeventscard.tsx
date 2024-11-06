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

export default function Eventcard() {
  return (
    <Link href={`/165464`}>
      <Card className="h-full transition-shadow hover:shadow-md w-full sm:w-[100%] max-w-sm mx-auto font-sans">
        <CardHeader className="p-0">
          <img
            src="https://i.pinimg.com/originals/48/89/38/488938d6eec996de2365b072357aac16.jpg"
            alt="Event banner"
            className="w-full h-44 object-cover rounded-t-lg transition duration-300 ease-in-out hover:opacity-80"
          />
        </CardHeader>
        <CardContent className="p-4">
          <h2 className="text-xl sm:text-[21px] font-bold text-gray-800 group-hover:text-blue-700 transition-colors duration-300 mb-2">
            Event Name
          </h2>
          <div className="text-sm sm:text-[17px] text-gray-600 space-y-1">
            <p className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-[#054687] flex-shrink-0" />
              <span>Saturday, Jun 29, 10:00 am</span>
            </p>
            <p className="flex items-center gap-2">
              <MapPinIcon className="h-4 w-4 text-[#054687] flex-shrink-0" />
              <span>Wayward Winds Lavender Farm</span>
            </p>
          </div>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Free Admission! Open daily June - August 11th from 10 am-5 pm.
          </p>
        </CardContent>
        <CardFooter className="flex justify-between items-center border-t p-4 text-sm sm:text-base text-gray-900">
          <p className="hover:underline">Other</p>
          <span>12 interested</span>
        </CardFooter>
      </Card>
    </Link>
  );
}
