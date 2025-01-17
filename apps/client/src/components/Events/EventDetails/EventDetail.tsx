import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Event } from "@myrepo/types";
import { Calendar, ChevronDown, Heart } from "lucide-react";
import React from "react";
import { FiFlag } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoTicketOutline } from "react-icons/io5";
import { MdOutlineDateRange, MdOutlineMailOutline } from "react-icons/md";
import { RiShareBoxLine } from "react-icons/ri";

interface EventProps {
  event: Event;
}

function EventDetail({ event }: EventProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">
        Lavender U-Pick at Wayward Winds
      </h1>
      <div className="flex items-center gap-2 text-xl font-bold">
        <p className="text-gray-600">, OR</p>
      </div>
      <div className="flex mx-auto gap-7">
        <div className="w-full">
          <Card className="">
            <CardContent className="p-2 flex flex-row">
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
            </CardContent>
          </Card>
          <Card className="my-3">
            <CardContent className="p-2">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-900 text-xl">What/Why:</p>
              </div>
              <p className="text-gray-700">
                {" "}
                Free Admission! Open daily June 29th-August 11th from 10 am-5
                pm. An abundance of the most fragrant and beautiful lavender in
                existence, nestled in the hills of Newberg, Oregon. Explore the
                twists and turns of our Lavender-a-maze. Experience everything
                lavender you can imagine, and shop award-winning essential oils,
                plants, and products in our vintage farm store. If it can be
                made with this magical herb, we do it!
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className=" p-2 my-2 flex gap-3 flex-col">
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
            </CardContent>
          </Card>
          <Card>
            <CardContent className=" p-2">
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
            </CardContent>
          </Card>
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
              {/* <CardTitle className="text-2xl font-bold">
                  About this Brand{" "}
                </CardTitle> */}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <img
                  src={
                    "https://cdn11.bigcommerce.com/s-fg272t4iw0/images/stencil/1280x1280/products/238/491/C-10241__19959.1557813146.jpg?c=2&imbypass=on"
                  }
                  alt={`logo`}
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
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  About this Brand{" "}
                </Button>
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center text-blue-600 border-blue-600"
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
        </div>
      </div>
    </div>
  );
}

export default EventDetail;
