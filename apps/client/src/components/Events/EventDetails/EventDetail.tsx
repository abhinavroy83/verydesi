import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ImageCarousel from "@/components/ui/ImageCarousel";
import { formatUSDate } from "@/lib/utils";
import { Event, Location } from "@myrepo/types";
import { motion } from "framer-motion";
import {
  Calendar,
  ChevronDown,
  Clock,
  DollarSign,
  Globe,
  Heart,
  Info,
  MapPin,
  Music,
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
  const locationString: Location | null = event
    ? {
        lat: event.location.coordinates[1],
        lng: event.location.coordinates[0],
      }
    : null;
  return (
    <div className=" capitalize">
      <div className="flex flex-col lg:flex-row mx-auto gap-4 lg:gap-7">
        <div className="w-full lg:w-2/3">
          <div className="flex border rounded-xl mt-0 ">
            <ImageCarousel images={event?.images || []} />
          </div>
          <div className="space-y-5 mt-4">
            <div className="">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-start gap-4 ">
                  <MapPin className="h-8 w-8 text-red-500 flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      Location
                    </h2>
                    <p className="text-lg text-gray-800">{event?.venueName}</p>
                    <p className="text-gray-600">
                      {event?.address} ,{event?.city} , {event?.state}{" "}
                      {event?.zipCode}
                    </p>
                    <Button
                      variant="link"
                      className="text-blue-600 hover:text-blue-700 p-0 h-auto mt-2"
                    >
                      Show map
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Event Type */}
                  <div className="flex items-center gap-4">
                    <Users className="h-8 w-8 text-purple-500" />
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        Event Type
                      </h2>
                      <p className="text-gray-700">{event.eventType}</p>
                    </div>
                  </div>

                  {/* Entry Fee */}
                  <div className="flex items-center gap-4">
                    <DollarSign className="h-8 w-8 text-green-500" />
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        Entry Fee
                      </h2>
                      <p className="text-gray-700 capitalize">
                        {" "}
                        {event?.eventprice
                          ? event?.eventprice
                          : event?.entryoption}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Calendar className="h-8 w-8 text-blue-500" />
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        Date
                      </h2>
                      <p className="text-gray-700">
                        {formatUSDate(event?.startDate)}
                        {event.startDate !== event.endDate &&
                          ` - ${formatUSDate(event?.endDate)}`}
                      </p>
                    </div>
                  </div>

                  {/* Time */}
                  <div className="flex items-center gap-4">
                    <Clock className="h-8 w-8 text-orange-500" />
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        Time
                      </h2>
                      <p className="text-gray-700 flex gap-2">
                        <span>
                          {event?.startTime} - {event?.endTime}
                        </span>
                        <span>{event?.timeZone}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Music className="h-8 w-8 text-indigo-500" />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Artists
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {event.artists.map((artist, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <User className="h-6 w-6 text-indigo-400" />
                          <div>
                            <p className="font-medium text-gray-800">
                              {artist.name}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <section className="flex flex-col gap-4">
                  <div className=" flex gap-4">
                    <Info className="h-8 w-8 text-yellow-500" />
                    <h2 className="text-xl font-semibold text-gray-900">
                      About this event
                    </h2>
                  </div>
                  <div className="">
                    <p className="text-gray-700 capitalize text-justify  ">
                      {event?.description}{" "}
                    </p>
                  </div>
                </section>
              </motion.div>
            </div>
            <section>
              <h2 className="text-xl font-semibold mb-3">Languages</h2>
              <div className="flex flex-wrap gap-2 text-xl">
                {event?.languages.map((item) => (
                  <Badge className="text-[16px]" variant="secondary">
                    {item}
                  </Badge>
                ))}
              </div>
            </section>
            {locationString && (
              <>
                sds
                <LeafletMapRoom
                  onLocationReceived={locationString}
                  markerstyle="marker"
                />
              </>
            )}
          </div>
        </div>
        <div className="w-full lg:w-1/3">
          <Card className="">
            <CardHeader className="p-0"></CardHeader>
            <CardContent className="p-2">
              <div className="p-0">
                {locationString && (
                  <>
                    sds
                    <LeafletMapRoom
                      onLocationReceived={locationString}
                      markerstyle="marker"
                    />
                  </>
                )}
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
