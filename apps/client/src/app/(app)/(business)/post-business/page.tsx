"use client";

import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Briefcase,
  CalendarIcon,
  ChevronRight,
  DoorOpen,
  Home,
  Loader2,
  Upload,
  X,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { postroomschema } from "@/schemas";
import type { FormData } from "@/schemas";

import useGoogleAutocomplete from "@/hooks/use-googleAutocomplete";
import { useCityData } from "@/hooks/use-city-hooks";
import axios from "axios";
import { useSession } from "next-auth/react";
import { stateAbbreviations } from "@/constants";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useUserData } from "@/hooks/use-userData";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { any } from "zod";

const sections = [
  { id: "basic-info", title: "Basic Information" },
  { id: "pricing", title: "Pricing" },
  { id: "availability", title: "Availability" },
  { id: "amenities", title: "Amenities" },
  { id: "preferences", title: "Preferences" },
  { id: "photos", title: "Photos" },
  { id: "your-details", title: "Your Details" },
  { id: "submit", title: "Submit" },
];

export default function RoomPostingForm() {
  const { userData } = useUserData();
  const form = useForm({
    mode: "onChange",
    defaultValues: {
      userName: "",
      userPhone: "",
      businessName: "",
      legalName: "",
      businessType: "business",
      categories: [],
      address: "",
      website: "",
      phone: "",
      verificationMethod: "",
      openHours: "",
      description: "",
      languages: [],
      photos: [],
      sales: {
        description: "",
        startDate: "",
        endDate: "",
        posters: [],
        couponCodes: "",
      },
      pricing: "",
      availability: "",
      amenities: [],
      preferences: {
        smoking: false,
        pets: false,
        parties: false,
      },
    },
  });

  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const { cities, isLoading, error } = useCityData();
  const router = useRouter();

  const onSubmit = async (data: any) => {};

  const scrollToSection = (sectionId: string, offset = 130) => {
    const section = sectionRefs.current[sectionId];
    if (section) {
      const yOffset = offset; // Custom height to add
      const y =
        section.getBoundingClientRect().top + window.pageYOffset - yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  if (isLoading) {
    return <div>Loading cities...</div>;
  }

  return (
    <div className=" max-w-[1370px] lg:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-6 mt-[8rem] font-sans">
      <div className="py-1 mb-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/"
                className="flex items-center text-primary hover:text-primary-dark transition-colors"
              >
                <Home className="w-4 h-4 mr-2" />
                <span className="font-medium">Home</span>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/rooms"
                className="flex items-center text-primary hover:text-primary-dark transition-colors"
              >
                <Briefcase className="w-4 h-4 mr-2" />
                <span className="font-medium">Post Business</span>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className=" flex">
        <aside className="w-64 bg-[#232f3e] p-4 text-white ">
          <nav className="hidden  lg:block max-w-[1370px] lg:max-w-[1600px] mx-auto fixed overflow-y-auto h-[calc(100vh-7rem)]">
            <ul className="space-y-2 ">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    className={cn(
                      "w-full text-left px-4 py-2 rounded",
                      "hover:bg-white hover:text-[#232f3e]"
                    )}
                    onClick={() => scrollToSection(section.id)}
                  >
                    {section.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="flex-1 p-2 border overflow-y-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4 md:items-center">
                    <FormLabel className="md:w-1/4 text-md font-medium">
                      Title
                    </FormLabel>
                    <div className="flex-grow">
                      <FormControl>
                        <Input placeholder="Enter title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </main>
      </div>
    </div>
  );
}
