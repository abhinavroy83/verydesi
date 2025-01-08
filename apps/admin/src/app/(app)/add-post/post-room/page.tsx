"use client";

import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
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

import useGoogleAutocomplete from "@/hooks/use-googleAutocomplete";
import { useCityData } from "@/hooks/use-city-hooks";
import axios from "axios";
import { useSession } from "next-auth/react";
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
import type { FormData } from "@/schema";
import { postroomschema } from "@/schema";
import { stateAbbreviations } from "@repo/schemas";
import DashboardLayout from "@/components/Layout/Dashboardlayout";

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
  const form = useForm<FormData>({
    resolver: zodResolver(postroomschema),
    mode: "onChange",
    defaultValues: {
      postingIn: "Portland",
      postingType: undefined,
      Title: "",
      description: "",
      propertyType: undefined,
      stayLength: undefined,
      priceModel: undefined,
      price: undefined,
      negotiable: false,
      hideRent: false,
      availableFrom: null,
      availableTo: null,
      immediate: false,
      separateBathroom: "",
      PreferredGender: undefined,
      securityDeposit: undefined,
      toShare: undefined,
      utilities: [],
      amenities: [],
      dietaryPreferences: undefined,
      smokingPolicy: undefined,
      petPolicy: undefined,
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
  const [imageurl, setimageurls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const { addressComponents, location } = useGoogleAutocomplete();
  const watchstaylength = form.watch("stayLength");
  const watchpostingtype = form.watch("postingType");
  const watchImmediate = form.watch("immediate");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session, status } = useSession();

  const { cities, isLoading, error } = useCityData();
  // console.log("cities", cities);
  const router = useRouter();
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

  // console.log("Address Components:", addressComponents);
  // console.log("Latitude and Longitude:", location);

  useEffect(() => {
    form.trigger();
  }, [form, userData]);

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

  const fetchAreaData = async (city: string) => {
    // console.log(city);
    const response = await axios(
      `https://apiv2.verydesi.com/area/find-city-by-area/${city}`
    );
    // console.log(response.data.area[0]);

    return response.data.area[0];
  };
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    // console.log(data);
    const city = data.postingIn;
    const areaData = await fetchAreaData(city);
    const enteredStateAbbreviation = data.state;
    const enteredStateFullName = Object.keys(stateAbbreviations).find(
      (key) => stateAbbreviations[key] === enteredStateAbbreviation
    );
    // const enteredState = data.state;
    const enteredCity = data.city;
    const enteredZip = data.zipCode;
    const isPrimaryState = areaData.primaryState.includes(
      enteredStateFullName || data.state
    );
    const isStateInList = areaData.state.includes(
      enteredStateFullName || data.state
    );
    const isValidCity = areaData.subarea.some(
      (subarea: string) => subarea.split(",")[0] === enteredCity
    );
    const isValidZip = areaData.zipcode.includes(enteredZip);
    if (isPrimaryState || (isStateInList && (isValidCity || isValidZip))) {
      const roomdata = {
        postingincity: data.postingIn,
        postingtype: data.postingType,
        Title: data.Title,
        Description: data.description,
        Propertytype: data.propertyType,
        Stay_lease: data.stayLength,
        Avaliblity_from: data.availableFrom,
        Available_to: data.availableTo,
        Immediate: data.immediate,
        Attchd_Bath: data.separateBathroom,
        Preferred_gender: data.PreferredGender,
        Expected_Rooms: data.price,
        Pricemodel: data.priceModel,
        Desposite: data.securityDeposit,
        is_room_furnished: data.toShare,
        Utility_include: data.utilities,
        Amenities_include: data.amenities,
        Vegeterian_prefernce: data.dietaryPreferences,
        Smoking_policy: data.smokingPolicy,
        Pet_friendly: data.petPolicy,
        Open_house_schedule: data.openHouseDate,
        Imgurl: imageurl,
        user_name: data.name,
        email: data.email,
        city: data.city,
        state: data.state,
        zip_code: data.zipCode,
        location: {
          coordinates: [location?.lng, location?.lat],
        },
      };

      try {
        const token = session?.user.accessToken;
        // console.log(token);
        if (!token) {
          // console.log("tokn no");
          throw new Error("token not found");
        }
        const res = await axios.post(
          "https://apiv2.verydesi.com/room/post-room",
          roomdata,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(res);
        if (res) {
          toast.success("room added succesfully");
          form.reset();
          router.push("/");
        }
      } catch (error) {
        console.error("Error while adding room:", error);
      }
    } else {
      toast.error("Enter Address is not available");
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

  if (isLoading) {
    return <div>Loading cities...</div>;
  }

  return (
    <DashboardLayout>
      <div className=" max-w-[1370px] lg:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-6  font-sans">
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
                  <DoorOpen className="w-4 h-4 mr-2" />
                  <span className="font-medium">Post Room</span>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex overflow-hidden">
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
                      {section.title}
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
                className="space-y-4"
              >
                <div className="flex items-center gap-2 justify-center">
                  <h1 className="text-2xl font-bold">Post Room In</h1>
                  <FormField
                    control={form.control}
                    name="postingIn"
                    render={({ field }) => (
                      <FormItem className="flex flex-col py-2 space-y-2 md:flex-row md:space-y-0 md:space-x-4 md:items-center">
                        <div className="flex-grow">
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select posting city" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {cities.map((city) => (
                                <SelectItem key={city} value={city}>
                                  <p className="text-xl font-bold">{city}</p>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <div
                  ref={(el) => {
                    sectionRefs.current["basic-info"] = el;
                  }}
                  className="bg-white lg:p-[2rem] p-6 rounded-xl shadow-md border border-gray-200"
                >
                  <h2 className="text-2xl font-bold mb-4">Basic Information</h2>
                  <div className="space-y-6">
                    {/* <FormField
                      control={form.control}
                      name="postingIn"
                      render={({ field }) => (
                        <FormItem className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4 md:items-center">
                          <FormLabel className="md:w-1/4 text-md font-medium">
                            Posting in
                          </FormLabel>
                          <div className="flex-grow">
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select posting city" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {cities.map((city) => (
                                  <SelectItem key={city} value={city}>
                                    {city}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    /> */}
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
                          <div className="flex-grow lg:w-[30rem] w-[18rem]">
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
                                <SelectItem value="Room">Room</SelectItem>
                                <SelectItem value="Shared Room">
                                  Shared Room
                                </SelectItem>
                                <SelectItem value="Single Room">
                                  Single Room
                                </SelectItem>
                                <SelectItem value="Apartment">
                                  Apartment
                                </SelectItem>
                                <SelectItem value="Condo">Condo</SelectItem>
                                <SelectItem value="Town House">
                                  Town House
                                </SelectItem>
                                <SelectItem value="Home">Home</SelectItem>
                                <SelectItem value="House">House</SelectItem>
                                <SelectItem value="Basement">
                                  Basement
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
                      name="stayLength"
                      render={({ field }) => (
                        <FormItem className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4 md:items-center">
                          <FormLabel className="md:w-1/4 text-md font-medium">
                            Stay Length
                          </FormLabel>
                          <div className="flex-grow lg:w-[30rem] w-[18rem]">
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
                                  Short term (1Day to 6 Month)
                                </SelectItem>
                                <SelectItem value="long">
                                  Long term (6+ Months)
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
                  className="bg-white lg:p-[2rem] p-6 rounded-xl shadow-md border border-gray-200"
                >
                  <h2 className="text-2xl font-bold mb-4">Pricing</h2>
                  <div className="space-y-6">
                    {watchstaylength && (
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
                                  {watchstaylength === "short" && (
                                    <>
                                      <SelectItem value="nightly">
                                        Nightly
                                      </SelectItem>
                                      <SelectItem value="monthly">
                                        Monthly
                                      </SelectItem>
                                      <SelectItem value="yearly">
                                        Yearly
                                      </SelectItem>
                                    </>
                                  )}

                                  {watchstaylength === "long" && (
                                    <SelectItem value="monthly">
                                      Monthly
                                    </SelectItem>
                                  )}
                                  {watchstaylength === "both" && (
                                    <>
                                      <SelectItem value="nightly">
                                        Nightly
                                      </SelectItem>
                                      <SelectItem value="monthly">
                                        Monthly
                                      </SelectItem>
                                      <SelectItem value="yearly">
                                        Yearly
                                      </SelectItem>
                                    </>
                                  )}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                    )}
                    <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4 md:items-center">
                            <FormLabel className="md:w-2/4 text-md font-medium">
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
                        {/* <FormLabel className="md:w-1/4 text-md font-medium">
                      Options
                    </FormLabel> */}
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
                    </div>
                    {watchpostingtype === "Rooms" && (
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
                    )}
                  </div>
                </div>

                <div
                  ref={(el) => {
                    sectionRefs.current["availability"] = el;
                  }}
                  className="bg-white lg:p-[2rem] p-6 rounded-xl shadow-md border border-gray-200"
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
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      disabled={watchImmediate}
                                      variant={"outline"}
                                      className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground",
                                        watchImmediate && "cursor-not-allowed"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>Available From</span>
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
                                    selected={field.value || undefined}
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
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      disabled={watchImmediate}
                                      variant={"outline"}
                                      className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground",
                                        watchImmediate && "cursor-not-allowed"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>Available To</span>
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
                                    selected={field.value || undefined}
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
                      <FormField
                        control={form.control}
                        name="immediate"
                        render={({ field }) => (
                          <FormItem className="flex justify-center items-center space-y-2 md:space-y-0 md:space-x-4">
                            <FormLabel className="md:w-4/4  font-[12px]">
                              Immediate
                            </FormLabel>
                            <div className="flex-grow">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={(checked) => {
                                    field.onChange(checked);
                                    if (checked) {
                                      form.setValue("availableFrom", null);
                                      form.setValue("availableTo", null);
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* <FormField
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
                            onCheckedChange={(checked) => {
                              field.onChange(checked);
                              if (checked) {
                                form.setValue("availableFrom", null);
                                form.setValue("availableTo", null);
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                /> */}

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
                  className="bg-white lg:p-[2rem] p-6 rounded-xl shadow-md border border-gray-200"
                >
                  <h2 className="text-2xl font-bold mb-4">Amenities</h2>
                  <div className="space-y-6">
                    {watchpostingtype == "Rental" && (
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
                                  <SelectItem value="3">3</SelectItem>
                                  <SelectItem value="4">4</SelectItem>
                                  <SelectItem value="5+">5+</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                    )}
                    {watchpostingtype == "Rooms" && (
                      <>
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
                                      <SelectValue placeholder="Select Separate Bathrooms" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="Yes">Yes</SelectItem>
                                    <SelectItem value="No">No</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="PreferredGender"
                          render={({ field }) => (
                            <FormItem className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4 md:items-center">
                              <FormLabel className="md:w-1/4 text-md font-medium">
                                Prefer Gender
                              </FormLabel>
                              <div className="flex-grow">
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Preferred Gender" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="Male">Male</SelectItem>
                                    <SelectItem value="Female">
                                      Female
                                    </SelectItem>
                                    <SelectItem value="Any">Any</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />
                      </>
                    )}

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
                                <SelectItem value="Furnished">
                                  Furnished
                                </SelectItem>
                                <SelectItem value="Unfurnished">
                                  Unfurnished
                                </SelectItem>
                                <SelectItem value="Furnished only with Bed">
                                  Furnished only with Bed
                                </SelectItem>
                                <SelectItem value="Semi Furnished">
                                  Semi Furnished
                                </SelectItem>
                                <SelectItem value="Fully Furnished">
                                  Fully Furnished
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
                  className="bg-white lg:p-[2rem] p-6 rounded-xl shadow-md border border-gray-200"
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
                            {["Vegetarian", "Non-veg", "Both Ok"].map(
                              (item) => (
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
                                            checked={field.value === item}
                                            onCheckedChange={(checked) => {
                                              if (checked) {
                                                // If checked, set the field value to only this item
                                                field.onChange(item);
                                              } else {
                                                // If unchecked, clear the field value
                                                field.onChange(null);
                                              }
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
                            {[
                              "No Smoking",
                              "Smoking ok",
                              "Smoke outside only",
                            ].map((item) => (
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
                                          checked={field.value === item}
                                          onCheckedChange={(checked) => {
                                            if (checked) {
                                              // If checked, set the field value to only this item
                                              field.onChange(item);
                                            } else {
                                              // If unchecked, clear the field value
                                              field.onChange(null);
                                            }
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
                      name="petPolicy"
                      render={() => (
                        <FormItem className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4 md:items-start">
                          <div className="md:w-1/4 text-md font-medium">
                            <FormLabel className="text-base">
                              Pet Policy
                            </FormLabel>
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
                                            checked={field.value === item}
                                            onCheckedChange={(checked) => {
                                              if (checked) {
                                                // If checked, set the field value to only this item
                                                field.onChange(item);
                                              } else {
                                                // If unchecked, clear the field value
                                                field.onChange(null);
                                              }
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
                  className="bg-white lg:p-[2rem] p-6 rounded-xl shadow-md border border-gray-200"
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
                        <label
                          htmlFor="image-upload"
                          className="cursor-pointer"
                        >
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
                      {isUploading && (
                        <div className="flex items-center justify-center mt-4">
                          <Loader2 className="h-6 w-6 animate-spin mr-2" />
                          <span>Uploading images...</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div
                  ref={(el) => {
                    sectionRefs.current["your-details"] = el;
                  }}
                  className="bg-white lg:p-[2rem] p-6 rounded-xl shadow-md border border-gray-200"
                >
                  <h2 className="text-2xl font-bold mb-4">Your Details</h2>
                  <div className="space-y-4">
                    {[
                      { name: "name", label: "Name", type: "text" },
                      { name: "email", label: "Email", type: "email" },
                      {
                        name: "phoneNumber",
                        label: "Phone Number",
                        type: "tel",
                      },
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
                                  type={fieldInfo.type}
                                  id={fieldInfo.name}
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
                                  <Input
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
                    </div>
                  </div>
                </div>

                <div
                  ref={(el) => {
                    sectionRefs.current["submit"] = el;
                  }}
                  className=" w-full mx-auto flex justify-center"
                >
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    className="flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Add New Room"
                    )}{" "}
                  </Button>
                </div>
              </form>
            </Form>
          </main>
        </div>
      </div>
    </DashboardLayout>
  );
}
