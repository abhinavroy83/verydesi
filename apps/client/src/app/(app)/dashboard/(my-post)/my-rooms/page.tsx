"use client";

import { Heart, ExternalLink, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { RoomInterface } from "@myrepo/types";
import toast from "react-hot-toast";
import useCartStore from "@/store/useCartStore";
import ConfirmationPopup from "@/components/Popups/confirmpopups";

export default function roomsPage() {
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const [rooms, setrooms] = useState<RoomInterface[]>([]);
  const token = session?.accessToken;
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleRemoveFavorite = async (roomId: string) => {};

  useEffect(() => {
    let isMounted = true;
    const fetchAllList = async () => {
      try {
        const listResponse = await axios.get(
          `http://apiv2.verydesi.com/room/listmyroom`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setrooms(listResponse.data);
        if (isMounted) {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching wishlist or rooms:", error);
        if (isMounted) setLoading(false);
      }
    };

    if (token) {
      fetchAllList();
    }

    return () => {
      isMounted = false;
    };
  }, [token]);

  const deleteRoom = async (roomId: string) => {
    try {
      await axios.delete(`http://localhost:8000/room/delete-room/${roomId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setrooms((prevRooms) => prevRooms.filter((room) => room._id !== roomId));
      toast.success("Room deleted successfully");
    } catch (error) {
      console.error("Error deleting room:", error);
      toast.error("Failed to delete room");
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(rooms.length / itemsPerPage);
  const paginatedrooms = rooms.slice(
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
    <DashboardLayout>
      <div className="container mx-auto bg-white text-black rounded-lg">
        <div className="bg-gray-100 text-black p-4 rounded-t-lg flex items-center space-x-2 mb-4">
          <Heart className="w-6 h-6 text-black" />
          <h1 className="text-2xl font-bold">My Rooms</h1>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Room</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Rent</TableHead>
              <TableHead>Visit Page</TableHead>
              <TableHead>Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: itemsPerPage }).map((_, index) => (
                <SkeletonRow key={index} />
              ))
            ) : rooms.length > 0 ? (
              paginatedrooms.map((favorite) => (
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
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Click here
                    </Button>
                  </TableCell>
                  <TableCell>
                    <ConfirmationPopup
                      buttonText={<Trash2 className="w-4 h-4 text-red-500" />}
                      title="Confirm Room Deletion"
                      description={`Are you sure you want to delete the room "${favorite.Title}"? This action cannot be undone.`}
                      onConfirm={() => deleteRoom(favorite._id)}
                      variant="ghost"
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No rooms found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {!loading && rooms.length > 0 && (
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
    </DashboardLayout>
  );
}
