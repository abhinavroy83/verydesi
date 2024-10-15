"use client";
import { Card, CardContent } from "@/components/ui/card";
import dynamic from "next/dynamic";
import React, { ReactNode } from "react";
const LeafletMap = dynamic(() => import("@/components/map/LeafletMap"), {
  ssr: false,
});

export function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex lg:flex-row flex-col bg-background max-w-[1370px] lg:max-w-[1600px] mt-[9.5rem] mx-auto px-4 sm:px-6 lg:px-8 ">
      <div className="w-full lg:w-4/5 mr-4">{children}</div>
      <div className="w-full mt-2 lg:max-w-[300px] max-w-full lg:ml-0  h-[725px] flex flex-col gap-6">
        <LeafletMap />
        <Card className="w-full flex flex-col max-w-md mx-auto bg-gradient-to-br from-gray-900 to-gray-700 text-white overflow-hidden">
          <CardContent className="p-6 relative">
            <div className="relative flex flex-col">
              <div className=" bg-white flex">
                <h2 className="text-2xl px-2 text-black font-black mb-2 tracking-tight">
                  ALL
                  <br />
                  UNLIMITED!
                </h2>
                <img
                  className="w-[4rem] h-[4rem]"
                  src="https://res.cloudinary.com/druohnmyv/image/upload/v1728987555/phone_fdlxh7.gif"
                />
              </div>
              <div className="inline-block bg-pink-600 px-2 py-1 transform -rotate-2 w-[9rem]">
                <span className="text-2xl font-bold tracking-wide">
                  ALL IN!
                </span>
              </div>
              <span className="text-[18px] font-bold tracking-wide mt-3">
                Get Started With Google Fi
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
