// components/event/EventHeader.tsx
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ChevronRight, Heart, Home } from "lucide-react";
import ShareButton from "@/components/Popups/ShareButton";

interface EventHeaderProps {
  id: string;
  onNavigate: (direction: "prev" | "next") => void;
  isFirstEvent: boolean;
  isLastEvent: boolean;
}

const EventHeader = ({
  id,
  onNavigate,
  isFirstEvent,
  isLastEvent,
}: EventHeaderProps) => {
  return (
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
          <Button variant="outline" className="rounded-full flex items-center">
            <ShareButton shareLink={`https://verydesi.com/event/${id}`} />
            <p className="text-[16px]">Share</p>
          </Button>
          <div className="flex gap-2">
            <Button
              onClick={() => onNavigate("prev")}
              disabled={isFirstEvent}
              variant="destructive"
              size="sm"
            >
              PREV
            </Button>
            <Button
              onClick={() => onNavigate("next")}
              disabled={isLastEvent}
              variant="default"
              size="sm"
            >
              NEXT
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventHeader;
