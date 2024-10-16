"use client";
import { Link } from "lucide-react";
import React from "react";
import { LuHeart } from "react-icons/lu";
import { MdDateRange } from "react-icons/md";

function Similarroomcard() {
  return (
    <Link
      //   href={`/rooms/${item._id}`}
      //   key={item._id}
      className={`flex relative max-w-4xl flex-col font-['udemy-regular'] rounded-xl md:flex-row border shadow-md hover:shadow-lg h-[450px] lg:h-[165px]`}
    >
      <div className="relative w-full lg:w-72 lg:h-[100%] max-w-4xl overflow-hidden lg:rounded-tl-md lg:rounded-bl-md lg:rounded-none rounded-tl-md rounded-tr-md">
        <img
          src={""}
          alt=""
          // width={200}
          className="hover:scale-110 object-cover transition-transform duration-500 ease-in duration-70 w-full h-full"
        />
      </div>
      {/* <p className="absolute font-roboto bg-white top-0 left-0 px-2 rounded-br-lg text-center">
            <span className="block text-[27px]">
              {new Intl.DateTimeFormat("en-US", { day: "2-digit" }).format(date)}
            </span>
            <span className="block text-gray-500">
              {new Intl.DateTimeFormat("en-US", { month: "short" }).format(date)}
            </span>
          </p> */}

      <img
        className={"absolute bottom-[1.4rem] right-[3.2rem]"}
        height={22}
        width={25}
        src={""}
      />

      <div className="absolute bottom-4 right-4">
        <LuHeart
          className="text-black hover:bg-red-600 hover:text-white rounded-full hover:p-[0.1rem]"
          size={22}
        />
      </div>
      <div
        className="cursor-pointer p-2"
        //   onClick={(e) => {
        //     e.preventDefault();
        //     unwish(item._id);
        //   }}
      >
        <LuHeart className="" color="red" size={22} />
      </div>

      <div className={`px-4 py-1 flex flex-col  w-full`}>
        {/* <p>{item.postedon}</p> */}
        <p className="flex flex-col text-[21px] capitalize mt-3 lg:mt-1">
          Title
          {/* {item.Title && truncateWords(item.Title, 3)} */}
        </p>
        <p className=" flex gap-1 text-[19px] text-gray-600 mt-1 font-['udemy-regular'] items-center">
          {/* <GrLocation size={20} /> */}
          <span>Portland , OR</span>
          {/* <span className=" px-1">
            {item?.state?.length > 2
              ? stateAbbreviations[item.State]
              : item.state}
          </span> */}
        </p>
        <p className="text-blue-800 capitalize text-[19px] mt-1 flex gap-1 items-center font-['udemy-regular']">
          {/* <CgProfile /> */}
        </p>
        <p className="text-blue-800 text-[19px] flex gap-1 mt-1 items-center font-['udemy-regular']">
          <MdDateRange />
        </p>
        {/* <p className="text-[18px] text-gray-500 font-roboto">{item.area}</p> */}
        {/* <p className="text-[18px] text-gray-500  font-roboto">{item.address}</p> */}
        {/* <article className="flex gap-2 mt-1">
              <h1 className="text-[18px] text-gray-500 font-roboto flex items-center">
                Nonstop . 3 hr 24 min{" "}
              </h1>
            </article> */}
        <p className="absolute font-['udemy-bold'] bg-white/80 top-0 left-0 p-1 px-3 rounded-br-lg text-center">
          <p className="left-5 top-2 text-[22px] text-green-700 text-right">
            $
          </p>
        </p>
      </div>
    </Link>
  );
}

export default Similarroomcard;
