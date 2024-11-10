"use client";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import Area from "./Area/Area";
import Script from "next/script";

export default function Footer() {
  return (
    <div>
      <div className="lg:mt-9 mt-6 w-full font-sans">
        {/* <div
          onClick={() => {
            window.open("https://redletterweb.com/", "_blank");
          }}
          className="flex flex-col justify-center items-center mb-2 cursor-pointer"
        >
          <div className="flex items-center justify-between overflow-hidden px-2 lg:px-0">
            <img
              src="https://res.cloudinary.com/druohnmyv/image/upload/v1730035746/Screenshot_2024-10-27_185841_argpoc.png"
              alt="Animation Character"
              className="object-cover"
            />
          </div>
        </div> */}

        <div className=" mx-auto mt-8">
          <div className="bg-[#232f3e] flex text-[#232f3e] justify-center items-center gap-10 ">
            <p>hi</p>
            {/* <Link to={"/"} className="bg-cover bg-center flex">
          </div> */}
          </div>
          <div className=" w-full bg-[#131A22] border-t-7 border-[#232f3e]">
            <div className="max-w-[1370px] lg:max-w-[1600px] mx-auto bg-[#131A22] ">
              <div className="max-w-[1600px] w-full m-auto flex flex-col items-center pb-3 lg:flex-row py-2 justify-center"></div>
              <div className="lg:flex gap-10">
                <div className="flex text-white items-center gap-5 px-3 lg:px-0">
                  <div className="flex items-center mt-3 gap-2">
                    <Link href={"/"}>
                      <Image
                        src={
                          "https://res.cloudinary.com/druohnmyv/image/upload/v1723819327/assests/x31ydsmb8hkg05fqbkjf.png"
                        }
                        alt="Very Desi Logo"
                        width={300}
                        height={300}
                        className="w-[120px] lg:w-[190px]"
                      />
                    </Link>
                    <div className=" relative text-white">
                      <div className="flex items-center text-white">
                        <Area bgcolour="bg-[#131A22]" textcolour="" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-3 justify-center gap-10 px-4 lg:px-0 lg:mt-0 mt-3 mb-7">
                  <div className="">
                    <p className="font-semibold tracking-wide text-[#DDD]">
                      Connect With Us To Start
                    </p>
                    <ul className="mt-2 space-y-1 leading-4 text-[14px]">
                      <li>
                        <a
                          href="/"
                          className="text-[#999] transition-colors duration-300 hover:text-deep-purple-accent-400 hover:underline "
                        >
                          Connect Us
                        </a>
                      </li>
                      <li>
                        <a
                          href="/"
                          className="text-[#999] transition-colors duration-300 hover:text-deep-purple-accent-400 hover:underline"
                        >
                          Work With Us
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="">
                    <p className="font-semibold tracking-wide text-[#DDD]">
                      About The Rooms
                    </p>
                    <ul className="mt-2 space-y-1 leading-4 text-[14px]">
                      <li>
                        <a
                          href="/"
                          className="text-[#999] transition-colors duration-300 hover:text-deep-purple-accent-400 hover:underline "
                        >
                          Rooms In Portland
                        </a>
                      </li>
                      <li>
                        <a
                          href="/"
                          className="text-[#999] transition-colors duration-300 hover:text-deep-purple-accent-400 hover:underline"
                        >
                          Rooms In Atlanta
                        </a>
                      </li>
                      <li>
                        <a
                          href="/"
                          className="text-[#999] transition-colors duration-300 hover:text-deep-purple-accent-400 hover:underline"
                        >
                          Rooms In Austin
                        </a>
                      </li>
                      <li>
                        <a
                          href="/"
                          className="text-[#999] transition-colors duration-300 hover:text-deep-purple-accent-400 hover:underline"
                        >
                          Rooms In Baltimore
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="">
                    <p className="font-semibold tracking-wide text-[#DDD]">
                      About The Events
                    </p>
                    <ul className="mt-2 space-y-1 leading-4 text-[14px]">
                      <li>
                        <a
                          href="/"
                          className="text-[#999] transition-colors duration-300 hover:text-deep-purple-accent-400 hover:underline "
                        >
                          Events In Portland
                        </a>
                      </li>
                      <li>
                        <a
                          href="/"
                          className="text-[#999] transition-colors duration-300 hover:text-deep-purple-accent-400 hover:underline"
                        >
                          Events In Atlanta
                        </a>
                      </li>
                      <li>
                        <a
                          href="/"
                          className="text-[#999] transition-colors duration-300 hover:text-deep-purple-accent-400 hover:underline"
                        >
                          Events In Austin
                        </a>
                      </li>
                      <li>
                        <a
                          href="/"
                          className="text-[#999] transition-colors duration-300 hover:text-deep-purple-accent-400 hover:underline"
                        >
                          Events In Baltimore
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-700 pt-8 text-[15px] text-white">
                <ul className="flex flex-wrap justify-center space-x-9 mb-4">
                  <li>
                    <Link
                      href="/about"
                      className="hover:text-white transition-colors duration-200 ease-in-out hover:underline"
                    >
                      About VeryDesi.com
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/copyright"
                      className="hover:text-white transition-colors duration-200 ease-in-out hover:underline"
                    >
                      Copyright Policy{" "}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms"
                      className="hover:text-white transition-colors duration-200 ease-in-out hover:underline"
                    >
                      Terms of Use{" "}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/policy"
                      className="hover:text-white transition-colors duration-200 ease-in-out hover:underline"
                    >
                      Privacy Policy{" "}
                    </Link>
                  </li>
                </ul>
                <p className="text-center text-gray-400 hover:text-white">
                  © 2024, VeryDesi.com, Inc.
                </p>
              </div>

              <div className="flex flex-col justify-between pt-5 sm:flex-row sm:items-center max-w-[1600px] w-full mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
