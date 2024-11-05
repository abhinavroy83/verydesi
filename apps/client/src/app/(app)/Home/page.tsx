"use client";
import dynamic from "next/dynamic";
import React, { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, Cloud, MoreHorizontal } from "lucide-react";
function WeatherCard() {
  return (
    <Card className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white mb-4">
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

export default function HomeLayout() {
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
  return (
    <div className="flex lg:flex-row flex-col bg-background max-w-[1370px] lg:max-w-[1600px] mt-[8rem] mx-auto px-4 sm:px-6">
      <div className="w-full lg:w-4/5 mr-4">
        <div>home page</div>
      </div>
      {/* //this is the right side */}
      {/* <Card className="bg-blue-600 text-white mb-4">
        <CardHeader className="flex justify-between items-center pb-2">
          <CardTitle className="text-lg font-normal">
            SAINT LOUIS, MISSOURI
          </CardTitle>
          <MoreHorizontal className="h-5 w-5" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <div className="flex items-center mr-4">
              <Sun className="h-8 w-8 text-yellow-300 mr-2" />
              <Cloud className="h-10 w-10 text-white -ml-4" />
            </div>
            <div className="text-5xl font-light">54°F</div>
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
      </Card> */}

      <div className="w-full mt-2 lg:max-w-[300px] max-w-full lg:ml-0 h-[725px] flex flex-col gap-6">
        <div className="max-w-md mx-auto p-4">
          <WeatherCard />
          <Card>
            <CardContent className="p-0">
              <h2 className="text-2xl font-bold p-4 pb-2">Services &</h2>
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
