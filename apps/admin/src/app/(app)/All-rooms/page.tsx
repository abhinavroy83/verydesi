"use client";

import Dashboardlayout from "@/components/Layout/Dashboardlayout";
import axios from "axios";
import { FaUser } from "react-icons/fa";
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

export default function Page() {
  const [RoomData, setRoomData] = useState<RoomInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchusers = async () => {
    try {
      const res = await axios.get(
        "https://apiv2.verydesi.com/admin/room/all-rooms"
      );
      setRoomData(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchusers();
  }, []);

  const totalPages = Math.ceil(RoomData.length / itemsPerPage);
  const paginatedFavorites = RoomData.slice(
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
          className="flex text-sm text-gray-500 px-4 py-2"
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
        </nav>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[400px] py-2">Room</TableHead>
                <TableHead className="py-2">Email</TableHead>
                <TableHead className="py-2">Postingcity</TableHead>
                <TableHead className="py-2">City, State</TableHead>
                <TableHead className="py-2">Address</TableHead>
                <TableHead className="py-2">Edit</TableHead>
                <TableHead className="py-2">Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: itemsPerPage }).map((_, index) => (
                  <SkeletonRow key={index} />
                ))
              ) : RoomData.length > 0 ? (
                paginatedFavorites.map((user) => (
                  <TableRow key={user?.email}>
                    <TableCell className="py-2">{user.Title}</TableCell>
                    <TableCell className="py-2">{user.email}</TableCell>
                    <TableCell className="py-2">{user.postingincity}</TableCell>
                    <TableCell className="py-2">{user.city}</TableCell>
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
        {!loading && RoomData.length > 0 && (
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
