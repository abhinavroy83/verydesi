"use client";
import { Card, CardContent } from "@/components/ui/card";
import dynamic from "next/dynamic";
import React, { ReactNode } from "react";
const LeafletMap = dynamic(() => import("@/components/map/LeafletMap"), {
  ssr: false,
});

export function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex lg:flex-row flex-col bg-background max-w-[1370px] lg:max-w-[1600px] mt-[9.5rem] mx-auto px-4 sm:px-6">
      <div className="w-full lg:w-4/5 mr-4">{children}</div>
      <div className="w-full mt-2 lg:max-w-[300px] max-w-full lg:ml-0 h-[725px] flex flex-col gap-6">
        <LeafletMap />
        <div className="w-full max-w-md mx-auto bg-[#0e2144] text-white overflow-hidden shadow-lg h-[270px]">
          <div className="flex justify-between">
            <img
              src="https://www.onepay.com/wp-content/uploads/2021/09/AdobeStock_601870823-600x477.jpg"
              alt="Animation Character"
              width={100}
              height={100}
              className="object-cover"
            />
            <img
              src="https://th.bing.com/th/id/OIP._hC-o-Tv2_Y6cmmjIz2HlAAAAA?rs=1&pid=ImgDetMain"
              alt="Superhero Character"
              width={100}
              height={100}
              className="object-cover"
            />
            <img
              src="https://www.thecourtyarddental.com/wp-content/uploads/2019/06/Preventive-Dentistry-1.jpg"
              alt="Sci-Fi Character"
              width={100}
              height={100}
              className="object-cover"
            />
          </div>
          <div className="p-1 space-y-1">
            <img
              src="https://www.thesmbguide.com/images/Google-Fi-1024x512-20190912.png"
              width={150}
              height={20}
              className="mx-auto"
            />
            <p className="text-center text-sm font-semibold">
              Google Fi’s ability to accommodate multiple users under one plan.{" "}
            </p>
            {/* <div className="flex justify-center space-x-2">
              {["Disney", "Pixar", "Marvel", "Star Wars", "Geographic"].map(
                (brand) => (
                  <span key={brand} className="text-xs font-bold">
                    {brand}
                  </span>
                )
              )}
            </div> */}
            
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
              Start Free Trial
            </button>
          </div>
          
        </div>
        {/* <Card className="w-full flex flex-col max-w-md mx-auto bg-gradient-to-br from-gray-900 to-gray-700 text-white overflow-hidden">
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
                  src="https://res.cloudinary.com/druohnmyv/img/upload/v1728987555/phone_fdlxh7.gif"
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
        </Card> */}
      </div>
    </div>
  );
}
