"use client";
import { DashboardLayout } from "@/components/layout";
import { DashboardCard } from "@/components/layout/Dashboard";
import { Heart, HelpCircle, Home, HomeIcon, Settings } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const { data: session, status } = useSession();
  const router = useRouter(); // Ensure you're using this hook

  if (status === "loading") return <div>Loading...</div>;
  if (!session) {
    // To avoid rendering the component before the redirect completes
    router.replace("/sign-in");
    return null; // Prevents any component rendering while redirecting
  }
  return (
    <DashboardLayout>
      <div className=" p-6">
        <h1 className="text-3xl font-bold mb-8">Welcome, Abhinav</h1>
        <div className="grid grid-cols-2 gap-6 mb-8">
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
            url="/dashboard/fav"
            title="Favorites"
            icon={<Heart className="h-6 w-6" />}
          />
          <DashboardCard
            url="/dashboard/help"
            title="Help"
            icon={<HelpCircle className="h-6 w-6" />}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default page;
