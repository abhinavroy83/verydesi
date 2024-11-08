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
import { EventformData, EventformSchema } from "@/schemas";
import { useCityData } from "@/hooks/use-city-hooks";
import useGoogleAutocomplete from "@/hooks/use-googleAutocomplete";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

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
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addressComponents, location } = useGoogleAutocomplete();
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.006 });
  const [markerPosition, setMarkerPosition] =
    useState<google.maps.LatLngLiteral | null>(null);
  const { setValue } = useForm();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDvMKQoLUgFGa6RUe91iG3NwcOe6ljj4vw",
  });

  const form = useForm<z.infer<typeof EventformSchema>>({
    resolver: zodResolver(EventformSchema),
    defaultValues: {
      eventpostingcity: "Portland",
      eventTitle: "",
      startDate: new Date(),
      startTime: "00:00",
      endDate: new Date(),
      endTime: "03:00",
      timeZone: "",
      repeatEvent: "",
      venueName: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      languages: [],
      organization: "",
      hostedBy: "",
      contactNumber: "",
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

  // useEffect(() => {
  //   if (location) {
  //     setMapCenter(location);
  //     setMarkerPosition(location);
  //   }
  // }, [location]);

  // const onMapClick = (e: google.maps.MapMouseEvent) => {
  //   if (e.latLng) {
  //     const newPosition = { lat: e.latLng.lat(), lng: e.latLng.lng() };
  //     setMarkerPosition(newPosition);
  //     // You might want to update the form with these new coordinates
  //     setValue("latitude", newPosition.lat);
  //     setValue("longitude", newPosition.lng);
  //   }
  // };

  const { cities, isLoading, error } = useCityData();

  useEffect(() => {
    if (Object.keys(addressComponents).length > 0) {
      form.setValue(
        "address",
        `${addressComponents.street_number} ${addressComponents.street}`
      );
    }
  }, [addressComponents, form]);

  const onSubmit = async (data: z.infer<typeof EventformSchema>) => {
    console.log(data);
    setIsSubmitting(true);
    try {
      console.log(data);
      // Here you would typically send the data to your backend
      // await sendDataToBackend(data)
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    } finally {
      setIsSubmitting(false);
    }
  };
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
  if (isLoading) {
    return <div>Loading cities...</div>;
  }
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
                    {section.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-2 border overflow-y-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                          name="address"
                          render={({ field }) => (
                            <FormItem className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4 md:items-center">
                              <FormLabel className="md:w-1/4 text-md font-medium">
                                Physical Address
                              </FormLabel>
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
                      sectionRefs.current["Addrs"] = el;
                    }}
                  >
                    <h2 className="text-2xl font-bold py-4">Address</h2>
                    {eventType == "in-person" && (
                      <Card>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-4 py-2">
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
                          </div>
                          {/* <div className="w-full h-64 rounded-md">
                            {isLoaded ? (
                              <GoogleMap
                                mapContainerStyle={{
                                  width: "100%",
                                  height: "100%",
                                }}
                                center={mapCenter}
                                zoom={10}
                                onClick={onMapClick}
                              >
                                {markerPosition && (
                                  <Marker position={markerPosition} />
                                )}
                              </GoogleMap>
                            ) : (
                              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-500">
                                  Loading map...
                                </span>
                              </div>
                            )}
                          </div> */}
                        </CardContent>
                      </Card>
                    )}

                    {eventType == "virtual" && (
                      <Card>
                        <CardContent>
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
                        </CardContent>
                      </Card>
                    )}
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
                                      onClick={() => toggleLanguage(lang.code)}
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
                      </CardContent>
                    </Card>

                    <div
                      ref={(el) => {
                        sectionRefs.current["Description"] = el;
                      }}
                    >
                      <h2 className="text-2xl font-bold my-3">Description </h2>
                      <Card>
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              {/* <FormLabel>Event Title *</FormLabel> */}
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
                  <Button
                    className="bg-green-800 mt-7"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Create Event"}
                  </Button>{" "}
                </CardContent>
              </div>
            </form>
          </Form>
        </main>
      </div>
    </div>
  );
}
