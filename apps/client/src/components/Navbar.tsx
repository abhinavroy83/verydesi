"use client";
import { useEffect, useState } from "react";
import {
  Bell,
  ChevronDown,
  Heart,
  Home,
  Users,
  MapPin,
  Menu,
  X,
  Settings,
  HelpCircle,
  LogOut,
  User,
  Star,
  DoorOpen,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import axios from "axios";
import { WeatherData } from "@myrepo/types";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Area from "./Area/Area";
import Notification from "@/components/Notification/Notification";
import ModernLogoutPopup from "./Popups/Logoutpop";
import LogoutComponent from "./Popups/Logoutpop";
import useCartStore from "@/store/useCartStore";
import useAuthStore from "@/store/useAuthStore";
import { Badge } from "@/components/ui/badge";
import { useUserData } from "@/hooks/use-userData";
import { MdOutlineBusinessCenter } from "react-icons/md";

export default function Navbar() {
  const { userData } = useUserData();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const { data: session, status } = useSession();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [islocationOpen, setIslocationOpen] = useState(false);
  const [IsNotificationOpen, setIsNotificationOpen] = useState(false);
  const router = useRouter();
  const { cartcount } = useCartStore();
  const { firstname, userimage } = useAuthStore();

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          "Portland"
        )}&appid=5e414d6a2d51b65b62d9b463859ae456`
      )
      .then((res) => {
        setWeatherData(res.data);
      })
      .catch((error) => console.log("Error during fetcing whether", error));
  }, []);

  const convertKelvinToCelsius = (kelvin: any) => {
    return kelvin - 273.15;
  };

  const convertKelvinToFahrenheit = (kelvin: any) => {
    return ((kelvin - 273.15) * 9) / 5 + 32;
  };
  const tempInCelsius = convertKelvinToCelsius(weatherData?.main?.temp).toFixed(
    1
  );
  const tempInFahrenheit = convertKelvinToFahrenheit(
    weatherData?.main?.temp
  ).toFixed(1);
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };
  return (
    <nav className="flex flex-col shadow-md fixed top-0 left-0 right-0 z-10 font-sans">
      <div className="bg-white border-b border-gray-200 items-center">
        <div className="max-w-[1370px] lg:max-w-[1600px] h-[71px] mx-auto sm:px-6 px-4 ">
          <div className="flex items-center justify-between h-16 ">
            <div className="flex items-center mt-3">
              <Link href={"/"}>
                <Image
                  src={
                    "https://res.cloudinary.com/druohnmyv/image/upload/v1723819319/assests/ydvr3eeqwwho5kimj5hk.png"
                  }
                  alt="Very Desi Logo"
                  width={300}
                  height={300}
                  className="w-[120px] lg:w-[190px]"
                />
              </Link>
              <div
                className=" relative text-black"
                onMouseEnter={() => setIslocationOpen(true)}
                onMouseLeave={() => setIslocationOpen(false)}
              >
                <div className="flex items-center">
                  <Area bgcolour="bg-white" textcolour="" />
                </div>
              </div>
            </div>
            {/* <div className="relative overflow-hidden bg-yellow-400 text-gray-900 h-[5rem] mt-[1rem]">
              <div className="absolute top-0 right-0 w-1/2 h-full">
                <div className="absolute transform rotate-15 bg-pink-300 w-full h-200% -top-1/2 -right-1/4">
                  adad
                </div>
              </div>
              <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between relative z-10">
                <div className="md:w-1/2 mb-8 md:mb-0">
                  <h1 className="text-[31px]">Give $30. Get $30.</h1>
                  <p className="text-[17px]">
                    Refer a friend (or ten) and get $30 per referral.
                  </p>
                </div>
                <div className="w-1/2 flex">
                  <img
                    src="https://res.cloudinary.com/druohnmyv/image/upload/v1729838633/two-beautiful-surprised-screaming-with-their-hands-up-dressed-casual-clothes-blue-wall-people-emotions-concept_231208-11780-removebg-preview_qngfm5.png"
                    alt="Two friends sharing a secret"
                    className="rounded-lg w-full object-cover bg-cover"
                  />
                </div>
              </div>
              <button className="absolute bottom-4 right-4 bg-gray-900 text-white py-2 px-4 rounded-full hover:bg-gray-800 transition-colors">
                Refer Now
              </button>
            </div> */}
            <div
              onClick={() => {
                window.open("https://www.rakuten.com/", "_blank");
              }}
              className="w-[27rem] mt-2 shadow-lg overflow-hidden relative cursor-pointer"
            >
              <img
                src="https://res.cloudinary.com/druohnmyv/image/upload/v1730037713/Screenshot_2024-10-27_193134_j1ypv2.png"
                alt="Animation Character"
                className="object-cover"
              />
              {/* <div className="flex items-center">
                <div className="ml-3 text-black">
                  <h1 className="text-[25px]">Give $30. Get $30.</h1>
                  <h2 className="text-[13px] mt-0">
                    Refer a friend (or ten) and get $30 per referral.
                  </h2>
                </div>
                <img
                  className="w-[9rem] h-[5rem]"
                  src="https://res.cloudinary.com/druohnmyv/image/upload/v1729838633/two-beautiful-surprised-screaming-with-their-hands-up-dressed-casual-clothes-blue-wall-people-emotions-concept_231208-11780-removebg-preview_qngfm5.png"
                />
              </div>
              <Badge className="absolute top-4 right-2 bg-[#426476] text-white px-3 py-1">
                Talk to Breastfeeding Educator
              </Badge>
              <span className="absolute top-11 right-12 text-[18px] font-bold text-white">
                {" "}
                678-310-4660{" "}
              </span>

              <div className="absolute -left-8 -bottom-8 w-24 h-24 bg-white rounded-full opacity-10"></div>
              <div className="absolute -right-8 -top-8 w-24 h-24 bg-yellow-300 rounded-full opacity-20"></div> */}
            </div>
            {/* <div
              onClick={() => {
                window.open("https://lifepointlactation.com/", "_blank");
              }}
              className="w-[37rem] mt-4 bg-[#F59583] px-1 shadow-lg overflow-hidden relative cursor-pointer hidden lg:flex "
            >
              <div className="flex items-center">
                <img
                  src="https://res.cloudinary.com/druohnmyv/image/upload/v1726470942/finallogo_oamxsn.png"
                  className="w-[6rem] h-[5rem]"
                />
                <div className="ml-3">
                  <span className="text-white"> Healthy Baby</span>
                  <h2 className="text-[18px] font-bold text-[#426476] mt-0">
                    Lifepoint Lactation
                  </h2>
                </div>
                <img
                  className="w-[9rem] h-[5rem]"
                  src="https://res.cloudinary.com/druohnmyv/image/upload/v1727429131/img1_b7arix.png"
                />
              </div>
              <Badge className="absolute top-4 right-2 bg-[#426476] text-white px-3 py-1">
                Talk to Breastfeeding Educator
              </Badge>
              <span className="absolute top-11 right-12 text-[18px] font-bold text-white">
                {" "}
                678-310-4660{" "}
              </span>{" "}
              <div className="absolute -right-8 -top-8 w-24 h-24 bg-yellow-300 rounded-full opacity-20"></div>
            </div> */}

            <div className="hidden sm:flex items-center space-x-6 mt-3">
              {session ? (
                <>
                  <div
                    className="relative text-black"
                    onMouseEnter={() => setIsNotificationOpen(true)}
                    onMouseLeave={() => setIsNotificationOpen(false)}
                  >
                    <Bell className="cursor-pointer" />
                    <Notification isOpen={IsNotificationOpen} />
                  </div>
                  <Link href="/dashboard/favorite" className="relative">
                    <Heart className="h-6 w-6 text-gray-900 hover:text-gray-900 cursor-pointer" />
                    <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartcount}
                    </span>
                  </Link>
                  <div
                    className="relative"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                    // ref={dropdownRef}
                  >
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={
                            userimage ||
                            userData?.userimg ||
                            "/placeholder.svg?height=32&width=32"
                          }
                          alt={userData?.firstName || "User"}
                        />
                        <AvatarFallback>
                          {getInitials(userData?.firstName || "User")}
                        </AvatarFallback>{" "}
                      </Avatar>
                    </Button>
                    {isDropdownOpen && (
                      <div className="absolute right-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div
                          className="py-1"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="options-menu"
                        >
                          <div
                            className="px-4 py-2 text-[16px] text-white flex items-center bg-[#232f3e]"
                            role="menuitem"
                          >
                            <User className="mr-2  h-5 w-5" />
                            Welcome, {firstname}
                          </div>
                          <Link
                            href="/dashboard"
                            className="px-4 py-2 text-[16px] text-white lg:text-gray-700 hover:bg-gray-100 flex items-center"
                            role="menuitem"
                          >
                            <Home className="mr-2  h-5 w-5" /> Dashboard
                          </Link>
                          <Link
                            href="/dashboard/user"
                            className="px-4 py-2 text-[16px] text-white lg:text-gray-700 hover:bg-gray-100 flex items-center"
                            role="menuitem"
                          >
                            <Settings className="mr-2  h-5 w-5" /> Settings
                          </Link>
                          <Link
                            href="#"
                            className="px-4 py-2 text-[16px] text-white lg:text-gray-700 hover:bg-gray-100 flex items-center"
                            role="menuitem"
                          >
                            <HelpCircle className="mr-2  h-5 w-5" /> Help
                          </Link>
                          <LogoutComponent />
                          {/* <a
                            href="#"
                            className="px-4 py-2 text-sm text-white hover:bg-gray-100 flex items-center"
                            role="menuitem"
                            onClick={() =>
                              signOut({
                                callbackUrl: "/sign-in",
                              })
                            }
                          >
                            <LogOut className="mr-2  h-5 w-5" /> Log out
                          </a> */}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div
                  onClick={() => router.push("/sign-in")}
                  className="leading-4 flex items-center gap-2 mr-0 lg:mr-3 text-gray-900"
                >
                  <User />
                  <p
                    className="text-[12px] cursor-pointer"
                    // onClick={() => handlemModal(true)}
                  >
                    Hello, Sign in
                    <p className="text-[15px]">Or Sign up</p>
                  </p>
                </div>
              )}
            </div>
            <div className="md:hidden mt-2">
              <Button
                variant="ghost"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-800">
        <div className="max-w-[1370px] lg:max-w-[1600px] mx-auto sm:px-6 lg:px-2">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center">
              <Button
                onClick={() => {
                  router.push("/");
                }}
                variant="ghost"
                className="text-white hover:bg-white group text-[15px] transition duration-300 ease-in-out"
              >
                <Home className="mr-2 h-5 w-5 group-hover:rotate-[360deg] transition-transform duration-300 " />
                HOME
              </Button>
              <Button
                onClick={() => {
                  router.push("/");
                }}
                variant="ghost"
                className="text-white hover:bg-white transition duration-300 ease-in-out group"
              >
                <Users className="mr-2 h-5 w-5 group-hover:rotate-[360deg] transition-transform duration-300 " />{" "}
                ROOMMATES
              </Button>

              <Button
                onClick={() => {
                  router.push("/events");
                }}
                variant="ghost"
                className="text-white hover:bg-white transition duration-300 ease-in-out group"
              >
                <Calendar className="mr-2 h-4 w-4 group-hover:rotate-[360deg] transition-transform duration-300 " />{" "}
                EVENTS
              </Button>
            </div>

            <div
              onMouseEnter={() => {
                setIsHovered(true);
              }}
              onMouseLeave={() => {
                setIsHovered(false);
              }}
              className="hidden md:flex cursor-pointer items-center space-x-2 text-white"
            >
              <span className="font-medium">{weatherData?.name}</span>
              <div>
                {weatherData?.main && (
                  <div className="">
                    <p className="font-medium cursor-pointer">
                      {isHovered
                        ? `${tempInCelsius}°C`
                        : `${tempInFahrenheit}°F`}
                    </p>
                  </div>
                )}
              </div>
              {weatherData?.weather && weatherData?.weather.length > 0 && (
                <img
                  className="w-16 h-14 items-center justify-center border-full border-white"
                  src={`https://openweathermap.org/img/w/${weatherData?.weather[0].icon}.png`}
                  alt="logo"
                />
              )}
              {/* <span className="font-medium">76.1°F</span> */}
            </div>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#232f3e] lg:bg-white border-b border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {session ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-6 px-3">
                  <Bell className="h-6 w-6 text-white" />
                  <div className="relative">
                    <Heart className="h-6 w-6 text-white" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full  h-5 w-5 flex items-center justify-center">
                      1
                    </span>
                  </div>
                  <Avatar className="h-8 w-8 ring-2 ring-gray-300">
                    <AvatarImage
                      src="/placeholder.svg?height=32&width=32"
                      alt="User"
                    />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="flex items-center space-x-2 text-white py-2">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    {weatherData?.weather &&
                      weatherData?.weather.length > 0 && (
                        <img
                          className="w-16 h-14 items-center justify-center border-full border-white"
                          src={`https://openweathermap.org/img/w/${weatherData?.weather[0].icon}.png`}
                          alt="logo"
                        />
                      )}
                    <span className="font-medium">76.1°F</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-sm text-white lg:text-gray-700 rounded-md"
                  >
                    <Home className="inline-block mr-2 h-5 w-5" /> Dashboard
                  </Link>
                  <Link
                    href="/dashboard/user"
                    className="block px-4 py-2 text-sm text-white rounded-md"
                  >
                    <Settings className="inline-block mr-2 h-5 w-5" /> Settings
                  </Link>
                  <Link
                    href="#"
                    className="block px-4 py-2 text-sm text-white rounded-md"
                  >
                    <HelpCircle className="inline-block mr-2 h-5 w-5" /> Help
                  </Link>
                  <LogoutComponent />
                </div>
              </div>
            ) : (
              <Button
                variant="ghost"
                className="w-full text-left text-white hover:text-gray-900 hover:bg-gray-100"
                onClick={() => router.push("/sign-in")}
              >
                <User className="inline-block mr-2 h-5 w-5" />
                Hello, Sign in Or Sign up
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
