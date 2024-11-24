"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Dashboardlayout from "@/components/Layout/Dashboardlayout";
import { FaUser } from "react-icons/fa";
import { ChevronRight, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();

  return (
    <Dashboardlayout>
      <div className="container mx-auto bg-white text-black rounded-lg min-h-screen">
        <div className="bg-gray-100 text-black p-4 rounded-t-lg flex items-center space-x-2">
          <FaUser className="w-6 h-6 text-black" />
          <h1 className="text-2xl font-bold">Admin User</h1>
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
                  Admin User
                </Link>
              </div>
            </li>
          </ol>
          <Button
            onClick={() => {
              router.push("/Admin-user/Add-user");
            }}
          >
            Add User
          </Button>
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
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  No users found.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </Dashboardlayout>
  );
}

export default page;
