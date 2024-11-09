"use client";

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
import LogoutComponent from "../popups/logout";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, to: "/" },
  { name: "Basic Users", icon: Users, to: "/Basic-user" },
  { name: "Admin Users", icon: Users, to: "/All-rooms" },
  { name: "Pending Requests", icon: Mail, to: "/admin/getapproval" },
  { name: "Area", icon: MapPin, to: "/admin/allarea" },
  { name: "Rooms", icon: Home, to: "/All-rooms" },
  { name: "Customer Message", icon: MessageSquare, to: "/admin/getHelp" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen">
      {/* navbar */}
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
                  <span>Settings</span>
                </DropdownMenuItem>
                <LogoutComponent />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 overflow-y-auto bg-white dark:bg-gray-800 border-r">
          <nav className="mt-5 px-2">
            {menuItems.map((item) => (
              <Button
                key={item.name}
                variant={
                  activeTab === item.name.toLowerCase() ? "secondary" : "ghost"
                }
                className="w-full justify-start mb-1"
                onClick={() => {
                  setActiveTab(item.name.toLowerCase());
                  router.push(item.to);
                }}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 overflow-y-auto bg-gray-100 p-6 dark:bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
}
