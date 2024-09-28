import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BedDouble,
  Heart,
  MapPin,
  Clock,
  User,
  Wifi,
  Utensils,
} from "lucide-react";

export default function Component() {
  return (
    <Card className="w-[36rem] h-[220px] perspective-1000 group">

      <CardContent className="p-0 flex h-full">
        <div className="flex flex-col justify-between flex-grow p-4 transition-transform duration-500 transform-style-3d group-hover:rotate-y-180">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-purple-700 transition-colors duration-300">
              Luxury Highrise Studio
            </h2>

            <div className="flex items-center text-sm text-gray-600 mb-1 group-hover:text-purple-600 transition-colors duration-300">
              <MapPin className="h-4 w-4 mr-1 text-purple-500" />
              <span>New York, NY</span>
              <span className="mx-1">•</span>
              <BedDouble className="h-4 w-4 mx-1 text-purple-500" />
              <span>Studio</span>
            </div>
            <div className="flex items-center text-xs text-gray-500 mb-2 group-hover:text-purple-500 transition-colors duration-300">
              <User className="h-3 w-3 mr-1 text-indigo-500" />
              <span>Posted by: NYCLuxeLiving</span>
              <span className="mx-1">•</span>
              <Clock className="h-3 w-3 mr-1 text-indigo-500" />
              <span>5 days ago</span>
            </div>
            <div className="flex space-x-2 mb-4">
              <Badge
                variant="secondary"
                className="text-xs bg-purple-100 text-purple-700 group-hover:bg-purple-200 transition-colors duration-300"
              >
                <Wifi className="h-3 w-3 mr-1" />
                High-speed WiFi
              </Badge>
              <Badge
                variant="secondary"
                className="text-xs bg-indigo-100 text-indigo-700 group-hover:bg-indigo-200 transition-colors duration-300"
              >
                <Utensils className="h-3 w-3 mr-1" />
                Gourmet Kitchen
              </Badge>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-3xl font-bold text-blue-600 group-hover:scale-105 transition-transform duration-300">
              $2800/mo
            </p>
          </div>
        </div>
        <div className="w-1/3 relative group">
          <img
            src="https://placeholder.pics/svg/240x192"
            alt="Luxury Highrise Studio"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
            <Button
              variant="secondary"
              size="sm"
              className="w-full bg-white text-blue-500 hover:bg-blue-100 group-hover:translate-y-1 transition-transform duration-300"
            >
              <Heart className="h-4 w-4 mr-2" />
              Add to Wishlist
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
