import DashboardLayout from "@/components/Layout/Dashboardlayout";
import { AreaForm } from "@/components/module/Area/form/area-form";
import React from "react";

function page() {
  return (
    <DashboardLayout>
      <AreaForm />
    </DashboardLayout>
  );
}

export default page;
