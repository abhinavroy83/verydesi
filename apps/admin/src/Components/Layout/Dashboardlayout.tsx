"use client";

import Link from "next/link";
import React from "react";
const menuItems = [
  { name: "Dashboard", icon: "🏠", to: "/admin/dashboard" },
  { name: "Basic Users", icon: "👥", to: "/admin/alluser" },
  { name: "Admin Users", icon: "👤", to: "/admin/getalladminsuser" },
  { name: "Pending Requests", icon: "📋", to: "/admin/getapproval" },
  { name: "Area", icon: "🗺️", to: "/admin/allarea" },
  { name: "Rooms", icon: "🛏️", to: "/admin/allroom" },
  { name: "Customer Message", icon: "💬", to: "/admin/getHelp" },
];
const Dashboardlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="flex">
        <aside
          className={` md:flex md:flex-col  bg-white border-r overflow-y-none lg:w-[16%] w-auto`}
        >
          <nav className="flex-1 px-2 py-4 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.to}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </aside>
        <main className="w-full h-screen lg:w-5/6 border overflow-y-auto mt-3 lg:mt-0">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Dashboardlayout;
