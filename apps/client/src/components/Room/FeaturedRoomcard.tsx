import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, User, DollarSign, Clock, Home } from "lucide-react";
import Link from "next/link";
import { RoomCardProps } from "@myrepo/types";

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
  const GenderIcon = () => {
    switch (gender) {
      case "male":
        return <User className="h-5 w-5 text-blue-500" />;
      case "female":
        return <User className="h-5 w-5 text-pink-500" />;
      default:
        return <User className="h-5 w-5 text-purple-500" />;
    }
  };

  return (
    <Link href={`room/${id}`}>
      <Card className="w-[36rem] h-[165px] overflow-hidden">
        <CardContent className="p-0 flex">
          <div className="w-1/4 h-full relative">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
            <Badge className="absolute top-2 left-2 bg-white text-black">
              <GenderIcon />
            </Badge>
          </div>
          <div className="w-3/4 p-4 flex flex-col justify-between bg-gray-50">
            <div>
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold text-gray-800 line-clamp-1">
                  {title}
                </h3>
                <Heart className="h-6 w-6 text-gray-400 hover:text-red-500 cursor-pointer" />
              </div>
              <p className="text-lg font-bold text-gray-700 mt-2 flex items-center">
                <DollarSign className="h-5 w-5 mr-1" />
                {price}/month
              </p>
              <p className="text-sm text-gray-600 mt-1">{location}</p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-4">
                <Badge className="bg-blue-100 text-blue-800 flex items-center">
                  <Home className="h-4 w-4 mr-1" />
                  {roomType}
                </Badge>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{daysAgo} days ago</span>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <User className="h-4 w-4 mr-1" />
                <span>Posted by: {postedBy}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
