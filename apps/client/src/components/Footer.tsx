"use client";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
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
                <ChevronDown size={16} className="group-hover:text-gray-400" />
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
    </footer>
  );
}
