"use client";

import React from "react";
import { MdOutlineDateRange } from "react-icons/md";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { Heart } from "lucide-react";
function EventNonfeaturedCard() {
  return (
    <article className="flex w-full h-[80px] hover:cursor-pointer justify-start border shadow-md rounded-xl hover:shadow-lg relative">
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
        <h2 className="text-[22px] font-bold">
          Music Bingo at Punch Bowl Social
        </h2>
        <div className="flex gap-1">
          <p className="text-[17px] text-gray-600 flex gap-1 items-center mt-1">
            <MdOutlineDateRange className="text-[#054687] mb-1" size={20} />
            Saturday, Jun 29, 10:00 am
          </p>
          |
          <p className="text-[17px] text-gray-600 flex gap-1 items-center">
            <HiOutlineLocationMarker
              className="text-[#054687] mb-1"
              size={17}
            />
            <p className=" flex gap-1">
              Punch Bowl Social <p className="text-gray-600">- Portland, OR</p>
            </p>{" "}
          </p>
        </div>
        <div className="flex">
          <div className="flex w-full sm:w-auto text-left sm:text-right">
            <div className="flex items-center gap-2 absolute lg:bottom-[1.5rem] bottom-[0.9rem] right-[2.2rem] lg:right-[4rem]">
              <div
              // onClick={(e) => {
              //   e.preventDefault();
              //   openLogin();
              // }}
              >
                <Heart className=" fill-red-600 stroke-red-500 cursor-pointer transition-colors duration-200 ease-in-out" />
              </div>

              <div>
                <p className="text-[22px] font-bold text-green-700 w-[3rem]">
                  Free
                </p>
              </div>
              {/* )} */}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default EventNonfeaturedCard;
