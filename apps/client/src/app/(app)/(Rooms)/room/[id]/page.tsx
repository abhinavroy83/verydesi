"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/Room/Icons";
import ShareButton from "@/components/Popups/ShareButton";
import { RoomInterface } from "@myrepo/types";
import axios from "axios";
import {
  AmenityIcon,
  AmenityType,
  utilityIcons,
  UtilityType,
} from "@/constants";
import { FaRegBuilding } from "react-icons/fa";
import { LucideMapPin } from "lucide-react";

const roomDatas = {
  id: "1",
  title: "2BR 2Bath Apartment In Normal",
  description:
    "I Have A Master Bedroom Available For Rent In Parkview Apartments About 5.5 Miles From Rivian Normal Plant And I Am Looking For A Roommate. Availability August 20th. Rent Will Be $700 A Month (Includes Water, Trash And Internet). Electricity And Gas Will Be Separate. Apartment Has Inhouse Washer And Dryer Access And Kitchen Includes Stainless Steel Microwave, Dishwasher And Refrigerator. The Apartment Is 2 Bed 2 Bath.",
  price: 700,
  location: "Portland, OR",
  owner: "Raees Rohit Sohil",
  images: [
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
  ],
  amenities: [
    { name: "Car Park", icon: "Car" },
    { name: "Visitors Parking", icon: "Users" },
    { name: "Private Lawn", icon: "Tree" },
    { name: "High-Speed Internet", icon: "Wifi" },
    { name: "Laundry Facilities", icon: "Shirt" },
    { name: "Air Conditioning", icon: "Wind" },
  ],
  utilities: [
    { name: "Internet", icon: "Wifi" },
    { name: "Electricity", icon: "Zap" },
    { name: "Water", icon: "Droplet" },
  ],
  details: {
    "Property Type": "Single Family Home",
    City: "Portland",
    "Availability From": "08/20/2024",
    "Available To": "Immediate",
    "Attached Bath": "Yes",
    "Preferred Gender": "Any",
    Deposit: "$ 350",
    "Is Room Furnished": "Unfurnished",
  },
  additionalInfo: {
    "Dietary Preference": "Both",
    "Smoking Policy": "No Smoking",
    "Pet Friendly": "No Pets",
  },
};

const isValidAmenityIcon = (iconName: string): iconName is AmenityType => {
  return iconName in AmenityIcon;
};
const isValidIcon = (iconName: string): iconName is UtilityType => {
  return iconName in utilityIcons;
};

export default function RoomDetails() {
  const [amenityFilter, setAmenityFilter] = useState("");
  const [roomData, setroomData] = useState<RoomInterface | null>(null);

  const fetchRoom = async () => {
    try {
      const res = await axios.get(
        `https://api.verydesi.com/api/getspecificroom/66efe1d47c15710096f8c5d9`
      );
      console.log(res.data.rooms);
      if (res) {
        setroomData(res.data.rooms);
      }
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  };
  useEffect(() => {
    fetchRoom();
  }, []);

  // const filteredAmenities = roomData?.Amenities_include.filter((amenity) =>
  //   amenitytoLowerCase().includes(amenityFilter.toLowerCase())
  // );
  const filteredAmenities = roomDatas.amenities.filter((amenity) =>
    amenity.name.toLowerCase().includes(amenityFilter.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 mt-32">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {roomData?.Title}
              </h1>
              <p className="text-gray-600">{roomData?.postingincity}</p>
            </div>
            <ShareButton />
          </div>
          <Card>
            <CardContent className="p-0">
              <Carousel className="w-full">
                <CarouselContent>
                  {roomData?.Imgurl?.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="relative aspect-video">
                        <Image
                          src={image}
                          alt={`Room image ${index + 1}`}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-2xl font-bold text-green-600">
                  ${roomData?.Expected_Rooms}/month
                </p>
                <p className="text-gray-700">By {roomData?.user_name}</p>
              </div>
              <p className="text-gray-700 mb-6">{roomData?.Description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>More Info About Room</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <FaRegBuilding className="h-6 w-6 text-green-500 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-gray-500 flex gap-2">
                      Property Type
                    </p>
                    <p className="mt-1 text-sm text-gray-900">
                      {roomData?.Propertytype}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <LucideMapPin className="h-6 w-6 text-green-500 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">City</p>
                    <p className="mt-1 text-sm text-gray-900">
                      {roomData?.city}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Available From
                  </p>
                  <p className="mt-1 text-sm text-gray-900">
                    {roomData?.Avaliblity_from}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Available To
                  </p>
                  <p className="mt-1 text-sm text-gray-900">
                    {roomData?.Available_to}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Attached Bath
                  </p>
                  <p className="mt-1 text-sm text-gray-900">
                    {roomData?.Attchd_Bath}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Preferred Gender
                  </p>
                  <p className="mt-1 text-sm text-gray-900">
                    {roomData?.Preferred_gender}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Deposit</p>
                  <p className="mt-1 text-sm text-gray-900">
                    {roomData?.Desposite}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Is Room Furnished
                  </p>
                  <p className="mt-1 text-sm text-gray-900">
                    {roomData?.is_room_furnished}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  // src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(roomData?.location)}`}
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Amenities Included</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {roomData?.Amenities_include?.map((amenity) => {
                  if (isValidAmenityIcon(amenity)) {
                    const IconComponent = AmenityIcon[amenity];
                    return (
                      <div key={amenity} className="flex items-center">
                        {IconComponent && (
                          <IconComponent className="h-5 w-5 text-green-500 mr-2" />
                        )}
                        <span className="text-sm text-gray-700">{amenity}</span>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Utilities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {roomData?.Utility_include?.map((utility) => {
                  if (isValidIcon(utility)) {
                    const IconComponent = utilityIcons[utility];
                    return (
                      <div key={utility} className="flex  items-center">
                        {IconComponent && (
                          <IconComponent className="h-5 w-5 text-green-500 mr-2" />
                        )}
                        <span className="text-sm text-gray-700">{utility}</span>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(roomDatas.additionalInfo).map(
                  ([key, value]) => (
                    <div key={key} className="flex items-center">
                      <span className="text-sm font-medium text-gray-500 mr-2">
                        {key}:
                      </span>
                      <span className="text-sm text-gray-700">{value}</span>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Contact Host</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Your email" />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    id="message"
                    placeholder="Your message"
                    className="w-full min-h-[100px] px-3 py-2 text-sm rounded-md border border-input bg-background"
                  />
                </div>
                <Button className="w-full">Send Message</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
