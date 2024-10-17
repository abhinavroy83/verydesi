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
    <Link href={`/event`}>
      <Card className="h-full transition-shadow hover:shadow-md lg:h-[25.4rem] w-[18.8rem]">
        <CardHeader className="p-0">
          <img
            src="https://assets-global.website-files.com/651d6fae3d3620e76a6d24d1/6526d85fb10bd7ab65ea72de_Releventful-Successful-Event-Banner.webp"
            alt="Event banner"
            className="w-full h-44 object-cover rounded-t-lg transition duration-300 ease-in-out hover:opacity-80"
          />
        </CardHeader>
        <CardContent className="p-2">
          <h2 className="text-[22px] font-bold text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
            Event Name
          </h2>
          <div className="text-[17px] text-gray-600">
            <p className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-[#054687]" />
              Saturday, Jun 29, 10:00 am
            </p>
            <p className="flex items-center gap-2">
              <MapPinIcon className="h-4 w-4 text-[#054687]" />
              Wayward Winds Lavender Farm
            </p>
          </div>
          <p className="mt-1 text-gray-600">
            Free Admission! Open daily June - August 11th from 10 am-5 pm. An
            exciting event you won't want to miss!
          </p>
        </CardContent>
        <CardFooter className="flex justify-between items-center border-t p-4 text-gray-900">
          <p className="hover:underline">Other</p>
          <span className="">12 interested</span>
        </CardFooter>
      </Card>
    </Link>
  );
}
