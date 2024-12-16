"use client";

import Dashboardlayout from "@/components/Layout/Dashboardlayout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { RoomInterface } from "@myrepo/types";
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
import { ChevronRight, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MdMeetingRoom } from "react-icons/md";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

export default function Page() {
  const [RoomData, setRoomData] = useState<RoomInterface[]>([]);
  const [filteredRoomData, setFilteredRoomData] = useState<RoomInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postingCityFilter, setPostingCityFilter] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof RoomInterface;
    direction: "asc" | "desc";
  } | null>(null);

  const itemsPerPage = 10;
  const router = useRouter();

  // Fetch rooms
  const fetchRooms = async () => {
    try {
      const res = await axios.get("https://apiv2.verydesi.com/admin/room/all-rooms");
      setRoomData(res.data);
      setFilteredRoomData(res.data); // Initialize filtered data
      setLoading(false);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = RoomData.filter((room) =>
      postingCityFilter === "all" || postingCityFilter === ""
        ? true // Show all cities if "all" or default is selected
        : room.postingincity.toLowerCase().includes(postingCityFilter.toLowerCase())
    );
    

    if (sortConfig !== null) {
      filtered = filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredRoomData(filtered);
  }, [RoomData, postingCityFilter, sortConfig]);

  // Pagination logic
  const totalPages = Math.ceil(filteredRoomData.length / itemsPerPage);
  const paginatedRooms = filteredRoomData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Skeleton loader for loading state
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
          <h1 className="text-2xl font-bold">All Rooms</h1>
        </div>
        <nav className="flex justify-between text-sm text-gray-500 px-4 py-2" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="inline-flex items-center hover:text-gray-700">
                Dashboard
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 mx-1" />
                <Link href="/All-rooms" className="ml-1 hover:text-gray-700">
                  All Rooms
                </Link>
              </div>
            </li>
          </ol>
          <div className="flex gap-2">

            <Select onValueChange={(value) => setPostingCityFilter(value)}>
  <SelectTrigger>
    <SelectValue placeholder="Filter by Area" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="all">All Cities</SelectItem>
    {Array.from(new Set(RoomData.map((room) => room.postingincity))).map((city) =>
      city ? (
        <SelectItem key={city} value={city}>
          {city}
        </SelectItem>
      ) : null
    )}
  </SelectContent>
</Select>

            <div className="flex space-x-2">
              <Button
                onClick={() => setSortConfig({ key: "Title", direction: "asc" })}
                variant="outline"
              >
                Sort Ascending
              </Button>
              <Button
                onClick={() => setSortConfig({ key: "Title", direction: "desc" })}
                variant="outline"
              >
                Sort Descending
              </Button>
              <Button
                onClick={() => {
                  router.push("/add-post/post-room");
                }}
              >
                Post Room
              </Button>
            </div>
          </div>
        </nav>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Room</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Posting City</TableHead>
                <TableHead>City, State</TableHead>
                <TableHead>Posted On</TableHead>
                <TableHead>Edit</TableHead>
                <TableHead>Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading
                ? Array.from({ length: itemsPerPage }).map((_, index) => <SkeletonRow key={index} />)
                : paginatedRooms.length > 0
                ? paginatedRooms.map((room) => (
                    <TableRow key={room.email}>
                      <TableCell>{room.Title}</TableCell>
                      <TableCell>{room.email}</TableCell>
                      <TableCell>{room.postingincity}</TableCell>
                      <TableCell>{room.city}</TableCell>
                      <TableCell>{new Date(room.postedon).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4 text-blue-500" />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No rooms found.
                    </TableCell>
                  </TableRow>
                )}
            </TableBody>
          </Table>
        </div>
        {!loading && filteredRoomData.length > 0 && (
          <div className="mt-4 flex justify-center">
            <Pagination>
              <PaginationContent>
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationPrevious onClick={() => setCurrentPage((prev) => prev - 1)} />
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
                    <PaginationNext onClick={() => setCurrentPage((prev) => prev + 1)} />
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
