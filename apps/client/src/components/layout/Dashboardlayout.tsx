import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChevronDown,
  Edit,
  UserPlus,
  Share2,
  Home,
  Settings,
  Heart,
  HelpCircle,
  FileText,
  Home as HomeIcon,
  Briefcase,
  LogOut,
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMyPostExpanded, setIsMyPostExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");
  const router = useRouter();
  const { firstname, isverified } = useAuthStore();
  console.log(isverified);
  const menuItems = [
    { name: "Dashboard", icon: Home, url: "/dashboard" },
    { name: "Setting", icon: Settings, url: "/dashboard/user" },
    { name: "Favorites", icon: Heart, url: "/dashboard/favorite" },
    { name: "Help", icon: HelpCircle, url: "/dashboard/help" },
  ];

  return (
    <div className="max-w-[1370px] lg:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 mt-32">
      {!isverified && (
        <div className="">
          <div
            role="alert"
            className="rounded border-s-4 border-red-500 bg-red-50 p-4"
          >
            <div className="flex items-start gap-4 ">
              <span className=" text-red-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <div className=" flex-1">
                <strong className="block font-medium">
                  Verify your email.
                </strong>
                <p className="mt-2 text-sm text-red-700">The email was sent</p>
              </div>
              <button className="text-gray-500 transition hover:text-gray-600">
                <span className="sr-only">Dismiss popup</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="mt-2 flex h-screen bg-background overflow-x-hidden overflow-y-hidden mx-auto border shadow-xl shadow-gray-300 rounded-2xl mb-5">
        <aside className="w-64 border-r bg-muted/30 lg:flex flex-col hidden">
          <div className="p-6 flex flex-col items-center">
            <Avatar className="w-24 h-24 mb-4 border-4 border-primary">
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-semibold mb-1">{firstname}</h2>
            <p className="text-sm text-muted-foreground mb-4">Since 2024</p>
            <div className="flex justify-center space-x-2">
              <Button variant="outline" size="icon" className="rounded-full">
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <UserPlus className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => {
                  router.push("/dashboard/Share");
                }}
                variant="outline"
                size="icon"
                className="rounded-full"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Separator className="my-4" />
          <ScrollArea className="flex-grow">
            <nav className="space-y-2 p-4">
              {menuItems.map((item) => (
                <Button
                  key={item.name}
                  variant={activeItem === item.name ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveItem(item.name);

                    router.push(item.url);
                  }}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Button>
              ))}
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => setIsMyPostExpanded(!isMyPostExpanded)}
              >
                <FileText className="mr-2 h-4 w-4" />
                My Post
                <ChevronDown
                  className={`ml-auto h-4 w-4 transition-transform duration-200 ${isMyPostExpanded ? "rotate-180" : ""}`}
                />
              </Button>
              {isMyPostExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="ml-4 space-y-2"
                >
                  <Button variant="ghost" className="w-full justify-start">
                    <HomeIcon className="mr-2 h-4 w-4" />
                    My Rooms
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Briefcase className="mr-2 h-4 w-4" />
                    My Business
                  </Button>
                </motion.div>
              )}
            </nav>
          </ScrollArea>
        </aside>

        {/* Main content */}
        <main className="flex-grow overflow-scroll overflow-x-hidden overflow-y-hidden h-auto flex flex-col">
          <div className="flex-grow p-">{children}</div>
        </main>
      </div>
    </div>
  );
}
