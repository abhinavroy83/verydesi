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

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMyPostExpanded, setIsMyPostExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");
  const router = useRouter();
  const menuItems = [
    { name: "Dashboard", icon: Home, url: "/dashboard" },
    { name: "Setting", icon: Settings, url: "/dashboard/user" },
    { name: "Favorites", icon: Heart, url: "/dashboard/fav" },
    { name: "Help", icon: HelpCircle, url: "/dashboard/help" },
  ];

  return (
    <div className="flex h-screen bg-background max-w-[1370px] lg:max-w-[1530px] overflow-x-hidden overflow-y-hidden mx-auto mt-32 border shadow-xl shadow-gray-300 rounded-2xl my-5">
      <aside className="w-64 border-r bg-muted/30 lg:flex flex-col hidden">
        <div className="p-6 flex flex-col items-center">
          <Avatar className="w-24 h-24 mb-4 border-4 border-primary">
            <AvatarImage src="/placeholder.svg" alt="User" />
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-semibold mb-1">Abhinav</h2>
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
  );
}
