"use client";
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
import { RoomInterface } from "@myrepo/types";
import Link from "next/link";
import { stateAbbreviations } from "@/constants";
import useCartStore from "@/store/useCartStore";
import useAuthStore from "@/store/useAuthStore";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

interface FeaturedCard2Props {
  room: RoomInterface;
}

export default function Component({ room }: FeaturedCard2Props) {
  const { pluscart, minuscart } = useCartStore();
  const [wishliststatys, setWishlistStatus] = useState(false);
  const { data: session, status } = useSession();

  function truncateCharacters(str: string, numCharacters: number) {
    if (str.length > numCharacters) {
      return str.slice(0, numCharacters) + "...";
    }
    return str;
  }
  const token = session?.accessToken;
  const makewishlist = async (_id: string) => {
    if (status) {
      try {
        const dat = { roomId: _id, status: true };
        const res = await axios.post(
          `http://ec2-18-237-230-139.us-west-2.compute.amazonaws.com:8000/favorite/postAndUpdateFavorite`,
          dat,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (
          res.data.msg === "Successfully added to wishlist" ||
          res.data.msg === "Successfully updated"
        ) {
          pluscart();
          setWishlistStatus(true);
          toast.success("Added to Favorites.");
        }
      } catch (error) {
        console.error("Error adding to wishlist:", error);
      }
    } else {
      toast.error("Removed from Favorites.");
    }
  };
  const unwish = async (_id: string) => {
    try {
      const dat = { roomId: _id, status: false };
      const res = await axios.post(
        `http://ec2-18-237-230-139.us-west-2.compute.amazonaws.com:8000/favorite/postAndUpdateFavorite`,
        dat,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (
        res.data.msg === "Successfully removed" ||
        res.data.msg === "Wishlist cleared"
      ) {
        minuscart();
        setWishlistStatus(false);
        toast.error("Removed from Favorites.");
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };
  useEffect(() => {
    const fetchWishStatus = async () => {
      try {
        const res = await axios.get(
          `http://ec2-18-237-230-139.us-west-2.compute.amazonaws.com:8000/favorite/findfavoritebyId/${room?._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data.status === "not found") {
          setWishlistStatus(false);
        } else {
          setWishlistStatus(res.data.status);
        }
      } catch (error) {
        console.error("Error during fetching wishlist status:", error);
      }
    };

    fetchWishStatus();
  }, [room?._id, token]);

  const calculateTimeDifference = (dateStr: Date) => {
    const date = new Date(dateStr);
    const currentDate = new Date();
    const diffInMs = currentDate.getTime() - date.getTime();
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30);

    if (diffInSeconds < 60) {
      return "Just now";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    } else if (diffInDays < 30) {
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    } else {
      return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
    }
  };

  return (
    <Link href={`room/${room?._id}`}>
      <Card className="lg:w-full  w-[21rem] h-auto sm:h-[190px] perspective-1000 group shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardContent className="p-0 flex flex-col sm:flex-row h-full">
          <div className="w-full sm:w-1/3 relative group">
            <img
              src={
                room && room.Imgurl && room.Imgurl.length > 0
                  ? room.Imgurl[0]
                  : "https://placeholder.pics/svg/300"
              }
              alt="Room Image"
              className="w-full h-48 sm:h-full object-cover rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none duration-500 ease-in"
            />
            {!status && (
              <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 bg-gradient-to-t from-black to-transparent">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    toast.success("please login");
                  }}
                  variant="secondary"
                  size="sm"
                  className="w-full bg-white text-blue-500 hover:bg-red-600 hover:text-white group-hover:translate-y-1 transition-all duration-300"
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Add to Wishlist
                </Button>
              </div>
            )}

            {status && (
              <div>
                {!wishliststatys ? (
                  <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 bg-gradient-to-t from-black to-transparent">
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        makewishlist(room?._id);
                      }}
                      variant="secondary"
                      size="sm"
                      className="w-full bg-white text-blue-500 hover:bg-red-600 hover:text-white group-hover:translate-y-1 transition-all duration-300"
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      Add to Favorite
                    </Button>
                  </div>
                ) : (
                  <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 bg-gradient-to-t from-black to-transparent">
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        unwish(room?._id);
                      }}
                      variant="secondary"
                      size="sm"
                      className="w-full hover:bg-white hover:text-blue-500 bg-red-600 text-white group-hover:translate-y-1 transition-all duration-300"
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      Remove from Favorite
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="flex flex-col flex-grow p-4 transition-transform duration-500 transform-style-3d group-hover:rotate-y-180">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 group-hover:text-purple-700 transition-colors duration-300">
                {room?.Title && truncateCharacters(room?.Title, 25)}
              </h2>

              <div className="flex flex-wrap items-center text-xs sm:text-sm text-gray-600 mb-1 group-hover:text-purple-600 transition-colors duration-300">
                <div className="flex items-center mr-2 mb-1 sm:mb-0">
                  <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-purple-500" />
                  <span>
                    {room?.postingincity},
                    {room?.state &&
                      (room.state.length > 2
                        ? stateAbbreviations[room.state]
                        : room.state)}
                  </span>
                </div>
                <div className="flex items-center">
                  <BedDouble className="h-3 w-3 sm:h-4 sm:w-4 mx-1 text-purple-500" />
                  <span>Studio</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center text-xs text-gray-500 mb-2 group-hover:text-purple-500 transition-colors duration-300">
                <div className="flex items-center mr-2 mb-1 sm:mb-0">
                  <User className="h-3 w-3 mr-1 text-indigo-500" />
                  <span>Posted by: {room?.user_name}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1 text-indigo-500" />
                  <span>{calculateTimeDifference(room?.postedon)}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
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
            <div className="flex justify-between items-center mt-auto">
              <p className="text-xl sm:text-2xl font-bold text-blue-600 group-hover:scale-105 transition-transform duration-300">
                ${room?.Expected_Rooms}/mo
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
