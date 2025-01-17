import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ImageCarousel from "@/components/ui/ImageCarousel";
import { Event } from "@myrepo/types";
import { motion } from "framer-motion";
import {
  Calendar,
  ChevronDown,
  Clock,
  DollarSign,
  Globe,
  Heart,
  MapPin,
  User,
  Users,
} from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";
const LeafletMapRoom = dynamic(() => import("@/components/map/LefletMapRoom"));

interface EventProps {
  event: Event;
}

function EventDetail({ event }: EventProps) {
  return (
    <div className="">
      <div className="flex flex-col lg:flex-row mx-auto gap-4 lg:gap-7">
        <div className="w-full lg:w-2/3">
          <div className="flex border rounded-xl mt-0 ">
            <ImageCarousel images={event?.images || []} />
          </div>
          <div className="space-y-5 mt-4">
            <div className="bg-white">
              {/* Event Details */}
              <main className="container mx-auto">
                <div className="">
                  <div className="">
                    <h1 className="lg:text-3xl text-2xl font-bold text-gray-900">
                      Celebrating 10 Years: UO Sports Product Management Holiday
                      Party
                    </h1>
                  </div>
                </div>
              </main>
            </div>
            <div className="">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Event Type Card */}
                <div className="">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                      <Users className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h2 className="text-sm text-gray-500 font-medium">
                        Event Type
                      </h2>
                      <p className="text-lg font-semibold text-gray-900">
                        In Person
                      </p>
                    </div>
                  </div>
                </div>

                {/* Entry Fee Card */}
                <div className="">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h2 className="text-sm text-gray-500 font-medium">
                        Entry Fee
                      </h2>
                      <p className="text-lg font-semibold text-gray-900">
                        Free Entry
                      </p>
                    </div>
                  </div>
                </div>

                {/* Date and Time Card */}
                <div className="">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-sm text-gray-500 font-medium">
                        Date and Time
                      </h2>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-lg font-semibold text-gray-900">
                          Wednesday, January 15
                        </p>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Clock className="h-4 w-4" />
                          <span>6-9pm PST</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location Card */}
                <div className="">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-sm text-gray-500 font-medium">
                        Location
                      </h2>
                      <p className="text-lg font-semibold text-gray-900">
                        White Owl Social Club
                      </p>
                      <p className="text-gray-500">
                        1305 Southeast 8th Avenue Portland, OR 97214 United
                        States
                      </p>
                      <Button
                        variant="link"
                        className="text-blue-600 hover:text-blue-700 p-0 h-auto mt-1"
                      >
                        Show map
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Artist Card */}
                <div className="">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                      <User className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h2 className="text-sm text-gray-500 font-medium">
                        Artist
                      </h2>
                      <p className="text-lg font-semibold text-gray-900">
                        Artist Name
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
              </motion.div>
            </div>
            <section>
              <h2 className="text-xl font-semibold my-2">
                Is it in person or virtual?
              </h2>
              <div className="flex items-start gap-2">
                <Calendar className="h-5 w-5 mt-0.5 text-blue-600" />
                <div>
                  <p className="text-black">In Person</p>
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-xl font-semibold my-2">Event Entry </h2>
              <div className="flex items-start gap-2">
                <DollarSign className="h-5 w-5 mt-0.5 text-blue-600" />
                <div>
                  <p className="text-black">Free entry</p>
                </div>
              </div>
            </section>
            {/* Date and Time */}
            <section>
              <h2 className="text-xl font-semibold my-2">Date and time</h2>
              <div className="flex items-start gap-2">
                <Clock className="h-5 w-5 mt-0.5 text-blue-600" />
                <div>
                  <p className="text-black">
                    Wednesday, January 15 · 6-9pm PST
                  </p>
                </div>
              </div>
            </section>

            {/* Location */}
            <section>
              <h2 className="text-xl font-semibold mb-2">Location</h2>
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 mt-0.5 text-blue-600" />
                <div>
                  <p className="font-medium">White Owl Social Club</p>
                  <p className="text-muted-foreground">
                    1305 Southeast 8th Avenue Portland, OR 97214 United States
                  </p>
                  <Button variant="link" className="h-auto p-0 text-blue-600">
                    Show map
                  </Button>
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-xl font-semibold my-2">Artist</h2>
              <div className="flex items-start gap-2">
                <User className="h-5 w-5 mt-0.5 text-blue-600" />
                <div>
                  <p className="text-black">Artist Name</p>
                </div>
              </div>
            </section>
            {/* About */}
            <section>
              <h2 className="text-xl font-semibold mb-2">About this event</h2>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-blue-600" />
                <span className="text-sm">Event lasts 2 hours</span>
              </div>
              <div className="space-y-4 text-muted-foreground text-black">
                <p className="text-black">
                  Looking to meet new friends? Searching for new opportunities?
                  Or simply looking to celebrate Pride Month in a queer space
                  with other queer humans?
                </p>
                <p className="text-black">
                  Come join Out in Tech PDX at White Owl on Wednesday, January
                  15th from 6pm to 9pm.
                </p>
                <p className="text-black">
                  Whether you&apos;re interested in tech, working in tech, or
                  you&apos;re tech-adjacent (hint: that&apos;s everyone), come
                  mingle with us, have a beverage of choice, and meet the
                  fabulous members of your PDX Out in Tech community.
                </p>
                <p className="text-black">
                  We are looking forward to seeing everyone there!
                </p>
              </div>
            </section>
            {/* Tags */}
            <section>
              <h2 className="text-xl font-semibold mb-3">Languages</h2>
              <div className="flex flex-wrap gap-2 text-xl">
                <Badge className="text-[16px]" variant="secondary">
                  Hindi
                </Badge>
                <Badge className="text-[16px]" variant="secondary">
                  English
                </Badge>
                <Badge className="text-[16px]" variant="secondary">
                  Punjabi
                </Badge>
                <Badge className="text-[16px]" variant="secondary">
                  Tamil
                </Badge>
                <Badge className="text-[16px]" variant="secondary">
                  Hindi
                </Badge>
              </div>
            </section>
          </div>

          <div className="mt-[1rem] flex gap-3 flex-col">
            <p>No one has commented on this event yet.</p>
            <div className="bg-yellow-100 text-black p-3 rounded-md">
              <p className="flex gap-1">
                To use talk boards you must first confirm your email address.
                Click the link in email wee sent. If you would like us to resend
                confirmation email, go{" "}
                <p className="text-[#0073bb] cursor-pointer">here.</p>
              </p>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/3">
          <Card className="">
            <CardHeader className="p-0"></CardHeader>
            <CardContent className="p-2">
              <div className="p-0">
                {/* {locationsndString && (
                  <LeafletMapRoom
                    onLocationReceived={locationsndString}
                    markerstyle="marker"
                  />
                )} */}
              </div>
            </CardContent>
          </Card>
          <Card className="w-full mt-4 rounded-none">
            <CardContent className="space-y-4 mt-5">
              <section>
                <h2 className="text-xl font-semibold mb-4">Organized by</h2>
                <div className="bg-slate-50 rounded-lg">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 relative">
                        <img
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-F3X1HyiwCFJhKwp7SwTXwYZinO3qnI.png"
                          alt="Out in Tech logo"
                          width={48}
                          height={48}
                          className="rounded"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold">Out in Tech</h3>
                        <p className="text-sm text-muted-foreground">
                          11.1k followers
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Lots of repeat customers
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        className="text-green-800 hover:bg-green-700 hover:text-white"
                        variant="outline"
                      >
                        Contact
                      </Button>
                      <Button className="bg-green-800 hover:bg-green-700 text-white">
                        Follow
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Out in Tech unites the LGBTQ+ tech community. We do this by
                    creating opportunities for our 50,000 members to advance
                    their careers, grow their networks, and leverage tech for
                    social change.
                  </p>
                  <div className="flex gap-4">
                    <Link
                      href="#"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Globe className="h-5 w-5" />
                    </Link>
                    <Link
                      href="#"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </Link>
                    <Link
                      href="#"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default EventDetail;
