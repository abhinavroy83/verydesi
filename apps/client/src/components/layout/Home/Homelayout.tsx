"use client";
import dynamic from "next/dynamic";
import React, { ReactNode } from "react";
const LeafletMap = dynamic(() => import("@/components/map/LeafletMap"), {
  ssr: false,
});

export function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex lg:flex-row flex-col bg-background max-w-[1370px] lg:max-w-[1600px] mt-[7rem] mx-auto  px-4 sm:px-6 lg:px-8 ">
      <div className="w-full lg:w-4/5 mr-4">{children}</div>
      <div className="w-full lg:max-w-[300px] lg:ml-0 lg:mt-3 mt-5 h-5/6 flex justify-center">
        <LeafletMap />
      </div>
    </div>
  );
}
