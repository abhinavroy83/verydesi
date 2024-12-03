"use client";
import { DashboardLayout } from "@/components/layout";
import { DashboardCard } from "@/components/layout/Dashboard";
import { Badge } from "@/components/ui/badge";
import useAuthStore from "@/store/useAuthStore";
import {
  Factory,
  Heart,
  HelpCircle,
  Home,
  HomeIcon,
  Settings,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const { data: session, status } = useSession();
  const router = useRouter(); // Ensure you're using this hook
  const { firstname } = useAuthStore();
  if (status === "loading") return <div>Loading...</div>;
  if (!session) {
    router.replace("/sign-in");
    return null;
  }
  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 md:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
          Welcome, {firstname}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <DashboardCard
            url="/dashboard/user"
            title="Settings"
            icon={<Settings className="h-6 w-6" />}
          />
          <DashboardCard
            url="/dashboard"
            title="Rooms"
            icon={<Home className="h-6 w-6" />}
          />
          <DashboardCard
            url="/dashboard/favorite"
            title="Favorites"
            icon={<Heart className="h-6 w-6" />}
          />
          <DashboardCard
            url="/dashboard/help"
            title="Help"
            icon={<HelpCircle className="h-6 w-6" />}
          />
          <DashboardCard
            url="/dashboard/my-business"
            title="Business"
            icon={<Factory className="h-6 w-6" />}
          >
            <Badge className=" bg-yellow-300 text-black">
              claim or Verify Business
            </Badge>
          </DashboardCard>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default page;
