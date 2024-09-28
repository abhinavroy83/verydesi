import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BedDouble,
  Heart,
  MapPin,
  Clock,
  User,
  Wifi,
  Car,
  Utensils,
  Dumbbell,
} from "lucide-react";

export default function Component() {
  return (
    <Card className="w-full max-w-7xl bg-white to-pink-500 text-black">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">
              Vibrant Apartment in Cultural District
            </h2>
            <div className="flex items-center text-sm">
              <MapPin className="h-4 w-4 mr-1" />
              <span>Austin, TX</span>
              <Badge
                variant="secondary"
                className="ml-2 text-xs text-blue-700 bg-gray-200"
              >
                <Clock className="w-3 h-3 mr-1" />5 days ago
              </Badge>
            </div>
            <div className="flex items-center text-sm mt-1">
              <User className="h-4 w-4 mr-1" />
              <span>Posted by: AustinArtsLiving</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold mb-2 text-blue-700">$1800/mo</p>
            <Button
              variant="secondary"
              size="sm"
              className="rounded-full bg-gray-200"
            >
              <Heart className="h-4 w-4 mr-2" />
              Wishlist
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-2 mb-4">
          <Badge className="bg-yellow-400 text-purple-800">
            <Wifi className="w-4 h-4 mr-1" /> Free WiFi
          </Badge>
          <Badge className="bg-green-400 text-purple-800">
            <Car className="w-4 h-4 mr-1" /> Parking
          </Badge>
          <Badge className="bg-blue-400 text-purple-800">
            <Utensils className="w-4 h-4 mr-1" /> Full Kitchen
          </Badge>
          <Badge className="bg-red-400 text-purple-800">
            <Dumbbell className="w-4 h-4 mr-1" /> Gym Access
          </Badge>
        </div>
        {/* <div className="flex items-center justify-between">
          <BedDouble className="h-10 w-10" />
          <p className="text-sm">
            Immerse yourself in Austin's vibrant culture in this stylish and
            comfortable apartment.
          </p>
        </div> */}
      </CardContent>
    </Card>
  );
}
