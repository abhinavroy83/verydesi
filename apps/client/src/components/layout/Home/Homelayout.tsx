"use client";
import { Card, CardContent } from "@/components/ui/card";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import React, { ReactNode, use } from "react";
const LeafletMap = dynamic(() => import("@/components/map/LeafletMap"), {
  ssr: false,
});

export function HomeLayout({ children }: { children: ReactNode }) {
  const categories = {
    "Business & Services": [
      "Home Services",
      "Beauty",
      "Auto Care",
      "Insurance",
      "Health & Medical",
      "Legal",
      "Food & Restaurants",
      "Travel",
      "Clothing",
      "Groceries",
      "Entertainment",
      "Pets",
      "Food/Catering",
      "Moving",
      "Phone & Cable",
    ],
  };
  const pathname = usePathname();

  const businesspath = pathname === "/business";
  return (
    <div className="flex lg:flex-row flex-col bg-background max-w-[1370px] lg:max-w-[1600px] mt-[8rem] mx-auto px-4 sm:px-6">
      <div className="w-full lg:w-4/5 mr-4">{children}</div>
      <div
        className={`w-full lg:max-w-[300px] max-w-full lg:ml-0  ${businesspath ? "h-full" : "h-[725px]"} flex flex-col gap-6`}
      >
        <LeafletMap />
        {businesspath && (
          <Card className="">
            <CardContent className="p-0">
              {/* <h2 className="text-[25px] font-bold p-4 pb-2">Services &</h2> */}
              <div className="bg-yellow-400 rounded-lg p-1">
                <div className="p-1 space-y-2">
                  <div className="space-y-1">
                    {Object.entries(categories).map(([section, items]) => (
                      <div key={section} className="space-y-4">
                        <h3 className="text-xl font-semibold text-muted-foreground">
                          {section}
                        </h3>
                        <div className="flex flex-wrap gap-1">
                          {items.map((category) => (
                            <div
                              key={category}
                              // variant="secondary"
                              className="cursor-pointer bg-white p-1 px-2 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                            >
                              {category}
                            </div>
                          ))}
                        </div>
                        <p className="flex w-full justify-end cursor-pointer">
                          View All Category
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        <div
          onClick={() => {
            window.open("https://g.co/fi/r/Y2A1CA", "_blank");
          }}
          className="w-full max-w-md mx-auto bg-[#0e2144] text-white overflow-hidden shadow-lg cursor-pointer"
        >
          {/* <div className="flex justify-between">
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
          <div className="p-1 space-y-3">
            <img
              src="https://www.thesmbguide.com/images/Google-Fi-1024x512-20190912.png"
              width={150}
              height={20}
              className="mx-auto"
            />
            <p className="text-center text-sm font-semibold">
              Google Fi’s ability to accommodate multiple users under one plan.{" "}
            </p>
            <div className="flex justify-center space-x-2">
              {["Disney", "Pixar", "Marvel", "Star Wars", "Geographic"].map(
                (brand) => (
                  <span key={brand} className="text-xs font-bold">
                    {brand}
                  </span>
                )
              )}
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-300">
              Most affordable plan{" "}
            </button>
          </div> */}
          <img
            src="https://res.cloudinary.com/druohnmyv/image/upload/v1730029852/Screenshot_2024-10-27_172007_bmcgnf.png"
            alt="Animation Character"
            className="object-cover"
          />
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
