"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { Heart } from "lucide-react";
import Link from "next/link";
import { HomeLayout } from "@/components/layout/Home";
import { motion } from "framer-motion";
import { Building2, Theater, Waves, MapPin, Building } from "lucide-react";

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
const stats = [
  {
    icon: Building2,
    number: "3rd",
    label: "Largest City in the U.S.",
    delay: 0,
  },
  {
    icon: Theater,
    number: "190+",
    label: "Live Performance Theaters",
    delay: 0.1,
  },
  {
    icon: Waves,
    number: "26",
    label: "Miles of Lakefront",
    delay: 0.2,
  },
  {
    icon: Waves,
    number: "50",
    label: "Museums",
    delay: 0.3,
  },
  {
    icon: Waves,
    number: "7",
    label: "Professional Sports Teams",
    delay: 0.4,
  },
  {
    icon: MapPin,
    number: "25+",
    label: "Neighborhoods",
    delay: 0.5,
  },
  {
    icon: Building,
    number: "30+",
    label: "Fortune 500 Companies",
    delay: 0.6,
  },
];
export default function PortlandOregonPage() {
  return (
    <HomeLayout>
      <div className="container mx-auto py-12 space-y-12 mt-[7rem]">
        <div className="min-h-screen bg-white">
          {/* Hero Section */}
          <section className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-blue-500/0 pointer-events-none" />
            <div className="container px-4 py-16 md:py-24">
              <div className="text-center space-y-4 mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-blue-600">
                  CHICAGO
                </h1>
                <p className="text-xl text-gray-600">
                  Find just about anything around the corner.
                </p>
              </div>
              <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden">
                <Image
                  src="/placeholder.svg?height=500&width=1200"
                  alt="Chicago riverfront with skyscrapers and bridge"
                  className="object-cover"
                  fill
                  priority
                />
              </div>
              <div className="max-w-3xl mx-auto mt-8 text-gray-600 text-center">
                <p>
                  Spend hours studying at your favorite coffee shop ... Discover
                  where some of the country's best improv comedians, and jazz
                  and blues musicians hang out ... Nom on some famous food from
                  Chicago dogs to Morton's hot chocolate cake ... or learn from
                  the city's best and brightest at a tech startup.
                </p>
              </div>
            </div>
          </section>

          {/* Stats Grid */}
          <section className="py-16 bg-gray-50">
            <div className="container px-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: stat.delay, duration: 0.5 }}
                  >
                    <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center space-y-4">
                          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                            <stat.icon className="w-8 h-8 text-blue-600" />
                          </div>
                          <div className="space-y-2">
                            <div className="text-3xl font-bold text-blue-600">
                              {stat.number}
                            </div>
                            <div className="text-sm text-gray-600 leading-tight">
                              {stat.label}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Additional Content Section */}
          <section className="py-16">
            <div className="container px-4">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative h-[300px] rounded-xl overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=300&width=600"
                    alt="Chicago cityscape"
                    className="object-cover"
                    fill
                  />
                </div>
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-gray-900">
                    Discover Chicago
                  </h2>
                  <p className="text-gray-600">
                    Experience the vibrant culture, world-class attractions, and
                    diverse neighborhoods that make Chicago one of America's
                    greatest cities. From the shores of Lake Michigan to the
                    heart of downtown, adventure awaits around every corner.
                  </p>
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Explore More
                  </button>
                </div>
              </div>
            </div>
          </section>
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
