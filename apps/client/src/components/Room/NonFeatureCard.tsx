"use client";
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
  Car,
  Utensils,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { RoomInterface } from "@myrepo/types";
import Link from "next/link";
import { stateAbbreviations } from "@/constants";
import useCartStore from "@/store/useCartStore";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";
import { IoIosFemale, IoIosMale, IoIosTransgender } from "react-icons/io";

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
          `http://apiv2.verydesi.com/favorite/postAndUpdateFavorite`,
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
        `http://apiv2.verydesi.com/favorite/postAndUpdateFavorite`,
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
          `http://apiv2.verydesi.com/favorite/findfavoritebyId/${room?._id}`,
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
      <Card className="w-full max-w-7xl shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="flex-shrink-0">
              {room?.Preferred_gender === "Male only" ? (
                <>
                  <img
                    className="h-8 w-8 sm:h-16 sm:w-16 text-gray-400"
                    src="https://res.cloudinary.com/druohnmyv/image/upload/v1723819320/assests/ocyga8lgdentnbpcjkh2.png"
                  />
                  {/* <IoIosMale className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400" /> */}
                </>
              ) : room?.Preferred_gender === "Female only" ? (
                <>
                  <img
                    className="h-10 w-10 sm:h-16 sm:w-16 text-gray-400"
                    src="https://res.cloudinary.com/druohnmyv/image/upload/v1723819317/assests/acn46dsajdgzwlmk9j5v.png"
                  />
                  {/* <IoIosFemale className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400" /> */}
                </>
              ) : (
                <>
                  <img
                    className="h-10 w-10 sm:h-16 sm:w-16 text-gray-400"
                    src="https://res.cloudinary.com/druohnmyv/image/upload/v1723819314/assests/jum9urk9pw7dsladdtuq.png"
                  />
                </>
              )}{" "}
            </div>
            <div className="flex-grow space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold">
                {room?.Title && truncateCharacters(room?.Title, 42)}
              </h2>
              <div className="flex flex-col sm:flex-row sm:items-center text-xs sm:text-sm text-gray-600 space-y-1 sm:space-y-0">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>
                    {room?.postingincity},
                    {room?.state &&
                      (room.state.length > 2
                        ? stateAbbreviations[room.state]
                        : room.state)}
                  </span>
                </div>
                <Separator
                  orientation="vertical"
                  className="hidden sm:block mx-2 h-4"
                />
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{calculateTimeDifference(room?.postedon)}</span>
                </div>
                <Separator
                  orientation="vertical"
                  className="hidden sm:block mx-2 h-4"
                />
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  <span>Posted by: {room?.user_name}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 py-2">
                <Badge className="bg-green-100 text-green-800 hover:bg-blue-600 hover:text-white transition-colors duration-300">
                  <Wifi className="w-3 h-3 sm:w-4 sm:h-4 mr-1" /> Green Energy
                  WiFi
                </Badge>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-600 hover:text-white transition-colors duration-300">
                  <Car className="w-3 h-3 sm:w-4 sm:h-4 mr-1" /> EV Charging
                </Badge>
                <Badge className="bg-yellow-100 text-yellow-800 hover:bg-blue-600 hover:text-white transition-colors duration-300">
                  <Utensils className="w-3 h-3 sm:w-4 sm:h-4 mr-1" /> Organic
                  Cafe
                </Badge>
              </div>
            </div>
            <div className="flex-shrink-0 w-full sm:w-auto text-left sm:text-right">
              <p className="text-xl sm:text-2xl font-bold text-blue-600 mb-2">
                ${room?.Expected_Rooms}/mo
              </p>
              {!status && (
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 bg-gradient-to-t from-black to-transparent">
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      toast.success("please login");
                    }}
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto rounded-lg hover:bg-red-600 hover:text-white transition-colors duration-300"
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Add to Wishlist
                  </Button>
                </div>
              )}
              {status && (
                <div>
                  {!wishliststatys ? (
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        makewishlist(room?._id);
                      }}
                      variant="outline"
                      size="sm"
                      className="w-full sm:w-auto rounded-lg hover:bg-red-600 hover:text-white transition-colors duration-300"
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      Add to Favorite
                    </Button>
                  ) : (
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        unwish(room?._id);
                      }}
                      variant="outline"
                      size="sm"
                      className="w-full sm:w-auto rounded-lg bg-red-600 text-white hover:bg-white hover:text-blue-500 transition-colors duration-300"
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      Remove from Favorite
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
