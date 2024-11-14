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
import Navbar from "../Navbar";

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
      <Navbar />

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
