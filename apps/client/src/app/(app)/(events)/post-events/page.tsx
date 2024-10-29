"use client";

import { useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  ChevronRight,
  Clock,
  Home,
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
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
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

const formSchema = z.object({
  eventTitle: z.string().min(2, {
    message: "Event title must be at least 2 characters.",
  }),
  eventType: z.string(),
  eventName: z.string().min(2, {
    message: "Event name must be at least 2 characters.",
  }),
  startDate: z.date(),
  startTime: z.string(),
  endDate: z.date(),
  endTime: z.string(),
  timeZone: z.string(),
  repeatEvent: z.string(),
  venueName: z.string(),
  address: z.string().optional(),
  city: z.string().optional(),
  zipCode: z.string().optional(),
  country: z.string().optional(),
  languages: z.array(z.string()),
  artists: z.array(z.object({ name: z.string() })),
  images: z.array(z.string()).max(5, "You can upload a maximum of 5 images"),
});

export default function EventForm() {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [eventType, setEventType] = useState<string | undefined>();
  const [images, setImages] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventTitle: "",
      eventName: "",
      startDate: new Date(),
      startTime: "00:00",
      endDate: new Date(),
      endTime: "03:00",
      timeZone: "PDT",
      repeatEvent: "never",
      venueName: "FBC Portland",
      address: "909 Southwest 11th Avenue, Portland, OR, USA",
      city: "Portland",
      zipCode: "97205",
      country: "US",
      languages: [],
      artists: [{ name: "" }],
      images: [],
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
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
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
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages((prevImages) => [...prevImages, ...newImages].slice(0, 5));
      form.setValue(
        "images",
        [...form.getValues("images"), ...newImages].slice(0, 5)
      );
    }
  };

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    form.setValue(
      "images",
      form.getValues("images").filter((_, i) => i !== index)
    );
  };

  return (
    <div className=" max-w-[1370px] lg:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 mt-[8rem] font-sans">
      <div className="py-1 mb-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/events"
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
            <ul className="space-y-2 text-gray-500">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
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
          <h1 className="text-[24px] text-center font-bold py-1">
            Post Event In
          </h1>

          <div
            ref={(el) => {
              sectionRefs.current["basic-info"] = el;
            }}
            className="space-y-2"
          >
            <h2 className="text-2xl font-bold lg:px-6">Basic Information</h2>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
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
                              <FormLabel>Is it in person or virtual?</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  id="event-type"
                                  value={field.value}
                                  onValueChange={(value) => {
                                    field.onChange(value);
                                    setEventType(value);
                                  }}
                                  className="space-y-1"
                                >
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                      value="in-person"
                                      id="in-person"
                                    />
                                    <Label htmlFor="in-person">In Person</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                      value="virtual"
                                      id="virtual"
                                    />
                                    <Label htmlFor="virtual">Virtual</Label>
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
                      sectionRefs.current["datetime"] = el;
                    }}
                  >
                    <h2 className="text-2xl font-bold mb-4">Date and time</h2>
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
                                    <Input
                                      type="time"
                                      {...field}
                                      className=" w-full"
                                    />
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
                                    <SelectItem value="PDT">PDT</SelectItem>
                                    {/* Add more time zones as needed */}
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
                                    <SelectItem value="PDT">PDT</SelectItem>
                                    {/* Add more time zones as needed */}
                                  </SelectContent>
                                </Select>
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
                                  <SelectItem value="weekly">Weekly</SelectItem>
                                  <SelectItem value="monthly">
                                    Monthly
                                  </SelectItem>
                                  <SelectItem value="custom">Custom</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
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
                                    <SelectItem value="PDT">PDT</SelectItem>
                                    {/* Add more time zones as needed */}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {eventType !== "virtual" && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="venueName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Enter a new Venue / select from existing venue
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter the venue's name"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Address *</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter address" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State *</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
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
                      </div>
                      <div className="w-full h-64 bg-gray-200 rounded-md flex items-center justify-center">
                        <MapPin className="h-8 w-8 text-gray-400" />
                        <span className="ml-2 text-gray-500">
                          Google Maps Embed Placeholder
                        </span>
                      </div>
                    </>
                  )}

                  <div className=" space-y-3">
                    <div className="space-y-2">
                      <Label>Language</Label>
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
                            onClick={() => toggleLanguage(lang.code)}
                            className="text-sm"
                          >
                            {lang.name}
                          </Button>
                        ))}
                      </div>
                      <div className="mt-2">
                        {selectedLanguages && (
                          <Label>Selected Languages:</Label>
                        )}
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedLanguages.map((code) => (
                            <div
                              key={code}
                              className="bg-primary text-primary-foreground rounded-full px-3 py-1 text-sm flex items-center"
                            >
                              {
                                languages.find((lang) => lang.code === code)
                                  ?.name
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
                            <div className="space-y-2">
                              <Label htmlFor="organization">
                                Organization name *
                              </Label>
                              <Input
                                id="organization"
                                placeholder="Buckhead Baptist Church"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="hostedBy">Hosted By *</Label>
                              <Input id="hostedBy" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="contactNumber">
                                Contact Number
                              </Label>
                              <Input
                                id="contactNumber"
                                placeholder="404-255-5112"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <h3 className="text-lg font-semibold mb-4">
                            Artist details
                          </h3>
                          {artistFields.map((field, index) => (
                            <div
                              key={field.id}
                              className="flex items-center space-x-2 mb-2"
                            >
                              <Input
                                {...form.register(`artists.${index}.name`)}
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
                          ))}
                          <Button
                            type="button"
                            onClick={() => appendArtist({ name: "" })}
                          >
                            Add Artist
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                    {/* <Card>
                          <CardContent className="pt-6">
                            <h3 className="text-lg font-semibold mb-4">
                              Tax Details
                            </h3>
                            <div className="space-y-2">
                              <Label>
                                Is your organization a non-profit, tax-exempt
                                501(c)(3) organization?
                              </Label>
                              <RadioGroup defaultValue="yes" className="flex">
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="yes" id="tax-yes" />
                                  <Label htmlFor="tax-yes">Yes</Label>
                                </div>
                                <div className="flex items-center space-x-2 ml-4">
                                  <RadioGroupItem value="no" id="tax-no" />
                                  <Label htmlFor="tax-no">No</Label>
                                </div>
                              </RadioGroup>
                            </div>
                            <div className="space-y-2 mt-4">
                              <Label htmlFor="taxId">Enter your Tax ID#</Label>
                              <Input id="taxId" placeholder="Tax ID" />
                            </div>
                          </CardContent>
                        </Card> */}

                    <Card>
                      <CardContent className="pt-6">
                        <h3 className="text-lg font-semibold mb-4">
                          Event Entry
                        </h3>
                        <div className="space-y-2">
                          <Label>Select your event's entry option:</Label>
                          <RadioGroup defaultValue="free" className="flex">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="free" id="entry-free" />
                              <Label htmlFor="entry-free">Free entry</Label>
                            </div>
                            <div className="flex items-center space-x-2 ml-4">
                              <RadioGroupItem value="paid" id="entry-paid" />
                              <Label htmlFor="entry-paid">Paid entry</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </CardContent>
                    </Card>

                    <div
                      ref={(el) => {
                        sectionRefs.current["Description"] = el;
                      }}
                    >
                      <h2 className="text-2xl font-bold mb-4">Description</h2>
                      <Card>
                        <div className="space-y-2">
                          {/* <Label htmlFor="description">
                              Enter description
                            </Label> */}
                          <Textarea
                            id="description"
                            placeholder="Enter description"
                            className="min-h-[100px]"
                          />
                        </div>
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
                          <h3 className="text-lg font-semibold mb-4">Photos</h3>
                          <p className="text-sm text-gray-500 mb-2">
                            Add your photos (up to 5)
                          </p>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                            <input
                              type="file"
                              id="image-upload"
                              className="hidden"
                              multiple
                              accept="image/*"
                              onChange={handleImageUpload}
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
                                  src={image}
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
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <Button type="submit">Create Event</Button>
                </form>
              </Form>
            </CardContent>
          </div>
        </main>
      </div>
    </div>
  );
}
