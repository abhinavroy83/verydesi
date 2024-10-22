"use client";

import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-gray-700 shadow-md z-10">
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <img
              height={50}
              width={75}
              className="w-auto h-10"
              src="https://res.cloudinary.com/druohnmyv/image/upload/v1723819327/assests/x31ydsmb8hkg05fqbkjf.png"
              alt="Logo"
            />
          </Link>
          <div className="flex items-center">
            <button className="px-4 py-2 rounded-lg text-white hover:bg-red-600 hover:text-white  duration-200">
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
