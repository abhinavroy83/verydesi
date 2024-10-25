"use client";
import React from "react";
import {
  ThumbsUp,
  MessageSquare,
  ChevronRight,
  X,
  Sun,
  ThumbsDown,
} from "lucide-react";
import Link from "next/link";
function News() {
  return (
    <div className="mt-[7.3rem]">
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-gray-200 shadow-md">
          <div className="container mx-auto px-4 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm flex items-center">
                <Sun className="w-4 h-4 mr-1 text-yellow-500" />
                46°F
              </span>
            </div>
            <div className="hidden md:flex space-x-4">
              {[
                "NEWS",
                "ENTERTAINMENT",
                "MONEY",
                "SPORTS",
                "GAMING",
                "LIFESTYLE",
                "SHOPPING",
                "AUTOS",
                "HEALTH",
                "FOOD",
                "TRAVEL",
                "VIDEO",
              ].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-sm hover:text-blue-600"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Breaking News Banner */}
        <div className="bg-red-600 text-white py-2 px-4 relative">
          <div className="container mx-auto">
            <p className="font-bold">
              BREAKING NEWS: Yahya Sinwar, architect of Hamas massacre in
              Israel, is killed
            </p>
          </div>
          <button className="absolute top-1 right-2 text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Main Content Area */}
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* Featured Article */}
            <div className="md:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/004/216/831/original/3d-world-news-background-loop-free-video.jpg"
                alt="AI and Economy Visualization"
                width={800}
                height={400}
                className="w-full h-64 object-cover"
              />
              <div className="absolute bottom-4 right-4 bg-gray-800 text-white p-2 rounded">
                <ChevronRight className="w-6 h-6" />
              </div>
            </div>
            {/* Smaller Articles */}
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative">
                  <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/004/216/831/original/3d-world-news-background-loop-free-video.jpg"
                    alt="Oregon Skyline"
                    width={400}
                    height={200}
                    className="w-full h-[20rem] object-cover"
                  />
                  <div className="p-4 absolute bottom-0 text-white">
                    <h3 className="text-lg font-semibold">
                      Will Oregon's likely weak La Niña winter be cold and
                      wet...
                    </h3>
                    <p className="text-sm text-gray-600">OregonLive.com</p>
                    <div className="flex items-center space-x-4 text-white">
                      <span className="flex items-center">
                        <ThumbsUp className="w-4 h-4 mr-1" />
                      </span>
                      <span className="flex items-center">
                        <ThumbsDown className="w-4 h-4 mr-1" />
                      </span>
                      <span className="flex items-center">
                        <MessageSquare className="w-4 h-4 mr-1" />
                      </span>
                    </div>
                  </div>
                </div>
                {/* <div className="p-4">
                  <h3 className="text-lg font-semibold">
                    Will Oregon's likely weak La Niña winter be cold and wet...
                  </h3>
                  <p className="text-sm text-gray-600">OregonLive.com</p>
                </div> */}
              </div>
              <div className="bg-blue-600 text-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 relative">
                  {/* <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/004/216/831/original/3d-world-news-background-loop-free-video.jpg"
                    alt="American Express"
                    width={100}
                    height={100}
                    className="absolute top-2 right-2 w-12 h-12"
                  /> */}
                  <h3 className="text-lg font-semibold mb-2">
                    RAKE IN THE REWARDS
                  </h3>
                  <p className="text-sm mb-2">
                    Earn 30k Membership Rewards® points when you open an
                    account.
                  </p>
                  <button className="bg-white text-blue-600 px-4 py-2 rounded text-sm">
                    Learn More
                  </button>
                  <p className="text-xs mt-2">
                    Terms apply. American Express National Bank, Member FDIC.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="relative">
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/004/216/831/original/3d-world-news-background-loop-free-video.jpg"
                alt="Economy Charts"
                width={800}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <h2 className="text-2xl font-bold text-white">
                  The U.S. economy under Donald Trump and Joe Biden, in 3 charts
                </h2>
                <div className="flex items-center space-x-4 text-white">
                  <span className="flex items-center">
                    <ThumbsUp className="w-4 h-4 mr-1" /> 78
                  </span>
                  <span className="flex items-center">
                    <MessageSquare className="w-4 h-4 mr-1" /> 134
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4">
                <span className="text-xs text-gray-500">Ad</span>
                <img
                  src="https://static.vecteezy.com/system/resources/thumbnails/004/216/831/original/3d-world-news-background-loop-free-video.jpg"
                  alt="Verizon Logo"
                  width={50}
                  height={50}
                  className="w-12 h-12 mb-2"
                />
                <h3 className="text-lg font-semibold">
                  myPlan for just $25/line - It's your Verizon
                </h3>
                <p className="text-sm text-gray-600">verizon.com</p>
              </div>
            </div>
            {[
              {
                title: "Harris interview with Fox News showcases a change...",
                source: "The Associated Press",
                likes: 351,
                img: "/placeholder.svg?height=100&width=100",
              },
              {
                title: "Squawk Codes In Aviation: 5 Things You Should Know",
                source: "SimpleFlying",
                likes: 21,
                img: "/placeholder.svg?height=100&width=100",
              },
              {
                title: "Kamala Harris' Fox News Interview Wins Over Swin...",
                source: "Newsweek",
                likes: 139,
                img: "/placeholder.svg?height=100&width=100",
              },
              {
                title: "The Simple Swap Joanna Gaines Makes To Give A...",
                source: "House Digest",
                likes: 15,
                img: "/placeholder.svg?height=100&width=100",
              },
              {
                title: "Biden Approves Another $4.5 Billion In Student Loa...",
                source: "Forbes",
                likes: 940,
                img: "/placeholder.svg?height=100&width=100",
              },
              {
                title: "The 30 most popular big dog breeds in the US,...",
                source: "Stacker",
                likes: 88,
                img: "/placeholder.svg?height=100&width=100",
              },
              {
                title: "Best Hearing Aid Retailers",
                source: "top10.com",
                isAd: true,
                img: "/placeholder.svg?height=100&width=100",
              },
              {
                title: "Meet the smartest dog breed in the world—and s...",
                source: "Stacker",
                likes: 756,
                img: "/placeholder.svg?height=100&width=100",
              },
              {
                title:
                  "Harrison Ford has advice for any 'silly' actor actively...",
                source: "The Independent",
                likes: 112,
                img: "/placeholder.svg?height=100&width=100",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-4 flex">
                  <div className="flex-grow">
                    {item.isAd && (
                      <span className="text-xs text-gray-500">Ad</span>
                    )}
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        {item.source}
                      </span>
                      {!item.isAd && (
                        <span className="flex items-center">
                          <ThumbsUp className="w-4 h-4 mr-1" /> {item.likes}
                        </span>
                      )}
                    </div>
                  </div>
                  <img
                    src={
                      "https://static.vecteezy.com/system/resources/thumbnails/004/216/831/original/3d-world-news-background-loop-free-video.jpg"
                    }
                    alt={item.title}
                    width={100}
                    height={100}
                    className="w-24 h-24 object-cover ml-4 rounded-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default News;
