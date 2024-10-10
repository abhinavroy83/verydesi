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
import { IoIosFemale, IoIosMale, IoIosTransgender } from "react-icons/io";
import { useloginstore } from "@/store";
import Image from "next/image";

interface FeaturedCard2Props {
  room: RoomInterface;
}

export default function Component({ room }: FeaturedCard2Props) {
  const { pluscart, minuscart } = useCartStore();
  const [wishliststatys, setWishlistStatus] = useState(false);
  const { data: session } = useSession();
  const { status } = useAuthStore();
  const { openLogin } = useloginstore();
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
        if (status) {
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
      {/* <Card className="flex relative max-w-4xl flex-col items-center rounded-xl md:flex-row perspective-1000 group border shadow-md hover:shadow-lg h-[400px] lg:h-[165px] duration-300"> */}
      <Card className="relative lg:w-full w-[21.2rem] lg:h-[157px] sm:h-[585px] perspective-1000 group shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardContent className="p-0 flex flex-col sm:flex-row h-full">
          <div className="relative w-full max-w-[200px] sm:w-[300px] lg:w-72 h-[100%] overflow-hidden lg:rounded-tl-md lg:rounded-bl-md lg:rounded-none rounded-tl-md rounded-tr-md">
            <Image
              src={
                room && room.Imgurl && room.Imgurl.length > 0
                  ? room.Imgurl[0]
                  : "https://res.cloudinary.com/druohnmyv/image/upload/v1723819322/assests/tss6j8gnbbccyxwgxzzx.png"
              }
              alt="Room Image"
              layout="fill"
              objectFit="cover"
              className="group-hover:scale-110 object-cover transition-transform duration-500 ease-in duration-70 w-full lg:h-full "
            />
          </div>
          {!status && (
            <div
              className="absolute bottom-[1.5rem] right-[1.5rem]"
              onClick={(e) => {
                e.preventDefault();
                openLogin();
              }}
            >
              <Heart className=" hover:stroke-red-500 hover:fill-red-500 cursor-pointer transition-colors duration-200 ease-in-out" />
            </div>
          )}
          {status && (
            <div className="absolute bottom-[1.5rem] right-[1.5rem]">
              {!wishliststatys ? (
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    makewishlist(room?._id);
                  }}
                >
                  <Heart className=" hover:stroke-red-500 hover:fill-red-500 cursor-pointer transition-colors duration-200 ease-in-out" />
                </div>
              ) : (
                <div
                  className="cursor-pointer "
                  onClick={(e) => {
                    e.preventDefault();
                    unwish(room?._id);
                  }}
                >
                  <Heart className=" hover:fill-white  stroke-red-500 fill-red-500 cursor-pointer transition-colors duration-200 ease-in-out" />
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col flex-grow px-4 lg:py-0 py-3 transition-transform duration-500 transform-style-3d group-hover:rotate-y-180">
            <div>
              <h2 className="text-[22px] font-sans  font-bold text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
                {room?.Title && truncateCharacters(room?.Title, 40)}
              </h2>

              <div className="flex  flex-wrap items-center text-[17px] text-gray-600 group-hover:text-blue-700 transition-colors duration-300">
                <div className="flex items-center mr-2 sm:mb-0">
                  <MapPin className="h-5 w-5 mr-1 text-[#054687]" />
                  <span>
                    {room?.postingincity},
                    {room?.state &&
                      (room.state.length > 2
                        ? stateAbbreviations[room.state]
                        : room.state)}
                  </span>
                </div>
                <div className="flex items-center">
                  {room?.Preferred_gender === "Male only" ? (
                    <>
                      <img
                        className="h-5 w-5 mx-1"
                        src="https://res.cloudinary.com/druohnmyv/image/upload/v1723819320/assests/ocyga8lgdentnbpcjkh2.png"
                      />
                      {/* <IoIosMale className="h-3 w-3 sm:h-4 sm:w-4 mx-1 text-blue-700" /> */}
                      <span>Male</span>
                    </>
                  ) : room?.Preferred_gender === "Female only" ? (
                    <>
                      <img
                        className="h-5 w-5  mx-1"
                        src="https://res.cloudinary.com/druohnmyv/image/upload/v1723819317/assests/acn46dsajdgzwlmk9j5v.png"
                      />
                      {/* <IoIosFemale className="h-3 w-3 sm:h-4 sm:w-4 mx-1 text-pink-500" /> */}
                      <span>Female</span>
                    </>
                  ) : (
                    <>
                      <img
                        className="h-5 w-5  mx-1"
                        src="https://res.cloudinary.com/druohnmyv/image/upload/v1723819314/assests/jum9urk9pw7dsladdtuq.png"
                      />
                      {/* <IoIosTransgender className="h-3 w-3 sm:h-4 sm:w-4 mx-1 text-pink-500" /> */}
                      <span>Any</span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex lg:flex-col flex-wrap text-[17px] text-gray-500 group-hover:text-blue-700 transition-colors duration-300">
                <div className="flex items-center mr-2 sm:mb-0">
                  <User className="h-5 w-5 mr-1 text-[#054687]" />
                  <span>Posted by: {room?.user_name}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-1 text-[#054687]" />
                  <span>{calculateTimeDifference(room?.postedon)}</span>
                </div>
              </div>
            </div>
            <p className="absolute font-bold bg-white/80 top-0 left-0 p-1 px-3 rounded-br-lg text-center">
              <p className="left-5 top-2 text-[22px] text-green-700 text-right">
                ${room?.Expected_Rooms}
              </p>
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
