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
import useAuthStore from "@/store/useAuthStore";
import { useloginstore } from "@/store";
import { useRouter } from "next/navigation";
import TruncateText from "@/lib/truncate-characters";
interface FeaturedCard2Props {
  room: RoomInterface;
}

export default function Component({ room }: FeaturedCard2Props) {
  const { pluscart, minuscart } = useCartStore();
  const [wishliststatys, setWishlistStatus] = useState(false);
  const { data: session } = useSession();
  const { status } = useAuthStore();
  const { openLogin } = useloginstore();
  const router = useRouter();

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
          `https://apiv2.verydesi.com/favorite/postAndUpdateFavorite`,
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
        `https://apiv2.verydesi.com/favorite/postAndUpdateFavorite`,
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
        if (!token) {
          return "token not found, please sign in!!";
        }
        const res = await axios.get(
          `https://apiv2.verydesi.com/favorite/findfavoritebyId/${room?._id}`,
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
  const formatSlug = (title: string, id: string) => {
    const formattedTitle = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    return `${formattedTitle}-${id}`;
  };
  return (
    <div
      className="font-sans cursor-pointer"
      onClick={() => {
        const slug = formatSlug(room?.Title, room?._id);
        router.push(`/room/${slug}`);
      }}
    >
      <Card className="flex relative max-w-7xl flex-col justify-between rounded-xl md:flex-row border shadow-md hover:shadow-lg h-auto lg:h-[80px]">
        <CardContent className="py-1 px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="lg:flex-shrink-0 hidden lg:flex">
              {room?.Preferred_gender === "Male only" ? (
                <>
                  <img
                    className="h-10 w-10 text-gray-400"
                    src="https://res.cloudinary.com/druohnmyv/image/upload/v1723819320/assests/ocyga8lgdentnbpcjkh2.png"
                    alt="male"
                  />
                  {/* <IoIosMale className="h-12 w-12  text-gray-400" /> */}
                </>
              ) : room?.Preferred_gender === "Female only" ? (
                <>
                  <img
                    className="h-10 w-10  text-gray-400"
                    src="https://res.cloudinary.com/druohnmyv/image/upload/v1723819317/assests/acn46dsajdgzwlmk9j5v.png"
                    alt="female"
                  />
                  {/* <IoIosFemale className="h-12 w-12  text-gray-400" /> */}
                </>
              ) : (
                <>
                  <img
                    className="h-10 w-10  text-gray-400"
                    src="https://res.cloudinary.com/druohnmyv/image/upload/v1723819314/assests/jum9urk9pw7dsladdtuq.png"
                    alt="any"
                  />
                </>
              )}{" "}
            </div>
            <div className="flex-grow space-y-1">
              {room?.Title && <TruncateText text={room?.Title} />}
              <div className="flex flex-col sm:flex-row sm:items-center text-[17px] text-gray-600 space-y-1 sm:space-y-0">
                <div className="flex items-center text-[18px]">
                  <MapPin className="h-5 w-5 mr-1 text-[#054687]" />
                  <span>
                    {room?.city},{" "}
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
                <div className="flex items-center text-[18px]">
                  <Clock className="h-5 w-5 mr-1 text-[#054687]" />
                  <span>{calculateTimeDifference(room?.postedon)}</span>
                </div>
                <Separator
                  orientation="vertical"
                  className="hidden sm:block mx-2 h-4"
                />
                <div className="flex items-center text-[18px]">
                  <User className="h-5 w-5 mr-1 text-[#054687]" />
                  <span>Posted by: {room?.user_name}</span>
                </div>
                <div className="flex-shrink-0 lg:hidden">
                  {room?.Preferred_gender === "Male only" ? (
                    <>
                      <img
                        className="h-8 w-8 text-gray-400"
                        src="https://res.cloudinary.com/druohnmyv/image/upload/v1723819320/assests/ocyga8lgdentnbpcjkh2.png"
                        alt="male"
                      />
                      {/* <IoIosMale className="h-12 w-12  text-gray-400" /> */}
                    </>
                  ) : room?.Preferred_gender === "Female only" ? (
                    <>
                      <img
                        className="h-8 w-8  text-gray-400"
                        src="https://res.cloudinary.com/druohnmyv/image/upload/v1723819317/assests/acn46dsajdgzwlmk9j5v.png"
                        alt="female"
                      />
                      {/* <IoIosFemale className="h-12 w-12  text-gray-400" /> */}
                    </>
                  ) : (
                    <>
                      <img
                        className="h-8 w-8  text-gray-400"
                        src="https://res.cloudinary.com/druohnmyv/image/upload/v1723819314/assests/jum9urk9pw7dsladdtuq.png"
                        alt="any"
                      />
                    </>
                  )}{" "}
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="flex w-full sm:w-auto text-left sm:text-right">
                <div className="flex items-center gap-2 absolute lg:bottom-[1.5rem] bottom-[1rem] right-[2rem] lg:right-[2rem]">
                  <div className="w-[4rem] flex justify-start">
                    <p className="justify-start text-[21px] font-bold text-green-700 ">
                      ${room?.Expected_Rooms}
                    </p>
                  </div>
                  {!status && (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        openLogin();
                      }}
                    >
                      <Heart className=" hover:fill-red-600 hover:stroke-red-500 cursor-pointer transition-colors duration-200 ease-in-out" />
                    </div>
                  )}
                  {status && (
                    <div>
                      {!wishliststatys ? (
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            makewishlist(room?._id);
                          }}
                        >
                          <Heart className=" hover:stroke-red-500 hover:fill-red-500 cursor-pointer transition-colors duration-200 ease-in-out" />
                        </div>
                      ) : (
                        <div
                          className="cursor-pointer "
                          onClick={(e) => {
                            e.stopPropagation();
                            unwish(room?._id);
                          }}
                        >
                          <Heart className=" hover:fill-white  stroke-red-500 fill-red-500 cursor-pointer transition-colors duration-200 ease-in-out" />
                        </div>
                      )}
                    </div>
                  )}

                  {/* )} */}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
