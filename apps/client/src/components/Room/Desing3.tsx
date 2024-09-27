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
  Tv,
  Coffee,
  Car,
} from "lucide-react";

export default function Component() {
  return (
    <Card className="w-full max-w-7xl overflow-hidden">
      <CardContent className="p-0">
        <div className="grid grid-cols-3 gap-4 p-6">
          <div className="col-span-2">
            <h2 className="text-2xl font-bold mb-2">Modern Loft in Downtown</h2>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span>Chicago, IL</span>
              <Badge variant="secondary" className="ml-2 text-xs">
                <Clock className="w-3 h-3 mr-1" />5 days ago
              </Badge>
            </div>
            <div className="flex items-center text-sm text-gray-600 mb-4">
              <User className="h-4 w-4 mr-1" />
              <span>Posted by: UrbanChicagoLiving</span>
            </div>
            <p className="text-gray-700 mb-4">
              Experience urban living at its finest in this spacious loft with
              stunning city views and modern amenities.
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Badge className="flex items-center justify-center py-1">
                <Wifi className="w-4 h-4 mr-2" /> Free WiFi
              </Badge>
              <Badge className="flex items-center justify-center py-1">
                <Tv className="w-4 h-4 mr-2" /> Smart TV
              </Badge>
              <Badge className="flex items-center justify-center py-1">
                <Coffee className="w-4 h-4 mr-2" /> Coffee Bar
              </Badge>
              <Badge className="flex items-center justify-center py-1">
                <Car className="w-4 h-4 mr-2" /> Parking
              </Badge>
            </div>
          </div>
          <div className="flex flex-col justify-between items-end">
            <div className="text-right mb-4">
              <p className="text-3xl font-bold text-blue-600">$2200/mo</p>
              <Button variant="outline" size="sm" className="mt-2">
                <Heart className="h-4 w-4 mr-2" />
                Add to Wishlist
              </Button>
            </div>
            <BedDouble className="h-16 w-16 text-gray-400" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
