"use client";
import DashboardLayout from "@/components/Layout/Dashboardlayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

function page() {
  const router = useRouter();
  return (
    <DashboardLayout>
      <div>page</div>
      <Button
        onClick={() => {
          router.push("/add-post/post-bussiness");
        }}
      >
        Post Event
      </Button>
    </DashboardLayout>
  );
}

export default page;
