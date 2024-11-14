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
import ProtectedRoute from "@/context/ProtectedRoute";

export default function Page() {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const fetchusers = async () => {
    try {
      const res = await axios.get(
        "https://apiv2.verydesi.com/admin/user/getalluser"
      );
      setUserData(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchusers();
  }, []);

  const totalPages = Math.ceil(userData.length / itemsPerPage);
  const paginatedFavorites = userData.slice(
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
    <ProtectedRoute requiredPermission="manage_users">
      <Dashboardlayout>
        <div className="container mx-auto bg-white text-black rounded-lg min-h-screen">
          <div className="bg-gray-100 text-black p-4 rounded-t-lg flex items-center space-x-2">
            <FaUser className="w-6 h-6 text-black" />
            <h1 className="text-2xl font-bold">Basic User</h1>
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
                  <Link href="/Basic-user" className="ml-1 hover:text-gray-700">
                    Basic User
                  </Link>
                </div>
              </li>
            </ol>
          </nav>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px] py-2">First Name</TableHead>
                  <TableHead className="py-2">Last Name</TableHead>
                  <TableHead className="py-2">Email</TableHead>
                  <TableHead className="py-2">Email Status</TableHead>
                  <TableHead className="py-2">Edit</TableHead>
                  <TableHead className="py-2">Delete</TableHead>
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
                      <TableCell className="py-2">{user.firstName}</TableCell>
                      <TableCell className="py-2">{user.lastName}</TableCell>
                      <TableCell className="py-2">{user.email}</TableCell>
                      <TableCell className="py-2">
                        {user.IsEmailVerified ? "Verified" : "Not Verified"}
                      </TableCell>
                      <TableCell className="py-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4 text-blue-500" />
                        </Button>
                      </TableCell>
                      <TableCell className="py-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
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
          {!loading && userData.length > 0 && (
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
    </ProtectedRoute>
  );
}
