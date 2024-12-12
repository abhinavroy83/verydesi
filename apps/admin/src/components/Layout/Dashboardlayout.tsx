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
import { motion } from "framer-motion";
import {
  Bell,
  Briefcase,
  ChevronDown,
  FileText,
  Home,
  HomeIcon,
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
  { name: "Admins Users", icon: Users, to: "/Admin-user" },
  { name: "Pending Requests", icon: Mail, to: "/admin/getapproval" },
  { name: "Area", icon: MapPin, to: "/Allarea" },
  { name: "Customer Message", icon: MessageSquare, to: "/admin/getHelp" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const router = useRouter();
  const [isMyPostExpanded, setIsMyPostExpanded] = useState(false);

  return (
    <div className="flex flex-col h-screen ">
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
            <Button
              variant="ghost"
              className="w-full justify-start mb-1"
              onClick={() => setIsMyPostExpanded(!isMyPostExpanded)}
            >
              <FileText className="mr-2 h-5 w-5" />
              Post
              <ChevronDown
                className={`ml-auto h-5 w-5 transition-transform duration-200 ${isMyPostExpanded ? "rotate-180" : ""}`}
              />
            </Button>
            {isMyPostExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="ml-2 space-y-1"
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start mb-1"
                  onClick={() => {
                    router.push("/post/rooms");
                  }}
                >
                  <HomeIcon className="mr-2 h-5 w-5" />
                  Rooms
                </Button>
                <Button
                  onClick={() => {
                    router.push("/post/event");
                  }}
                  variant="ghost"
                  className="w-full justify-start mb-1"
                >
                  <Briefcase className="mr-2 h-5 w-5" />
                  Event
                </Button>
                <Button
                  onClick={() => {
                    router.push("/post/business");
                  }}
                  variant="ghost"
                  className="w-full justify-start mb-1"
                >
                  <Briefcase className="mr-2 h-5 w-5" />
                  Business
                </Button>
              </motion.div>
            )}
          </nav>
        </aside>

        <main className="flex-1 overflow-y-auto bg-gray-100 p-6 dark:bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
}
