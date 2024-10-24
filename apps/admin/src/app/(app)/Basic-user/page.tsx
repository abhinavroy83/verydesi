"use client";
import Dashboardlayout from "@/Components/Layout/Dashboardlayout";
import axios from "axios";

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
import { ChevronRight, ExternalLink, Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
function page() {
  const [userData, setuserData] = useState<UserData[]>([]);
  const fetchusers = async () => {
    try {
      const res = await axios.get(
        "https://apiv2.verydesi.com/admin/user/getalluser"
      );
      console.log(res.data);
      setuserData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchusers();
  });

  return (
    <Dashboardlayout>
      <div className="container mx-auto bg-white text-black rounded-lg">
        <div className="bg-gray-100 text-black p-4 rounded-t-lg flex items-center space-x-2">
          <Heart className="w-6 h-6 text-black" />
          <h1 className="text-2xl font-bold">Favorites</h1>
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
              <TableHead>City</TableHead>
              <TableHead>Rent</TableHead>
              <TableHead>Visit Page</TableHead>
              <TableHead>Remove</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: itemsPerPage }).map((_, index) => (
                <SkeletonRow key={index} />
              ))
            ) : favorites.length > 0 ? (
              paginatedFavorites.map((favorite) => (
                <TableRow key={favorite._id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      <img
                        src={
                          favorite?.Imgurl?.[0] ||
                          "https://placeholder.pics/svg/300"
                        }
                        alt={favorite.Title}
                        className="w-10 h-10 rounded-full"
                      />
                      <span className="truncate max-w-[230px]">
                        {favorite.Title}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{favorite.city}</TableCell>
                  <TableCell>${favorite.Expected_Rooms}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        router.push(
                          `/room?id=${favorite?._id}&title=${encodeURIComponent(favorite?.Title)}`
                        );
                      }}
                      variant="outline"
                      size="sm"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Click here
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveFavorite(favorite._id)}
                    >
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
        {!loading && favorites.length > 0 && (
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
