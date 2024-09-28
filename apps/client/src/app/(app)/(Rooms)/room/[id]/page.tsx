"use client";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  const { id } = useParams();
  return (
    <div className="mt-[9rem]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold leading-tight text-gray-900">
          Rooms
        </h1>
      </div>
      <main>
        <div className="container mx-auto sm:px-6 lg:px-8">
          <div className="px-4 py-4 sm:px-0">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-2/3">
                <div className="bg-white overflow-hidden shadow-xl rounded-lg border">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex space-x-2">
                        <button className="bg-red-600 text-white px-4 py-2 rounded-md">
                          PREV
                        </button>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
                          NEXT
                        </button>
                      </div>
                      <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md flex items-center">
                        <svg
                          className="h-5 w-5 mr-2"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                        </svg>
                        Share
                      </button>
                    </div>
                    <img
                      className="w-full h-[25rem] object-cover rounded-lg"
                      src="https://res.cloudinary.com/druohnmyv/image/upload/v1725526210/krvwwzdxgznzxkintdm8.jpg"
                      alt="Room image"
                    />
                    <h2 className="text-2xl font-bold mt-4">
                      2BR 2Bath Apartment In Normal $700/Month
                    </h2>
                    <p className="text-gray-600">Portland, OR</p>
                    <p className="text-green-600 font-bold text-xl mt-2">
                      $ 700
                    </p>
                    <p className="text-gray-700 mt-2">By Raees Rohit Sohil</p>
                    <div className="flex items-center mt-2">
                      <svg
                        className="h-5 w-5 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <span className="ml-1 text-gray-700">
                        Single Family Home
                      </span>
                    </div>
                    <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md">
                      Get in touch
                    </button>
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold">Description</h3>
                      <p className="text-gray-700 mt-2">
                        I Have A Master Bedroom Available For Rent In Parkview
                        Apartments About 5.5 Miles From Rivian Normal Plant And
                        I Am Looking For A Roommate. Availability August 20th.
                        Rent Will Be $700 A Month (Includes Water, Trash And
                        Internet). Electricity And Gas Will Be Separate.
                        Apartment Has Inhouse Washer And Dryer Access And
                        Kitchen Includes Stainless Steel Microwave, Dishwasher
                        And Refrigerator. The Apartment Is 2 Bed 2 Bath.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-1/3">
                <div className="bg-white overflow-hidden shadow-xl rounded-lg mb-6 border">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      More Info About Room
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Property Type
                        </p>
                        <p className="mt-1 text-sm text-gray-900">
                          Single Family Home
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          City
                        </p>
                        <p className="mt-1 text-sm text-gray-900">Portland</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Availability From
                        </p>
                        <p className="mt-1 text-sm text-gray-900">08/20/2024</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Available To
                        </p>
                        <p className="mt-1 text-sm text-gray-900">Immediate</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Attached Bath
                        </p>
                        <p className="mt-1 text-sm text-gray-900">Yes</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Preferred Gender
                        </p>
                        <p className="mt-1 text-sm text-gray-900">Any</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Deposit
                        </p>
                        <p className="mt-1 text-sm text-gray-900">$ 350</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Is Room Furnished
                        </p>
                        <p className="mt-1 text-sm text-gray-900">
                          Unfurnished
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white overflow-hidden shadow-xl rounded-lg mb-6 border">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Amenities Included
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-sm text-gray-700">Car Park</span>
                      </div>
                      <div className="flex items-center">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-sm text-gray-700">
                          Visitors Parking
                        </span>
                      </div>
                      <div className="flex items-center">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-sm text-gray-700">
                          Private Lawn
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white overflow-hidden shadow-xl rounded-lg border">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Additional Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Dietary Preference
                        </p>
                        <p className="mt-1 text-sm text-gray-900">Both</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Smoking Policy
                        </p>
                        <p className="mt-1 text-sm text-gray-900">No Smoking</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Pet Friendly
                        </p>
                        <p className="mt-1 text-sm text-gray-900">No Pets</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;
