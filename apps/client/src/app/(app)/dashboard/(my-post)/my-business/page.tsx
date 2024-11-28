"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
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
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardLayout } from "@/components/layout";
import { Event } from "@myrepo/types";
import { Button } from "@/components/ui/button";

export default function MyEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const token = session?.accessToken;

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    let isMounted = true;

    const fetchMyEvents = async () => {
      if (!token) {
        console.error("Token not found, please sign in!");
        return;
      }
      setLoading(true);
      try {
        const response = await axios.get(
          `https://apiv2.verydesi.com/business/list-my-business`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
      } catch (error) {}
    };

    if (token) fetchMyEvents();

    return () => {
      isMounted = false;
    };
  }, [token]);

  // Pagination logic
  const totalPages = Math.ceil(events.length / itemsPerPage);
  const paginatedEvents = events.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const SkeletonRow = () => (
    <TableRow>
      <TableCell>
        <Skeleton className="h-4 w-48" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-20" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-32" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-24" />
      </TableCell>
    </TableRow>
  );

  return (
    <DashboardLayout>
      <div className="container mx-auto bg-white text-black rounded-lg font-sans">
        <div className="bg-gray-100 justify-between  text-black p-4 rounded-t-lg flex items-center space-x-2 mb-4">
          <h1 className="text-2xl font-bold">My Business</h1>
          <div className="">
            <Button className=" mx-2">AddNew Business</Button>
            <Button>Claim or Verify Business</Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Business/Service Name</TableHead>
              <TableHead> City,State</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Edit</TableHead>
              <TableHead>Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: itemsPerPage }).map((_, index) => (
                <SkeletonRow key={index} />
              ))
            ) : events.length > 0 ? (
              paginatedEvents.map((event) => (
                <TableRow key={event._id}>
                  <TableCell>{event.eventTitle}</TableCell>
                  <TableCell>{event.city}</TableCell>
                  <TableCell>{event.hostedBy}</TableCell>
                  <TableCell>
                    {new Date(event.startDate).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No Business found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </DashboardLayout>
  );
}
