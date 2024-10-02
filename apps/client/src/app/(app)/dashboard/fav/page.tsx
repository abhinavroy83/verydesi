"use client";
import {
  Heart,
  Home,
  Building2,
  DollarSign,
  ExternalLink,
  Trash2,
} from "lucide-react";
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

type Favorite = {
  id: string;
  image: string;
  name: string;
  location: string;
  rent: number;
};

const favorites: Favorite[] = [
  {
    id: "1",
    image: "/placeholder.svg?height=40&width=40",
    name: "New Home : 1Bed Private Bath Available In Sunfield Community",
    location: "Buda, TX",
    rent: 800,
  },
  {
    id: "2",
    image: "/placeholder.svg?height=40&width=40",
    name: "2BR 2Bath Apartment In Normal $700/month",
    location: "Portland, OR",
    rent: 700,
  },
  {
    id: "3",
    image: "/placeholder.svg?height=40&width=40",
    name: "Have Room To Rent",
    location: "Manor, TX",
    rent: 700,
  },
  {
    id: "4",
    image: "/placeholder.svg?height=40&width=40",
    name: "Single Room Available In A New Single 4B/3B Home",
    location: "Round Rock, TX",
    rent: 680,
  },
  {
    id: "5",
    image: "/placeholder.svg?height=40&width=40",
    name: "Fully Furnished Bedroom With Attached Bath In A Family Home Nearer To Nike, Intel, Shops, Bus Stop Including Utilities",
    location: "Portland, OR",
    rent: 1200,
  },
  {
    id: "6",
    image: "/placeholder.svg?height=40&width=40",
    name: "Furnished Single Room Available For Male",
    location: "Portland, OR",
    rent: 550,
  },
  {
    id: "7",
    image: "/placeholder.svg?height=40&width=40",
    name: "Townhouse For Rent",
    location: "Portland, OR",
    rent: 2000,
  },
];

export default function FavoritesPage() {
  return (
    <DashboardLayout>
      <div className="container mx-auto bg-white text-black rounded-lg">
        <div className="bg-gray-100 text-black p-4 rounded-t-lg flex items-center space-x-2 mb-4">
          <Heart className="w-6 h-6 text-red-500" />
          <h1 className="text-2xl font-bold">Favorites</h1>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Room</TableHead>
              <TableHead>City, State</TableHead>
              <TableHead>Rent</TableHead>
              <TableHead>Visit Page</TableHead>
              <TableHead>Remove</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {favorites.map((favorite) => (
              <TableRow key={favorite.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-3">
                    <img
                      src={favorite.image}
                      alt={favorite.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <span className="truncate max-w-[230px]">
                      {favorite.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{favorite.location}</TableCell>
                <TableCell>${favorite.rent}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Click here
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 flex justify-center">
          <Button variant="outline">1</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
