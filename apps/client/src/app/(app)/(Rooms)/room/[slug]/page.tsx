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
import { FaSmoking } from "react-icons/fa";
import { BiFoodTag } from "react-icons/bi";
import { MdOutlinePets } from "react-icons/md";
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
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";
import { useUserData } from "@/hooks/use-userData";
import Similarroomcard from "@/components/Room/Similarroomcard";
import { notFound, useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { format } from "path";

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
interface FormData {
  userName: string;
  userEmail: string;
  message: string;
  ownerEmail: string;
  RoomLink: any;
}
export default function RoomDetails({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const router = useRouter();
  const { slug } = useParams<{ slug: string }>();
  const id = slug.split("-").pop();
  // const id = searchParams.id;
  const [roomData, setroomData] = useState<RoomInterface | null>(null);
  const [locationsndString, setLocationsndString] = useState<Location | null>(
    null
  );
  const { pluscart, minuscart } = useCartStore();
  const [wishliststatys, setWishlistStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [allRooms, setAllRooms] = useState<RoomInterface[]>([]);
  const { currentCity, status } = useAuthStore();
  const { openLogin } = useloginstore();
  const { userData } = useUserData();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const [emailStatus, setEmailStatus] = useState<boolean>(false);

  //check status of email or send email
  useEffect(() => {
    const checkEmailSentStatus = async () => {
      try {
        const response = await axios.get(
          `https://apiv2.verydesi.com/room/status?userEmail=${userData?.email}&ownerEmail=${roomData?.email}`
        );

        setEmailStatus(response.data.alreadySent);
      } catch (error) {
        console.error("Error fetching email status:", error);
      }
    };

    checkEmailSentStatus();
  }, [userData?.email, roomData?.email]);
  // Handle form submission
  const onsubmit = async (data: FormData) => {
    try {
      const roomId = roomData?._id || ""; // Provide a default empty string if undefined
      const roomTitle = encodeURIComponent(roomData?.Title || "");
      setLoading(true);
      const response = await axios.post(
        "https://apiv2.verydesi.com/room/send-email-user",
        {
          ...data,
          RoomLink: `http://localhost:3000/room?id=${roomId}&title=${roomTitle}`,
          ownerEmail: roomData?.email,
        }
      );
      // console.log(response);
      if (response.status === 200) {
        toast.success("Message send succesfully");
        setEmailStatus(true);
        reset();
      }
    } catch (error) {
      console.error("Error sending email:", error);
    } finally {
      setLoading(false);
    }
  };

  //room
  const fetchRoom = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://apiv2.verydesi.com/room/findsingleRoom/${id}`
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
      const allRoomsResponse = await axios.get(
        `https://apiv2.verydesi.com/room/ListingAllRoomByArea/${currentCity}`,
        {
          withCredentials: true,
        }
      );
      setAllRooms(allRoomsResponse.data.rooms.reverse());
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
  }, [id]);

  const currentIndex = allRooms.findIndex((room) => room._id === id);

  const navigateRoom = (direction: "prev" | "next") => {
    const newIndex = direction === "prev" ? currentIndex - 1 : currentIndex + 1;
    if (newIndex >= 0 && newIndex < allRooms.length) {
      const newRoom = allRooms[newIndex];
      const formatSlug = (title: string, id: string) => {
        const formattedTitle = title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        return `${formattedTitle}-${id}`;
      };
      const slug = formatSlug(newRoom?.Title, newRoom?._id);

      router.push(`/room/${slug}`);
    }
  };
  const { data: session } = useSession();

  const token = session?.accessToken;

  const makewishlist = async () => {
    if (status) {
      try {
        const dat = { roomId: id, status: true };
        const res = await axios.post(
          `https://apiv2.verydesi.com/favorite/postAndUpdateFavorite`,
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
  const unwish = async () => {
    try {
      const dat = { roomId: id, status: false };
      const res = await axios.post(
        `https://apiv2.verydesi.com/favorite/postAndUpdateFavorite`,
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
        if (!token) {
          return "token not found, please sign in!!";
        }
        if (status) {
          const res = await axios.get(
            `https://apiv2.verydesi.com/favorite/findfavoritebyId/${id}`,
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
  }, [id]);
  const formatUrl = () => {
    const formattedTitle = roomData?.Title.toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    return `${formattedTitle}-${roomData?._id}`;
  };

  if (loading) {
    return (
      <div>
        <RoomSketon />
      </div>
    );
  }
  if (!id) {
    notFound();
  }

  return (
    <>
      <div className="max-w-[1370px] lg:max-w-[1600px] px-4 sm:px-6 lg:px-8 pb-0 mx-auto py-8 mt-[7rem] font-sans">
        <div className="flex flex-col lg:flex-row space-x-2 w-full justify-between lg:items-center">
          <div className="">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/"
                    className="flex items-center text-[15px] hover:text-primary-dark transition-colors"
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
                    className="flex items-center text-[15px] hover:text-primary-dark transition-colors"
                  >
                    <Hotel className="w-4 h-4 mr-2" />
                    <span className="font-medium">Rooms</span>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex gap-2 py-2 lg:py-0">
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
                        makewishlist();
                      }}
                    >
                      <Heart className="h-6 w-6 hover:stroke-red-500 hover:fill-red-500 cursor-pointer transition-colors duration-200 ease-in-out" />
                    </div>
                  ) : (
                    <div
                      className="cursor-pointer "
                      onClick={(e) => {
                        e.preventDefault();
                        unwish();
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
                <ShareButton
                  shareLink={`https://verydesi.com/room/${formatUrl}}`}
                />
                <p>Share</p>
              </Button>
            </div>
            <div>
              <div className="flex gap-2">
                <button
                  onClick={() => navigateRoom("prev")}
                  disabled={currentIndex === 0}
                  className="px-4 py-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 transition-colors flex flex-row"
                  aria-label="Previous listing"
                >
                  <ChevronLeft className="w-5 h-5 inline-block mr-1" />
                  PREV
                </button>
                <button
                  onClick={() => navigateRoom("next")}
                  disabled={currentIndex === allRooms.length - 1}
                  className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition-colors flex flex-row"
                  aria-label="Next listing"
                >
                  NEXT
                  <ChevronRight className="w-5 h-5 inline-block ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-start  flex-col lg:flex-row">
          <div className="flex w-full lg:justify-between  flex-col lg:flex-row mt-2">
            <div className="flex lg:flex-row gap-2 font-bold lg:items-center">
              <h1 className="lg:text-3xl text-2xl font-bold text-gray-900 flex lg:flex-row flex-col gap-2">
                {roomData?.Title} |{" "}
                <p className="lg:text-3xl text-2xl text-green-600">
                  ${roomData?.Expected_Rooms}
                </p>
              </h1>
              {/* <p className="text-2xl text-green-600">
                ${roomData?.Expected_Rooms}
              </p> */}
            </div>
            <div>
              {/* <h1 className="text-xl font-bold text-gray-900 whitespace-nowrap lg:p-1">
                Posted By: {roomData?.user_name}{" "}
              </h1> */}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-2">
          <div className="lg:col-span-2 space-y-3">
            <div className="flex lg:flex-row flex-col lg:items-center gap-2 text-xl font-bold text-gray-600">
              <p className="text-gray-600">{roomData?.postingincity}, OR |</p>
              <h1 className="text-xl font-bold text-gray-600 whitespace-nowrap">
                Posted By: {roomData?.user_name}{" "}
              </h1>
              {/* <p className="text-xl text-green-600">
                ${roomData?.Expected_Rooms}
              </p> */}
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
                            src="https://res.cloudinary.com/druohnmyv/image/upload/v1729259425/no_image-3-600x745_rk3g07.jpg"
                            alt="Fallback room image"
                            layout="fill"
                            objectFit="cover"
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
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-900 text-xl">ABOUT THE PROPERTY</p>
                </div>
                <p className="text-gray-700">{roomData?.Description}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-3">
                <CardTitle>More Info About Room</CardTitle>
              </CardHeader>
              <CardContent className="p-3">
                <div className="grid grid-cols-2 gap-4">
                  {roomData?.Propertytype && (
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
                  )}
                  {roomData?.city && (
                    <div className="flex items-center">
                      <LucideMapPin className="h-6 w-6 text-[#054687] mr-4" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          City
                        </p>
                        <p className="mt-1 text-sm text-gray-900">
                          {roomData?.city}
                        </p>
                      </div>
                    </div>
                  )}
                  {roomData?.Avaliblity_from && (
                    <div className="flex items-center">
                      <FiClock className="h-6 w-6 text-[#054687] mr-4" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Available From
                        </p>
                        <p className="mt-1 text-sm text-gray-900">
                          {roomData?.Avaliblity_from
                            ? new Date(
                                roomData.Avaliblity_from
                              ).toLocaleDateString()
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                  )}

                  {roomData?.Available_to && (
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
                  )}

                  {roomData?.Attchd_Bath && (
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
                  )}

                  {roomData?.Preferred_gender && (
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
                  )}
                  {roomData?.Desposite && (
                    <div className="flex items-center">
                      <FaHandHoldingDollar className="h-6 w-6 text-[#054687] mr-4" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Deposit
                        </p>
                        <p className="mt-1 text-sm text-gray-900">
                          ${roomData?.Desposite}
                        </p>
                      </div>
                    </div>
                  )}
                  {roomData?.is_room_furnished && (
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
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-3 lg:mt-8">
            <Card>
              <CardHeader className="p-3"></CardHeader>
              <CardContent className="">
                <div className="aspect-w-16 aspect-h-9">
                  {locationsndString && (
                    <LeafletMapRoom onLocationReceived={locationsndString} />
                  )}{" "}
                </div>
              </CardContent>
            </Card>

            {roomData?.Amenities_include && (
              <Card className="">
                <CardHeader className="p-3">
                  <CardTitle>Amenities Included</CardTitle>
                </CardHeader>
                <CardContent className="p-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {roomData?.Amenities_include?.map((amenity) => {
                      if (isValidAmenityIcon(amenity)) {
                        const IconComponent = AmenityIcon[amenity];
                        return (
                          <div key={amenity} className="flex items-center">
                            {IconComponent && (
                              <IconComponent className="h-5 w-5 text-[#054687] mr-2" />
                            )}
                            <span className="text-sm text-gray-700">
                              {amenity}
                            </span>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {roomData?.Utility_include && (
              <Card>
                <CardHeader className="p-3">
                  <CardTitle>Utilities</CardTitle>
                </CardHeader>
                <CardContent className="p-3">
                  <div className="grid grid-cols-2 gap-4">
                    {roomData?.Utility_include?.map((utility) => {
                      if (isValidIcon(utility)) {
                        const IconComponent = utilityIcons[utility];
                        return (
                          <div key={utility} className="flex  items-center">
                            {IconComponent && (
                              <IconComponent className="h-5 w-5 text-[#054687] mr-2" />
                            )}
                            <span className="text-sm text-gray-700">
                              {utility}
                            </span>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader className="p-3">
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent className="p-3">
                <div className="flex flex-col gap-3">
                  {roomData?.Vegeterian_prefernce && (
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
                  )}
                  {roomData?.Smoking_policy && (
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
                  )}
                  {roomData?.Pet_friendly && (
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
                  )}
                </div>
              </CardContent>
            </Card>
            <Card className="mb-6">
              <CardHeader className="p-3">
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
                <CardContent className="p-3">
                  {!emailStatus ? (
                    <form
                      onSubmit={handleSubmit(onsubmit)}
                      className="space-y-4"
                    >
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                          defaultValue={userData?.firstName || ""}
                          id="name"
                          {...register("userName", {
                            required: "Name is required",
                          })}
                          placeholder="Your name"
                        />
                        {errors.userName && (
                          <p className="text-red-500">
                            {errors.userName.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          defaultValue={userData?.email || ""}
                          id="email"
                          {...register("userEmail", {
                            required: "Email is required",
                          })}
                          type="email"
                          placeholder="Your email"
                        />
                        {errors.userEmail && (
                          <p className="text-red-500">
                            {errors.userEmail.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="message">Message</Label>
                        <textarea
                          {...register("message", {
                            required: "Message is required",
                          })}
                          id="message"
                          placeholder="Your message"
                          className="w-full min-h-[100px] px-3 py-2 text-sm rounded-md border border-input bg-background"
                        />
                        {errors.message && (
                          <p className="text-red-500">
                            {errors.message.message}
                          </p>
                        )}
                      </div>
                      <button
                        type="submit"
                        className="w-full mx-auto px-9 py-2 bg-green-800 rounded-md text-white "
                      >
                        Send Message
                      </button>
                    </form>
                  ) : (
                    <p>You have already sent an email to this room owner.</p>
                  )}
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </div>
      <section className="container mx-auto px-4 lg:mt-0 mt-5">
        <h2 className="text-2xl font-bold mb-6">Similar Rooms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {allRooms.slice(0, 3).map((room) => (
            <Similarroomcard key={room._id} room={room} />
          ))}
        </div>
      </section>
    </>
  );
}
