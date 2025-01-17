"use client";

import { useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  ChevronDown,
  ChevronRight,
  Clock,
  Home,
  Loader2,
  MapPin,
  Repeat,
  Video,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Upload } from "lucide-react";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useCityData } from "@/hooks/use-city-hooks";
import useGoogleAutocomplete from "@/hooks/use-googleAutocomplete";
import axios from "axios";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { EventformData, EventformSchema } from "@/schema";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/Layout/Dashboardlayout";

const languages = [
  { name: "Hindi", code: "hi" },
  { name: "Telugu", code: "te" },
  { name: "Tamil", code: "ta" },
  { name: "Malayalam", code: "ml" },
  { name: "Bengali", code: "bn" },
  { name: "Gujarati", code: "gu" },
  { name: "English", code: "en" },
  { name: "Marathi", code: "mr" },
  { name: "Punjabi", code: "pa" },
  { name: "Kannada", code: "kn" },
  { name: "Urdu", code: "ur" },
];

const USA_TIME_ZONES = [
  { value: "HST", label: "Hawaii-Aleutian Standard Time (HST)" },
  { value: "AKST", label: "Alaska Standard Time (AKST)" },
  { value: "PST", label: "Pacific Standard Time (PST)" },
  { value: "MST", label: "Mountain Standard Time (MST)" },
  { value: "CST", label: "Central Standard Time (CST)" },
  { value: "EST", label: "Eastern Standard Time (EST)" },
  {
    value: "AST",
    label: "Atlantic Standard Time (AST) - Puerto Rico, U.S. Virgin Islands",
  },
  { value: "SST", label: "Samoa Standard Time (SST) - American Samoa" },
  {
    value: "ChST",
    label: "Chamorro Standard Time (ChST) - Guam, Northern Mariana Islands",
  },
];
export default function EventForm() {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [eventType, setEventType] = useState<string | undefined>();
  const [images, setImages] = useState<File[]>([]);
  const [imageurl, setimageurls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addressComponents, location } = useGoogleAutocomplete();

  const form = useForm<z.infer<typeof EventformSchema>>({
    resolver: zodResolver(EventformSchema),
    defaultValues: {
      eventpostingcity: "Portland",
      startDate: new Date(),
      startTime: "00:00",
      endDate: new Date(),
      endTime: "03:00",
      languages: [],
      entryoption: "",
    },
  });
  const {
    fields: artistFields,
    append: appendArtist,
    remove: removeArtist,
  } = useFieldArray({
    control: form.control,
    name: "artists",
  });

  const { cities, isLoading, error } = useCityData();
  const { register, watch } = form;

  const entryoption = watch("entryoption");
  console.log(entryoption);
  useEffect(() => {
    if (Object.keys(addressComponents).length > 0) {
      form.setValue(
        "address",
        `${addressComponents.street_number} ${addressComponents.street}`
      );
      form.setValue("city", addressComponents.city);
      form.setValue("state", addressComponents.state);
      form.setValue("zipCode", addressComponents.zipCode);
      form.setValue("country", addressComponents.country);
    }
  }, [addressComponents, form]);

  const scrollToSection = (sectionId: string, offset = 130) => {
    const section = sectionRefs.current[sectionId];
    if (section) {
      const yOffset = offset;
      const y =
        section.getBoundingClientRect().top + window.pageYOffset - yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };
  const sections = [
    { id: "basic-info", label: "Basic Information" },
    { id: "Addrs", label: "Address" },
    { id: "datetime", label: "Date and time" },
    { id: "availability", label: "Category & Language" },
    { id: "Artist", label: "Organizer & Artist details" },
    { id: "Description", label: "Description" },
    { id: "photos", label: "Upload banners" },
  ];

  const toggleLanguage = (code: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(code)
        ? prev.filter((lang) => lang !== code)
        : [...prev, code]
    );
    const currentLanguages = form.getValues("languages");
    if (currentLanguages.includes(code)) {
      form.setValue(
        "languages",
        currentLanguages.filter((lang) => lang !== code)
      );
    } else {
      form.setValue("languages", [...currentLanguages, code]);
    }
  };

  //upload image

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (images.length + files.length > 5) {
      alert("You can only upload up to 5 images");
      return;
    }
    setImages((prevImages) => {
      const updatefiles = [...prevImages, ...files];
      return updatefiles;
    });
  };

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setimageurls((prevUrls) => prevUrls.filter((_, i) => i !== index));
  };

  const uploadtos3 = async (updatefiles: File[]) => {
    setIsUploading(true);
    try {
      const data = new FormData();
      updatefiles.forEach((file) => {
        data.append("my_files", file);
      });
      const res = await axios.post(
        "https://apiv2.verydesi.com/img/upload",
        data
      );
      console.log(res.data.urls);
      setimageurls(res.data.urls);
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    if (images.length > 0) {
      uploadtos3(images);
    }
  }, [images]);

  const router = useRouter();
  const { data: session } = useSession();

  const onSubmit = async (data: z.infer<typeof EventformSchema>) => {
    setIsSubmitting(true);
    // console.log(data)
    try {
      const token = session?.user.accessToken;
      if (!token) {
        throw new Error("token not found");
      }
      if (!location || !imageurl) {
        throw new Error("Location or image URL is missing.");
      }
      const payload = {
        ...data,
        images: imageurl,
        location: {
          coordinates: [location?.lng, location?.lat],
        },
      };
      // console.log("payload", payload);
      const res = await axios.post(
        "https://apiv2.verydesi.com/event/postevent",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(res);
      if (res.data) {
        toast.success("Event added successully");
        form.reset();
        // router.push("/post/event");
      }
      // console.log("Payload:", payload);

      alert("Form submitted successfully!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Failed to post the event."
        );
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div>Loading cities...</div>;
  }
  return (
    <DashboardLayout>
      <div className=" max-w-[1370px] lg:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 font-sans">
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
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  <span className="font-medium">Post Event</span>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex ">
          <aside className="w-64 bg-[#232f3e] p-4 text-white ">
            <nav className="hidden lg:block max-w-[1370px] lg:max-w-[1600px] mx-auto fixed overflow-y-auto h-[calc(100vh-7rem)]">
              <ul className="space-y-2 ">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      type="button"
                      className={cn(
                        "w-full text-left px-4 py-2 rounded",
                        "hover:bg-white hover:text-[#232f3e]"
                      )}
                      onClick={() => scrollToSection(section.id)}
                    >
                      {section.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
          <main className="flex-1 p-2 border overflow-y-auto">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="flex gap-2 items-center justify-center space-y-4 w-full mx-auto">
                  <h1 className="text-[24px] font-bold text-center mt-3">
                    Post Event In
                  </h1>
                  <FormField
                    control={form.control}
                    name="eventpostingcity"
                    render={({ field }) => (
                      <FormItem className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4 md:items-center">
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select posting city" />
                            </SelectTrigger>
                            <SelectContent>
                              {cities.map((city) => (
                                <SelectItem key={city} value={city}>
                                  <p className="text-xl font-bold"> {city}</p>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div
                  ref={(el) => {
                    sectionRefs.current["basic-info"] = el;
                  }}
                  className="space-y-2"
                >
                  <h2 className="text-2xl font-bold lg:px-6">
                    Basic Information
                  </h2>
                  <CardContent>
                    <div
                      ref={(el) => {
                        sectionRefs.current["basic-info"] = el;
                      }}
                    >
                      <Card>
                        <CardContent className="pt-6">
                          <FormField
                            control={form.control}
                            name="eventTitle"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Event Title *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Event name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="eventType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  Is it in person or virtual?
                                </FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    id="event-type"
                                    value={field.value}
                                    onValueChange={(value) => {
                                      field.onChange(value);
                                      setEventType(value);
                                    }}
                                    className="space-x-6 flex"
                                  >
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem
                                        value="in-person"
                                        id="in-person"
                                      />
                                      <Label htmlFor="in-person">
                                        In Person
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem
                                        value="virtual"
                                        id="virtual"
                                      />
                                      <Label htmlFor="virtual">Virtual</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="Both" id="Both" />
                                      <Label htmlFor="virtual">Both</Label>
                                    </div>
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </CardContent>
                      </Card>
                    </div>
                    <div
                      ref={(el) => {
                        sectionRefs.current["Addrs"] = el;
                      }}
                    >
                      <h2 className="text-2xl font-bold py-4">Address</h2>

                      <Card>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-4 py-2">
                            <FormField
                              control={form.control}
                              name="address"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Physical Address</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="text"
                                      id="address"
                                      placeholder="Enter business address"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            {[
                              {
                                name: "venueName",
                                label:
                                  "Enter a new Venue / select from existing venue",
                                placeholder: "Enter the venue's name",
                              },
                              {
                                name: "city",
                                label: "City",
                                placeholder: "Enter city",
                              },
                              {
                                name: "state",
                                label: "State *",
                                placeholder: "Enter state",
                              },
                            ].map((fieldInfo) => (
                              <FormField
                                key={fieldInfo.name}
                                control={form.control}
                                name={fieldInfo.name as keyof EventformData}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>{fieldInfo.label}</FormLabel>
                                    <FormControl>
                                      <Input
                                        type="text"
                                        id={fieldInfo.name}
                                        {...field}
                                        value={field.value as string}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            ))}
                          </div>

                          <div className="grid grid-cols-2 gap-4 py-2">
                            <FormField
                              control={form.control}
                              name="zipCode"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>ZIP/POSTAL *</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="country"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Country *</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select country" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="US">
                                        United States
                                      </SelectItem>
                                      {/* Add more countries as needed */}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="virtualurl"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Virtual event Link</FormLabel>
                                  <FormControl>
                                    <Input {...field} className=" w-full" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    <div
                      ref={(el) => {
                        sectionRefs.current["datetime"] = el;
                      }}
                    >
                      <h2 className="text-2xl font-bold my-3">Date and time</h2>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormField
                              control={form.control}
                              name="startDate"
                              render={({ field }) => (
                                <FormItem className="flex flex-col w-full">
                                  <FormLabel>Start date</FormLabel>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <FormControl>
                                        <Button
                                          type="button"
                                          variant={"outline"}
                                          className={cn(
                                            "w-[240px] pl-3 text-left font-normal",
                                            !field.value &&
                                              "text-muted-foreground"
                                          )}
                                        >
                                          {field.value ? (
                                            format(field.value, "PPP")
                                          ) : (
                                            <span>Pick a date</span>
                                          )}
                                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                      </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                      className="w-auto p-0"
                                      align="start"
                                    >
                                      <Calendar
                                        mode="single"
                                        // selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                          date < new Date() ||
                                          date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                      />
                                    </PopoverContent>
                                  </Popover>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="startTime"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Start time</FormLabel>
                                  <FormControl>
                                    <div className="">
                                      <Input type="time" {...field} />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="timeZone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Time zone</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select time zone" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {USA_TIME_ZONES.map((tz) => (
                                        <SelectItem
                                          key={tz.value}
                                          value={tz.value}
                                        >
                                          {tz.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormField
                              control={form.control}
                              name="endDate"
                              render={({ field }) => (
                                <FormItem className="flex flex-col">
                                  <FormLabel>End date</FormLabel>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <FormControl>
                                        <Button
                                          type="button"
                                          variant={"outline"}
                                          className={cn(
                                            "w-[240px] pl-3 text-left font-normal",
                                            !field.value &&
                                              "text-muted-foreground"
                                          )}
                                        >
                                          {field.value ? (
                                            format(field.value, "PPP")
                                          ) : (
                                            <span>Pick a date</span>
                                          )}
                                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                      </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                      className="w-auto p-0"
                                      align="start"
                                    >
                                      <Calendar
                                        mode="single"
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                          date < new Date() ||
                                          date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                      />
                                    </PopoverContent>
                                  </Popover>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="endTime"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>End time</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <Input type="time" {...field} />

                                      {/* <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" /> */}
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name="repeatEvent"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Repeat event</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <Repeat className="h-4 w-4 text-gray-400 mr-2" />
                                      <SelectValue placeholder="Select repeat frequency" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="never">Never</SelectItem>
                                    <SelectItem value="daily">Daily</SelectItem>
                                    <SelectItem value="weekly">
                                      Weekly
                                    </SelectItem>
                                    <SelectItem value="monthly">
                                      Monthly
                                    </SelectItem>
                                    <SelectItem value="custom">
                                      Custom
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </CardContent>
                      </Card>
                    </div>
                    <div className=" space-y-3">
                      <div className="space-y-2">
                        <FormField
                          control={form.control}
                          name="languages"
                          render={() => (
                            <FormItem>
                              <FormLabel>Language</FormLabel>
                              <FormControl>
                                <div className="space-y-2">
                                  <div className="flex flex-wrap gap-2">
                                    {languages.map((lang) => (
                                      <Button
                                        type="button"
                                        key={lang.code}
                                        variant={
                                          selectedLanguages.includes(lang.code)
                                            ? "default"
                                            : "outline"
                                        }
                                        onClick={() =>
                                          toggleLanguage(lang.code)
                                        }
                                        className="text-sm"
                                      >
                                        {lang.name}
                                      </Button>
                                    ))}
                                  </div>
                                  <div className="mt-2">
                                    {selectedLanguages.length > 0 && (
                                      <Label>Selected Languages:</Label>
                                    )}
                                    <div className="flex flex-wrap gap-2 mt-1">
                                      {selectedLanguages.map((code) => (
                                        <div
                                          key={code}
                                          className="bg-primary text-primary-foreground rounded-full px-3 py-1 text-sm flex items-center"
                                        >
                                          {
                                            languages.find(
                                              (lang) => lang.code === code
                                            )?.name
                                          }
                                          <button
                                            type="button"
                                            onClick={() => toggleLanguage(code)}
                                            className="ml-2 focus:outline-none"
                                          >
                                            <X className="h-4 w-4" />
                                          </button>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div
                        ref={(el) => {
                          sectionRefs.current["Artist"] = el;
                        }}
                        className="flex lg:flex-col gap-3"
                      >
                        <h2 className="text-2xl font-bold mb-2">
                          Organizer & Artist details{" "}
                        </h2>
                        <Card>
                          <CardContent className="pt-6">
                            <h3 className="text-lg font-semibold mb-4">
                              Organizer
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <FormField
                                control={form.control}
                                name="organization"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel htmlFor="organization">
                                      Organization name *
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        id="organization"
                                        placeholder="Buckhead Baptist Church"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="hostedBy"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel htmlFor="hostedBy">
                                      Hosted By *
                                    </FormLabel>
                                    <FormControl>
                                      <Input id="hostedBy" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="contactNumber"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel htmlFor="contactNumber">
                                      Contact Number
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        id="contactNumber"
                                        placeholder="404-255-5112"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </CardContent>
                          <CardContent className="">
                            <h3 className="text-lg font-semibold mb-4 ">
                              Artist details
                            </h3>
                            {artistFields.map((field, index) => (
                              <FormField
                                key={field.id}
                                control={form.control}
                                name={`artists.${index}.name`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <div className="flex items-center space-x-2 mb-2">
                                        <Input
                                          {...field}
                                          placeholder="Artist name"
                                        />
                                        <Button
                                          type="button"
                                          variant="outline"
                                          size="icon"
                                          onClick={() => removeArtist(index)}
                                        >
                                          <X className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            ))}
                            <Button
                              className="bg-green-800"
                              type="button"
                              onClick={() => appendArtist({ name: "" })}
                            >
                              Add Artist
                            </Button>
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardContent className="pt-6">
                          <h3 className="text-lg font-semibold mb-4">
                            Event Entry
                          </h3>

                          <FormField
                            control={form.control}
                            name="entryoption"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  Select your event's entry option:
                                </FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    defaultValue="free"
                                    className="flex"
                                    value={field.value}
                                    onValueChange={(value) => {
                                      field.onChange(value);
                                    }}
                                  >
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem
                                        value="free"
                                        id="entry-free"
                                      />
                                      <Label htmlFor="entry-free">
                                        Free entry
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-2 ml-4">
                                      <RadioGroupItem
                                        value="paid"
                                        id="entry-paid"
                                      />
                                      <Label htmlFor="entry-paid">
                                        Paid entry
                                      </Label>
                                    </div>
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {entryoption === "paid" && (
                            <FormField
                              control={form.control}
                              name="eventprice"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Event price </FormLabel>
                                  <FormControl>
                                    <Input placeholder="$32" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          )}
                        </CardContent>
                      </Card>

                      <div
                        ref={(el) => {
                          sectionRefs.current["Description"] = el;
                        }}
                      >
                        <h2 className="text-2xl font-bold my-3">
                          Description{" "}
                        </h2>
                        <Card>
                          <CardContent className="pt-6">
                            <FormField
                              control={form.control}
                              name="description"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Description</FormLabel>
                                  <FormControl>
                                    <Textarea
                                      placeholder="Enter description"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </CardContent>
                        </Card>
                      </div>
                      <div
                        ref={(el) => {
                          sectionRefs.current["photos"] = el;
                        }}
                      >
                        <h2 className="text-2xl font-bold mb-4">
                          Upload banners{" "}
                        </h2>
                        <Card>
                          <CardContent className="pt-6">
                            <h3 className="text-lg font-semibold mb-4">
                              Photos
                            </h3>
                            <p className="text-sm text-gray-500 mb-2">
                              Add your photos (up to 5)
                            </p>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                              <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageUpload}
                                className="hidden"
                                id="image-upload"
                              />
                              <label
                                htmlFor="image-upload"
                                className="cursor-pointer"
                              >
                                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                <p className="mt-2 text-sm text-gray-500">
                                  Click to upload or drag and drop
                                </p>
                                <p className="text-xs text-gray-500">
                                  PNG, JPG, GIF up to 10MB
                                </p>
                              </label>
                            </div>
                            <div className="mt-4 grid grid-cols-5 gap-4">
                              {images.map((image, index) => (
                                <div key={index} className="relative">
                                  <img
                                    src={URL.createObjectURL(image)}
                                    alt={`Uploaded ${index + 1}`}
                                    className="w-full h-24 object-cover rounded"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                </div>
                              ))}
                            </div>
                            {isUploading && (
                              <div className="flex items-center justify-center mt-4">
                                <Loader2 className="h-6 w-6 animate-spin mr-2" />
                                <span>Uploading images...</span>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                    <Button
                      className="bg-green-800 mt-7"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit"
                      )}
                    </Button>
                  </CardContent>
                </div>
              </form>
            </Form>
          </main>
        </div>
      </div>
    </DashboardLayout>
  );
}
