// components/event/EventHeader.tsx
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ChevronRight, DollarSign, Heart, Home, MapPin } from "lucide-react";
import ShareButton from "@/components/Popups/ShareButton";
import { IoTicketOutline } from "react-icons/io5";
import { Event } from "@myrepo/types";
import { MdOutlineDateRange } from "react-icons/md";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { formatDate } from "@/lib/utils";

interface EventHeaderProps {
  id: string;
  onNavigate: (direction: "prev" | "next") => void;
  isFirstEvent: boolean;
  isLastEvent: boolean;
  event: Event;
}

const EventHeader = ({
  id,
  onNavigate,
  isFirstEvent,
  isLastEvent,
  event,
}: EventHeaderProps) => {
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-0">
        <div className="flex flex-col sm:flex-row lg:mt-0 mt-12 space-x-2 w-full justify-between">
          <div className="lg:mb-0 mb-2">
            <Breadcrumb>
              <BreadcrumbList className="space-x-[-7px]">
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/events"
                    className="flex items-center text-primary hover:text-primary-dark transition-colors"
                  >
                    <Home className="w-4 h-4 mr-2 text-[#f97316]" />
                    <span className="font-medium text-[#f97316] text-[15px] hover:underline">
                      Home
                    </span>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/events">
                    <span className="font-medium text-[#737373] text-[15px] hover:underline hover:cursor-pointer">
                      All Events
                    </span>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink>
                    <span className="font-medium text-[#737373] text-[15px] hover:underline hover:cursor-pointer">
                      Events
                    </span>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex gap-2 w-full sm:w-auto justify-between sm:justify-start items-center">
            <Heart className="h-6 w-6 fill-red-600 stroke-red-500 cursor-pointer transition-colors duration-200 ease-in-out" />
            <Button
              variant="outline"
              className="rounded-full flex items-center"
            >
              <ShareButton shareLink={`https://verydesi.com/event/${id}`} />
              <p className="text-[16px]">Share</p>
            </Button>
            <div className="flex gap-2">
              <Button
                onClick={() => onNavigate("prev")}
                disabled={isFirstEvent}
                variant="destructive"
                className="px-4 py-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 transition-colors"
              >
                PREV
              </Button>
              <Button
                onClick={() => onNavigate("next")}
                disabled={isLastEvent}
                variant="default"
                size="sm"
                className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition-colors"
              >
                NEXT
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="my-1">
        <div className="flex flex-col justify-between  sm:flex-row items-start sm:items-center sm:gap-0">
          <h1 className="lg:text-3xl text-2xl capitalize font-bold text-gray-900">
            <span className="capitalize">{event.eventTitle}</span>{" "}
            <span className=" text-2xl text-gray-600 font-semibold italic ">
              at {event.venueName}
            </span>
          </h1>
        </div>
        <div className="flex flex-col gap-2 text-[1rem] lg:mt-1">
          <div className="flex flex-col gap-1 text-xl capitalize font-normal  text-gray-500 items-center lg:flex-row">
            <MapPin size={20} />
            <div className=" flex gap-1 items-center">
              <p>{event?.address}</p>
              <p>
                {event?.city} , {event?.state} {event?.zipCode}
              </p>
              <span className=" text-black font-semibold">|</span>
              <DollarSign size={20} />
              <p className=" ">
                {event?.eventprice ? event?.eventprice : event?.entryoption}
              </p>
            </div>
          </div>
          {/* <div className="flex gap-2 text-gray-600">
            <div>
              <p>
                <MdOutlineDateRange size={25} color="" />
              </p>
            </div>
            <div className="flex gap-2 mb-1 text-xl font-bold text-gray-600 items-center">
              <p className="flex gap-2 text-gray-600 text-xl font-bold">
                {formatDate(event?.startDate)}
                {formatDate(event?.endDate)}
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default EventHeader;
