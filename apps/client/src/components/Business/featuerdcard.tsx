import { Heart, Star } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export function FeaturedBusinessCard() {
  return (
    <Card className="w-full max-w-3xl overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-1/3">
          <img
            src="/placeholder.svg?height=200&width=200"
            alt="Modern Downtown Loft"
            className="w-full h-full object-cover"
          />
        </div>
        <CardContent className="p-6 sm:w-2/3">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Modern Downtown Loft
              </h2>
              <div className="flex items-center mt-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
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
            <Heart className="w-6 h-6 text-gray-400 hover:fill-red-500 hover:text-red-500 cursor-pointer" />
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {["Psychiatrists", "Cardiologists", "Gastroenterologists"].map(
              (tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
