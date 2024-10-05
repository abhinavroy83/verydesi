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
import { DashboardLayout } from "@/components/layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { RoomInterface } from "@myrepo/types";
import toast from "react-hot-toast";
import useCartStore from "@/store/useCartStore";

export default function FavoritesPage() {
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const [favorites, setFavorites] = useState<RoomInterface[]>([]);
  const token = session?.accessToken;
  const { pluscart, minuscart } = useCartStore();

  const handleRemoveFavorite = async (roomId: string) => {
    try {
      await axios.post(
        `http://localhost:8000/favorite/postAndUpdateFavorite`,
        {
          roomId,
          status: false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Update the favorites state
      minuscart();

      toast.success("removed from fovorite");
      setFavorites((prevFavorites) =>
        prevFavorites.filter((favorite) => favorite._id !== roomId)
      );
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  useEffect(() => {
    let isMounted = true; // To prevent state updates after unmount
    const fetchAllList = async () => {
      try {
        // Fetch the wishlist
        const listResponse = await axios.get(
          `http://localhost:8000/favorite/AlluserFavorite`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (listResponse.data.status === "error") {
          console.error(listResponse.data.msg);
          if (isMounted) setLoading(false);
          return;
        }

        const list = listResponse.data.wishlist.rooms.map(
          (item: any) => item.roomId
        );

        // Fetch the rooms
        const roomResponse = await Promise.all(
          list.map((roomId: any) =>
            axios.get(`https://api.verydesi.com/api/getspecificroom/${roomId}`)
          )
        );

        const rooms = roomResponse.map((response) => response.data.rooms);

        if (isMounted) {
          setFavorites(rooms);
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

    // Cleanup function to prevent state updates on unmounted component
    return () => {
      isMounted = false;
    };
  }, [token]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="container mx-auto bg-white text-black rounded-lg">
          <div className="p-4">Loading...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto bg-white text-black rounded-lg">
        <div className="bg-gray-100 text-black p-4 rounded-t-lg flex items-center space-x-2 mb-4">
          <Heart className="w-6 h-6 text-black" />
          <h1 className="text-2xl font-bold">Favorites</h1>
        </div>
        {favorites.length > 0 ? (
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
              {favorites.map((favorite) => (
                <TableRow key={favorite._id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      <img
                        src={
                          favorite?.Imgurl?.[0] || "/default-placeholder.png"
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
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveFavorite(favorite._id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="p-4">No favorites found.</div>
        )}
        {/* Pagination or additional content can go here */}
      </div>
    </DashboardLayout>
  );
}
