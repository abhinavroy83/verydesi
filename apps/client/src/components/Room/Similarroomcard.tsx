"use client";

import { stateAbbreviations } from "@/constants";
import { useloginstore } from "@/store";
import useAuthStore from "@/store/useAuthStore";
import useCartStore from "@/store/useCartStore";
import { RoomInterface } from "@myrepo/types";
import axios from "axios";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdDateRange } from "react-icons/md";

interface FeaturedCard2Props {
  room: RoomInterface;
}

export default function SimilarRoomCard({ room }: FeaturedCard2Props) {
  const { pluscart, minuscart } = useCartStore();
  const [wishlistStatus, setWishlistStatus] = useState(false);
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
  }, [room?._id, token, status]);

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
    <Link
      href={"/rooms"}
      className={`flex relative w-full max-w-4xl flex-col font-['udemy-regular'] rounded-xl md:flex-row border shadow-md hover:shadow-lg h-[450px] lg:h-[165px]`}
    >
      <div className="relative w-full lg:w-72 lg:h-[100%] max-w-4xl overflow-hidden lg:rounded-tl-md lg:rounded-bl-md lg:rounded-none rounded-tl-md rounded-tr-md">
        <img
          src={
            room && room.Imgurl && room.Imgurl.length > 0
              ? room.Imgurl[0]
              : "https://res.cloudinary.com/druohnmyv/image/upload/v1723819322/assests/tss6j8gnbbccyxwgxzzx.png"
          }
          alt=""
          className="hover:scale-110 object-cover transition-transform duration-500 ease-in duration-70 w-full h-full"
        />
      </div>

      {!status && (
        <div
          className="absolute bottom-4 right-4 "
          onClick={(e) => {
            e.preventDefault();
            openLogin();
          }}
        >
          <Heart className="hover:stroke-red-500 hover:fill-red-500 cursor-pointer transition-colors duration-200 ease-in-out" />
        </div>
      )}
      {status && (
        <div className="absolute bottom-4 right-4 ">
          {!wishlistStatus ? (
            <div
              onClick={(e) => {
                e.preventDefault();
                makewishlist(room?._id);
              }}
            >
              <Heart className="hover:stroke-red-500 hover:fill-red-500 cursor-pointer transition-colors duration-200 ease-in-out" />
            </div>
          ) : (
            <div
              className="cursor-pointer "
              onClick={(e) => {
                e.preventDefault();
                unwish(room?._id);
              }}
            >
              <Heart className="hover:fill-white stroke-red-500 fill-red-500 cursor-pointer transition-colors duration-200 ease-in-out" />
            </div>
          )}
        </div>
      )}

      <div className={`px-4 py-1 flex flex-col w-full`}>
        <p>{calculateTimeDifference(room?.postedon)}</p>
        <p className="flex flex-col text-[21px] capitalize mt-3 lg:mt-1">
          Title
          {room?.Title && truncateCharacters(room?.Title, 15 )}
        </p>
        <p className="flex gap-1 text-[19px] text-gray-600 mt-1 font-['udemy-regular'] items-center">
          {room?.postingincity},
          {room?.state &&
            (room.state.length > 2
              ? stateAbbreviations[room.state]
              : room.state)}
        </p>
        <p className="text-blue-800 capitalize text-[19px] mt-1 flex gap-1 items-center font-['udemy-regular']"></p>
        <p className="text-blue-800 text-[19px] flex gap-1 mt-1 items-center font-['udemy-regular']">
          <MdDateRange />
        </p>
        <p className="text-[18px] text-gray-500 font-roboto">{room?.city}</p>
        <article className="flex gap-2 mt-1"></article>
        <p className="absolute font-['udemy-bold'] bg-white/80 top-0 left-0 p-1 px-3 rounded-br-lg text-center">
          <p className="left-5 top-2 text-[22px] text-green-700 text-right">
            $ {room?.Expected_Rooms}
          </p>
        </p>
      </div>
    </Link>
  );
}
