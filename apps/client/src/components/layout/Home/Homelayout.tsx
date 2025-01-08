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
      <div className="w-full lg:max-w-[300px] max-w-full lg:ml-0 h-[725px] flex flex-col gap-6">
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
          <img
            src="https://res.cloudinary.com/druohnmyv/image/upload/v1730029852/Screenshot_2024-10-27_172007_bmcgnf.png"
            alt="Animation Character"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
