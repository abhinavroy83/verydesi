"use client";

import { useState } from "react";
import { HomeLayout } from "@/components/layout/Home";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Home,
  Wrench,
  Zap,
  Lock,
  SprayCan,
  Truck,
  Wind,
  Droplet,
  Car,
  Scissors,
  Utensils,
  Briefcase,
  Camera,
  Pen,
  Book,
  Laptop,
  Shirt,
  Leaf,
  Dog,
  Music,
  Palette,
  Dumbbell,
  Heart,
  Plane,
  Sun,
  Coffee,
  Wifi,
  Phone,
  ShoppingCart,
  Tv,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { FeaturedBusinessCard } from "@/components/Business";

export default function Component() {
  const [showAll, setShowAll] = useState(false);

  const categories = [
    { name: "Landscaping", icon: <Leaf className="h-4 w-4" /> },
    { name: "Contractors", icon: <Wrench className="h-4 w-4" /> },
    { name: "Electricians", icon: <Zap className="h-4 w-4" /> },
    { name: "Locksmiths", icon: <Lock className="h-4 w-4" /> },
    { name: "Home Cleaners", icon: <SprayCan className="h-4 w-4" /> },
    { name: "Movers", icon: <Truck className="h-4 w-4" /> },
    { name: "HVAC", icon: <Wind className="h-4 w-4" /> },
    { name: "Plumbers", icon: <Droplet className="h-4 w-4" /> },
    { name: "Auto Repair", icon: <Car className="h-4 w-4" /> },
    { name: "Hair Stylists", icon: <Scissors className="h-4 w-4" /> },
    { name: "Restaurants", icon: <Utensils className="h-4 w-4" /> },
    { name: "Business Services", icon: <Briefcase className="h-4 w-4" /> },
    { name: "Photographers", icon: <Camera className="h-4 w-4" /> },
    { name: "Tutors", icon: <Pen className="h-4 w-4" /> },
    { name: "Bookstores", icon: <Book className="h-4 w-4" /> },
    { name: "IT Services", icon: <Laptop className="h-4 w-4" /> },
    { name: "Dry Cleaning", icon: <Shirt className="h-4 w-4" /> },
    { name: "Pet Care", icon: <Dog className="h-4 w-4" /> },
    { name: "Music Lessons", icon: <Music className="h-4 w-4" /> },
    { name: "Art Galleries", icon: <Palette className="h-4 w-4" /> },
    { name: "Fitness", icon: <Dumbbell className="h-4 w-4" /> },
    { name: "Healthcare", icon: <Heart className="h-4 w-4" /> },
    { name: "Travel", icon: <Plane className="h-4 w-4" /> },
    { name: "Solar Installation", icon: <Sun className="h-4 w-4" /> },
    { name: "Cafes", icon: <Coffee className="h-4 w-4" /> },
    { name: "Internet Providers", icon: <Wifi className="h-4 w-4" /> },
    { name: "Phone Repair", icon: <Phone className="h-4 w-4" /> },
    { name: "Grocery Delivery", icon: <ShoppingCart className="h-4 w-4" /> },
    { name: "TV Installation", icon: <Tv className="h-4 w-4" /> },
    { name: "Home Renovation", icon: <Home className="h-4 w-4" /> },
  ];

  const visibleCategories = showAll ? categories : categories.slice(0, 12);

  return (
    <HomeLayout>
      <div className="w-full max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-6">Categories</h2>
        <div className="flex flex-wrap gap-2">
          {visibleCategories.map((category) => (
            <Badge
              key={category.name}
              variant="secondary"
              className="flex items-center gap-1 px-3 py-1 text-xs cursor-pointer hover:bg-secondary/80"
            >
              {category.icon}
              <span>{category.name}</span>
            </Badge>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAll(!showAll)}
            className="ml-2"
          >
            {showAll ? (
              <>
                Less <ChevronUp className="ml-1 h-4 w-4" />
              </>
            ) : (
              <>
                More <ChevronDown className="ml-1 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {[...Array(6)].map((_, index) => (
            <FeaturedBusinessCard key={index} />
          ))}
        </div>
      </div>
    </HomeLayout>
  );
}
