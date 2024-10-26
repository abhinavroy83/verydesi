"use client";
import { HomeLayout } from "@/components/layout/Home";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  User,
  Briefcase,
  Home,
  Heart,
  GraduationCap,
  Utensils,
  Hammer,
  Plane,
  Stethoscope,
  Church,
  School,
  Cpu,
  ShoppingBag,
  Globe,
  Car,
  Flower,
} from "lucide-react";

const categories = [
  { name: "Financial & Legal Services", icon: Briefcase },
  { name: "Real Estate Services", icon: Home },
  { name: "Wedding & Events", icon: Heart },
  { name: "Lessons/Tuitions", icon: GraduationCap },
  { name: "Food & Catering", icon: Utensils },
  { name: "Home & Business Needs", icon: Hammer },
  { name: "Travel & Accommodation", icon: Plane },
  { name: "Health & Wellness", icon: Stethoscope },
  { name: "Religious & Community Services", icon: Church },
  { name: "Educational Institutes", icon: School },
  { name: "Technology Services", icon: Cpu },
  { name: "Retail & Shopping", icon: ShoppingBag },
  { name: "Internet & Communication", icon: Globe },
  { name: "Automotive Services", icon: Car },
  { name: "Floral & Gifts", icon: Flower },
];

function page() {
  return (
    <HomeLayout>
      {" "}
      <main className="container mx-auto px-4 py-8 font-sans">
        <h1 className="text-2xl font-bold mb-6">
          Top Local Service Categories in Dallas Fortworth Area
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map((category, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <category.icon className="h-12 w-12 mb-2 text-primary" />
                <h3 className="font-semibold text-sm">{category.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </HomeLayout>
  );
}

export default page;
