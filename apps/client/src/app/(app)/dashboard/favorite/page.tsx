"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import {
  Heart,
  ExternalLink,
  Trash2,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardLayout } from "@/components/layout";
import useCartStore from "@/store/useCartStore";
import toast from "react-hot-toast";
import { RoomInterface } from "@myrepo/types";

export default function FavoritesPage() {
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<RoomInterface[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { data: session } = useSession();
  const token = session?.accessToken;
  const { minuscart, setCartCount } = useCartStore();
  const router = useRouter();

  const fetchFavorites = async () => {
    if (!token) return;
    try {
      const listResponse = await axios.get(
        "https://apiv2.verydesi.com/favorite/AlluserFavorite",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartCount(listResponse?.data.count);
      if (listResponse.data.status === "error") {
        console.error(listResponse.data.msg);
        setLoading(false);
        return;
      }

      const list = listResponse.data.wishlist.rooms.map(
        (item: any) => item.roomId
      );
      const roomResponses = await Promise.all(
        list.map((roomId: string) =>
          axios.get(`https://apiv2.verydesi.com/room/findsingleRoom/${roomId}`)
        )
      );
      const rooms = roomResponses.map((response) => response.data);
      setFavorites(rooms);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [token]);

  const handleRemoveFavorite = async (roomId: string) => {
    try {
      await axios.post(
        "https://apiv2.verydesi.com/favorite/postAndUpdateFavorite",
        { roomId, status: false },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      minuscart();
      toast.success("Removed from favorites");
      setFavorites((prevFavorites) =>
        prevFavorites.filter((favorite) => favorite._id !== roomId)
      );
    } catch (error) {
      console.error("Error removing favorite:", error);
      toast.error("Failed to remove from favorites");
    }
  };

  const formatSlug = (title: string, id: string) => {
    return `${title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")}-${id}`;
  };

  const totalPages = Math.ceil(favorites.length / itemsPerPage);
  const paginatedFavorites = favorites.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <DashboardLayout>
      <div className="container mx-auto bg-gray-50 min-h-screen">
        <div className="mb-6">
          <header className="bg-gray-100 text-black p-4">
            <h1 className="text-xl md:text-2xl font-semibold flex items-center">
              <Heart className="mr-2 h-5 w-5 md:h-6 md:w-6" /> Favorites
            </h1>
          </header>

          <nav
            className="text-sm text-gray-500 p-4 font-bold"
            aria-label="Breadcrumb"
          >
            <ol className="list-none p-0 inline-flex flex-wrap">
              <li className="flex items-center">
                <Link
                  href="/dashboard"
                  className="hover:underline text-[15px] text-[#f97316]"
                >
                  Dashboard
                </Link>
                <ChevronRight className="w-4 h-4 mx-1 " />
              </li>
              <li className="flex items-center hover:underline cursor-pointer hover:text-gray-700 text-[15px] space-x-[-1px]">
                <span>Favorites</span>
              </li>
            </ol>
          </nav>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} className="h-20 w-full" />
            ))}
          </div>
        ) : favorites.length > 0 ? (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full bg-white shadow-md rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Room
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      City
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rent
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedFavorites.map((favorite) => (
                    <tr key={favorite._id}>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={
                              favorite?.Imgurl?.[0] ||
                              "https://placeholder.pics/svg/300"
                            }
                            alt={favorite.Title}
                            className="w-10 h-10 rounded-full mr-3"
                          />
                          <span className="font-medium truncate max-w-xs">
                            {favorite.Title}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4">{favorite.city}</td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        ${favorite.Expected_Rooms}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <Button
                          onClick={() =>
                            router.push(
                              `/room/${formatSlug(favorite.Title, favorite._id)}`
                            )
                          }
                          variant="outline"
                          size="sm"
                          className="mr-2"
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button
                          onClick={() => handleRemoveFavorite(favorite._id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-500 gap-1"
                        >
                          <Trash2 className="w-4 h-4" />
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden space-y-4 px-3 lg:px-0">
              {paginatedFavorites.map((favorite) => (
                <Card key={favorite._id}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4 mb-2">
                      <img
                        src={
                          favorite?.Imgurl?.[0] ||
                          "https://placeholder.pics/svg/300"
                        }
                        alt={favorite.Title}
                        className="w-16 h-16 rounded-md object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">
                          {favorite.Title}
                        </h3>
                        <p className="text-sm text-gray-500">{favorite.city}</p>
                        <p className="text-lg font-bold">
                          ${favorite.Expected_Rooms}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <Button
                      onClick={() =>
                        router.push(
                          `/room/${formatSlug(favorite.Title, favorite._id)}`
                        )
                      }
                      variant="outline"
                      size="sm"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button
                      onClick={() => handleRemoveFavorite(favorite._id)}
                      variant="ghost"
                      size="sm"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                      Remove
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-6 flex justify-center items-center space-x-2">
                <Button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  size="sm"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="sr-only">Previous page</span>
                </Button>
                <span className="text-sm text-gray-500">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  size="sm"
                >
                  <ChevronRight className="w-4 h-4" />
                  <span className="sr-only">Next page</span>
                </Button>
              </div>
            )}
          </>
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-500">No favorites found.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
