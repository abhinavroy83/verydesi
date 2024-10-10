"use client";

import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Upload, X } from "lucide-react";
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

import { postroomschema, FormData } from "@/schemas";

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
  const form = useForm<FormData>({
    resolver: zodResolver(postroomschema),
    mode: "onChange",
    defaultValues: {
      postingType: "Rooms",
      Title: "",
      description: "",
      propertyType: "apartment",
      stayLength: "short",
      priceModel: "monthly",
      price: 0,
      negotiable: false,
      hideRent: false,
      availableFrom: undefined,
      availableTo: undefined,
      immediate: false,
      separateBathroom: "1",
      securityDeposit: 0,
      toShare: "unfurnished",
      utilities: [],
      amenities: [],
      dietaryPreferences: [],
      smokingPolicy: [],
      petPolicy: [],
      openHouseDate: undefined,
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
  });

  const [images, setImages] = useState<File[]>([]);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const onSubmit = (data: FormData) => {
    console.log(data, images);
  };

  useEffect(() => {
    form.trigger();
  }, [form]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (images.length + files.length > 5) {
      alert("You can only upload up to 5 images");
      return;
    }
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const scrollToSection = (sectionId: string, offset = 130) => {
    const section = sectionRefs.current[sectionId];
    if (section) {
      const yOffset = offset; // Custom height to add
      const y =
        section.getBoundingClientRect().top + window.pageYOffset - yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="flex max-w-[1370px] lg:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-[6rem]">
      <nav className="hidden lg:block w-64 fixed left-[3.2rem] top-[7.9rem] overflow-y-auto h-[calc(100vh-7rem)]">
        <ul className="space-y-2">
          {sections.map((section) => (
            <li key={section.id}>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => scrollToSection(section.id)}
              >
                {section.title}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="lg:ml-64 w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div
              ref={(el) => {
                sectionRefs.current["basic-info"] = el;
              }}
              className="bg-white lg:p-[4rem] p-6 rounded-xl shadow-md border border-gray-200"
            >
              <h2 className="text-2xl font-bold mb-4">Basic Information</h2>
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="postingType"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4 md:items-center">
                      <FormLabel className="md:w-1/4 text-md font-medium">
                        Posting type
                      </FormLabel>
                      <div className="flex-grow">
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value) => {
                              field.onChange(value);
                              form.trigger("postingType");
                            }}
                            defaultValue={field.value}
                            className="flex"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="Rooms" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Rooms
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="Rental" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Rental
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="Title"
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

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4 md:items-start">
                      <FormLabel className="md:w-1/4 text-md font-medium">
                        Description
                      </FormLabel>
                      <div className="flex-grow">
                        <FormControl>
                          <Textarea
                            placeholder="Enter description"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="propertyType"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4 md:items-center">
                      <FormLabel className="md:w-1/4 text-md font-medium">
                        Property Type
                      </FormLabel>
                      <div className="flex-grow">
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select property type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="apartment">Apartment</SelectItem>
                            <SelectItem value="house">House</SelectItem>
                            <SelectItem value="condo">Condo</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="stayLength"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4 md:items-center">
                      <FormLabel className="md:w-1/4 text-md font-medium">
                        Stay Length
                      </FormLabel>
                      <div className="flex-grow">
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select stay length" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="short">
                              Short term (1-89 nights)
                            </SelectItem>
                            <SelectItem value="long">
                              Long term (90+ nights)
                            </SelectItem>
                            <SelectItem value="both">Both</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div
              ref={(el) => {
                sectionRefs.current["pricing"] = el;
              }}
              className="bg-white lg:p-[4rem] p-6 rounded-xl shadow-md border border-gray-200"
            >
              <h2 className="text-2xl font-bold mb-4">Pricing</h2>
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="priceModel"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4 md:items-center">
                      <FormLabel className="md:w-1/4 text-md font-medium">
                        Price Model
                      </FormLabel>
                      <div className="flex-grow">
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select price model" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4 md:items-center">
                      <FormLabel className="md:w-1/4 text-md font-medium">
                        Rent
                      </FormLabel>
                      <div className="flex-grow">
                        <FormControl>
                          <div className="flex items-center">
                            <span className="inline-flex items-center p-[0.5rem] rounded-l-md border border-r-0 border-gray-300 bg-gray-200 text-gray-500 text-sm">
                              $
                            </span>
                            <Input
                              type="number"
                              placeholder="Enter rent amount"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                              className="rounded-l-none"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4 md:items-center">
                  <FormLabel className="md:w-1/4 text-md font-medium">
                    Options
                  </FormLabel>
                  <div className="flex-grow flex space-x-4">
                    <FormField
                      control={form.control}
                      name="negotiable"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Negotiable</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="hideRent"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Hide Rent</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="securityDeposit"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-2 md:flex-row md:space-y-0  md:space-x-4 md:items-center">
                      <FormLabel className="md:w-1/4 text-md font-medium">
                        Security Deposit
                      </FormLabel>
                      <div className="flex-grow">
                        <FormControl>
                          <div className="flex items-center">
                            <span className="inline-flex items-center p-[0.5rem] rounded-l-md border border-r-0 border-gray-300 bg-gray-200 text-gray-500 text-sm">
                              $
                            </span>
                            <Input
                              type="number"
                              placeholder="Enter security deposit"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                              className="rounded-l-none"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div
              ref={(el) => {
                sectionRefs.current["availability"] = el;
              }}
              className="bg-white lg:p-[4rem] p-6 rounded-xl shadow-md border border-gray-200"
            >
              <h2 className="text-2xl font-bold mb-4">Availability</h2>
              <div className="space-y-6">
                <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4 md:items-start">
                  <FormLabel className="md:w-1/4 text-md font-medium">
                    Availability
                  </FormLabel>
                  <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="availableFrom"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Available From</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
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
                                selected={field.value}
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
                      name="availableTo"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Available To</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
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
                                selected={field.value}
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
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="immediate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4 md:items-center">
                      <FormLabel className="md:w-1/4 text-md font-medium">
                        Immediate
                      </FormLabel>
                      <div className="flex-grow">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="openHouseDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4 md:items-center">
                      <FormLabel className="md:w-1/4 text-md font-medium">
                        Open House Schedule
                      </FormLabel>
                      <div className="flex-grow">
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
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
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
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
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div
              ref={(el) => {
                sectionRefs.current["amenities"] = el;
              }}
              className="bg-white lg:p-[4rem] p-6 rounded-xl shadow-md border border-gray-200"
            >
              <h2 className="text-2xl font-bold mb-4">Amenities</h2>
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="separateBathroom"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4 md:items-center">
                      <FormLabel className="md:w-1/4 text-md font-medium">
                        Separate Bathroom
                      </FormLabel>
                      <div className="flex-grow">
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select number of bathrooms" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3+">3+</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="toShare"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4 md:items-center">
                      <FormLabel className="md:w-1/4 text-md font-medium">
                        Is room furnished?
                      </FormLabel>
                      <div className="flex-grow">
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select furnishing status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="furnished">Furnished</SelectItem>
                            <SelectItem value="unfurnished">
                              Unfurnished
                            </SelectItem>
                            <SelectItem value="partially">
                              Partially Furnished
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="utilities"
                  render={() => (
                    <FormItem className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4 md:items-start">
                      <div className="md:w-1/4 text-md font-medium">
                        <FormLabel className="text-base">
                          Utilities Include
                        </FormLabel>
                        <FormDescription>
                          Select the utilities included in the rent.
                        </FormDescription>
                      </div>
                      <div className="flex-grow grid grid-cols-2 md:grid-cols-4 gap-2">
                        {[
                          "Water",
                          "Wi-Fi",
                          "Electricity",
                          "Air Conditioner",
                          "Refrigerator",
                          "Dishwasher",
                          "Dryer",
                          "Washer",
                          "Kitchen",
                          "Microwave",
                          "TV",
                          "Heater",
                        ].map((item) => (
                          <FormField
                            key={item}
                            control={form.control}
                            name="utilities"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              item,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {item}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="amenities"
                  render={() => (
                    <FormItem className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4 md:items-start">
                      <div className="md:w-1/4 text-md font-medium">
                        <FormLabel className="text-base">
                          Amenities include
                        </FormLabel>
                        <FormDescription>
                          Select the amenities available in the property.
                        </FormDescription>
                      </div>
                      <div className="flex-grow grid grid-cols-2 md:grid-cols-4 gap-2">
                        {[
                          "Gym/Fitness Center",
                          "Swimming Pool",
                          "Car Park",
                          "Visitors Parking",
                          "Power Backup",
                          "Garbage Disposal",
                          "Private Lawn",
                          "Water Heater Plant",
                          "Security System",
                          "Laundry Service",
                          "Elevator",
                          "Club House",
                        ].map((item) => (
                          <FormField
                            key={item}
                            control={form.control}
                            name="amenities"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              item,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {item}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div
              ref={(el) => {
                sectionRefs.current["preferences"] = el;
              }}
              className="bg-white lg:p-[4rem] p-6 rounded-xl shadow-md border border-gray-200"
            >
              <h2 className="text-2xl font-bold mb-4">Preferences</h2>
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="dietaryPreferences"
                  render={() => (
                    <FormItem className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4 md:items-start">
                      <div className="md:w-1/4 text-md font-medium">
                        <FormLabel className="text-base">
                          Dietary Preferences
                        </FormLabel>
                        <FormDescription>
                          Select the dietary preferences for the room.
                        </FormDescription>
                      </div>
                      <div className="flex-grow">
                        {["Vegetarian", "Non-veg", "Both Ok"].map((item) => (
                          <FormField
                            key={item}
                            control={form.control}
                            name="dietaryPreferences"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item}
                                  className="flex flex-row items-start space-x-3 space-y-0 mb-2"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              item,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {item}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="smokingPolicy"
                  render={() => (
                    <FormItem className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4 md:items-start">
                      <div className="md:w-1/4 text-md font-medium">
                        <FormLabel className="text-base">
                          Smoking Policy
                        </FormLabel>
                        <FormDescription>
                          Select the smoking policy for the room.
                        </FormDescription>
                      </div>
                      <div className="flex-grow">
                        {["No Smoking", "Smoking ok", "Smoke outside only"].map(
                          (item) => (
                            <FormField
                              key={item}
                              control={form.control}
                              name="smokingPolicy"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item}
                                    className="flex flex-row items-start space-x-3 space-y-0 mb-2"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...field.value,
                                                item,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item
                                                )
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {item}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          )
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="petPolicy"
                  render={() => (
                    <FormItem className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4 md:items-start">
                      <div className="md:w-1/4 text-md font-medium">
                        <FormLabel className="text-base">Pet Policy</FormLabel>
                        <FormDescription>
                          Select the pet policy for the room.
                        </FormDescription>
                      </div>
                      <div className="flex-grow">
                        {["No Pets", "Cats", "Small Dogs", "Any Pets"].map(
                          (item) => (
                            <FormField
                              key={item}
                              control={form.control}
                              name="petPolicy"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item}
                                    className="flex flex-row items-start space-x-3 space-y-0 mb-2"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...field.value,
                                                item,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item
                                                )
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {item}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          )
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div
              ref={(el) => {
                sectionRefs.current["photos"] = el;
              }}
              className="bg-white lg:p-[4rem] p-6 rounded-xl shadow-md border border-gray-200"
            >
              <h2 className="text-2xl font-bold mb-4">Photos</h2>
              <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4 md:items-start">
                <Label className="text-lg font-semibold md:w-1/4 text-md">
                  Add your photos (up to 5)
                </Label>
                <div className="flex-grow">
                  <div className="border-2 border-dashed border-gray-300 p-4 text-center rounded-lg mt-2">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">
                        Click to upload or drag and drop
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </label>
                  </div>
                  <div className="grid grid-cols-5 gap-4 mt-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Uploaded image ${index + 1}`}
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
                </div>
              </div>
            </div>

            <div
              ref={(el) => {
                sectionRefs.current["your-details"] = el;
              }}
              className="bg-white lg:p-[4rem] p-6 rounded-xl shadow-md border border-gray-200"
            >
              <h2 className="text-2xl font-bold mb-4">Your Details</h2>
              <div className="space-y-4">
                {[
                  { name: "name", label: "Name", type: "text" },
                  { name: "email", label: "Email", type: "email" },
                  { name: "phoneNumber", label: "Phone Number", type: "tel" },
                  { name: "address", label: "Address", type: "text" },
                ].map((fieldInfo) => (
                  <FormField
                    key={fieldInfo.name}
                    control={form.control}
                    name={fieldInfo.name as keyof FormData}
                    render={({ field }) => (
                      <FormItem className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4 md:items-center">
                        <FormLabel className="md:w-1/4 text-md font-medium">
                          {fieldInfo.label}
                        </FormLabel>
                        <div className="flex-grow">
                          <FormControl>
                            <Input
                              className=""
                              type={fieldInfo.type}
                              {...field}
                              value={field.value as string}
                            />
                          </FormControl>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                ))}
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { name: "city", label: "City" },
                    { name: "state", label: "State" },
                    { name: "zipCode", label: "Zipcode" },
                    { name: "country", label: "Country" },
                  ].map((fieldInfo) => (
                    <FormField
                      key={fieldInfo.name}
                      control={form.control}
                      name={fieldInfo.name as keyof FormData}
                      render={({ field }) => (
                        <FormItem className="flex flex-col md:flex-row md:space-y-0 md:space-x-4 md:items-center">
                          <FormLabel className="md:w-1/4 text-md font-medium">
                            {fieldInfo.label}
                          </FormLabel>
                          <div className="flex-grow">
                            <FormControl>
                              <Input {...field} value={field.value as string} />
                            </FormControl>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div
              ref={(el) => {
                sectionRefs.current["submit"] = el;
              }}
            >
              <Button
                type="submit"
                className="flex items-center justify-center"
              >
                Add New Room
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
