"use client";

import React from "react";
import { MdOutlineDateRange } from "react-icons/md";
import { HiOutlineLocationMarker } from "react-icons/hi";
function EventNonfeaturedCard() {
  return (
    <article className="flex w-full h-[80px] font-['udemy-regular'] hover:cursor-pointer justify-start border shadow-md rounded-xl hover:shadow-lg">
      <div>
        <img
          src={`https://envira.es/wp-content/uploads/2019/10/ruido-nocturno.jpg`}
          alt=""
          height={37}
          width={37}
          className="rounded-l-md w-[7rem] h-full transition duration-300 ease-in-out hover:opacity-80"
        />
      </div>
      <div className="mt-2 px-3">
        <p className="text-[21px] text-[#0073bb] font-bold hover:underline">
          Music Bingo at Punch Bowl Social
        </p>
        <div className="flex gap-1">
          <p className="text-[15px] text-[#333] flex gap-1 items-center mt-1">
            <MdOutlineDateRange size={20} color="gray" />
            Saturday, Jun 29, 10:00 am
          </p>
          |
          <p className="text-[15px] text-[#333] flex gap-1 items-center mt-1">
            <HiOutlineLocationMarker size={17} color="gray" />
            <p className="text-[#0073bb] flex gap-1">
              Punch Bowl Social <p className="text-black">- Portland</p>
            </p>{" "}
          </p>
        </div>
      </div>
      {/* <div className="text-[15px] text-[#333] flex gap-1 items-center border-t-2 border-gray-200 w-full justify-between px-3 py-2">
        <p className="text-[#0073bb] hover:underline">Other</p>
        <p className="text-gray-400">12 interested</p>
      </div> */}
    </article>
  );
}

export default EventNonfeaturedCard;
