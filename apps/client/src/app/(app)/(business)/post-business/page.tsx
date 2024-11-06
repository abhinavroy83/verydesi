"use client";

import { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import {
  Briefcase,
  CalendarIcon,
  ChevronRight,
  Home,
  Upload,
  X,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const formSchema = z.object({
  userName: z.string().min(1, "Name is required"),
  userPhone: z.string().min(1, "Phone number is required"),
  businessName: z.string().min(1, "Business name is required"),
  legalName: z.string().min(1, "Legal name is required"),
  businessType: z.enum(["business", "service"]),
  categories: z.array(z.string()).min(1, "Select at least one category"),
  address: z.string().min(1, "Address is required"),
  website: z.string().url().optional().or(z.literal("")),
  phone: z.string().min(1, "Phone number is required"),
  verificationMethod: z.enum([
    "ein",
    "license",
    "bill",
    "registration",
    "other",
  ]),
  einNumber: z.string().length(9, "EIN must be 9 digits").optional(),
  openHours: z.string().min(1, "Open hours are required"),
  description: z.string().min(1, "Description is required"),
  languages: z.array(z.string()).min(1, "Select at least one language"),
  sales: z.object({
    description: z.string().optional(),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    couponCodes: z.string().optional(),
  }),
});

type FormData = z.infer<typeof formSchema>;

const sections = [
  { id: "basic-info", title: "Basic Information" },
  { id: "verification", title: "Business Verification" },
  { id: "details", title: "Business Details" },
  { id: "photos", title: "Photos" },
  { id: "sales", title: "Sales and Discounts" },
];

export default function BusinessForm() {
  const [images, setImages] = useState<File[]>([]);
  const [salesPosters, setSalesPosters] = useState<File[]>([]);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessType: "business",
      categories: [],
      languages: [],
      sales: {
        description: "",
        startDate: undefined,
        endDate: undefined,
        couponCodes: "",
      },
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Here you would typically send the data to your backend
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<File[]>>
  ) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 5) {
      alert("You can only upload up to 5 images");
      return;
    }
    setter(files);
  };

  const removeImage = (
    index: number,
    setter: React.Dispatch<React.SetStateAction<File[]>>
  ) => {
    setter((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const scrollToSection = (sectionId: string) => {
    const section = sectionRefs.current[sectionId];
    if (section) {
      const yOffset = -100; // Adjust this value to fine-tune the scroll position
      const y =
        section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

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
          <div className="flex items-center gap-2 justify-center">
            <h1 className="text-2xl font-bold py-4">Post Room In</h1>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div
                ref={(el) => {
                  sectionRefs.current["basic-info"] = el;
                }}
                className="bg-white lg:p-[2rem] p-6 rounded-xl shadow-md border border-gray-200"
              >
                {" "}
                <h2 className="text-2xl font-bold mb-4">Basic Information</h2>
                <FormField
                  control={form.control}
                  name="userName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name of User</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="userPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone of User</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your phone number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Name of Business (Doing Business As)
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter business name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="legalName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Registered Legal Name of Business</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter legal business name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="businessType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type of Business</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="business" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Business
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="service" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Service
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="categories"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categories</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) =>
                            field.onChange([...field.value, value])
                          }
                          value={field.value[field.value.length - 1]}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select categories" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="category1">
                              Category 1
                            </SelectItem>
                            <SelectItem value="category2">
                              Category 2
                            </SelectItem>
                            <SelectItem value="category3">
                              Category 3
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>
                        Selected categories: {field.value.join(", ")}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Physical Address</FormLabel>
                      <FormControl>
                        <Input
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
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website of business</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter business website"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone number of business</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter business phone number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div
                ref={(el) => {
                  sectionRefs.current["verification"] = el;
                }}
                className="bg-white lg:p-[2rem] p-6 rounded-xl shadow-md border border-gray-200"
              >
                <h2 className="text-2xl font-bold mb-4">
                  Business Verification
                </h2>
                <FormField
                  control={form.control}
                  name="verificationMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Verification Method</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select verification method" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ein">EIN Number</SelectItem>
                          <SelectItem value="license">
                            Local Business License
                          </SelectItem>
                          <SelectItem value="bill">
                            Lease or Utility Bill
                          </SelectItem>
                          <SelectItem value="registration">
                            Company Registration Documents
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {form.watch("verificationMethod") === "ein" && (
                  <FormField
                    control={form.control}
                    name="einNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>EIN Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter 9-digit EIN"
                            {...field}
                            maxLength={9}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <div className="mt-4">
                  <Label htmlFor="verificationDocument">
                    Upload Verification Document
                  </Label>
                  <Input
                    id="verificationDocument"
                    type="file"
                    accept=".pdf"
                    className="mt-1"
                  />
                </div>
              </div>

              <div
                ref={(el) => {
                  sectionRefs.current["details"] = el;
                }}
                className="bg-white lg:p-[2rem] p-6 rounded-xl shadow-md border border-gray-200"
              >
                <h2 className="text-2xl font-bold mb-4">Business Details</h2>
                <FormField
                  control={form.control}
                  name="openHours"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Open Hours/Days</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter open hours" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        About/Description of Business/Service
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter description"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="languages"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Languages spoken</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) =>
                            field.onChange([...field.value, value])
                          }
                          value={field.value[field.value.length - 1]}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select languages" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="spanish">Spanish</SelectItem>
                            <SelectItem value="french">French</SelectItem>
                            <SelectItem value="german">German</SelectItem>
                            <SelectItem value="chinese">Chinese</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>
                        Selected languages: {field.value.join(", ")}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div
                ref={(el) => {
                  sectionRefs.current["photos"] = el;
                }}
                className="bg-white lg:p-[2rem] p-6 rounded-xl shadow-md border border-gray-200"
              >
                <h2 className="text-2xl font-bold mb-4">Photos</h2>
                <div className="space-y-4">
                  <Label htmlFor="photos">Add Photos (up to 5)</Label>
                  <div className="flex items-center space-x-4">
                    <Input
                      id="photos"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => handleImageUpload(e, setImages)}
                    />
                    <p className="text-sm text-gray-500">
                      {images.length} / 5 images selected
                    </p>
                  </div>
                  <div className="grid grid-cols-5 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Uploaded image ${index + 1}`}
                          className="w-full h-24 object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index, setImages)}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
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
                  sectionRefs.current["sales"] = el;
                }}
                className="bg-white lg:p-[2rem] p-6 rounded-xl shadow-md border border-gray-200"
              >
                <h2 className="text-2xl font-bold mb-4">
                  Current Sales/Discounts
                </h2>
                <FormField
                  control={form.control}
                  name="sales.description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount/Sale Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter sale description"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4 mt-5">
                  <FormField
                    control={form.control}
                    name="sales.startDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Sales Start Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] pl-3 text-left font-normal",
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
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="sales.endDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col ">
                        <FormLabel>Sales End Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] pl-3 text-left font-normal",
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
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2 mt-4">
                  <Label htmlFor="salesPosters">
                    Posters of Sales/Discounts
                  </Label>
                  <div className="flex items-center space-x-4">
                    <Input
                      id="salesPosters"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => handleImageUpload(e, setSalesPosters)}
                    />
                    <p className="text-sm text-gray-500">
                      {salesPosters.length} / 5 images selected
                    </p>
                  </div>
                  <div className="grid grid-cols-5 gap-4">
                    {salesPosters.map((poster, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(poster)}
                          alt={`Sales poster ${index + 1}`}
                          className="w-full h-24 object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index, setSalesPosters)}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <FormField
                  control={form.control}
                  name="sales.couponCodes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Coupon Codes</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter coupon codes" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button className="text-[15px] bg-green-800" type="submit">Submit</Button>
            </form>
          </Form>
        </main>
      </div>
    </div>
  );
}
