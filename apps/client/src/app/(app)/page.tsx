"use client";
import { HomeLayout } from "@/components/layout/Home";
import LeafletMap from "@/components/map/LeafletMap";
import Design2 from "@/components/Room/Design2";
import Desing3 from "@/components/Room/Desing3";
import Desing4 from "@/components/Room/Desing4";
import FeaturedCard2 from "@/components/Room/FeaturedCard2";
import FeaturedRoomcard from "@/components/Room/FeaturedRoomcard";
import NonFeatureCard from "@/components/Room/NonFeatureCard";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import useAuthStore from "@/store/useAuthStore";
import { RoomInterface } from "@myrepo/types";
import axios from "axios";
import { stateAbbreviations } from "@/constants";
import { any } from "zod";

const roomCardsData = [
  {
    id: 1,
    imageUrl: "https://placeholder.pics/svg/300x350",
    title: "Cozy Room 1",
    price: 1200,
    location: "New York, NY",
    gender: "male",
    roomType: "Single Room",
    postedBy: "Alice",
    daysAgo: 2,
  },
  {
    id: 2,
    imageUrl: "https://placeholder.pics/svg/300x350",
    title: "Modern Room 2",
    price: 1500,
    location: "Los Angeles, CA",
    gender: "female",
    roomType: "Shared Room",
    postedBy: "Bob",
    daysAgo: 5,
  },
  {
    id: 3,
    imageUrl: "https://placeholder.pics/svg/300x350",
    title: "Charming Room 3",
    price: 1400,
    location: "San Francisco, CA",
    gender: "other",
    roomType: "Entire Place",
    postedBy: "Charlie",
    daysAgo: 1,
  },
  {
    id: 5,
    imageUrl: "https://placeholder.pics/svg/300x350",
    title: "Spacious Room 4",
    price: 1300,
    location: "Miami, FL",
    gender: "male",
    roomType: "Single Room",
    postedBy: "Daisy",
    daysAgo: 3,
  },
  {
    id: 4,
    imageUrl: "https://placeholder.pics/svg/300x350",
    title: "Lovely Room 5",
    price: 1600,
    location: "Seattle, WA",
    gender: "female",
    roomType: "Shared Room",
    postedBy: "Edward",
    daysAgo: 4,
  },
  {
    id: 6,
    imageUrl: "https://placeholder.pics/svg/300x350",
    title: "Elegant Room 6",
    price: 1700,
    location: "Chicago, IL",
    gender: "other",
    roomType: "Entire Place",
    postedBy: "Fiona",
    daysAgo: 2,
  },
];

const Page = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [Room, setRooms] = useState<RoomInterface[] | null>(null);
  const { currentCity } = useAuthStore();
  const [loading, setLoading] = useState(true);

  if (session) {
    // Access the JWT token
    const accessToken = session.accessToken;
    // console.log("JWT Token: ", accessToken);
  }

  const fetchrooms = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/room/ListingAllRoomByArea/${currentCity}`
      );
      console.log(res.data);
      const rooms = res.data.reverse();
      const areaRes = await axios.get(
        `https://api.verydesi.com/api/admin/area/${currentCity}`
      );
      const areaData = areaRes.data.area[0];
      // console.log(areaData);
      const primaryState = areaData.primaryState;
      // console.log(primaryState);
      const states = areaData.state;

      const priority = (room: any) => {
        const roomStateFullName = Object.keys(stateAbbreviations).find(
          (key) => stateAbbreviations[key] === room.state
        );

        const isPrimaryState = roomStateFullName || room.state === primaryState;
        const isStateListed = states.includes(roomStateFullName || room.state);
        const isCityListed = areaData.subarea.some(
          (subarea: any) => subarea.split(",")[0] === room.city
        );
        const isZipListed = areaData.zipcode.includes(room.zip_code);

        if (isPrimaryState && (isCityListed || isZipListed)) return 1;
        if (isStateListed && (isCityListed || isZipListed)) return 2;
        if (isCityListed) return 3;
        if (isZipListed) return 4;
        if (isPrimaryState) return 5;
        return 6;
      };

      rooms.sort((a: any, b: any) => priority(a) - priority(b));
      setRooms(rooms);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const featuredRooms = Room?.slice(0, 6);
  const NonfeatturedRooms = Room?.slice(6);

  useEffect(() => {
    fetchrooms();
  }, [currentCity]);
  // Sample data for room cards
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!Room || Room.length === 0) {
    return <div>No rooms found in {currentCity}</div>;
  }

  return (
    <HomeLayout>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="w-full justify-between flex items-center">
        <h1 className="text-2xl font-bold my-4">More Room on portland</h1>
        <button
          type="button"
          className=" bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-all duration-200 ease-in-out"
          onClick={() => {
            router.push("/post-room");
          }}
        >
          Add Room
        </button>
      </div>
      <div className="lg:mt-8 mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:mt-3 xl:grid-cols-2 xl:gap-2">
        {featuredRooms?.map((room, index) => (
          <FeaturedCard2 key={index} room={room} />
        ))}
      </div>
      <h1 className="text-2xl font-bold my-4">More Room on portland</h1>

      <div className=" flex flex-col gap-2">
        {NonfeatturedRooms?.map((room, index) => (
          <NonFeatureCard key={index} room={room} />
        ))}
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
