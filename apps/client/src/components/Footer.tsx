import { ChevronDown } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300 py-12">
      <div className="container mx-auto px-4 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="flex flex-col items-start">
            <div className="flex items-center mb-4">
              <svg
                className="w-8 h-8 text-red-500 mr-2"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M16.5 3C19.5 3 22 5.5 22 8.5C22 11.5 19.5 14 16.5 14C13.5 14 11 11.5 11 8.5C11 5.5 13.5 3 16.5 3ZM12.5 21.5C11.5 22.5 9.5 22.5 8.5 21.5C7.5 20.5 7.5 18.5 8.5 17.5C9.5 16.5 11.5 16.5 12.5 17.5C13.5 18.5 13.5 20.5 12.5 21.5ZM3.5 13.5C2.5 12.5 2.5 10.5 3.5 9.5C4.5 8.5 6.5 8.5 7.5 9.5C8.5 10.5 8.5 12.5 7.5 13.5C6.5 14.5 4.5 14.5 3.5 13.5Z" />
              </svg>
              <span className="text-2xl font-script text-white">Very Desi</span>
            </div>
            <div className="group cursor-pointer">
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
          <ul className="flex flex-wrap justify-center space-x-6 mb-4">
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
                href="/privacy"
                className="hover:text-white transition-colors duration-200 ease-in-out"
              >
                Privacy Notice
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-white transition-colors duration-200 ease-in-out"
              >
                Consumer Health Data Privacy
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-white transition-colors duration-200 ease-in-out"
              >
                Your Ads{" "}
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
