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
import React from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    // Access the JWT token
    const accessToken = session.accessToken;
    // console.log("JWT Token: ", accessToken);
  }

  // Sample data for room cards
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

  return (
    <HomeLayout>
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
        {roomCardsData.map((room, index) => (
          <FeaturedCard2 key={index} {...room} />
        ))}
      </div>
      <h1 className="text-2xl font-bold my-4">More Room on portland</h1>

      <div className=" flex flex-col gap-2">
        {roomCardsData.map((room, index) => (
          <NonFeatureCard key={index} {...room} />
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