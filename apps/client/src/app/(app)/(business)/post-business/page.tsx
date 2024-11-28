"use client";

import { useState, useRef, useEffect } from "react";
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
  Clock,
  Home,
  Loader2,
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
import useGoogleAutocomplete from "@/hooks/use-googleAutocomplete";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

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
  description: z.string().min(1, "Description is required"),
  languages: z.array(z.string()).min(1, "Select at least one language"),
  sales: z.object({
    description: z.string().optional(),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    couponCodes: z.string().optional(),
  }),
});

interface DaySchedule {
  startTime: string;
  endTime: string;
  is24Hours: boolean;
  isClosed: boolean;
}

type WeekSchedule = {
  [key in
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"]: DaySchedule;
};

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
  const [imageurl, setimageurls] = useState<string[]>([]);
  const [salesPosters, setSalesPosters] = useState<File[]>([]);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const { addressComponents, location } = useGoogleAutocomplete();

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
  useEffect(() => {
    if (Object.keys(addressComponents).length > 0) {
      form.setValue(
        "address",
        `${addressComponents.street_number} ${addressComponents.street}`
      );
    }
  }, [addressComponents, form]);

  const scrollToSection = (sectionId: string) => {
    const section = sectionRefs.current[sectionId];
    if (section) {
      const yOffset = -100; // Adjust this value to fine-tune the scroll position
      const y =
        section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };
  const [schedule, setSchedule] = useState<WeekSchedule>({
    monday: {
      startTime: "12:00 AM",
      endTime: "12:00 AM",
      is24Hours: false,
      isClosed: false,
    },
    tuesday: {
      startTime: "12:00 AM",
      endTime: "12:00 AM",
      is24Hours: false,
      isClosed: false,
    },
    wednesday: {
      startTime: "12:00 AM",
      endTime: "12:00 AM",
      is24Hours: false,
      isClosed: false,
    },
    thursday: {
      startTime: "12:00 AM",
      endTime: "12:00 AM",
      is24Hours: false,
      isClosed: false,
    },
    friday: {
      startTime: "12:00 AM",
      endTime: "12:00 AM",
      is24Hours: false,
      isClosed: false,
    },
  });

  const timeOptions = [
    "12:00 AM",
    "12:30 AM",
    "1:00 AM",
    "1:30 AM",
    "2:00 AM",
    "2:30 AM",
    "3:00 AM",
    "3:30 AM",
    "4:00 AM",
    "4:30 AM",
    "5:00 AM",
    "5:30 AM",
    "6:00 AM",
    "6:30 AM",
    "7:00 AM",
    "7:30 AM",
    "8:00 AM",
    "8:30 AM",
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
    "6:00 PM",
    "6:30 PM",
    "7:00 PM",
    "7:30 PM",
    "8:00 PM",
    "8:30 PM",
    "9:00 PM",
    "9:30 PM",
    "10:00 PM",
    "10:30 PM",
    "11:00 PM",
    "11:30 PM",
  ];

  const updateSchedule = (
    day: keyof WeekSchedule,
    field: keyof DaySchedule,
    value: string | boolean
  ) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
        ...(field === "is24Hours" &&
          value === true && {
            isClosed: false,
            startTime: "",
            endTime: "",
          }),
        ...(field === "isClosed" &&
          value === true && {
            is24Hours: false,
            startTime: "",
            endTime: "",
          }),
      },
    }));
  };

  //upload images to s3

  const [isimageUploading, setimageIsUploading] = useState(false);

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
    setimageIsUploading(true);
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
      setimageIsUploading(false);
    }
  };

  useEffect(() => {
    if (images.length > 0) {
      uploadtos3(images);
    }
  }, [images]);

  //upload pdf

  const [ispdfUploading, setIspdfUploading] = useState(false);
  const [pdfurl, setpdfurls] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      // setSelectedFile(file);
      await handlepdfUpload(file);
    }
  };

  const handlepdfUpload = async (file: File) => {
    setIspdfUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    console.log(formData);
    try {
      const response = await axios.post(
        "https://apiv2.verydesi.com/img/uploadpdf",
        formData
      );
      if (!response) {
        throw new Error("Upload failed");
      }

      setpdfurls(response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIspdfUploading(false);
    }
  };

  const { data: session } = useSession();

  const onSubmit = async (data: FormData) => {
    console.log(data);
    const token = session?.accessToken;
    if (!token) {
      throw new Error("token not found");
    }
    try {
      const businessdata = {
        ...data,
        schedule,
        pdfurl: pdfurl,
        Imageurl: imageurl,
      };

      const res = await axios.post(
        "https://apiv2.verydesi.com/bussiness/postbusiness",
        businessdata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.data) {
        console.log("error while posting business");
      }

      toast.success("bussiness added succesfully");
    } catch (error) {
      console.log("error while posting");
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
        <aside className="hidden lg:block w-64 bg-[#232f3e] p-4 text-white ">
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
                    {section.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="flex-1 p-2 border overflow-y-auto">
          <div className="flex items-center gap-2 justify-center">
            <h1 className="text-2xl font-bold py-4">Post Bussiness In</h1>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div
                ref={(el) => {
                  sectionRefs.current["basic-info"] = el;
                }}
                className="bg-white lg:p-[2rem] p-6 rounded-xl shadow-md border border-gray-200 space-y-6"
              >
                <h2 className="text-2xl font-bold mb-4">Basic Information</h2>
                <FormField
                  control={form.control}
                  name="userName"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4 md:items-center">
                      <FormLabel className="md:w-1/4 text-md font-medium">
                        Name of User
                      </FormLabel>
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
                    <FormItem className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4 md:items-center">
                      <FormLabel className="md:w-1/4 text-md font-medium">
                        Phone of User
                      </FormLabel>
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
                    <FormItem className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4 md:items-center">
                      <FormLabel className="md:w-1/4 text-md font-medium">
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
                    <FormItem className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4 md:items-center">
                      <FormLabel className="md:w-1/4 text-md font-medium">
                        Registered Legal Name of Business
                      </FormLabel>
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
                    <FormItem className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4 md:items-center">
                      <FormLabel className="md:w-1/5 text-md font-medium">
                        Type of Business
                      </FormLabel>
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
                    <FormItem className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4 md:items-center">
                      <FormLabel className="md:w-1/4 text-md font-medium">
                        Categories
                      </FormLabel>
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
                      {/* <FormDescription>
                        Selected categories: {field.value.join(", ")}
                      </FormDescription> */}
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
                <div className="space-y-4">
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
                        <FormItem className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4 md:items-center">
                          <FormLabel className=" md:w-1/5 text-md font-medium">
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
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4 md:items-center">
                      <FormLabel className="md:w-1/4 text-md font-medium">
                        Website of business
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter business url eg.. https://verydesi.com"
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
                    <FormItem className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4 md:items-center">
                      <FormLabel className="md:w-1/4 text-md font-medium">
                        Phone number of business
                      </FormLabel>
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
                className="bg-white lg:p-[2rem] p-6 rounded-xl shadow-md border border-gray-200 space-y-6"
              >
                <h2 className="text-2xl font-bold mb-4">
                  Business Verification
                </h2>
                <FormField
                  control={form.control}
                  name="verificationMethod"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4 md:items-center">
                      <FormLabel className="md:w-1/4 text-md font-medium">
                        Verification Method
                      </FormLabel>
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
                      <FormItem className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4 md:items-center">
                        <FormLabel className="md:w-1/4 text-md font-medium">
                          EIN Number
                        </FormLabel>
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
                <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4 md:items-center">
                  <Label htmlFor="verificationDocument">
                    Upload Verification Document
                  </Label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    className="sr-only"
                    id="pdf-upload"
                    aria-label="Upload pdf"
                    disabled={ispdfUploading}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="btn-primary"
                  disabled={ispdfUploading}
                >
                  {ispdfUploading ? "Uploading..." : "Choose File"}
                </button>
                {ispdfUploading && (
                  <div className="flex items-center justify-center mt-4">
                    <Loader2 className="h-6 w-6 animate-spin mr-2" />
                    <span>Uploading PDF...</span>
                  </div>
                )}
              </div>

              <div
                ref={(el) => {
                  sectionRefs.current["details"] = el;
                }}
                className="bg-white lg:p-[2rem] p- rounded-xl shadow-md border border-gray-200 space-y-6"
              >
                <h2 className="text-2xl font-bold mb-4">Business Details</h2>

                <div className="w-full max-w-[740px] bg-white rounded-lg space-y-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <h2 className="text-lg font-semibold">
                      When are you open?
                    </h2>
                  </div>

                  {Object.entries(schedule).map(([day, daySchedule]) => (
                    <div
                      key={day}
                      className="grid grid-cols-[1fr,auto,auto,1fr] items-center gap-2"
                    >
                      <Label className="capitalize font-medium">{day}</Label>

                      <Select
                        disabled={daySchedule.is24Hours || daySchedule.isClosed}
                        value={daySchedule.startTime}
                        onValueChange={(value) =>
                          updateSchedule(
                            day as keyof WeekSchedule,
                            "startTime",
                            value
                          )
                        }
                      >
                        <SelectTrigger className="w-[110px]">
                          <SelectValue placeholder="Start time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeOptions.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select
                        disabled={daySchedule.is24Hours || daySchedule.isClosed}
                        value={daySchedule.endTime}
                        onValueChange={(value) =>
                          updateSchedule(
                            day as keyof WeekSchedule,
                            "endTime",
                            value
                          )
                        }
                      >
                        <SelectTrigger className="w-[110px]">
                          <SelectValue placeholder="End time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeOptions.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <div className="space-y-2 ml-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`${day}-24h`}
                            checked={daySchedule.is24Hours}
                            onCheckedChange={(checked) =>
                              updateSchedule(
                                day as keyof WeekSchedule,
                                "is24Hours",
                                Boolean(checked)
                              )
                            }
                          />
                          <label
                            htmlFor={`${day}-24h`}
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Open 24 hours
                          </label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`${day}-closed`}
                            checked={daySchedule.isClosed}
                            onCheckedChange={(checked) =>
                              updateSchedule(
                                day as keyof WeekSchedule,
                                "isClosed",
                                Boolean(checked)
                              )
                            }
                          />
                          <label
                            htmlFor={`${day}-closed`}
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Closed
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4 md:items-center">
                      <FormLabel className="md:w-1/4 text-md font-medium">
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
                    <FormItem className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4 md:items-center">
                      <FormLabel className="md:w-1/4 text-md font-medium">
                        Languages spoken
                      </FormLabel>
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
                      {/* <FormDescription>
                        Selected languages: {field.value.join(", ")}
                      </FormDescription> */}
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
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
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
                      <p className="mt-2 text-sm text-gray-500">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                      <p className="text-sm text-gray-500">
                        {images.length} / 5 images selected
                      </p>
                    </label>
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
                          onClick={() => removeImage(index)}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  {isimageUploading && (
                    <div className="flex items-center justify-center mt-4">
                      <Loader2 className="h-6 w-6 animate-spin mr-2" />
                      <span>Uploading images...</span>
                    </div>
                  )}
                </div>
              </div>

              <div
                ref={(el) => {
                  sectionRefs.current["sales"] = el;
                }}
                className="bg-white lg:p-[2rem] p-6 rounded-xl shadow-md border border-gray-200 space-y-6"
              >
                <h2 className="text-2xl font-bold mb-4">
                  Current Sales/Discounts
                </h2>

                <div className="grid grid-cols-2 gap-4 mt-5">
                  <FormField
                    control={form.control}
                    name="sales.startDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="md:w-1/4 text-md font-medium">
                          Sales Start Date
                        </FormLabel>
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
                        <FormLabel className="md:w-1/4 text-md font-medium">
                          Sales End Date
                        </FormLabel>
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
                {/* <div className="space-y-2 mt-4">
                  <Label className="text-[16px]" htmlFor="salesPosters">
                    Posters of Sales/Discounts
                  </Label>
                  <div className="flex items-center space-x-9">
                    <Input
                      className=" text-md font-medium"
                      id="salesPosters"
                      type="file"
                      accept="image/*"
                      multiple
                    />
                  
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
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                 */}

                <FormField
                  control={form.control}
                  name="sales.couponCodes"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4 md:items-center">
                      <FormLabel className="md:w-1/4 text-md font-medium">
                        Coupon Codes
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter coupon codes" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sales.description"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4 md:items-center">
                      <FormLabel className="md:w-1/4 text-md font-medium">
                        Discount/Sale Description
                      </FormLabel>
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
                <div className="flex items-center space-x-2">
                  <Checkbox />
                  <label
                    htmlFor={``}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    No Discounts/Sales available at this time
                  </label>
                </div>
              </div>

              <Button className="text-[15px] bg-green-800" type="submit">
                Submit
              </Button>
            </form>
          </Form>
        </main>
      </div>
    </div>
  );
}
