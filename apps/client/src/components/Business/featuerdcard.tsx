import { Check, Heart, Star, TicketCheck } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export function FeaturedBusinessCard() {
  return (
    <Card className="w-full max-w-3xl overflow-hidden shadow-md hover:shadow-lg ">
      <div className="relative flex flex-col sm:flex-row">
        <div className="sm:w-1/3">
          <img
            src="https://res.cloudinary.com/druohnmyv/image/upload/v1725364188/duw9dhbpevprltzdyi7d.jpg"
            alt="Modern Downtown Loft"
            className="w-full h-full object-cover"
          />
        </div>
        <CardContent className="p-3 sm:w-2/3">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Modern Downtown Loft
              </h2>
              <p className="absolute font-bold bg-white/80 top-0 left-0 p-1 px-3 rounded-br-lg text-center">
                <p className="left-5 top-2 text-[22px] text-green-700 text-right">
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < 4 ? "text-orange-500 fill-orange-500" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    {/* <span className="ml-2 text-sm text-gray-600">
                      4.5 (11 reviews)
                    </span> */}
                  </div>
                </p>
              </p>
              <div className="flex items-center mt-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < 4 ? "text-orange-500 fill-orange-500" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  4.5 (11 reviews)
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                2808 Rt North Brunswick, New Jersey
              </p>
              <p className="text-sm font-semibold text-gray-800 mt-1">
                602-600-0217 (Pin: 76065)
              </p>
            </div>
            <Heart className="w-6 h-6 text-gray-900 hover:fill-red-500 hover:text-red-500 cursor-pointer" />
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {["Psychiatrists", "Cardiologists", "Gastroenterologists"].map(
              (tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 text-pink-500 text-xs font-medium rounded-full"
                >
                  <div className="flex gap-1">
                    {" "}
                    <Check size={15} />
                    {tag}{" "}
                  </div>
                </span>
              )
            )}
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
