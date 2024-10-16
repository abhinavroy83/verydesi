"use client";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";

export default function Footer() {
  return (
    <div>
      <div className="lg:mt-9 mt-6 w-full">
        <div
          onClick={() => {
            window.open("https://redletterweb.com/", "_blank");
          }}
          className="flex flex-col justify-center items-center mb-2 font-['udemy-regular']"
        >
          <div className="lg:w-[728px] w-[350px] lg:h-[90px] h-[250px] bg-gradient-to-r from-red-600 to-red-700 flex items-center justify-between overflow-hidden">
            <div className="flex flex-col justify-center h-full pl-6 space-y-1">
              <h1 className="text-white text-2xl font-bold">RED LETTER WEB </h1>
              <p className="text-white text-lg font-semibold">
                Get Your Business Online
              </p>
              <p className="text-yellow-200 text-sm">
                Elevate Your Online Presence
              </p>
            </div>
            <div className="flex items-center justify-end h-full pr-6">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-red-700 font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
                Start Now
              </button>
            </div>
            <img
              className="w-[10rem] h-[7.5rem]"
              src="https://www.pngmart.com/files/3/Business-People-PNG-Pic.png"
            />
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
            <div className="max-w-[1370px] lg:max-w-[1600px] mx-auto bg-[#131A22] font-['udemy-regular']">
              <div className="max-w-[1600px] w-full m-auto flex flex-col items-center pb-3 lg:flex-row py-2 justify-center">
                <div className=""></div>
              </div>
              <div className="lg:flex justify-center gap-10">
                <div className="flex text-white items-center gap-5 px-3 lg:px-0">
                  <Link href={"/"} className="bg-cover bg-center flex">
                    <img
                      // height={300}
                      width={300}
                      className="w-[170px] lg:w-[140px]"
                      src={
                        "https://res.cloudinary.com/druohnmyv/image/upload/v1723819327/assests/x31ydsmb8hkg05fqbkjf.png"
                      }
                      alt=""
                    />
                  </Link>
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

      {/* <div className="bg-[#232f3e] flex text-[#232f3e] justify-center items-center gap-10 ">
        <p>hi</p>
      </div>
      <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300 py-12 ">
        <div className="max-w-[1370px] lg:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 mb-8">
            <div className="flex flex-col items-start">
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
              <div className="group cursor-pointer mt-4">
                <div className="flex items-center border border-gray-700 rounded-md px-3 py-2 transition-colors duration-200 ease-in-out group-hover:border-gray-500">
                  <span className="mr-2">Portland</span>
                  <ChevronDown
                    size={16}
                    className="group-hover:text-gray-400"
                  />
                </div>
              </div>
            </div>

            {[
              {
                title: "Make Money",
                links: ["Facebook", "Twitter", "Instagram"],
              },
              {
                title: "Make Money",
                links: ["Facebook", "Twitter", "Instagram"],
              },
              {
                title: "Let Us Help You",
                links: ["Facebook", "Twitter", "Instagram", "Instagram"],
              },
            ].map((column, index) => (
              <div key={index}>
                <h3 className="font-bold text-white mb-4">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href="#"
                        className="hover:text-white transition-colors duration-200 ease-in-out"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-700 pt-8 text-sm">
            <ul className="flex flex-wrap justify-center space-x-9 mb-4">
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors duration-200 ease-in-out"
                >
                  About VeryDesi.com
                </Link>
              </li>
              <li>
                <Link
                  href="/copyright"
                  className="hover:text-white transition-colors duration-200 ease-in-out"
                >
                  Copyright Policy{" "}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-white transition-colors duration-200 ease-in-out"
                >
                  Terms of Use{" "}
                </Link>
              </li>
              <li>
                <Link
                  href="/policy"
                  className="hover:text-white transition-colors duration-200 ease-in-out"
                >
                  Privacy Policy{" "}
                </Link>
              </li>
            </ul>
            <p className="text-center text-gray-500">
              © 2024, VeryDesi.com, Inc.
            </p>
          </div>
        </div>
      </footer> */}
    </div>
  );
}
