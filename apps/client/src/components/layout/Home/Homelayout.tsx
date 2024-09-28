"use client";
import React, { ReactNode } from "react";
import LeafletMap from "@/components/map/LeafletMap";

export function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex bg-background max-w-[1370px] lg:max-w-[1600px] mt-32 mx-auto px-4 sm:px-6 lg:px-8">
      <div className="w-full lg:w-4/5">{children}</div>
      <div className="w-full lg:max-w-[300px] lg:mr-3 lg:ml-0 lg:mt-1 mt-5 h-5/6 flex justify-center">
        <LeafletMap />
      </div>
    </div>
  );
}
