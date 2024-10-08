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

export default function Navbar() {
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
  const { firstname } = useAuthStore();

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

  return (
    <nav className="flex flex-col shadow-md fixed top-0 left-0 right-0 z-10">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1370px] lg:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
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
                <Area />
              </div>
            </div>

            <div className="hidden sm:flex items-center space-x-6">
              {session ? (
                <>
                  <div
                    className=" relative text-black"
                    onMouseEnter={() => setIsNotificationOpen(true)}
                    onMouseLeave={() => setIsNotificationOpen(false)}
                  >
                    <Bell className="h-6 w-6  text-gray-600 hover:text-gray-900 cursor-pointer" />
                    {IsNotificationOpen && <Notification />}
                  </div>
                  <Link href="/dashboard/favorite" className="relative">
                    <Heart className="h-6 w-6 text-gray-600 hover:text-gray-900 cursor-pointer" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
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
                          src="/placeholder.svg?height=32&width=32"
                          alt="User"
                        />
                        <AvatarFallback>AB</AvatarFallback>
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
                          <Link
                            href=""
                            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                            role="menuitem"
                          >
                            <User className="mr-2 h-4 w-4" /> {firstname}
                          </Link>
                          <Link
                            href="/dashboard"
                            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                            role="menuitem"
                          >
                            <Home className="mr-2 h-4 w-4" /> Dashboard
                          </Link>
                          <Link
                            href="/dashboard/user"
                            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                            role="menuitem"
                          >
                            <Settings className="mr-2 h-4 w-4" /> Settings
                          </Link>
                          <Link
                            href="#"
                            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                            role="menuitem"
                          >
                            <HelpCircle className="mr-2 h-4 w-4" /> Help
                          </Link>
                          <LogoutComponent />
                          {/* <a
                            href="#"
                            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                            role="menuitem"
                            onClick={() =>
                              signOut({
                                callbackUrl: "/sign-in",
                              })
                            }
                          >
                            <LogOut className="mr-2 h-4 w-4" /> Log out
                          </a> */}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  onClick={() => router.push("/sign-in")}
                >
                  Hello, Sign in Or Sign up
                </Button>
              )}
              <div className="leading-4 flex items-center gap-2 mr-0 lg:mr-3 text-gray-700 hover:text-gray-900">
                <img
                  className="rounded-full w-[45px] h-[45px]"
                  height={50}
                  width={50}
                  // src={
                  //   img ||
                  //   "data:image/png;base64,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"
                  // }
                  alt={"not found"}
                />
                <p
                  className="text-[12px] cursor-pointer"
                  // onClick={() => handlemModal(true)}
                >
                  Hello, Sign in
                  <p className="text-[15px]">Or Sign up</p>
                </p>
              </div>
            </div>
            <div className="md:hidden">
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
        <div className="max-w-[1370px] lg:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => {
                  router.push("/");
                }}
                variant="ghost"
                className="text-white hover:bg-white"
              >
                <Home className="mr-2 h-5 w-5" /> HOME
              </Button>
              <Button
                onClick={() => {
                  router.push("/");
                }}
                variant="ghost"
                className="text-white hover:bg-white"
              >
                <Users className="mr-2 h-5 w-5" /> ROOMMATES
              </Button>
            </div>
            <div className="hidden md:flex items-center space-x-2 text-white">
              <MapPin className="h-5 w-5 text-gray-400" />
              <span className="font-medium">{weatherData?.name}</span>
              <div>
                {weatherData?.main && (
                  <div className="">
                    <p
                      onMouseEnter={() => {
                        setIsHovered(true);
                      }}
                      onMouseLeave={() => {
                        setIsHovered(false);
                      }}
                      className="font-medium cursor-pointer"
                    >
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
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Button
              variant="ghost"
              className="w-full text-left text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            >
              Portland <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
            {session ? (
              <div className="flex items-center space-x-6 px-3 py-2">
                <Bell className="h-6 w-6 text-gray-600" />
                <div className="relative">
                  <Heart className="h-6 w-6 text-gray-600" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
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
              </div>
            ) : (
              <Button
                variant="ghost"
                className="w-full text-left text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                onClick={() => setIsLoggedIn(true)}
              >
                Hello, Sign in Or Sign up
              </Button>
            )}
            <div className="flex items-center space-x-2 text-gray-700 px-3 py-2">
              <MapPin className="h-5 w-5 text-gray-400" />
              {weatherData?.weather && weatherData?.weather.length > 0 && (
                <img
                  className="w-16 h-14 items-center justify-center border-full border-white"
                  src={`https://openweathermap.org/img/w/${weatherData?.weather[0].icon}.png`}
                  alt="logo"
                />
              )}
              {/* <img
                src="/placeholder.svg?height=24&width=24"
                alt="Weather Icon"
                className="h-6 w-6"
              /> */}
              <span className="font-medium">76.1°F</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
