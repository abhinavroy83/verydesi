"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/Room/Icons";
import ShareButton from "@/components/Popups/ShareButton";
import { RoomInterface } from "@myrepo/types";
import axios from "axios";
import {
  AmenityIcon,
  AmenityType,
  utilityIcons,
  UtilityType,
} from "@/constants";
import { FaRegBuilding } from "react-icons/fa";
import { Heart, Home, Hotel, LucideMapPin } from "lucide-react";
import { FiClock } from "react-icons/fi";
import { GiBathtub } from "react-icons/gi";
import { IoTransgender } from "react-icons/io5";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { IoBed } from "react-icons/io5";
import { ChevronLeft, ChevronRight, Share2 } from "lucide-react";
const LeafletMapRoom = dynamic(() => import("@/components/map/LefletMapRoom"));
import { useRouter } from "next/router";
import { number } from "zod";
import { useParams } from "next/navigation";
import { FaSmoking } from "react-icons/fa";
import { BiFoodTag } from "react-icons/bi";
import { MdOutlinePets } from "react-icons/md";
import { IoIosHeart } from "react-icons/io";
import RoomSketon from "@/components/skeleton/RoomSkeleton";
import dynamic from "next/dynamic";
import useAuthStore from "@/store/useAuthStore";
import { useloginstore } from "@/store";
import useCartStore from "@/store/useCartStore";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";

const isValidAmenityIcon = (iconName: string): iconName is AmenityType => {
  return iconName in AmenityIcon;
};
const isValidIcon = (iconName: string): iconName is UtilityType => {
  return iconName in utilityIcons;
};

interface Location {
  lat: number;
  lng: number;
}
export default function RoomDetails() {
  const param = useParams<{ tag: string; id: string }>();

  const [amenityFilter, setAmenityFilter] = useState("");
  const [roomData, setroomData] = useState<RoomInterface | null>(null);
  const [locationsndString, setLocationsndString] = useState<Location | null>(
    null
  );
  const { pluscart, minuscart } = useCartStore();
  const [wishliststatys, setWishlistStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const { status } = useAuthStore();
  const { openLogin } = useloginstore();
  const fetchRoom = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://apiv2.verydesi.com/room/findsingleRoom/${param.id}`
      );
      // console.log(res.data.rooms);
      // console.log(res.data);
      if (res) {
        const loc = {
          lat: res.data.location.coordinates[1],
          lng: res.data.location.coordinates[0],
        };
        setLocationsndString(loc);
        setroomData(res.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);

      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
        // Handle specific error cases
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };
  useEffect(() => {
    fetchRoom();
  }, []);
  const { data: session } = useSession();

  const token = session?.accessToken;

  const makewishlist = async (_id: string) => {
    if (status) {
      try {
        const dat = { roomId: _id, status: true };
        const res = await axios.post(
          `http://apiv2.verydesi.com/favorite/postAndUpdateFavorite`,
          dat,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (
          res.data.msg === "Successfully added to wishlist" ||
          res.data.msg === "Successfully updated"
        ) {
          pluscart();
          setWishlistStatus(true);
          toast.success("Added to Favorites.");
        }
      } catch (error) {
        console.error("Error adding to wishlist:", error);
      }
    } else {
      toast.error("Removed from Favorites.");
    }
  };
  const unwish = async (_id: string) => {
    try {
      const dat = { roomId: _id, status: false };
      const res = await axios.post(
        `http://apiv2.verydesi.com/favorite/postAndUpdateFavorite`,
        dat,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (
        res.data.msg === "Successfully removed" ||
        res.data.msg === "Wishlist cleared"
      ) {
        minuscart();
        setWishlistStatus(false);
        toast.error("Removed from Favorites.");
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  useEffect(() => {
    const fetchWishStatus = async () => {
      try {
        if (status) {
          const res = await axios.get(
            `http://apiv2.verydesi.com/favorite/findfavoritebyId/${param.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (res.data.status === "not found") {
            setWishlistStatus(false);
          } else {
            setWishlistStatus(res.data.status);
          }
        }
      } catch (error) {
        console.error("Error during fetching wishlist status:", error);
      }
    };

    fetchWishStatus();
  }, [param.id]);

  if (loading) {
    return (
      <div>
        <RoomSketon />
      </div>
    );
  }

  return (
    <div className="max-w-[1370px] lg:max-w-[1600px]  px-4 sm:px-6 lg:px-8  mx-auto py-8 mt-[6.8rem]">
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
                  <Hotel className="w-4 h-4 mr-2" />
                  <span className="font-medium">Rooms</span>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-2">
            {!status && (
              <div
                onClick={(e) => {
                  e.preventDefault();
                  openLogin();
                }}
              >
                <Heart className="h-6 w-6 fill-red-600 stroke-red-500 cursor-pointer transition-colors duration-200 ease-in-out" />
              </div>
            )}
            {status && (
              <div>
                {!wishliststatys ? (
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      makewishlist(param.id);
                    }}
                  >
                    <Heart className="h-6 w-6 hover:stroke-red-500 hover:fill-red-500 cursor-pointer transition-colors duration-200 ease-in-out" />
                  </div>
                ) : (
                  <div
                    className="cursor-pointer "
                    onClick={(e) => {
                      e.preventDefault();
                      unwish(param.id);
                    }}
                  >
                    <Heart className="h-6 w-6 hover:fill-white  stroke-red-500 fill-red-500 cursor-pointer transition-colors duration-200 ease-in-out" />
                  </div>
                )}
              </div>
            )}
            <Button
              variant="outline"
              className="rounded-full flex items-center"
            >
              <ShareButton />
              <p>Share</p>
            </Button>
          </div>
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
      <div className="flex justify-between items-start">
        <div className="flex w-full justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            {roomData?.Title}
          </h1>
          <h1 className="text-xl font-bold p-2 text-gray-900">
            Posted By: {roomData?.user_name}{" "}
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center gap-2 text-xl font-bold">
            <p className="text-gray-600">{roomData?.postingincity}, OR</p>|
            <p className="text-xl  text-green-600">
              ${roomData?.Expected_Rooms}
            </p>
          </div>
          <Card>
            <CardContent className="p-0">
              <Carousel className="w-full">
                <CarouselContent>
                  {roomData?.Imgurl && roomData.Imgurl.length > 0 ? (
                    roomData.Imgurl.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="relative aspect-video">
                          <Image
                            src={
                              image ||
                              "https://res.cloudinary.com/druohnmyv/image/upload/v1723819322/assests/tss6j8gnbbccyxwgxzzx.png"
                            }
                            alt={`Room image ${index + 1}`}
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                      </CarouselItem>
                    ))
                  ) : (
                    <CarouselItem>
                      <div className="relative aspect-video">
                        <Image
                          src="https://res.cloudinary.com/druohnmyv/image/upload/v1723819322/assests/tss6j8gnbbccyxwgxzzx.png"
                          alt="Fallback room image"
                          layout="fill"
                          objectFit="contain"
                        />
                      </div>
                    </CarouselItem>
                  )}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-900 text-xl">ABOUT THE PROPERTY</p>
              </div>
              <p className="text-gray-700 mb-4">{roomData?.Description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>More Info About Room</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <FaRegBuilding className="h-6 w-6 text-[#054687] mr-4" />
                  <div>
                    <p className="text-sm font-medium text-gray-500 flex gap-2">
                      Property Type
                    </p>
                    <p className="mt-1 text-sm text-gray-900">
                      {roomData?.Propertytype}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <LucideMapPin className="h-6 w-6 text-[#054687] mr-4" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">City</p>
                    <p className="mt-1 text-sm text-gray-900">
                      {roomData?.city}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FiClock className="h-6 w-6 text-[#054687] mr-4" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Available From
                    </p>
                    <p className="mt-1 text-sm text-gray-900">
                      {roomData?.Avaliblity_from}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FiClock className="h-6 w-6 text-[#054687] mr-4" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Available To
                    </p>
                    <p className="mt-1 text-sm text-gray-900">
                      {roomData?.Available_to}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <GiBathtub className="h-6 w-6 text-[#054687] mr-4" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Attached Bath
                    </p>
                    <p className="mt-1 text-sm text-gray-900">
                      {roomData?.Attchd_Bath}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <IoTransgender className="h-6 w-6 text-[#054687] mr-4" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Preferred Gender
                    </p>
                    <p className="mt-1 text-sm text-gray-900">
                      {roomData?.Preferred_gender}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaHandHoldingDollar className="h-6 w-6 text-[#054687] mr-4" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Deposit</p>
                    <p className="mt-1 text-sm text-gray-900">
                      {roomData?.Desposite}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <IoBed className="h-6 w-6 text-[#054687] mr-4" />
                  <div>
                    {" "}
                    <p className="text-sm font-medium text-gray-500">
                      Is Room Furnished
                    </p>
                    <p className="mt-1 text-sm text-gray-900">
                      {roomData?.is_room_furnished}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6 lg:mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-w-16 aspect-h-9">
                {locationsndString && (
                  <LeafletMapRoom onLocationReceived={locationsndString} />
                )}{" "}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Amenities Included</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {roomData?.Amenities_include?.map((amenity) => {
                  if (isValidAmenityIcon(amenity)) {
                    const IconComponent = AmenityIcon[amenity];
                    return (
                      <div key={amenity} className="flex items-center">
                        {IconComponent && (
                          <IconComponent className="h-5 w-5 text-[#054687] mr-2" />
                        )}
                        <span className="text-sm text-gray-700">{amenity}</span>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Utilities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {roomData?.Utility_include?.map((utility) => {
                  if (isValidIcon(utility)) {
                    const IconComponent = utilityIcons[utility];
                    return (
                      <div key={utility} className="flex  items-center">
                        {IconComponent && (
                          <IconComponent className="h-5 w-5 text-[#054687] mr-2" />
                        )}
                        <span className="text-sm text-gray-700">{utility}</span>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                <div className="flex items-center">
                  <BiFoodTag className="h-6 w-6 text-[#054687] mr-4" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Dietary Preference
                    </p>
                    <p className="mt-1 text-sm text-gray-900">
                      {roomData?.Vegeterian_prefernce}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaSmoking className="h-6 w-6 text-[#054687] mr-4" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Smoking Policy{" "}
                    </p>
                    <p className="mt-1 text-sm text-gray-900">
                      {roomData?.Smoking_policy}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MdOutlinePets className="h-6 w-6 text-[#054687] mr-4" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Pet Friendly{" "}
                    </p>
                    <p className="mt-1 text-sm text-gray-900">
                      {roomData?.Pet_friendly}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>
                {!status && (
                  <span
                    className=" hover:text-blue-500 cursor-pointer"
                    onClick={() => {
                      openLogin();
                    }}
                  >
                    Click Here To{" "}
                  </span>
                )}
                Contact Host{" "}
              </CardTitle>
            </CardHeader>

            {status && (
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Your email" />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <textarea
                      id="message"
                      placeholder="Your message"
                      className="w-full min-h-[100px] px-3 py-2 text-sm rounded-md border border-input bg-background"
                    />
                  </div>
                  <Button className="w-full">Send Message</Button>
                </form>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
