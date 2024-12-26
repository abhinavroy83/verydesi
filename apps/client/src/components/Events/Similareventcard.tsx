"use client";
import { Heart } from "lucide-react";
import Link from "next/link";
import React from "react";
import { MdDateRange } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { GrLocation } from "react-icons/gr";

export default function Similareventcard() {
  return (
    <Link
      href={"/evnts"}
      className={`flex relative w-full max-w-4xl flex-col  rounded-xl md:flex-row border shadow-md hover:shadow-lg h-[450px] lg:h-[155px]`}
    >
      <div className="relative w-full lg:w-72 lg:h-[100%] max-w-4xl overflow-hidden lg:rounded-tl-md lg:rounded-bl-md lg:rounded-none rounded-tl-md rounded-tr-md">
        <img
          src={
            "https://res.cloudinary.com/druohnmyv/image/upload/v1723819322/assests/tss6j8gnbbccyxwgxzzx.png"
          }
          alt=""
          className="hover:scale-110 object-cover transition-transform duration-500 ease-in duration-70 w-full h-full"
        />
      </div>
      <img
        className={"absolute bottom-[1rem] right-[3rem]"}
        height={22}
        width={25}
        src={
          "https://res.cloudinary.com/druohnmyv/image/upload/v1723819317/assests/acn46dsajdgzwlmk9j5v.png"
        }
      />

      <div className="absolute bottom-4 right-4 ">
        <Heart className="hover:stroke-red-500 hover:fill-red-500 cursor-pointer transition-colors duration-200 ease-in-out" />
      </div>

      <div className={`px-4 py-1 flex flex-col w-full`}>
        <p className="flex flex-col text-[17px] capitalize mt-3 lg:mt-1 font-bold">
          Event card
        </p>
        <p className="flex gap-1 text-[14px] text-gray-600 mt-1  items-center">
          <GrLocation />
          Portland, OR
        </p>
        <p className="text-blue-800 capitalize text-[14px] mt-1 flex gap-1 items-center ">
          <CgProfile />
          Username
        </p>
        <span className="flex gap-1 items-center">
          <p className="text-blue-800 text-[14px] flex gap-1 mt-1 items-center ">
            <MdDateRange />
            <p>1 week ago</p>
          </p>
        </span>
        <article className="flex gap-2 mt-1"></article>
        <p className="absolute  bg-white/80 top-0 left-0 p-1 px-3 rounded-br-lg text-center">
          <p className="left-5 top-2 text-[17px] text-green-700 text-right font-bold">
            $ 500
          </p>
        </p>
      </div>
    </Link>
  );
}
