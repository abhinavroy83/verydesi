"use client";

import React from "react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { BiSolidMessageRounded } from "react-icons/bi";
import { FaHeart, FaShare } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdOutlineDateRange } from "react-icons/md";
import { IoTicketOutline } from "react-icons/io5";
import { RiShareBoxLine } from "react-icons/ri";
import { MdOutlineMailOutline } from "react-icons/md";
import { FiFlag } from "react-icons/fi";
import { BsFilePerson } from "react-icons/bs";
import { FaRegStar } from "react-icons/fa";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronLeft, ChevronRight, Heart, Home } from "lucide-react";
import ShareButton from "@/components/Popups/ShareButton";
import { Button } from "@/components/ui/button";
function Events() {
  return (
    <div className="max-w-[1370px] lg:max-w-[1600px] px-4 sm:px-6 lg:px-8  mx-auto py-8 mt-[6.1rem]">
      <div className=" w-full mx-auto">
        <div className="flex justify-between items-start">
          <div className="flex space-x-2 w-full justify-between">
            <div>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      href="/"
                      className="flex items-center text-primary hover:text-primary-dark transition-colors"
                    >
                      <Home className="w-4 h-4 mr-2" />
                      <span className="font-medium">Home</span>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      href="/rooms"
                      className="flex items-center text-primary hover:text-primary-dark transition-colors"
                    >
                      <span className="font-medium">Rooms</span>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex gap-2 items-center">
              <div className="flex items-center gap-2">
                <Heart className="h-6 w-6 fill-red-600 stroke-red-500 cursor-pointer transition-colors duration-200 ease-in-out" />
              </div>
              <Button className="rounded-full flex items-center">
                <ShareButton />
                <p>Share</p>
              </Button>
              <div>
                <div className="flex gap-2">
                  <button
                    className="px-4 py-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 transition-colors"
                    aria-label="Previous listing"
                  >
                    <ChevronLeft className="w-5 h-5 inline-block mr-1" />
                    PREV
                  </button>
                  <button
                    // onClick={onNext}
                    className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition-colors"
                    aria-label="Next listing"
                  >
                    NEXT
                    <ChevronRight className="w-5 h-5 inline-block ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-[1.8rem] font-semibold">
        Lavender U-Pick at Wayward Winds
      </p>
      <p className="text-[1rem] text-[#0073bb] hover:underline cursor-pointer">
        Other{" "}
      </p>
      <div className="flex mx-auto gap-7">
        <div className="w-full">
          <div className="flex border rounded-md mt-[1rem]">
            <img
              src={
                "https://www.theseedcollection.com.au/assets/full/B2-01.jpg?20201208112734"
              }
              alt="not"
              className="h-[20rem] w-[52rem] rounded-tl-md rounded-bl-md object-cover"
            />
            <div className="flex gap-2 flex-col text-[1rem] ml-6 mt-4">
              <div className="flex border-b border-gray-300 p-3 gap-2">
                <div>
                  <p>
                    <HiOutlineLocationMarker size={25} color="gray" />
                  </p>
                </div>
                <div>
                  <p> Wayward Winds Lavender Farm</p>
                  <p>17005 Ne Courtney Rd</p>
                  <p>Newberg, OR 97132</p>
                </div>
              </div>
              <div className="flex border-b border-gray-300 p-3 gap-2">
                <div>
                  <p>
                    <MdOutlineDateRange size={25} color="gray" />
                  </p>
                </div>
                <div>
                  <p className="flex gap-2">
                    <p className="font-bold">From:</p> Saturday, Jun 29, 10:00
                    am
                  </p>
                  <p className="flex gap-2">
                    <p className="font-bold">To:</p> Monday, Jul 29, 5:00 pm
                  </p>
                </div>
              </div>
              <div className="flex gap-2 p-3">
                <IoTicketOutline size={25} color="gray" />
                <p>Free</p>
              </div>
            </div>
          </div>
          <div className="mt-[1rem] text-[1rem] flex gap-3 flex-col">
            <p className="text-[#d32323] font-bold text-[17px]">What/Why:</p>
            <p className="text-[15px]">
              Free Admission! Open daily June 29th-August 11th from 10 am-5 pm.
              An abundance of the most fragrant and beautiful lavender in
              existence, nestled in the hills of Newberg, Oregon. Explore the
              twists and turns of our Lavender-a-maze. Experience everything
              lavender you can imagine, and shop award-winning essential oils,
              plants, and products in our vintage farm store. If it can be made
              with this magical herb, we do it!
            </p>
            <div className="justify-between flex items-center">
              <button
                className="border flex gap-1 text-gray-500 font-bold p-1 rounded-sm items-center text-center"
                type="button"
              >
                <RiShareBoxLine size={20} color="gray" />
                Official Website
              </button>
              <button
                className="border flex gap-1 text-gray-500 hover:text-black p-1 rounded-sm items-center text-center"
                type="button"
              >
                <FiFlag size={17} color="gray" />
              </button>
            </div>
            <p className="text-[#d32323] font-bold text-[17px]">
              Discuss This Event
            </p>
            <p className="text-[16px] flex gap-1 items-center text-[#0073bb] hover:underline cursor-pointer">
              <MdOutlineMailOutline size={17} />
              Email about event
            </p>
            <p>No one has commented on this event yet.</p>
            <button
              className="bg-[#d32323] text-white text-[16px] p-1 rounded-sm items-center w-[3rem] text-center"
              type="button"
            >
              Post
            </button>
            <div className="bg-yellow-100 text-black p-3 rounded-md">
              <p className="flex gap-1">
                To use talk boards you must first confirm your email address.
                Click the link in email wee sent. If you would like us to resend
                confirmation email, go{" "}
                <p className="text-[#0073bb] cursor-pointer">here.</p>
              </p>
            </div>
          </div>
          <h1 className="flex text-[#000] text-[17px] font-bold mt-5 gap-2">
            {/* <FaUserFriends size={37} /> */}
            {/* <img
              className="w-[3rem] h-13"
              src={"https://cdn-icons-png.flaticon.com/512/6682/6682701.png"}
              alt="logo"
            /> */}
            User Details-{" "}
          </h1>
          <div className="grid grid-cols-3 justify-between border rounded-md p-5">
            <div className="flex gap-2 items-center">
              {/* <FaUserAlt size={35} /> */}
              <img
                className="w-[2rem] h-15"
                src={
                  "https://icon-library.com/images/username-icon-png/username-icon-png-0.jpg"
                }
                alt="logo"
              />
              <div className="flex">
                <p className="text-black text-[15px]">
                  Name
                  <p className="text-black flex text-[15px]">
                    {/* {rooms.user_name} */}
                  </p>
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              {/* <FaPhoneVolume size={35} /> */}
              <img
                className="w-[2rem] h-13"
                src={
                  "https://th.bing.com/th/id/OIP.5_xxdbU1J1GoLaVng_PBRQHaHa?rs=1&pid=ImgDetMain"
                }
                alt="logo"
              />
              <div className="flex">
                <p className="text-black text-[15px]">
                  Phone number
                  <p className="text-black flex text-[18px]">
                    {/* {rooms.phone_number} */}
                  </p>
                </p>
              </div>
            </div>

            <div className="flex gap-2 items-center">
              {/* <MdOutlineEmail size={35} /> */}
              <img
                className="w-[2rem] h-13"
                src={
                  "https://th.bing.com/th/id/OIP.XIRvuujS5JE0LJYwXfvxwQHaHa?rs=1&pid=ImgDetMain"
                }
                alt="logo"
              />
              <div className="flex">
                <p className="text-black text-[15px]">
                  Email
                  {/* <p className="text-black flex text-[18px]">{rooms.email}</p> */}
                </p>
              </div>
            </div>
            {/* <div className="mt-4 mb-2 border-t-2 border-black">
                <div className="mt-2 flex items-center ">
                  <div className=" flex justify-between w-full text-[25px] font-['udemy-regular'] text-[#0b5e86] font-bold">
                    <p>Similar room In The Area</p>
                    <p
                      className=" cursor-pointer"
                      onClick={() => {
                        navigate("/rooms");
                      }}
                    >
                      See full list of Roommates
                    </p>
                  </div>
                </div> */}
            {/* <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:mt-5 xl:grid-cols-3 xl:gap-8">
                {renderRooms()}
              </div> */}
          </div>
        </div>
        <div className="mt-5">
          <img
            className="w-full rounded-md"
            src={
              "https://th.bing.com/th/id/OIP.dptj3_-KYpJQTYPL9ab7awHaEz?rs=1&pid=ImgDetMain"
            }
            alt="logo"
          />
          <div className="border-l pl-4 flex gap-2 flex-col mt-10">
            <p className="text-[#d32323] font-bold text-[17px]">
              Are You Interested?
            </p>
            <button
              className="bg-[#d32323] text-white text-[16px] p-1 rounded-sm items-center w-[6rem] text-center"
              type="button"
            >
              Respond
            </button>
            <p className="text-[#d32323] font-bold text-[17px] flex gap-3">
              Who's in? <p className="text-black font-light">8 responses</p>
            </p>
            <div className="flex gap-2 items-center">
              <img
                className="w-[2rem] h-[2rem] rounded-md"
                src={
                  "https://th.bing.com/th/id/OIP.HQorgohovSAwHh6JnfzcegHaFj?w=750&h=562&rs=1&pid=ImgDetMain"
                }
                alt="logo"
              />
              <div className="">
                <p className="text-[#0073bb] font-bold hover:underline">
                  Terees A.
                </p>
                <p className="flex gap-1 mt-1">
                  <BsFilePerson className="text-[#f15c00]" />
                  <p className="text-gray-500 font-bold text-[13px]">22</p>
                  <FaRegStar className="text-[#f15c00] ml-[0.4rem]" />
                  <p className="text-gray-500 font-bold text-[13px]">261</p>
                  <p className="text-[#f15c00] font-bold text-[13px] ml-[0.4rem]">
                    Elite 24
                  </p>
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <img
                className="w-[2rem] h-[2rem] rounded-md"
                src={
                  "https://th.bing.com/th/id/OIP.HQorgohovSAwHh6JnfzcegHaFj?w=750&h=562&rs=1&pid=ImgDetMain"
                }
                alt="logo"
              />
              <div className="">
                <p className="text-[#0073bb] font-bold hover:underline">
                  Terees A.
                </p>
                <p className="flex gap-1 mt-1">
                  <BsFilePerson className="text-[#f15c00]" />
                  <p className="text-gray-500 font-bold text-[13px]">22</p>
                  <FaRegStar className="text-[#f15c00] ml-[0.4rem]" />
                  <p className="text-gray-500 font-bold text-[13px]">261</p>
                  <p className="text-[#f15c00] font-bold text-[13px] ml-[0.4rem]">
                    Elite 24
                  </p>
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <img
                className="w-[2rem] h-[2rem] rounded-md"
                src={
                  "https://th.bing.com/th/id/OIP.HQorgohovSAwHh6JnfzcegHaFj?w=750&h=562&rs=1&pid=ImgDetMain"
                }
                alt="logo"
              />
              <div className="">
                <p className="text-[#0073bb] font-bold hover:underline cursor-pointer">
                  Terees A.
                </p>
                <p className="flex gap-1 mt-1">
                  <BsFilePerson className="text-[#f15c00]" />
                  <p className="text-gray-500 font-bold text-[12px]">22</p>
                  <FaRegStar className="text-[#f15c00] ml-[0.4rem]" />
                  <p className="text-gray-500 font-bold text-[12px]">261</p>
                  <p className="text-[#f15c00] font-bold text-[12px] ml-[0.4rem]">
                    Elite 24
                  </p>
                </p>
              </div>
            </div>
            <p className="text-[12px] text-[#0073bb] ml-1 hover:underline cursor-pointer">
              See All
            </p>

            <p className="text-[#d32323] font-bold text-[17px] flex gap-3">
              Sounds Cool <p className="text-black font-light">5 responses</p>
            </p>
            <div className="flex gap-2 items-center">
              <img
                className="w-[2rem] h-[2rem] rounded-md"
                src={
                  "https://th.bing.com/th/id/OIP.HQorgohovSAwHh6JnfzcegHaFj?w=750&h=562&rs=1&pid=ImgDetMain"
                }
                alt="logo"
              />
              <div className="">
                <p className="text-[#0073bb] font-bold hover:underline">
                  Terees A.
                </p>
                <p className="flex gap-1 mt-1">
                  <BsFilePerson className="text-[#f15c00]" />
                  <p className="text-gray-500 font-bold text-[13px]">22</p>
                  <FaRegStar className="text-[#f15c00] ml-[0.4rem]" />
                  <p className="text-gray-500 font-bold text-[13px]">261</p>
                  <p className="text-[#f15c00] font-bold text-[13px] ml-[0.4rem]">
                    Elite 24
                  </p>
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <img
                className="w-[2rem] h-[2rem] rounded-md"
                src={
                  "https://th.bing.com/th/id/OIP.HQorgohovSAwHh6JnfzcegHaFj?w=750&h=562&rs=1&pid=ImgDetMain"
                }
                alt="logo"
              />
              <div className="">
                <p className="text-[#0073bb] font-bold hover:underline">
                  Terees A.
                </p>
                <p className="flex gap-1 mt-1">
                  <BsFilePerson className="text-[#f15c00]" />
                  <p className="text-gray-500 font-bold text-[13px]">22</p>
                  <FaRegStar className="text-[#f15c00] ml-[0.4rem]" />
                  <p className="text-gray-500 font-bold text-[13px]">261</p>
                  <p className="text-[#f15c00] font-bold text-[13px] ml-[0.4rem]">
                    Elite 24
                  </p>
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <img
                className="w-[2rem] h-[2rem] rounded-md"
                src={
                  "https://th.bing.com/th/id/OIP.HQorgohovSAwHh6JnfzcegHaFj?w=750&h=562&rs=1&pid=ImgDetMain"
                }
                alt="logo"
              />
              <div className="">
                <p className="text-[#0073bb] font-bold hover:underline cursor-pointer">
                  Terees A.
                </p>
                <p className="flex gap-1 mt-1">
                  <BsFilePerson className="text-[#f15c00]" />
                  <p className="text-gray-500 font-bold text-[12px]">22</p>
                  <FaRegStar className="text-[#f15c00] ml-[0.4rem]" />
                  <p className="text-gray-500 font-bold text-[12px]">261</p>
                  <p className="text-[#f15c00] font-bold text-[12px] ml-[0.4rem]">
                    Elite 24
                  </p>
                </p>
              </div>
            </div>
            <p className="text-[12px] text-[#0073bb] ml-1 hover:underline cursor-pointer">
              See All
            </p>
            <p className="text-[#d32323] font-bold text-[17px] flex gap-3">
              Nearby businesses
            </p>
            <div className="flex gap-2 items-center">
              <img
                className="w-[3.4rem] h-[4rem] rounded-md"
                src={
                  "https://th.bing.com/th/id/OIP.ZZsn6lD6PCjocBzx1tuu1QHaEo?rs=1&pid=ImgDetMain"
                }
                alt="logo"
              />
              <div className="">
                <p className="text-[#0073bb] font-bold hover:underline cursor-pointer ml-1">
                  JORY{" "}
                </p>
                <div className="flex gap-1 items-center">
                  <img
                    className="w-[5rem] h-[2rem] rounded-md"
                    src={
                      "https://terrywhite.com/wp-content/uploads/2009/12/5starsbig.png"
                    }
                    alt="logo"
                  />
                  <p className="text-gray-500 font-bold text-[12px]">
                    327 reviews
                  </p>
                </div>
                <p className="text-[#0073bb] text-[12px] ml-[0.4rem] flex gap-2">
                  New American, Wine Bars
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <img
                className="w-[3.4rem] h-[4rem] rounded-md"
                src={
                  "https://th.bing.com/th/id/OIP.ZZsn6lD6PCjocBzx1tuu1QHaEo?rs=1&pid=ImgDetMain"
                }
                alt="logo"
              />
              <div className="">
                <p className="text-[#0073bb] font-bold hover:underline cursor-pointer ml-1">
                  JORY{" "}
                </p>
                <div className="flex gap-1 items-center">
                  <img
                    className="w-[5rem] h-[2rem] rounded-md"
                    src={
                      "https://terrywhite.com/wp-content/uploads/2009/12/5starsbig.png"
                    }
                    alt="logo"
                  />
                  <p className="text-gray-500 font-bold text-[12px]">
                    327 reviews
                  </p>
                </div>
                <p className="text-[#0073bb] text-[12px] ml-[0.4rem] flex gap-2">
                  New American, Wine Bars
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <img
                className="w-[3.4rem] h-[4rem] rounded-md"
                src={
                  "https://th.bing.com/th/id/OIP.ZZsn6lD6PCjocBzx1tuu1QHaEo?rs=1&pid=ImgDetMain"
                }
                alt="logo"
              />
              <div className="">
                <p className="text-[#0073bb] font-bold hover:underline cursor-pointer ml-1">
                  JORY{" "}
                </p>
                <div className="flex gap-1 items-center">
                  <img
                    className="w-[5rem] h-[2rem] rounded-md"
                    src={
                      "https://terrywhite.com/wp-content/uploads/2009/12/5starsbig.png"
                    }
                    alt="logo"
                  />
                  <p className="text-gray-500 font-bold text-[12px]">
                    327 reviews
                  </p>
                </div>
                <p className="text-[#0073bb] text-[12px] ml-[0.4rem] flex gap-2">
                  New American, Wine Bars
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <img
                className="w-[3.4rem] h-[4rem] rounded-md"
                src={
                  "https://th.bing.com/th/id/OIP.ZZsn6lD6PCjocBzx1tuu1QHaEo?rs=1&pid=ImgDetMain"
                }
                alt="logo"
              />
              <div className="">
                <p className="text-[#0073bb] font-bold hover:underline cursor-pointer ml-1">
                  JORY{" "}
                </p>
                <div className="flex gap-1 items-center">
                  <img
                    className="w-[5rem] h-[2rem] rounded-md"
                    src={
                      "https://terrywhite.com/wp-content/uploads/2009/12/5starsbig.png"
                    }
                    alt="logo"
                  />
                  <p className="text-gray-500 font-bold text-[12px]">
                    327 reviews
                  </p>
                </div>
                <p className="text-[#0073bb] text-[12px] ml-[0.4rem] flex gap-2">
                  New American, Wine Bars
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <img
                className="w-[3.4rem] h-[4rem] rounded-md"
                src={
                  "https://th.bing.com/th/id/OIP.ZZsn6lD6PCjocBzx1tuu1QHaEo?rs=1&pid=ImgDetMain"
                }
                alt="logo"
              />
              <div className="">
                <p className="text-[#0073bb] font-bold hover:underline cursor-pointer ml-1">
                  JORY{" "}
                </p>
                <div className="flex gap-1 items-center">
                  <img
                    className="w-[5rem] h-[2rem] rounded-md"
                    src={
                      "https://terrywhite.com/wp-content/uploads/2009/12/5starsbig.png"
                    }
                    alt="logo"
                  />
                  <p className="text-gray-500 font-bold text-[12px]">
                    327 reviews
                  </p>
                </div>
                <p className="text-[#0073bb] text-[12px] ml-[0.4rem] flex gap-2">
                  New American, Wine Bars
                </p>
              </div>
            </div>
            <p className="text-[12px] text-[#0073bb] ml-1 hover:underline cursor-pointer">
              More nearby{" "}
            </p>
            <p className="text-[#d32323] font-bold text-[17px] flex gap-3">
              Other events this week{" "}
            </p>
            <div className="flex gap-2 items-center">
              <img
                className="w-[3.4rem] h-[3.4rem] rounded-md"
                src={
                  "https://on-productions.co.uk/wp-content/uploads/On_Event_Production_provide_full_creative_production_for_Blue_Square_Event3.jpg"
                }
                alt="logo"
              />
              <div className=" ml-[0.4rem]">
                <p className="text-[#0073bb] font-bold hover:underline cursor-pointer flex items-center gap-1">
                  Area 51 Encounter{" "}
                  <p className="text-black font-normal text-[13px] mt-[0.2rem]">
                    Wednesday, Jul 3,
                  </p>
                </p>
                <div className="flex gap-1 items-center">
                  <p className="text-black font-normal text-[13px] mt-[0.2rem]">
                    {" "}
                    11:00 am – Saturday, Jul 27, 7:00 pm
                  </p>
                </div>
                <p className="text-gray-400 text-[12px] flex gap-2">
                  4 are interested{" "}
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <img
                className="w-[3.4rem] h-[3.4rem] rounded-md"
                src={
                  "https://on-productions.co.uk/wp-content/uploads/On_Event_Production_provide_full_creative_production_for_Blue_Square_Event3.jpg"
                }
                alt="logo"
              />
              <div className=" ml-[0.4rem]">
                <p className="text-[#0073bb] font-bold hover:underline cursor-pointer flex items-center gap-1">
                  Area 51 Encounter{" "}
                  <p className="text-black font-normal text-[13px] mt-[0.2rem]">
                    Wednesday, Jul 3,
                  </p>
                </p>
                <div className="flex gap-1 items-center">
                  <p className="text-black font-normal text-[13px] mt-[0.2rem]">
                    {" "}
                    11:00 am – Saturday, Jul 27, 7:00 pm
                  </p>
                </div>
                <p className="text-gray-400 text-[12px] flex gap-2">
                  4 are interested{" "}
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <img
                className="w-[3.4rem] h-[3.4rem] rounded-md"
                src={
                  "https://on-productions.co.uk/wp-content/uploads/On_Event_Production_provide_full_creative_production_for_Blue_Square_Event3.jpg"
                }
                alt="logo"
              />
              <div className=" ml-[0.4rem]">
                <p className="text-[#0073bb] font-bold hover:underline cursor-pointer flex items-center gap-1">
                  Area 51 Encounter{" "}
                  <p className="text-black font-normal text-[13px] mt-[0.2rem]">
                    Wednesday, Jul 3,
                  </p>
                </p>
                <div className="flex gap-1 items-center">
                  <p className="text-black font-normal text-[13px] mt-[0.2rem]">
                    {" "}
                    11:00 am – Saturday, Jul 27, 7:00 pm
                  </p>
                </div>
                <p className="text-gray-400 text-[12px] flex gap-2">
                  4 are interested{" "}
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <img
                className="w-[3.4rem] h-[3.4rem] rounded-md"
                src={
                  "https://on-productions.co.uk/wp-content/uploads/On_Event_Production_provide_full_creative_production_for_Blue_Square_Event3.jpg"
                }
                alt="logo"
              />
              <div className=" ml-[0.4rem]">
                <p className="text-[#0073bb] font-bold hover:underline cursor-pointer flex items-center gap-1">
                  Area 51 Encounter{" "}
                  <p className="text-black font-normal text-[13px] mt-[0.2rem]">
                    Wednesday, Jul 3,
                  </p>
                </p>
                <div className="flex gap-1 items-center">
                  <p className="text-black font-normal text-[13px] mt-[0.2rem]">
                    {" "}
                    11:00 am – Saturday, Jul 27, 7:00 pm
                  </p>
                </div>
                <p className="text-gray-400 text-[12px] flex gap-2">
                  4 are interested{" "}
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <img
                className="w-[3.4rem] h-[3.4rem] rounded-md"
                src={
                  "https://on-productions.co.uk/wp-content/uploads/On_Event_Production_provide_full_creative_production_for_Blue_Square_Event3.jpg"
                }
                alt="logo"
              />
              <div className=" ml-[0.4rem]">
                <p className="text-[#0073bb] font-bold hover:underline cursor-pointer flex items-center gap-1">
                  Area 51 Encounter{" "}
                  <p className="text-black font-normal text-[13px] mt-[0.2rem]">
                    Wednesday, Jul 3,
                  </p>
                </p>
                <div className="flex gap-1 items-center">
                  <p className="text-black font-normal text-[13px] mt-[0.2rem]">
                    {" "}
                    11:00 am – Saturday, Jul 27, 7:00 pm
                  </p>
                </div>
                <p className="text-gray-400 text-[12px] flex gap-2">
                  4 are interested{" "}
                </p>
              </div>
            </div>
            <p className="text-[12px] text-[#0073bb] ml-1 hover:underline cursor-pointer">
              More events{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Events;
