"use client";
import DashboardLayout from "@/components/Layout/Dashboardlayout";
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
import { ChevronRight, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { FaBriefcase } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

interface BusinessInterface {
  _id: string;
  UserId: string;
  createdAt: string;
  updatedAt: string;
  isVerified: boolean;
  status: string;
  userName: string;
  userPhone: string;
  businessName: string;
  legalName: string;
  businessType: string;
  categories: string[];
  address: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  additionalAddress?: string;
  website?: string;
  phone: string;
  verificationMethod: string;
  einNumber?: string;
  establishedSince?: string;
  openHours: {
    monday: TimeInfo;
    tuesday: TimeInfo;
    wednesday: TimeInfo;
    thursday: TimeInfo;
    friday: TimeInfo;
    _id: string;
  };
  description: string;
  languages: string[];
  pdfurl: string;
  logoUrl?: string;
  Imageurl: string[];
  sales: {
    description: string;
    startDate?: string;
    endDate?: string;
    couponCodes: string;
    _id: string;
  };
  __v: number;
}

interface TimeInfo {
  startTime: string;
  endTime: string;
  is24Hours: boolean;
  isClosed: boolean;
}

export default function BusinessPage() {
  const [businessData, setBusinessData] = useState<BusinessInterface[]>([]);
  const [filteredBusinessData, setFilteredBusinessData] = useState<BusinessInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [cityFilter, setCityFilter] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof BusinessInterface;
    direction: "asc" | "desc";
  } | null>(null);

  const itemsPerPage = 10;
  const router = useRouter();

  const fetchBusinesses = async () => {
    try {
      const res = await axios.get("https://apiv2.verydesi.com/business/find-all-business");
      setBusinessData(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this business?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://apiv2.verydesi.com/business/delete-business/${id}`);
      alert("Business deleted successfully!");
      setBusinessData((prevData) => prevData.filter((business) => business._id !== id));
    } catch (error) {
      console.error("Failed to delete business:", error);
      alert("Failed to delete the business. Please try again.");
    }
  };

  useEffect(() => {
    fetchBusinesses();
  }, []);

  useEffect(() => {
    let filtered = businessData.filter((business) => {
      const cityMatch = cityFilter
        ? business.city?.toLowerCase().includes(cityFilter.toLowerCase())
        : true;
      return cityMatch;
    });

    if (sortConfig) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue === undefined || bValue === undefined) {
          return 0;
        }

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredBusinessData(filtered);
  }, [cityFilter, sortConfig, businessData]);

  const totalPages = Math.max(1, Math.ceil(filteredBusinessData.length / itemsPerPage));
  const paginatedBusinesses = filteredBusinessData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const SkeletonRow = () => (
    <TableRow>
      <TableCell className="py-2">
        <Skeleton className="h-8 w-8 rounded-full" />
      </TableCell>
      <TableCell className="py-2">
        <Skeleton className="h-4 w-[150px]" />
      </TableCell>
      <TableCell className="py-2">
        <Skeleton className="h-4 w-20" />
      </TableCell>
      <TableCell className="py-2">
        <Skeleton className="h-6 w-16" />
      </TableCell>
    </TableRow>
  );

  return (
    <DashboardLayout>
      <div className="container mx-auto bg-white text-black rounded-lg min-h-screen">
        <div className="bg-gray-100 text-black p-4 rounded-t-lg flex items-center space-x-2">
          <FaBriefcase className="w-6 h-6 text-black" />
          <h1 className="text-2xl font-bold">All Businesses</h1>
        </div>
        <nav className="flex justify-between text-sm text-gray-500 px-4 py-2" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="inline-flex items-center hover:text-gray-700">
                Dashboard
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 mx-1" />
                <Link href="/business/find-all-business" className="ml-1 hover:text-gray-700">
                  All Businesses
                </Link>
              </div>
            </li>
          </ol>
          <div className="flex gap-2">
            <Select onValueChange={(value) => setCityFilter(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by City" />
              </SelectTrigger>
              <SelectContent>
                {Array.from(new Set(businessData.map((business) => business.city || "Unknown"))).map(
                  (city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => setSortConfig({ key: "businessName", direction: "asc" })}
              >
                Sort Ascending
              </Button>
              <Button
                variant="outline"
                onClick={() => setSortConfig({ key: "businessName", direction: "desc" })}
              >
                Sort Descending
              </Button>
              <Button
                onClick={() => router.push("/add-post/post-business")}

              >
                Post Business
              </Button>
            </div>
          </div>
        </nav>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Business Name</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading
                ? Array.from({ length: itemsPerPage }).map((_, index) => <SkeletonRow key={index} />)
                : paginatedBusinesses.length > 0
                ? paginatedBusinesses.map((business) => (
                    <TableRow key={business._id}>
                      <TableCell>{business.businessName}</TableCell>
                      <TableCell>{business.city || "Unknown"}</TableCell>
                      <TableCell>{business.address}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => console.log("Edit", business._id)}
                        >
                          <Edit className="h-4 w-4 text-blue-500" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(business._id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4">
                      No businesses match your criteria.
                    </TableCell>
                  </TableRow>
                )}
            </TableBody>
          </Table>
        </div>
        {!loading && filteredBusinessData.length > 0 && (
          <div className="mt-4 flex justify-center">
            <Pagination>
              <PaginationContent>
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationPrevious onClick={() => setCurrentPage((prev) => prev - 1)} />
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
                    <PaginationNext onClick={() => setCurrentPage((prev) => prev + 1)} />
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
