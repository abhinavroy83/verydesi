"use client";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import dynamic from "next/dynamic";
import useAuthStore from "@/store/useAuthStore";
import { Event, Location } from "@myrepo/types";
import EventHeader from "@/components/Events/EventDetails/EventHeader";
import EventDetail from "@/components/Events/EventDetails/EventDetail";
import Similareventcard from "@/components/Events/Similareventcard";
import useApiFetch from "@/hooks/useApiFetch";

const LeafletMapRoom = dynamic(() => import("@/components/map/LefletMapRoom"));

function EventPage() {
  const { id } = useParams();
  const router = useRouter();
  const { currentCity } = useAuthStore();

  const {
    data: event,
    loading: eventLoading,
    error: eventError,
  } = useApiFetch<Event>(
    `https://apiv2.verydesi.com/event/find_event_by_id/${id}`
  );

  const {
    data: allEvents,
    loading: eventsLoading,
    error: eventsError,
  } = useApiFetch<Event[]>(
    `https://apiv2.verydesi.com/event/getEventByArea/${currentCity || "Portland"}`
  );

  const currentIndex = allEvents
    ? allEvents.findIndex((e: any) => e._id === id)
    : -1;

  const navigateEvent = (direction: "prev" | "next") => {
    if (!allEvents) return;

    const newIndex = direction === "prev" ? currentIndex - 1 : currentIndex + 1;
    if (newIndex >= 0 && newIndex < allEvents.length) {
      const newEventId = allEvents[newIndex]._id;
      router.push(`/event/${newEventId}`);
    }
  };

  const locationString: Location | null = event
    ? {
        lat: event.location.coordinates[1],
        lng: event.location.coordinates[0],
      }
    : null;

  if (eventLoading || eventsLoading) {
    return <div>Loading...</div>;
  }

  if (eventError || eventsError) {
    return <div>Error loading event</div>;
  }

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="w-full max-w-[1370px] lg:max-w-[1600px] px-4 sm:px-6 lg:px-8 mx-auto py-4 sm:py-8 mt-16 sm:mt-[6.1rem] font-sans">
      <EventHeader
        id={id as string}
        onNavigate={navigateEvent}
        isFirstEvent={currentIndex === 0}
        isLastEvent={currentIndex === (allEvents?.length ?? 0) - 1}
        event={event}
      />

      <EventDetail event={event} />

      <section className="">
        <h2 className="text-2xl font-bold my-4">Similar Rooms</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {allEvents
            ?.slice(0, 3)
            .map((item, index) => (
              <Similareventcard key={item?._id} event={item} />
            ))}
        </div>
      </section>
    </div>
  );
}

export default EventPage;
