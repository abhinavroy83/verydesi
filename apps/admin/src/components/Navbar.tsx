"use client";

import Link from "next/link";
import React from "react";
import { IoHome } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
export default function Navbar() {
  return (
    <nav className="bg-[#232f3e] shadow-2xl font-['udemy-regular'] z-10">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <Link href={"/"} className="inline-flex items-center space-x-2">
          <img
            height={100}
            width={150}
            className="w-50 h-50"
            src="https://res.cloudinary.com/druohnmyv/image/upload/v1723819327/assests/x31ydsmb8hkg05fqbkjf.png"
            alt=""
          />
        </Link>
        <div>
          <button
            type="button"
            className="rounded-md text-[16px] flex gap-1 px-3 py-2 text-white hover:bg-white hover:text-[#232f3e] font-medium transition duration-300 ease-in-out hover:shadow-md"
          >
            <BiLogOut size={22} /> LOGOUT
          </button>
        </div>
      </div>
    </nav>
  );
}
