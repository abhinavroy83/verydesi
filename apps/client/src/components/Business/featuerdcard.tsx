import { Check, Heart, Star, TicketCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { BusinessData } from "@myrepo/types";
import Image from "next/image";

interface bussinesprops {
  business: BusinessData;
}

export function FeaturedBusinessCard({ business }: bussinesprops) {
  const tags = [
    "Psychiatrists",
    "Cardiologists",
    "Gastroenterologists",
    "Neurologists",
    "Dermatologists",
  ];

  return (
    <Link href={`/business/1212`}>
      <Card className="w-full max-w-3xl overflow-hidden hover:shadow-lg font-sans">
        <div className=" flex flex-col sm:flex-row">
          <div className="relative w-full sm:w-1/3 h-48 sm:h-auto">
            <Image
              src={
                "https://res.cloudinary.com/druohnmyv/image/upload/v1725364188/duw9dhbpevprltzdyi7d.jpg"
              }
              alt="Modern Downtown Loft"
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-500 ease-in-out hover:scale-110"
            />
          </div>
          <CardContent className="p-3 sm:w-2/3">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-[21px] font-sans font-bold text-gray-800">
                  Modern Downtown Loft
                </h2>
                {/* <p className="absolute font-bold bg-white/80 top-0 left-0 p-1 px-3 rounded-br-lg text-center">
                  <p className="left-5 top-2 text-[22px] text-green-700 text-right">
                    <div className="flex items-center">
                      <span className="ml-2 text-sm text-gray-600">
                      4.5 (11 reviews)
                    </span>
                    </div>
                  </p>
                </p> */}
                <div className="flex items-center mt-1 text-[18px] text-gray-600">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < 4 ? "text-orange-500 fill-orange-500" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600 text-[18px]">
                    4.5 (11 reviews)
                  </span>
                </div>
                <p className=" text-gray-600 mt-1 text-[18px]">
                  2808 Rt North Brunswick, New Jersey
                </p>
                <p className=" font-semibold text-gray-800 mt-1 text-[18px]">
                  602-600-0217 (Pin: 76065)
                </p>
              </div>
              <Heart className="w-6 h-6 text-gray-900 hover:fill-red-500 hover:text-red-500 cursor-pointer" />
            </div>
            <div
              className="flex overflow-x-auto scrollbar-hide gap-2 py-2"
              style={{ maxWidth: "calc(2 * (12rem + 0.5rem))" }}
            >
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex-shrink-0 px-2 py-1 bg-gray-100 text-pink-500 text-[13px] font-medium rounded-full whitespace-nowrap"
                >
                  <div className="flex items-center gap-1">
                    <Check size={15} />
                    {tag}
                  </div>
                </span>
              ))}
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
}
