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
    <Link
      href={`/event`}
      className="border border-gray-200 max-h-200 h-90 flex flex-col justify-center bg-white rounded-lg mb-5"
    >
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardHeader className="p-0">
          <img
            src="https://assets-global.website-files.com/651d6fae3d3620e76a6d24d1/6526d85fb10bd7ab65ea72de_Releventful-Successful-Event-Banner.webp"
            alt="Event banner"
            className="w-full h-48 object-cover rounded-t-lg transition duration-300 ease-in-out hover:opacity-80"
          />
        </CardHeader>
        <CardContent className="p-4">
          <p className="text-[1.2rem] text-[#0073bb] font-bold hover:underline">
            Event Name
          </p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              Saturday, Jun 29, 10:00 am
            </p>
            <p className="flex items-center gap-2">
              <MapPinIcon className="h-4 w-4" />
              Wayward Winds Lavender Farm
            </p>
          </div>
          <p className="mt-3 text-sm">
            Free Admission! Open daily June - August 11th from 10 am-5 pm. An
            exciting event you won't want to miss!
          </p>
        </CardContent>
        <CardFooter className="flex justify-between items-center border-t p-4">
          <p className="text-[#0073bb] hover:underline">Other</p>
          <span className="text-sm text-muted-foreground">12 interested</span>
        </CardFooter>
      </Card>
    </Link>
  );
}
