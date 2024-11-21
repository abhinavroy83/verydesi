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

function page() {
  const [eventdata, seteventdata] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const itemsPerPage = 10;

  const fetchrooms = async () => {
    try {
      const res = await axios.get("http://localhost:8000/event/find-all-event");
      seteventdata(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchrooms();
  }, []);

  const totalPages = Math.ceil(eventdata.length / itemsPerPage);
  const paginatedFavorites = eventdata.slice(
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
          <h1 className="text-2xl font-bold">All Rooms</h1>
        </div>
        <nav
          className="flex justify-between text-sm text-gray-500 px-4 py-2"
          aria-label="Breadcrumb"
        >
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                href="/"
                className="inline-flex items-center hover:text-gray-700"
              >
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
          <div className=" flex gap-2">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Area" />
              </SelectTrigger>
              <SelectContent></SelectContent>
            </Select>
            <div className="flex space-x-2">
              <Button variant="outline">Sort Ascending</Button>
              <Button variant="outline">Sort Descending</Button>
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
                <TableHead className="w-[400px] py-2 cursor-pointer">
                  Event{" "}
                </TableHead>
                <TableHead className="py-2 cursor-pointer">
                  Postingcity
                </TableHead>
                <TableHead className="py-2 cursor-pointer">
                  City, State
                </TableHead>
                <TableHead className="py-2">Address</TableHead>
                <TableHead className="py-2 cursor-pointer">
                  Posted On{" "}
                </TableHead>
                <TableHead className="py-2">Edit</TableHead>
                <TableHead className="py-2">Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: itemsPerPage }).map((_, index) => (
                  <SkeletonRow key={index} />
                ))
              ) : eventdata.length > 0 ? (
                paginatedFavorites.map((user) => (
                  <TableRow key={user?._id}>
                    <TableCell className="py-2">{user.eventTitle}</TableCell>
                    <TableCell className="py-2">
                      {user.eventpostingcity}
                    </TableCell>
                    <TableCell className="py-2">{user.city}</TableCell>
                    <TableCell className="py-2">
                      {new Date(user.postedOn).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="py-2">{user.address}</TableCell>

                    <TableCell className="py-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4 text-blue-500" />
                      </Button>
                    </TableCell>
                    <TableCell className="py-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {!loading && eventdata.length > 0 && (
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

export default page;
