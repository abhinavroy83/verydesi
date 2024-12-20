"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ChevronRight, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Dashboardlayout from "@/components/Layout/Dashboardlayout";
import { MdMeetingRoom } from "react-icons/md";
import { Event } from "@myrepo/types";
import { useRouter } from "next/navigation";

function Page() {
  const [eventdata, setEventdata] = useState<Event[]>([]);
  const [sortedData, setSortedData] = useState<Event[]>([]);
  const [filteredData, setFilteredData] = useState<Event[]>([]);
  const [uniqueCities, setUniqueCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
  const router = useRouter();
  const itemsPerPage = 10;

  const getUniqueCities = (events: Event[]): string[] => {
    const cityTracker: Record<string, boolean> = {};
    const cities: string[] = [];

    events.forEach((event) => {
      if (!cityTracker[event.eventpostingcity]) {
        cityTracker[event.eventpostingcity] = true;
        cities.push(event.eventpostingcity);
      }
    });

    return cities;
  };

  const fetchrooms = async () => {
    try {
      const res = await axios.get("https://apiv2.verydesi.com/event/find-all-event");
      const events = res.data;
      setEventdata(events);
      setSortedData(events);
      setFilteredData(events);
      setUniqueCities(getUniqueCities(events));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const sortData = (order: "asc" | "desc") => {
    const sorted = [...filteredData].sort((a, b) => {
      const fieldToSort = "eventTitle";
      if (order === "asc") {
        return a[fieldToSort].localeCompare(b[fieldToSort]);
      } else {
        return b[fieldToSort].localeCompare(a[fieldToSort]);
      }
    });
    setSortedData(sorted);
    setSortOrder(order);
  };

  const filterByCity = (city: string) => {
    if (city === "all") {
      setFilteredData(eventdata);
      setSortedData(eventdata);
      setSelectedCity(null);
    } else {
      const filtered = eventdata.filter((event) => event.eventpostingcity === city);
      setFilteredData(filtered);
      setSortedData(filtered);
      setSelectedCity(city);
    }
  };

  // Add delete functionality
  const deleteEvent = async (eventId: string | undefined) => {
    const confirmed = window.confirm("Are you sure you want to delete this event?");
    if (!confirmed) return;

    try {
      await axios.delete(`https://apiv2.verydesi.com/event/delete-event/${eventId}`);
      setFilteredData((prev) => prev.filter((event) => event._id !== eventId));
      setSortedData((prev) => prev.filter((event) => event._id !== eventId));
      setEventdata((prev) => prev.filter((event) => event._id !== eventId));
      alert("Event deleted successfully!");
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event. Please try again.");
    }
  };

  useEffect(() => {
    fetchrooms();
  }, []);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedFavorites = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const SkeletonRow = () => (
    <TableRow>
      <TableCell className="py-2">
        <div className="flex items-center space-x-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 w-[150px]" />
        </div>
      </TableCell>
      <TableCell className="py-2">
        <Skeleton className="h-4 w-20" />
      </TableCell>
      <TableCell className="py-2">
        <Skeleton className="h-4 w-16" />
      </TableCell>
      <TableCell className="py-2">
        <Skeleton className="h-6 w-20" />
      </TableCell>
      <TableCell className="py-2">
        <Skeleton className="h-6 w-6" />
      </TableCell>
      <TableCell className="py-2">
        <Skeleton className="h-6 w-6" />
      </TableCell>
    </TableRow>
  );

  return (
    <Dashboardlayout>
      <div className="container mx-auto bg-white text-black rounded-lg min-h-screen">
        <div className="bg-gray-100 text-black p-4 rounded-t-lg flex items-center space-x-2">
          <MdMeetingRoom className="w-6 h-6 text-black" />
          <h1 className="text-2xl font-bold">All Events</h1>
        </div>
        <nav
          className="flex justify-between text-sm text-gray-500 px-4 py-2"
          aria-label="Breadcrumb"
        >
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="inline-flex items-center hover:text-gray-700">
                Dashboard
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 mx-1" />
                <Link href="/All-Events" className="ml-1 hover:text-gray-700">
                  All Events
                </Link>
              </div>
            </li>
          </ol>
          <div className="flex gap-2">
            <Select onValueChange={(value) => filterByCity(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Area" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                {uniqueCities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => sortData("asc")}
                disabled={sortOrder === "asc"}
              >
                Sort Ascending
              </Button>
              <Button
                variant="outline"
                onClick={() => sortData("desc")}
                disabled={sortOrder === "desc"}
              >
                Sort Descending
              </Button>
            </div>
            <Button
              onClick={() => {
                router.push("/add-post/post-event");
              }}
            >
              Post Event
            </Button>
          </div>
        </nav>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[400px] py-2">Event</TableHead>
                <TableHead className="py-2">Posting City</TableHead>
                <TableHead className="py-2">City, State</TableHead>
                <TableHead className="py-2">Address</TableHead>
                <TableHead className="py-2">Posted On</TableHead>
                <TableHead className="py-2">Edit</TableHead>
                <TableHead className="py-2">Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: itemsPerPage }).map((_, index) => (
                  <SkeletonRow key={index} />
                ))
              ) : sortedData.length > 0 ? (
                paginatedFavorites.map((user) => (
                  <TableRow key={user?._id}>
                    <TableCell className="py-2">{user.eventTitle}</TableCell>
                    <TableCell className="py-2">{user.eventpostingcity}</TableCell>
                    <TableCell className="py-2">{user.city}</TableCell>
                    <TableCell className="py-2">{user.address}</TableCell>
                    <TableCell className="py-2">
                      {new Date(user.postedOn).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="py-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4 text-blue-500" />
                      </Button>
                    </TableCell>
                    <TableCell className="py-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => deleteEvent(user._id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    No events found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {!loading && sortedData.length > 0 && (
          <div className="mt-4 flex justify-center">
            <Pagination>
              <PaginationContent>
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage((prev) => prev - 1)}
                    />
                  </PaginationItem>
                )}
                {[...Array(totalPages)].map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      onClick={() => setCurrentPage(index + 1)}
                      isActive={currentPage === index + 1}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                {currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage((prev) => prev + 1)}
                    />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </Dashboardlayout>
  );
}

export default Page;
