"use client";
import Dashboardlayout from "@/components/Layout/Dashboardlayout";
import axios from "axios";
import { FaUser } from "react-icons/fa";

import React, { useEffect, useState } from "react";
import { UserData } from "@myrepo/types";
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
function page() {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const fetchusers = async () => {
    try {
      const res = await axios.get(
        "https://apiv2.verydesi.com/admin/user/getalluser"
      );
      // console.log(res.data);
      setUserData(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchusers();
  });
  const totalPages = Math.ceil(userData.length / itemsPerPage);
  const paginatedFavorites = userData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const SkeletonRow = () => (
    <TableRow>
      <TableCell>
        <div className="flex items-center space-x-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-20" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-16" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-8 w-24" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-8 w-8" />
      </TableCell>
    </TableRow>
  );

  return (
    <Dashboardlayout>
      <div className="container mx-auto bg-white text-black rounded-lg">
        <div className="bg-gray-100 text-black p-4 rounded-t-lg flex items-center space-x-2">
          <FaUser className="w-6 h-6 text-black" />
          <h1 className="text-2xl font-bold">All Rooms</h1>
        </div>
        <nav
          className="flex text-sm text-gray-500 px-2"
          aria-label="Breadcrumb"
        >
          <ol className="inline-flex items-center space-x-1 md:space-x-3 mt-4">
            <li className="inline-flex items-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center hover:text-gray-700"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 mx-1" />
                <Link
                  href="/dashboard/favorite"
                  className="ml-1 hover:text-gray-700"
                >
                  Favorites
                </Link>
              </div>
            </li>
          </ol>
        </nav>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Room</TableHead>
              <TableHead> City, State</TableHead>
              <TableHead> Address</TableHead>
              <TableHead>Rent</TableHead>
              <TableHead>Edit</TableHead>
              <TableHead>Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: itemsPerPage }).map((_, index) => (
                <SkeletonRow key={index} />
              ))
            ) : userData.length > 0 ? (
              paginatedFavorites.map((user) => (
                <TableRow key={user?.email}>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.IsEmailVerified}</TableCell>

                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4 text-red-500" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No favorites found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {!loading && userData.length > 0 && (
          <div className="mt-4">
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
