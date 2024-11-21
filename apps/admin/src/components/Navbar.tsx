"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  ChevronDown,
  Home,
  LayoutDashboard,
  LogOut,
  Mail,
  MapPin,
  MessageSquare,
  Settings,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import LogoutComponent from "./popups/logout";
import { useSession, signOut } from "next-auth/react";
import { Router } from "next/router";

function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <nav className="bg-[#232f3e] shadow-2xl font-['udemy-regular'] z-10">
      <div className="mx-auto flex items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <Link href={"/"} className="inline-flex items-center space-x-2">
          <img
            height={100}
            width={150}
            className="w-50 h-50"
            src="https://res.cloudinary.com/druohnmyv/image/upload/v1723819327/assests/x31ydsmb8hkg05fqbkjf.png"
            alt=""
          />
        </Link>
        <div className="flex items-center">
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-avatar.jpg" alt="Admin" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Admin User
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      admin@verydesi.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span
                    onClick={() => {
                      router.push("/profile");
                    }}
                  >
                    Settings
                  </span>
                </DropdownMenuItem>
                <LogoutComponent />
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <DropdownMenu>
              <Button onClick={() => router.push("/sign-in")}>signin</Button>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
