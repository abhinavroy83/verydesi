"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Clock, User } from "lucide-react";
import { IoIosFemale, IoIosMale, IoIosTransgender } from "react-icons/io";
import { stateAbbreviations } from "@/constants";
import useCartStore from "@/store/useCartStore";
import useAuthStore from "@/store/useAuthStore";
import { useloginstore, useScreenResolution } from "@/store";
import TruncateText from "@/lib/truncate-characters";

interface RoomInterface {
  _id: string;
  Title: string;
  Imgurl: string[];
  city: string;
  state: string;
  Preferred_gender: string;
  user_name: string;
  postedon: Date;
  Expected_Rooms: number;
}

interface FeaturedCard2Props {
  room: RoomInterface;
}

export default function Component({ room }: FeaturedCard2Props) {
  const [wishlistStatus, setWishlistStatus] = useState(false);
  const { pluscart, minuscart } = useCartStore();
  const { data: session } = useSession();
  const { status } = useAuthStore();
  const { openLogin } = useloginstore();
  const { width } = useScreenResolution();
  const router = useRouter();

  const token = session?.accessToken;

  const handleWishlist = async (action: "add" | "remove") => {
    if (!status) {
      openLogin();
      return;
    }

    try {
      const dat = { roomId: room._id, status: action === "add" };
      const res = await axios.post(
        `https://apiv2.verydesi.com/favorite/postAndUpdateFavorite`,
        dat,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.msg.includes("Successfully")) {
        action === "add" ? pluscart() : minuscart();
        setWishlistStatus(action === "add");
        toast.success(
          action === "add" ? "Added to Favorites." : "Removed from Favorites."
        );
      }
    } catch (error) {
      console.error(
        `Error ${action === "add" ? "adding to" : "removing from"} wishlist:`,
        error
      );
      toast.error(
        `Failed to ${action === "add" ? "add to" : "remove from"} Favorites.`
      );
    }
  };

  useEffect(() => {
    const fetchWishStatus = async () => {
      if (!token) return;
      try {
        const res = await axios.get(
          `https://apiv2.verydesi.com/favorite/findfavoritebyId/${room._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setWishlistStatus(res.data.status);
      } catch (error) {
        console.error("Error fetching wishlist status:", error);
      }
    };

    fetchWishStatus();
  }, [room._id, token, status]);

  const calculateTimeDifference = (dateStr: Date) => {
    const date = new Date(dateStr);
    const currentDate = new Date();
    const diffInMs = currentDate.getTime() - date.getTime();
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30);

    if (diffInSeconds < 60) return "Just now";
    if (diffInMinutes < 60)
      return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
    if (diffInHours < 24)
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    if (diffInDays < 30)
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
  };

  const formatSlug = (title: string, id: string) => {
    return `${title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")}-${id}`;
  };

  const handleCardClick = () => {
    const slug = formatSlug(room.Title, room._id);
    router.push(`/room/${slug}`);
  };

  return (
    <Card
      onClick={handleCardClick}
      className="cursor-pointer hover:shadow-lg transition-shadow duration-300 overflow-hidden relative"
    >
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          <div className="relative w-full sm:w-1/3 h-48 sm:h-auto lg:h-44  overflow-hidden">
            <Image
              src={
                room.Imgurl && room.Imgurl.length > 0
                  ? room.Imgurl[0]
                  : "https://res.cloudinary.com/druohnmyv/image/upload/v1729259425/no_image-3-600x745_rk3g07.jpg"
              }
              alt="Room Image"
              width={600}
              height={300}
              className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110"
            />
            <div className="text-[21px] font-bold absolute px-2 rounded-md top-2 left-2 bg-white/80 text-green-700">
              ${room.Expected_Rooms}
            </div>
          </div>
          {session ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleWishlist(wishlistStatus ? "remove" : "add");
              }}
            >
              <Heart
                className={`absolute right-3 bottom-4 h-6 w-6 ${wishlistStatus ? "stroke-red-500 fill-red-500 hover:fill-white hover:stroke-black " : "hover:stroke-red-500 hover:fill-red-500 cursor-pointer transition-colors duration-200 ease-in-out"}`}
              />
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                openLogin();
              }}
            >
              <Heart
                className={`absolute right-3 bottom-4 h-6 w-6 ${wishlistStatus ? "hover:stroke-red-500 hover:fill-red-500 stroke-black" : "hover:stroke-red-500 hover:fill-red-500 cursor-pointer transition-colors duration-200 ease-in-out"}`}
              />
            </button>
          )}
          <div className="flex-1 px-4 py-2">
            <div className="mb-2 text-[21px]">
              <TruncateText text={room.Title} />
            </div>
            <div className="flex flex-wrap items-center text-sm text-gray-600 mb-2">
              <div className="flex items-center mr-2 sm:mb-0">
                <MapPin className="h-5 w-5 mr-1 text-blue-600" />
                <span className="text-[18px]">
                  {room.city}, {stateAbbreviations[room.state] || room.state}
                </span>
              </div>
              <div className="flex items-center">
                {room.Preferred_gender === "Male only" ? (
                  <>
                    <IoIosMale
                      className="h-5 w-5 mr-1 text-blue-600"
                      strokeWidth={25}
                    />
                    <span className="text-[18px]">Male</span>
                  </>
                ) : room.Preferred_gender === "Female only" ? (
                  <>
                    <IoIosFemale
                      className="h-5 w-5 mr-1 text-pink-500"
                      strokeWidth={25}
                    />
                    <span className="text-[18px]">Female</span>
                  </>
                ) : (
                  <>
                    <IoIosTransgender
                      className="h-5 w-5 mr-1  text-purple-500"
                      strokeWidth={25}
                    />
                    <span className="text-[18px]">Any Gender</span>
                  </>
                )}
              </div>
            </div>
            <div className="flex flex-col text-sm text-gray-500">
              <div className="flex items-center mb-1">
                <User className="h-5 w-5 mr-1 text-blue-600" />
                <span className="text-[18px]">Posted by: {room.user_name}</span>
              </div>
              <div className="flex items-center mt-1">
                <Clock className="h-5 w-5 mr-1 text-blue-600 " />
                <span className="text-[18px]">
                  {calculateTimeDifference(room.postedon)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
