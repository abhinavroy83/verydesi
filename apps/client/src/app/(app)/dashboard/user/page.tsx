"use client";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, ChevronRight, Pencil, Settings } from "lucide-react";
import { format, subYears } from "date-fns";
import { cn } from "@/lib/utils";
import { DashboardLayout } from "@/components/layout";
import { useSession } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { UserData } from "@myrepo/types";
import useGoogleAutocomplete from "@/hooks/use-googleAutocomplete";
import { useCityData } from "@/hooks/use-city-hooks";
import useAuthStore from "@/store/useAuthStore";
import Link from "next/link";
import { stateAbbreviations } from "@/constants";

export default function DashboardUserSettings() {
  const [isEditing, setIsEditing] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const { addressComponents, location } = useGoogleAutocomplete();
  const { cities, isLoading, error } = useCityData();
  const { isverified } = useAuthStore();

  const [userData, setuserData] = useState<UserData | null>(null);
  const { control, handleSubmit, reset, setValue } = useForm<UserData>({
    defaultValues: {
      belongcity: "",
      firstName: "",
      lastName: "",
      email: "",
      phone_number: "",
      gender: "",
      dob: undefined,
      address: "",
      city: "",
      state: "",
      country: "",
      pin: "",
    },
  });
  // console.log(session?.accessToken);
  useEffect(() => {
    if (Object.keys(addressComponents).length > 0) {
      setValue(
        "address",
        `${addressComponents.street_number} ${addressComponents.street}`
      );
      setValue("city", addressComponents.city);
      setValue("state", addressComponents.state);
      setValue("pin", addressComponents.zipCode);
      setValue("country", addressComponents.country);
    }
  }, [addressComponents, setValue]);

  const onSubmit = async (data: UserData) => {
    try {
      const token = session?.accessToken;
      if (!token) {
        throw new Error("token not found");
      }
      const toastId = toast.loading("Updating data...");

      const response = await axios.patch(
        "https://apiv2.verydesi.com/user/updateUser",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response);
      toast.success("Data updated successfully!", { id: toastId });

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  const token = session?.accessToken;

  const fetchuser = async () => {
    try {
      if (!token) {
        throw new Error("token not found");
      }
      const res = await axios.get(
        `https://apiv2.verydesi.com/user/userprofile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res) {
        setuserData(res?.data);
        reset(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchuser();
  }, [token]);

  return (
    <DashboardLayout>
      <div className="flex flex-col h-screen overflow-hidden border rounded-lg">
        <div className="flex justify-between items-center">
          <div className="bg-gray-100 text-black p-4 rounded-t-lg items-center space-x-2 mb- flex justify-between w-full">
            <h2 className="text-2xl font-bold flex gap-1 items-center">
              <Settings className="mr-2" /> Settings
            </h2>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant="outline"
              size="sm"
            >
              {isEditing ? (
                "Cancel"
              ) : (
                <>
                  <Pencil className="w-4 h-4 mr-2" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>
        </div>
        <div className="overflow-y-auto flex-grow pr-4 -mr-4">
          <nav
            className="flex  mb-4 text-sm text-gray-500 px-4"
            aria-label="Breadcrumb"
          >
            <ol className="inline-flex items-center space-x-1 md:space-x-3 mt-4">
              <li className="inline-flex items-center">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center hover:text-gray-700"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 mx-1" />
                  <Link
                    href="/dashboard/user"
                    className="ml-1 hover:text-gray-700"
                  >
                    Settings
                  </Link>
                </div>
              </li>
            </ol>
          </nav>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6 px-4">
              <div className="col-span-full">
                <Label htmlFor="belongcity">Your Account belong to</Label>
                <Controller
                  name="belongcity"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} readOnly={!isEditing} />
                  )}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} readOnly={!isEditing} />
                  )}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} disabled type="email" />
                  )}
                />
                {userData?.IsEmailVerified ? (
                  <p className="text-sm text-green-600 mt-1">
                    Email is verified
                  </p>
                ) : (
                  <p className="text-sm text-red-600 mt-1">
                    Email not verified
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="phone_number">Phone Number</Label>
                <Controller
                  name="phone_number"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} readOnly={!isEditing} type="tel" />
                  )}
                />
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div>
                <Label htmlFor="dob">Date of Birth</Label>
                <Controller
                  name="dob"
                  control={control}
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                          disabled={!isEditing}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() ||
                            date < subYears(new Date(), 124) ||
                            date > subYears(new Date(), 16)
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
              </div>
              <div className="col-span-full">
                <Label htmlFor="address">Address</Label>
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="address"
                      readOnly={!isEditing}
                      value={addressComponents.street || field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} readOnly={!isEditing} />
                  )}
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(stateAbbreviations).map(
                          ([state, abbreviation]) => (
                            <SelectItem
                              key={abbreviation}
                              value={`${state} (${abbreviation})`}
                            >
                              {state} ({abbreviation})
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USA">USA</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div>
                <Label htmlFor="pin">Zip Code</Label>
                <Controller
                  name="pin"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} disabled={!isEditing} />
                  )}
                />
              </div>
            </div>
            {isEditing && (
              <div className="flex justify-end space-x-2 mt-6">
                <Button
                  type="submit"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Update Profile
                </Button>
              </div>
            )}
          </form>
          <div className="mt-8 space-y-6 px-4">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Change Password
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Click here to change your password.
              </p>
              <Button
                variant="outline"
                className="mt-2 bg-gray-300"
                onClick={() => {
                  router.push("/dashboard/user/change-password");
                }}
              >
                Change Password
              </Button>
            </div>
            <div className="bg-red-50 border-l-4 border-red-400 p-3">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Close Account
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>
                      This will remove your login information from our system
                      and you will not be able to login again. It cannot be
                      undone.
                    </p>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={() => {
                        router.push("/dashboard/user/delete-account");
                      }}
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
