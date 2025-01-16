"use client";

import React, { useCallback, useState } from "react";

import { useParams, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

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
  Clock,
  Globe,
  Heart,
  Home,
  Link,
  MapPin,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ShareButton from "@/components/Popups/ShareButton";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Similareventcard from "@/components/Events/Similareventcard";
import axios from "axios";
import useAuthStore from "@/store/useAuthStore";
import { Event } from "@myrepo/types";
import dynamic from "next/dynamic";
const LeafletMapRoom = dynamic(() => import("@/components/map/LefletMapRoom"));
interface Location {
  lat: number;
  lng: number;
}
function Events() {
  const { id } = useParams();

  const [event, setEvent] = useState<Event | null>(null);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { currentCity } = useAuthStore();
  const router = useRouter();
  const [locationsndString, setLocationsndString] = useState<Location | null>(
    null
  );

  React.useEffect(() => {
    // Fetch all events
    const fetchallEvents = async () => {
      try {
        const city = currentCity || "Portland";
        const response = await axios.get(
          `https://apiv2.verydesi.com/event/getEventByArea/${city}`
        );
        // console.log(response);

        setAllEvents(response.data || []);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };

    // Fetch current event
    const fetchEvent = async () => {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://apiv2.verydesi.com/event/find_event_by_id/${id}`
        );
        const loc = {
          lat: response.data.location.coordinates[1],
          lng: response.data.location.coordinates[0],
        };
        setLocationsndString(loc);
        setEvent(response?.data);
      } catch (err) {
        setError("Failed to load event details.");
        console.error("Error fetching event:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchallEvents();
    fetchEvent();
  }, [id]);
  const currentIndex = allEvents.findIndex((event) => event._id === id);

  const navigateEvent = (direction: "prev" | "next") => {
    const newIndex = direction === "prev" ? currentIndex - 1 : currentIndex + 1;

    if (newIndex >= 0 && newIndex < allEvents.length) {
      const newEventId = allEvents[newIndex]._id;
      router.push(`/event/${newEventId}`);
    }
  };

  return (
    <>
      <div className="w-full max-w-[1370px] lg:max-w-[1600px] px-4 sm:px-6 mx-auto py-4 sm:py-8 mt-16 sm:mt-[6.1rem] font-sans">
        <div className=" w-full mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-0">
            <div className="flex flex-col sm:flex-row lg:mt-0 mt-12 space-x-2 w-full justify-between">
              <div className="lg:mb-0 mb-2">
                <Breadcrumb>
                  <BreadcrumbList className="space-x-[-7px]">
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        href="/events"
                        className="flex items-center text-primary hover:text-primary-dark transition-colors"
                      >
                        <Home className="w-4 h-4 mr-2 text-[#f97316]" />
                        <span className="font-medium text-[#f97316] text-[15px] hover:underline">
                          Home
                        </span>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        href="/events"
                        className="flex items-center text-primary hover:text-primary-dark transition-colors"
                      >
                        {/* <Calendar className="w-4 h-4 mr-2" /> */}
                        <span className="font-medium text-[#737373] text-[15px] hover:underline hover:cursor-pointer">
                          All Events
                        </span>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </BreadcrumbSeparator>

                    <BreadcrumbItem>
                      <BreadcrumbLink className="flex items-center text-primary hover:text-primary-dark transition-colors">
                        {/* <Calendar className="w-4 h-4 mr-2" /> */}
                        <span className="font-medium text-[#737373] text-[15px] hover:underline hover:cursor-pointer">
                          Events
                        </span>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <div className="flex gap-2 w-full sm:w-auto justify-between sm:justify-start items-center">
                <div className="flex items-center gap-2">
                  <Heart className="h-6 w-6 fill-red-600 stroke-red-500 cursor-pointer transition-colors duration-200 ease-in-out" />
                </div>
                <Button
                  variant="outline"
                  className="rounded-full flex items-center"
                >
                  <ShareButton shareLink={`https://verydesi.com/event/${id}`} />
                  <p className="text-[16px]">Share</p>
                </Button>
                <div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigateEvent("prev")}
                      disabled={currentIndex === 0}
                      className="px-4 py-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 transition-colors"
                      aria-label="Previous listing"
                    >
                      <ChevronLeft className="w-5 h-5 inline-block mr-1" />
                      PREV
                    </button>
                    <button
                      onClick={() => navigateEvent("next")}
                      disabled={currentIndex === allEvents.length - 1}
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
        <div className="">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-0">
            <h1 className="lg:text-3xl text-2xl font-bold text-gray-900">
              {event?.eventTitle}|
            </h1>
            <div className="flex gap-2 lg:mb-0 mb-2">
              <IoTicketOutline size={33} className="text-green-600 lg:mt-1" />
              <p className="lg:text-3xl text-2xl text-green-600 font-bold capitalize">
                {event?.entryoption}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-[1rem] lg:mt-1">
            <div className="flex gap-2 text-xl font-bold text-gray-600">
              <div>
                <p>
                  <HiOutlineLocationMarker size={25} color="" />
                </p>
              </div>
              <div className="flex flex-col lg:flex-row">
                <p> {event?.venueName}</p>
                <p>{event?.address}</p>
                <p>
                  {event?.city}, {event?.state} {event?.zipCode}
                </p>
              </div>
            </div>
            <div className="flex gap-2 text-gray-600">
              <div>
                <p>
                  <MdOutlineDateRange size={25} color="" />
                </p>
              </div>
              <div className="flex gap-2 mb-1 text-xl font-bold text-gray-600 items-center">
                <p className="flex gap-2 text-gray-600 text-xl font-bold">
                  <p className="font-bold">From:</p>{" "}
                  {new Date(event?.startDate || "").toLocaleDateString()} at{" "}
                  {event?.startTime || "N/A"}
                  <p className="font-bold">To:</p>{" "}
                  {new Date(event?.endDate || "").toLocaleDateString()} at{" "}
                  {event?.endTime || "N/A"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xl font-bold">
            {/* <p className="text-gray-600">
            {event?.city}, {event?.state}
          </p> */}
          </div>

          <div className="flex flex-col lg:flex-row mx-auto gap-4 lg:gap-7">
            <div className="w-full lg:w-2/3">
              <div className="flex border rounded-xl mt-0 p-0">
                <div className="w-full">
                  <Carousel opts={{ align: "start" }} className="relative">
                    <CarouselContent>
                      {loading ? (
                        [...Array(5)].map((_, index) => (
                          <CarouselItem key={index} className="basis-full">
                            <div className="w-full h-[20rem] bg-gray-200 animate-pulse rounded-lg"></div>
                          </CarouselItem>
                        ))
                      ) : event?.images && event.images.length > 0 ? (
                        event.images.map((imageUrl, index) => (
                          <CarouselItem key={index} className="basis-full">
                            <img
                              src={imageUrl}
                              alt={`Event Image ${index + 1}`}
                              className="w-full h-48 sm:h-64 md:h-80 lg:h-[28rem] object-cover rounded-lg"
                            />
                          </CarouselItem>
                        ))
                      ) : (
                        <CarouselItem className="basis-full">
                          <div className="w-full h-[20rem] bg-gray-300 flex items-center justify-center rounded-lg">
                            <p className="text-gray-500">No images available</p>
                          </div>
                        </CarouselItem>
                      )}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-1 top-1/2 -translate-y-1/2 z-10" />
                    <CarouselNext className="absolute right-1 top-1/2 -translate-y-1/2 z-10" />
                  </Carousel>
                </div>

                {/* <div className="flex gap-2 flex-col text-[1rem] ml-6 mt-4">
                <div className="flex border-b border-gray-300 p-3 gap-2">
                  <div>
                    <p>
                      <HiOutlineLocationMarker size={25} color="gray" />
                    </p>
                  </div>
                  <div>
                    <p> {event?.venueName}</p>
                    <p>{event?.address}</p>
                    <p>
                      {event?.city}, {event?.state} {event?.zipCode}
                    </p>
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
                      <p className="font-bold">From:</p>{" "}
                      {new Date(event?.startDate || "").toLocaleDateString()} at{" "}
                      {event?.startTime || "N/A"}
                    </p>
                    <p className="flex gap-2">
                      <p className="font-bold">To:</p>{" "}
                      {new Date(event?.endDate || "").toLocaleDateString()} at{" "}
                      {event?.endTime || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 p-3">
                  <IoTicketOutline size={25} color="gray" />
                  <p className=" capitalize">{event?.entryoption}</p>
                </div>
              </div> */}
              </div>
              {/* <Card className="mt-3">
                <CardContent className="p-2">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-gray-900 text-xl font-bold">What/Why:</p>
                  </div>
                  <p className="text-gray-700"> {event?.description}</p>
                </CardContent>
              </Card> */}
              <div className="mt-3">
                <div className="p-2">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-gray-900 text-xl font-bold">What/Why:</p>
                  </div>
                  <p className="text-gray-700"> {event?.description}</p>
                </div>
              </div>
              <div className="space-y-8 mt-4">
                {/* Date and Time */}
                <section>
                  <h2 className="text-xl font-semibold my-2">Date and time</h2>
                  <div className="flex items-start gap-2">
                    <Calendar className="h-5 w-5 mt-0.5 text-blue-600" />
                    <div>
                      <p className="font-medium">
                        Wednesday, January 15 · 6-9pm PST
                      </p>
                    </div>
                  </div>
                </section>

                {/* Location */}
                <section>
                  <h2 className="text-xl font-semibold mb-2">Location</h2>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 mt-0.5 text-blue-600" />
                    <div>
                      <p className="font-medium">White Owl Social Club</p>
                      <p className="text-muted-foreground">
                        1305 Southeast 8th Avenue Portland, OR 97214 United
                        States
                      </p>
                      <Button
                        variant="link"
                        className="h-auto p-0 text-blue-600"
                      >
                        Show map
                      </Button>
                    </div>
                  </div>
                </section>

                {/* About */}
                <section>
                  <h2 className="text-xl font-semibold mb-2">
                    About this event
                  </h2>
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Event lasts 2 hours</span>
                  </div>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Looking to meet new friends? Searching for new
                      opportunities? Or simply looking to celebrate Pride Month
                      in a queer space with other queer humans?
                    </p>
                    <p>
                      Come join Out in Tech PDX at White Owl on Wednesday,
                      January 15th from 6pm to 9pm.
                    </p>
                    <p>
                      Whether you&apos;re interested in tech, working in tech,
                      or you&apos;re tech-adjacent (hint: that&apos;s everyone),
                      come mingle with us, have a beverage of choice, and meet
                      the fabulous members of your PDX Out in Tech community.
                    </p>
                    <p>We are looking forward to seeing everyone there!</p>
                  </div>
                </section>

                {/* Tags */}
                <section>
                  <h2 className="text-xl font-semibold mb-3">Tags</h2>
                  <div className="flex flex-wrap gap-2 ">
                    <Badge variant="secondary">United States Events</Badge>
                    <Badge variant="secondary">Oregon Events</Badge>
                    <Badge variant="secondary">
                      Things to do in Portland, OR
                    </Badge>
                    <Badge variant="secondary">Portland Networking</Badge>
                    <Badge variant="secondary">
                      Portland Science & Tech Networking
                    </Badge>
                  </div>
                </section>

                {/* Organized By */}
                <section>
                  <h2 className="text-xl font-semibold mb-4">Organized by</h2>
                  <div className="bg-slate-50 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 relative">
                          <img
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-F3X1HyiwCFJhKwp7SwTXwYZinO3qnI.png"
                            alt="Out in Tech logo"
                            width={48}
                            height={48}
                            className="rounded"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold">Out in Tech</h3>
                          <p className="text-sm text-muted-foreground">
                            11.1k followers
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Lots of repeat customers
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline">Contact</Button>
                        <Button>Follow</Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Out in Tech unites the LGBTQ+ tech community. We do this
                      by creating opportunities for our 50,000 members to
                      advance their careers, grow their networks, and leverage
                      tech for social change.
                    </p>
                    <div className="flex gap-4">
                      <Link
                        href="#"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Globe className="h-5 w-5" />
                      </Link>
                      <Link
                        href="#"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </Link>
                      <Link
                        href="#"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </section>
              </div>
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
                <p className="text-gray-900 text-xl font-bold">
                  Discuss This Event
                </p>
                <p className="text-[16px] flex gap-1 items-center text-[#0073bb] hover:underline cursor-pointer">
                  <MdOutlineMailOutline size={17} />
                  Email about event
                </p>
                <p>No one has commented on this event yet.</p>
                {/* <button
                className="bg-green-800 text-white text-[16px] p-1 rounded-sm items-center w-[3rem] text-center"
                type="button"
              >
                Post
              </button> */}
                <div className="bg-yellow-100 text-black p-3 rounded-md">
                  <p className="flex gap-1">
                    To use talk boards you must first confirm your email
                    address. Click the link in email wee sent. If you would like
                    us to resend confirmation email, go{" "}
                    <p className="text-[#0073bb] cursor-pointer">here.</p>
                  </p>
                </div>
              </div>
              <div>
                <h1 className="flex text-[#000] text-[20px] font-bold my-2 gap-2">
                  Host Details-{" "}
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-between border rounded-md p-3">
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
                      <p className="text-black text-[16px]">
                        Name
                        <p className="text-black flex text-[16px]">
                          {/* {rooms.user_name} */}
                          {event?.hostedBy}
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
                      <p className="text-black text-[16px]">
                        {event?.contactNumber}
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
                      <p className="text-black text-[16px]">
                        Email
                        {/* <p className="text-black flex text-[18px]">{rooms.email}</p> */}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/3">
              <Card className="">
                <CardHeader className="p-0"></CardHeader>
                <CardContent className="p-2">
                  <div className="p-0">
                    {locationsndString && (
                      <LeafletMapRoom
                        onLocationReceived={locationsndString}
                        markerstyle="marker"
                      />
                    )}{" "}
                  </div>
                </CardContent>
              </Card>
              <Card className="w-full mt-4 rounded-none">
                {/* <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  About this Brand{" "}
                </CardTitle>
              </CardHeader> */}
                <CardContent className="space-y-4 mt-5">
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
                    {/* <p>
                    "At adidas, our love for sport drives who we are and what we
                    do. Every day. It is not only about faster shoes and fashion
                    statements. Just as a shoe is more than padding and foam,
                    there is more to us ..."
                  </p> */}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-800 font-bold">
                      See more <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Button className="text-[16px] w-full bg-green-800 hover:bg-green-700 text-white">
                      About this Brand{" "}
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-center text-green-800 border-green-800"
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                  </div>
                  <div>
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">
                        Popular categories
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

        <section className="">
          <h2 className="text-2xl font-bold my-4">Similar Rooms</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[...Array(3)].map((_, index) => (
              <Similareventcard key={index} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default Events;
function useEffect(arg0: () => void, arg1: string[]) {
  throw new Error("Function not implemented.");
}
