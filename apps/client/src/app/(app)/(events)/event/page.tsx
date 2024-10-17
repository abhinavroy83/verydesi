"use client";

import React, { useState } from "react";
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
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Heart,
  Home,
} from "lucide-react";
import ShareButton from "@/components/Popups/ShareButton";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Similareventcard from "@/components/Events/Similareventcard";

function Events() {
  return (
    <>
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
                <Button
                  variant="outline"
                  className="rounded-full flex items-center"
                >
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
        <h1 className="text-3xl font-bold text-gray-900">
          Lavender U-Pick at Wayward Winds
        </h1>
        <div className="flex items-center gap-2 text-xl font-bold">
          <p className="text-gray-600">, OR</p>
        </div>
        <p className="text-[1rem] text-[#0073bb] hover:underline cursor-pointer">
          Other{" "}
        </p>
        <div className="flex mx-auto gap-7">
          <div className="w-full">
            <div className="flex border rounded-xl mt-[1rem]">
              <img
                src={
                  "https://www.theseedcollection.com.au/assets/full/B2-01.jpg?20201208112734"
                }
                alt="not"
                className="h-[20rem] w-[50rem] rounded-tl-xl rounded-bl-xl object-cover"
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
            <Card className="mt-3">
              <CardContent className="p-2">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-900 text-xl">What/Why:</p>
                </div>
                <p className="text-gray-700">
                  {" "}
                  Free Admission! Open daily June 29th-August 11th from 10 am-5
                  pm. An abundance of the most fragrant and beautiful lavender
                  in existence, nestled in the hills of Newberg, Oregon. Explore
                  the twists and turns of our Lavender-a-maze. Experience
                  everything lavender you can imagine, and shop award-winning
                  essential oils, plants, and products in our vintage farm
                  store. If it can be made with this magical herb, we do it!
                </p>
              </CardContent>
            </Card>
            <div className="mt-[1rem] flex gap-3 flex-col">
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
              <p className="text-gray-900 text-xl">Discuss This Event</p>
              <p className="text-[16px] flex gap-1 items-center text-[#0073bb] hover:underline cursor-pointer">
                <MdOutlineMailOutline size={17} />
                Email about event
              </p>
              <p>No one has commented on this event yet.</p>
              <button
                className="bg-green-800 text-white text-[16px] p-1 rounded-sm items-center w-[3rem] text-center"
                type="button"
              >
                Post
              </button>
              <div className="bg-yellow-100 text-black p-3 rounded-md">
                <p className="flex gap-1">
                  To use talk boards you must first confirm your email address.
                  Click the link in email wee sent. If you would like us to
                  resend confirmation email, go{" "}
                  <p className="text-[#0073bb] cursor-pointer">here.</p>
                </p>
              </div>
            </div>
            <div>
              <h1 className="flex text-[#000] text-[17px] font-bold mt-5 gap-2">
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
              </div>
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
            <Card className="w-full max-w-md mt-4 rounded-none">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  About this Brand{" "}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={
                      "https://cdn11.bigcommerce.com/s-fg272t4iw0/images/stencil/1280x1280/products/238/491/C-10241__19959.1557813146.jpg?c=2&imbypass=on"
                    }
                    // alt={`${name} logo`}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h2 className="text-xl font-bold">adidas</h2>
                    <p className="text-sm text-gray-600">
                      % positive feedback · items sold
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-sm text-gray-800">
                  <p className="flex gap-2">
                    <Calendar className="w-4 h-4" />
                    <p>Joined Sep 2016</p>
                  </p>
                  <p>
                    "At adidas, our love for sport drives who we are and what we
                    do. Every day. It is not only about faster shoes and fashion
                    statements. Just as a shoe is more than padding and foam,
                    there is more to us ..."
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-800 font-bold">
                    See more <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Button className="rounded-full w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Visit store
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center rounded-full text-blue-600 border-blue-600"
                  >
                    Contact
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center rounded-full text-blue-600 border-blue-600"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Save seller
                  </Button>
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">
                      Popular categories from <br></br>this store
                    </h3>
                    <a
                      href="#"
                      className="text-sm text-blue-600 font-medium underline"
                    >
                      See all
                    </a>
                  </div>
                  {/* Add popular categories here */}
                </div>
              </CardContent>
            </Card>

            {/* <div className="border-l pl-4 flex gap-2 flex-col mt-10">
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
          </div> */}
          </div>
        </div>
      </div>
      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Similar Rooms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <Similareventcard key={index} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Events;
