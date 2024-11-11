"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heart } from "lucide-react";
import Link from "next/link";
import { HomeLayout } from "@/components/layout/Home";
import { motion } from "framer-motion";
import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Building2,
  Theater,
  Crown,
  Waves,
  Building,
  Mic2,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const neighborhoods = [
  {
    name: "Beaverton",
    overview:
      "Major hub for Indian families, close to tech companies and excellent schools.",
    communityLife:
      "Indian grocery stores, restaurants, community centers, and cultural events.",
  },
  {
    name: "Hillsboro",
    overview:
      "High concentration of tech companies in 'Silicon Forest', popular with Indian professionals.",
    communityLife:
      "Indian groceries, restaurants, Swagat Indian Cuisine chain, and Hindu Temple of Oregon nearby.",
  },
  {
    name: "Bethany",
    overview:
      "Newer, family-friendly suburb with top-rated schools and strong Indian community.",
    communityLife:
      "Easy access to community events and Indian shopping in nearby Beaverton.",
  },
  {
    name: "Tigard and Tualatin",
    overview: "Growing suburbs with mix of Indian professionals and families.",
    communityLife: "Indian restaurants, grocery options, and good schools.",
  },
  {
    name: "Camas, Vancouver & Washougal",
    overview:
      "Growing suburbs in Washington State with Indian professionals and families.",
    communityLife:
      "Best schools, safer neighborhoods, and cleaner areas, but fewer Indian-specific amenities.",
  },
  {
    name: "Northeast and Southeast Portland",
    overview:
      "Some Indian communities with access to public transit and urban amenities.",
    communityLife:
      "Attracts younger professionals, diverse cultural events and restaurants.",
  },
];

const movingToPortlandInfo = [
  "History & Government of Portland, Oregon",
  "Indian / Desi Businesses & Services in and around Portland, Oregon",
  "Indian / Desi Events in and around Portland, Oregon",
  "Indian / Desi Rooms & Roommates in and around Portland, Oregon",
  "Indian / Desi Temples, Churches, Mosques and other religious places in and around Portland, Oregon",
  "Indian / Desi Groceries & Shopping in and around Portland, Oregon",
  "Indian / Desi organization in and around Portland, Oregon",
  "Indian Embassy access for Portland, Oregon is in Seattle, Washington - www.indiainseattle.gov.in",
  "Things to do in and around Portland, Oregon",
  "The Benefits and Challenges of Living in Portland, Oregon",
];
const attractions = [
  {
    title: "Moynihan Train Hall",
    image: "/placeholder.svg?height=400&width=600",
    description: "History & Government of Portland, Oregon",
    link: "#",
  },
  {
    title: "NYC Food & Drink",
    image: "/placeholder.svg?height=400&width=600",
    description: "Indian / Desi Events in and around Portland, Oregon",
    link: "#",
  },
  {
    title: "NYC Attractions",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Indian / Desi Temples, Churches, Mosques and other religious places in and around Portland, Oregon",
    link: "#",
  },
  {
    title: "Weekend in the Bronx",
    image: "/placeholder.svg?height=400&width=600",
    description: "Indian / Desi organization in and around Portland, Oregon",
    link: "#",
  },
  {
    title: "Weekend in the Bronx",
    image: "/placeholder.svg?height=400&width=600",
    description: "Things to do in and around Portland, Oregon",
    link: "#",
  },
  {
    title: "Weekend in the Bronx",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Indian / Desi Businesses & Services in and around Portland, Oregon",
    link: "#",
  },
  {
    title: "Weekend in the Bronx",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Indian / Desi Rooms & Roommates in and around Portland, Oregon",
    link: "#",
  },
  {
    title: "Weekend in the Bronx",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Indian / Desi Groceries & Shopping in and around Portland, Oregon",
    link: "#",
  },
  {
    title: "Weekend in the Bronx",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Indian Embassy access for Portland, Oregon is in Seattle, Washington - www.indiainseattle.gov.in",
    link: "#",
  },
  {
    title: "Weekend in the Bronx",
    image: "/placeholder.svg?height=400&width=600",
    description: "The Benefits and Challenges of Living in Portland, Oregon",
    link: "#",
  },
];
const images = [
  "/https://wallpapercave.com/wp/wp2826340.jpg",
  "/placeholder.svg?height=600&width=1200",
  "/placeholder.svg?height=600&width=1200",
];

const stats = [
  {
    icon: Building2,
    number: "3rd",
    label: "Largest City in the U.S.",
    sublabel: null,
  },
  {
    icon: Theater,
    number: "190+",
    label: "Live Performance",
    sublabel: "Theatres",
  },
  {
    icon: Crown,
    number: "1st",
    label: "Home to the",
    sublabel: "Improv Troupe",
  },
  {
    icon: Waves,
    number: "26",
    label: "Miles",
    sublabel: "of Lakefront",
  },
  {
    icon: Building,
    number: "50",
    label: "Museums",
    sublabel: null,
  },
  {
    icon: Building,
    number: "7",
    label: "Professional",
    sublabel: "Sports Teams",
  },
  {
    icon: Mic2,
    number: "25+",
    label: "Music Festivals",
    sublabel: null,
  },
  {
    icon: Users,
    number: "30+",
    label: "Fortune 500 Companies",
    sublabel: null,
  },
];
const sections = [
  {
    title: "Get around Chicago",
    description:
      "Learn about city transportation and how to get where you need to.",
    buttonText: "Learn to navigate the city",
    buttonHref: "#",
    imageSrc: "/placeholder.svg?height=400&width=600",
    imageAlt: "Chicago train station",
    imagePosition: "left",
  },
  {
    title: "Campuses",
    description: "We have more than one campus.",
    buttonText: "Explore our campuses",
    buttonHref: "#",
    imageSrc: "/placeholder.svg?height=400&width=600",
    imageAlt: "Modern campus interior",
    imagePosition: "right",
  },
  {
    title: "Maps",
    description: "Find DePaul on the map.",
    buttonText: "View our campus maps",
    buttonHref: "#",
    imageSrc: "/placeholder.svg?height=400&width=600",
    imageAlt: "DePaul University entrance",
    imagePosition: "left",
  },
];

export default function PortlandOregonPage() {
  return (
    <HomeLayout>
      <div className="container mx-auto pb-12 space-y-12 mt-3">
        <div className="flex min-h-screen flex-col bg-white">
          {/* Header */}
          <header className="container mx-auto px-4 py-8 text-center border-t-2 border-b-2 border-blue-600">
            <h1 className="mb-4 text-4xl font-bold text-blue-600">CHICAGO</h1>
            <p className="text-xl text-gray-600">
              Find just about anything around the corner.
            </p>
          </header>

          {/* Image Slider */}
          <div className="container mx-auto px-4 mt-9">
            <Carousel className="relative w-full">
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative h-[400px] w-full overflow-hidden rounded-xl">
                      <Image
                        src={image}
                        alt={`Chicago cityscape ${index + 1}`}
                        fill
                        className="object-cover"
                        priority={index === 0}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-4 top-1/2" />
              <CarouselNext className="absolute right-4 top-1/2" />
            </Carousel>
          </div>

          {/* Description */}
          <div className="container mx-auto mt-8 px-4 text-center">
            <p className="mx-auto max-w-3xl text-gray-600">
              Spend hours studying at your favorite coffee shop ... Discover
              where some of the country's best improv comedians, and jazz and
              blues musicians hang out ... Nom on some famous food from Chicago
              dogs to Morton's hot chocolate cake ... or learn from the city's
              best and brightest at a tech startup. You can find just about
              anything around the corner in Chicago, Illinois.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="container mx-auto px-4 py-12">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="group flex items-start space-x-4 rounded-xl border border-transparent p-4 transition-colors hover:border-blue-100 hover:bg-blue-50"
                >
                  <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-blue-600">
                    <stat.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-3xl font-bold text-blue-600">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600">
                      {stat.label}
                      {stat.sublabel && (
                        <>
                          <br />
                          {stat.sublabel}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Duplicate grid with different styling */}
            <div className="mt-12 grid gap-8 rounded-xl bg-blue-50 p-8 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="group flex items-start space-x-4 rounded-xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-blue-600">
                    <stat.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-3xl font-bold text-blue-600">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600">
                      {stat.label}
                      {stat.sublabel && (
                        <>
                          <br />
                          {stat.sublabel}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Box layout version */}
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="group overflow-hidden rounded-xl border-2 border-blue-100 bg-white transition-shadow hover:shadow-lg"
                >
                  <div className="flex items-center justify-center bg-blue-50 p-6">
                    <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-blue-600">
                      <stat.icon className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>
                  <div className="p-4 text-center">
                    <div className="text-3xl font-bold text-blue-600">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600">
                      {stat.label}
                      {stat.sublabel && (
                        <>
                          <br />
                          {stat.sublabel}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full">
          {sections.map((section, index) => (
            <div key={index} className="relative">
              <div
                className={`flex min-h-[400px] flex-col ${
                  section.imagePosition === "right"
                    ? "md:flex-row-reverse"
                    : "md:flex-row"
                }`}
              >
                {/* Image Section */}
                <div className="relative flex-1 w-full h-full">
                  <img
                    src={
                      "https://farm9.staticflickr.com/8541/8670217964_8311c2dc7e_z.jpg"
                    }
                    alt={section.imageAlt}
                    className="object-cover"
                    // priority={index === 0}
                  />
                </div>

                {/* Content Section */}
                <div className="relative flex-1">
                  {/* Background with diagonal cut */}
                  <div
                    className="absolute inset-0 bg-[#EBF3FF]"
                    style={{
                      clipPath:
                        section.imagePosition === "right"
                          ? "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)"
                          : "polygon(0 0, 85% 0, 100% 100%, 0 100%)",
                    }}
                  />

                  {/* Content */}
                  <div className="relative flex h-full flex-col justify-center p-8 md:p-12">
                    <h2 className="mb-4 text-3xl font-bold text-blue-600">
                      {section.title}
                    </h2>
                    <p className="mb-6 text-lg text-gray-600">
                      {section.description}
                    </p>
                    <Button
                      variant="outline"
                      className="w-fit border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                    >
                      {section.buttonText}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <section className="text-center">
          <h1 className="text-4xl font-bold mb-4">Portland, Oregon</h1>
          <p className="text-xl max-w-3xl mx-auto">
            A city known for its beautiful landscape, sustainable planning, and
            vibrant urban culture, Portland offers a unique blend of history,
            nature, and modern living.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6">History and Geography</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Early Inhabitants and Founding
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Originally inhabited by Native American tribes, including
                    the Multnomah and Clackamas, who utilized the rivers for
                    trade.
                  </li>
                  <li>
                    Established in 1845, named after Portland, Maine following a
                    coin toss between Asa Lovejoy and Francis Pettygrove.
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Economic Growth</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Late 1800s saw boom in timber and shipping industries due to
                    its riverside location.
                  </li>
                  <li>
                    Railroads arrived in 1880s, cementing Portland's role as an
                    economic hub in the Pacific Northwest.
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  20th Century Changes
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Economy shifted with shipbuilding during WWII and later the
                    high-tech sector in the 1980s.
                  </li>
                  <li>
                    Urban renewal transformed neighborhoods like the Pearl
                    District.
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Modern Identity</h3>
                <p>
                  Portland is known for its progressive values, green
                  initiatives, and cultural character—especially in the arts,
                  food, and environmental sectors.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Location and Climate
                </h3>
                <p>
                  Situated at the confluence of the Willamette and Columbia
                  Rivers, in the shadow of Mount Hood, Portland enjoys a mild,
                  temperate climate.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Topography</h3>
                <p>
                  The city is characterized by lush, forested hills,
                  particularly in the west. East of the Willamette, the terrain
                  flattens into the fertile Willamette Valley.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Natural Boundaries
                </h3>
                <p>
                  The city has an urban growth boundary to control sprawl and
                  protect nearby farms and forests, which has helped Portland
                  stay compact and green.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6">
            Indian Diaspora in Portland
          </h2>
          <Card>
            <CardContent className="p-6">
              <p className="mb-4">
                In Portland, the Indian diaspora or the Desis are spread across
                several neighborhoods, particularly those with good schools,
                access to public transit, and proximity to tech hubs.
              </p>
              <ScrollArea className="w-full rounded-md p-2">
                {neighborhoods.map((neighborhood, index) => (
                  <Card key={index} className="mb-4">
                    <CardHeader>
                      <CardTitle>{neighborhood.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-2">
                        <strong>Overview:</strong> {neighborhood.overview}
                      </p>
                      <p>
                        <strong>Community Life:</strong>{" "}
                        {neighborhood.communityLife}
                      </p>
                    </CardContent>
                  </Card>
                ))}
                <Card className="mb-4">
                  <CardHeader>
                    <CardTitle>Cultural & Community Centers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      <strong>India Cultural Association (ICA):</strong>{" "}
                      Organizes major events, including the popular India
                      Festival at Pioneer Courthouse Square, and serves as a
                      community hub.
                    </p>
                  </CardContent>
                </Card>
              </ScrollArea>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6">Moving to Portland</h2>
          <div className="container mx-auto px-4 py-12">
            <div className="mb-12 flex items-center justify-center">
              <div className="h-px flex-1 bg-gray-200" />
              <div className="mx-4">
                <Heart className="h-8 w-8 text-red-500 fill-current" />
              </div>
              <div className="h-px flex-1 bg-gray-200" />
            </div>
            <h1 className="mb-1 text-center text-4xl font-bold text-gray-900">
              More to Love in New York City
            </h1>
            <h1 className="mb-1 text-center text-2xl text-gray-900">
              Essential Information for Newcomers
            </h1>
            <h1 className="mb-12 text-center text-xl text-gray-700">
              Moving to Portland, Oregon can be an exciting choice! Here's a
              snapshot of what to expect if you're making the move:
            </h1>
            <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-5">
              {attractions.map((attraction, index) => (
                <div
                  key={index}
                  className="group overflow-hidden border bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={"https://wallpapercave.com/wp/Nb3d7Ur.jpg"}
                      alt={attraction.title}
                      className="object-cover transition-transform duration-300 group-hover:scale-105 p-2"
                    />
                  </div>
                  <div className="px-5 py-2 text-center">
                    {/* <h2 className="mb-2 text-xl font-semibold text-gray-900">
                    {attraction.title}
                  </h2> */}
                    <p className="mb-1 text-gray-600">
                      {attraction.description}
                    </p>
                    <Link
                      href={attraction.link}
                      className="text-sm font-medium text-red-500 hover:text-red-600"
                    >
                      more
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* <Card>
          <CardHeader>
            <CardTitle>Essential Information for Newcomers</CardTitle>
            <CardDescription>
              Moving to Portland, Oregon can be an exciting choice! Here's a
              snapshot of what to expect if you're making the move:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-disc pl-6">
              {movingToPortlandInfo.map((item, index) => (
                <li key={index} className="text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card> */}
        </section>
      </div>
    </HomeLayout>
  );
}
