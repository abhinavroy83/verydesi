"use client";
import { HomeLayout } from "@/components/layout/Home";
import FeaturedCard2 from "@/components/Room/FeaturedCard2";
import FeaturedRoomcard from "@/components/Room/FeaturedRoomcard";
import NonFeatureCard from "@/components/Room/NonFeatureCard";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import useAuthStore from "@/store/useAuthStore";
import { RoomInterface, UserData } from "@myrepo/types";
import axios from "axios";
import { stateAbbreviations } from "@/constants";
import { Skeleton } from "@/components/ui/skeleton";
import {
  SkeletonFeaturedCard,
  SkeletonNonFeatureCard,
} from "@/components/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Norooms from "@/components/Room/Norooms";
import LoginSlider from "@/components/login/login";
import { useloginstore } from "@/store";
import { useRoomFetching } from "@/hooks/use-all-roomfetcing";
const Page = () => {
  const router = useRouter();
  const { currentCity, status } = useAuthStore();
  const [userData, setuserData] = useState<UserData | null>(null);
  const { data: session } = useSession();
  const { openLogin } = useloginstore();
  const { updateCity, setVerified, setname, setUserImgae } = useAuthStore();
  const { Room, loading, error } = useRoomFetching(currentCity || "Portland");
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const featuredRooms = Room?.slice(0, 6);
  const NonfeatturedRooms = Room?.slice(6) ?? [];

  const totalPages = Math?.ceil(NonfeatturedRooms?.length / itemsPerPage);
  const paginatedroom = NonfeatturedRooms?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // console.log(session);
  const token = session?.accessToken;
  const fetchuser = async () => {
    try {
      if (!token) {
        return "token not found, please sign in!!";
      }
      const res = await axios.get(
        `https://apiv2.verydesi.com/user/userprofile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(res);
      // updateCity(res.data.belongcity);
      if (res) {
        setVerified(res.data.IsEmailVerified);
        setname(res.data.firstName);
        setUserImgae(res.data.image);
        setuserData(res?.data.userimg);
        // updateCity(res?.data.postingincity);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchuser();
  }, [token]);

  if (loading) {
    return (
      <HomeLayout>
        <LoginSlider />
        <div className="w-full justify-between flex items-center font-sans">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-10 w-28" />
        </div>
        <div className="lg:mt-8 mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:mt-3 xl:grid-cols-2 xl:gap-2">
          {[...Array(6)].map((_, index) => (
            <SkeletonFeaturedCard key={index} />
          ))}
        </div>
        <Skeleton className="h-8 w-64 my-4" />
        <div className="flex flex-col gap-2">
          {[...Array(4)].map((_, index) => (
            <SkeletonNonFeatureCard key={index} />
          ))}
        </div>
      </HomeLayout>
    );
  }
  if (!Room || Room.length === 0) {
    return (
      <div className="">
        <Norooms />
      </div>
    );
  }

  return (
    <HomeLayout>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="w-full justify-between flex items-center font-sans">
        <h1 className="lg:text-[24px] text-[21px] font-sans font-bold my-1">
          Featured Rooms In {currentCity}
        </h1>
        <button
          type="button"
          className=" bg-green-800 capitalize hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-all duration-200 ease-in-out"
          onClick={() => {
            if (status) {
              router.push("/post-room");
            } else {
              openLogin();
            }
          }}
        >
          Add Room
        </button>
      </div>
      <div className="lg:mt-8 mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:mt-3 xl:grid-cols-2 xl:gap-2">
        {featuredRooms?.map((room, index) => (
          <FeaturedCard2 key={index}  />
        ))}
      </div>
      <h1 className="text-2xl font-bold my-4">
        More Rooms In {currentCity || "Portland"}
      </h1>

      <div className=" flex flex-col gap-2">
        {paginatedroom?.map((room, index) => (
          <NonFeatureCard key={index} room={room} />
        ))}
      </div>
      <div className="my-4">
        <Pagination>
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                />
              </PaginationItem>
            )}
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  className={
                    currentPage === index + 1 ? "border-2 border-black" : ""
                  }
                  onClick={() => setCurrentPage(index + 1)}
                  isActive={currentPage === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>

      {/* <div className=" py-5">
        <Design2 />
      </div>
      <div className=" py-5">
        <Desing3 />
      </div>
      <div className=" py-5">
        <Desing4 />
      </div> */}
    </HomeLayout>
  );
};

export default Page;
