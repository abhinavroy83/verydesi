"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  ChevronDown,
  FileText,
  HomeIcon,
  LayoutDashboard,
  Mail,
  MapPin,
  Menu,
  MessageSquare,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import Navbar from "../Navbar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, to: "/" },
  { name: "Basic Users", icon: Users, to: "/Basic-user" },
  { name: "Admins Users", icon: Users, to: "/Admin-user" },
  { name: "Pending Requests", icon: Mail, to: "/pending-messages" },
  { name: "Area", icon: MapPin, to: "/Allarea" },
  { name: "Customer Message", icon: MessageSquare, to: "/admin/getHelp" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMyPostExpanded, setIsMyPostExpanded] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isPostPath =
    pathname === "/add-post/post-room" || pathname === "/add-post/post-event" || pathname === "/add-post/post-business";

  const SidebarContent = () => (
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
            if (isPostPath) setIsSidebarOpen(false);
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
          className={`ml-auto h-5 w-5 transition-transform duration-200 ${
            isMyPostExpanded ? "rotate-180" : ""
          }`}
        />
      </Button>
      <AnimatePresence>
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
                if (isPostPath) setIsSidebarOpen(false);
              }}
            >
              <HomeIcon className="mr-2 h-5 w-5" />
              Rooms
            </Button>
            <Button
              onClick={() => {
                router.push("/post/event");
                if (isPostPath) setIsSidebarOpen(false);
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
                if (isPostPath) setIsSidebarOpen(false);
              }}
              variant="ghost"
              className="w-full justify-start mb-1"
            >
              <Briefcase className="mr-2 h-5 w-5" />
              Business
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );

  return (
    <div className={`flex flex-col ${isPostPath && "h-screen"}`}>
      <Navbar />
      {isPostPath ? (
        <div className="flex flex-1 overflow-hidden">
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="fixed top-15 left-4 z-50"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4"
                onClick={() => setIsSidebarOpen(false)}
              >
              </Button>
              <SidebarContent />
            </SheetContent>
          </Sheet>
          <main className="flex-1 overflow-y-auto bg-gray-100 p-6 dark:bg-gray-900">
            {children}
          </main>
        </div>
      ) : (
        <div className="flex flex-1 overflow-hidden">
          <aside className="w-64 overflow-y-auto bg-white dark:bg-gray-800 border-r">
            <SidebarContent />
          </aside>
          <main className="flex-1 overflow-y-auto bg-gray-100 p-6 dark:bg-gray-900">
            {children}
          </main>
        </div>
      )}
    </div>
  );
}
