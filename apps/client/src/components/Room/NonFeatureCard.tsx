import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  BedDouble,
  Heart,
  MapPin,
  Clock,
  User,
  Wifi,
  Tv,
  Coffee,
  Utensils,
  Car,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { RoomCardProps } from "@myrepo/types";
import Link from "next/link";

export default function Component({
  id,
  imageUrl,
  title,
  price,
  location,
  gender,
  roomType,
  postedBy,
  daysAgo,
}: RoomCardProps) {
  return (
    <Link href={`room/${id}`}>
      <Card className="w-full max-w-7xl">
        <CardContent className="p-6">
          <div className="flex items-center space-x-6">
            <div className="flex-shrink-0">
              <BedDouble className="h-16 w-16 text-gray-400" />
            </div>
            <div className="flex-grow">
              <h2 className="text-2xl font-bold mb-2">{title}</h2>
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span>Boston, MA</span>
                <Separator orientation="vertical" className="mx-2 h-4" />
                <Clock className="h-4 w-4 mr-1" />
                <span>5 days ago</span>
                <Separator orientation="vertical" className="mx-2 h-4" />
                <User className="h-4 w-4 mr-1" />
                <span>Posted by: HistoricHomesBoston</span>
              </div>
              <div className="flex space-x-2 py-2">
                <Badge className="bg-green-100 text-green-800">
                  <Wifi className="w-4 h-4 mr-1" /> Green Energy WiFi
                </Badge>
                <Badge className="bg-blue-100 text-blue-800">
                  <Car className="w-4 h-4 mr-1" /> EV Charging
                </Badge>
                <Badge className="bg-yellow-100 text-yellow-800">
                  <Utensils className="w-4 h-4 mr-1" /> Organic Cafe
                </Badge>
              </div>
            </div>
            <div className="flex-shrink-0 text-right">
              <p className="text-3xl font-bold text-blue-600 mb-2">
                {price}/mo
              </p>
              <Button variant="outline" size="sm" className="rounded-full">
                <Heart className="h-4 w-4 mr-2" />
                Add to Wishlist
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
