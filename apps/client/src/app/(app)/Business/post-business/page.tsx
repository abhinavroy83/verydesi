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
      name: userData?.firstName || "",
      email: userData?.email || "",
      phoneNumber: userData?.phone_number || "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
  });

  useEffect(() => {
    if (userData) {
      form.setValue("name", userData.firstName || "");
      form.setValue("email", userData.email || "");
      form.setValue("phoneNumber", userData.phone_number || "");
    }
  }, [userData, form]);
  const [images, setImages] = useState<File[]>([]);
  const [imageurl, setimageurls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const { addressComponents, location } = useGoogleAutocomplete();
  const watchstaylength = form.watch("stayLength");
  const watchpostingtype = form.watch("postingType");
  const watchImmediate = form.watch("immediate");
  const { data: session, status } = useSession();

  const { cities, isLoading, error } = useCityData();
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
      `https://api.verydesi.com/api/admin/area/${city}`
    );

    return response.data.area[0];
  };
  const onSubmit = async (data: FormData) => {
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
  const [formData, setFormData] = useState({
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
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
          <Form {...form}></Form>
        </main>
      </div>
    </div>
  );
}
