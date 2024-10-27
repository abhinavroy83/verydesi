"use client";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import Area from "./Area/Area";

export default function Footer() {
  return (
    <div>
      <div className="lg:mt-9 mt-6 w-full font-sans">
        <div
          onClick={() => {
            window.open("https://redletterweb.com/", "_blank");
          }}
          className="flex flex-col justify-center items-center mb-2 cursor-pointer"
        >
          <div className="font-[arial] lg:w-[728px] w-[350px] lg:h-[90px] h-[150px] flex items-center justify-between overflow-hidden">
            <img
              src="https://res.cloudinary.com/druohnmyv/image/upload/v1730035746/Screenshot_2024-10-27_185841_argpoc.png"
              alt="Animation Character"
              className="object-cover"
            />
            {/* <div className="flex flex-col justify-center h-full lg:pl-6 pl-2">
              <h1 className="text-white lg:text-xl text-[16px] font-bold">
                RED LETTER WEB{" "}
              </h1>
              <p className="text-white lg:text-lg text-[14px] font-semibold">
                Cheapest domain names in the USA{" "}
              </p>
              <p className="text-yellow-200 lg:text-sm text-[12px]">
                Get your own .com, .org, & .net{" "}
              </p>
            </div>
            <div className="flex items-center justify-end h-full lg:pr-6">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-red-700 font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
                Start Now
              </button>
            </div>
            <img
              className="w-[10rem] h-[7.5rem]"
              src="https://www.pngmart.com/files/3/Business-People-PNG-Pic.png"
            /> */}
          </div>
          {/* <div className="cursor-pointer lg:w-[44rem] w-[22rem] bg-red-700 border-4 border-[#232f3e] justify-between gap-4 lg:gap-7 flex  lg:p-0 shadow-sm shadow-gray-500 rounded-md">
            <div className="flex flex-col gap-3 ">
              <span className="text-[#232f3e] bg-white rounded-br-full font-bold px-6 text-[18px]">
                Very Desi Guides
              </span>
            </div>
            <div className="flex flex-col items-center justify-center text-white">
              <h2 className="lg:text-[25px] text-[20px] font-bold">
                Red Letter Jobs{" "}
              </h2>
              <p className="lg:text-[19px] text-[15px] mb-4 text-gray-300">
                Elevate Your Online Presence
              </p>
            </div>
            <img
              className="w-[120px] lg:w-[190px] md:bg-none hidden md:block"
              src={`https://res.cloudinary.com/druohnmyv/image/upload/v1724996141/R.2894cf285c04316dd503b8d215827e2c_vbweas.png`}
              alt="logo"
            />
          </div> */}
        </div>

        <div className=" mx-auto mt-8">
          <div className="bg-[#232f3e] flex text-[#232f3e] justify-center items-center gap-10 ">
            <p>hi</p>
            {/* <Link to={"/"} className="bg-cover bg-center flex">
          </div> */}
          </div>
          <div className=" w-full bg-[#131A22] border-t-7 border-[#232f3e]">
            <div className="max-w-[1370px] lg:max-w-[1600px] mx-auto bg-[#131A22] ">
              <div className="max-w-[1600px] w-full m-auto flex flex-col items-center pb-3 lg:flex-row py-2 justify-center"></div>
              <div className="lg:flex justify-center gap-10">
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
                      Make Money
                    </p>
                    <ul className="mt-2 space-y-1 leading-4 text-[14px]">
                      <li>
                        <a
                          href="/"
                          className="text-[#999] transition-colors duration-300 hover:text-deep-purple-accent-400 hover:underline "
                        >
                          Facebook
                        </a>
                      </li>
                      <li>
                        <a
                          href="/"
                          className="text-[#999] transition-colors duration-300 hover:text-deep-purple-accent-400 hover:underline"
                        >
                          Twitter
                        </a>
                      </li>
                      <li>
                        <a
                          href="/"
                          className="text-[#999] transition-colors duration-300 hover:text-deep-purple-accent-400 hover:underline"
                        >
                          Instagram
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="">
                    <p className="font-semibold tracking-wide text-[#DDD]">
                      Make Money
                    </p>
                    <ul className="mt-2 space-y-1 leading-4 text-[14px]">
                      <li>
                        <a
                          href="/"
                          className="text-[#999] transition-colors duration-300 hover:text-deep-purple-accent-400 hover:underline "
                        >
                          Facebook
                        </a>
                      </li>
                      <li>
                        <a
                          href="/"
                          className="text-[#999] transition-colors duration-300 hover:text-deep-purple-accent-400 hover:underline"
                        >
                          Twitter
                        </a>
                      </li>
                      <li>
                        <a
                          href="/"
                          className="text-[#999] transition-colors duration-300 hover:text-deep-purple-accent-400 hover:underline"
                        >
                          Instagram
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="">
                    <p className="font-semibold tracking-wide text-[#DDD]">
                      Let Us Help You
                    </p>
                    <ul className="mt-2 space-y-1 leading-4 text-[14px]">
                      <li>
                        <a
                          href="/"
                          className="text-[#999] transition-colors duration-300 hover:text-deep-purple-accent-400 hover:underline "
                        >
                          Facebook
                        </a>
                      </li>
                      <li>
                        <a
                          href="/"
                          className="text-[#999] transition-colors duration-300 hover:text-deep-purple-accent-400 hover:underline"
                        >
                          Twitter
                        </a>
                      </li>
                      <li>
                        <a
                          href="/"
                          className="text-[#999] transition-colors duration-300 hover:text-deep-purple-accent-400 hover:underline"
                        >
                          Instagram
                        </a>
                      </li>
                      <li>
                        <a
                          href="/"
                          className="text-[#999] transition-colors duration-300 hover:text-deep-purple-accent-400 hover:underline"
                        >
                          Instagram
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
