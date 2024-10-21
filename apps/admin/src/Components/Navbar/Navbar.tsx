"use client";
import Link from "next/dist/client/link";
import React from "react";
import { IoHome } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
function Navbar() {
  return (
    <div>
      <div className="mx-auto w-full bg-[#232f3e] shadow-2xl fixed">
        <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <button className="mr-4 text-gray-500 hover:text-gray-600 focus:outline-none focus:ring md:hidden">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <Link href="/" className="flex items-center space-x-2">
                <img
                  height={100}
                  width={150}
                  className="w-50 h-50"
                  src={
                    "https://res.cloudinary.com/druohnmyv/image/upload/v1723819327/assests/x31ydsmb8hkg05fqbkjf.png"
                  }
                  alt=""
                />
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-600 focus:outline-none focus:ring">
                  <span className="hidden md:inline-block px-4 py-2 rounded-lg text-white hover:bg-red-700 hover:text-white">
                    Logout
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
