"use client";
import { useState } from "react";
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
import { CalendarIcon, Pencil } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { DashboardLayout } from "@/components/layout";

type FormData = {
  accountBelongTo: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth: Date | undefined;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
};

export default function DashboardUserSettings() {
  const [isEditing, setIsEditing] = useState(false);
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      accountBelongTo: "Portland",
      firstName: "Abhinav",
      lastName: "user",
      email: "user@gmail.com",
      phoneNumber: "12345",
      gender: "Male",
      dateOfBirth: new Date(2000, 0, 1),
      address: "123",
      city: "Portland",
      state: "Missouri (MO)",
      country: "USA",
      zipCode: "133",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    setIsEditing(false);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Settings</h2>
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
        <div className="overflow-y-auto flex-grow pr-4 -mr-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
              <div className="col-span-full">
                <Label htmlFor="accountBelongTo">Your Account belong to</Label>
                <Controller
                  name="accountBelongTo"
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
                        <SelectItem value="Portland">Portland</SelectItem>
                        <SelectItem value="New York">New York</SelectItem>
                        <SelectItem value="Los Angeles">Los Angeles</SelectItem>
                        <SelectItem value="Chicago">Chicago</SelectItem>
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
                    <Input {...field} disabled={!isEditing} />
                  )}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} disabled={!isEditing} />
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
                {!isEditing && (
                  <p className="text-sm text-green-600 mt-1">
                    Email is verified
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Controller
                  name="phoneNumber"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} disabled={!isEditing} type="tel" />
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
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Controller
                  name="dateOfBirth"
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
                            date > new Date() || date < new Date(1900, 0, 1)
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
                    <Input {...field} disabled={!isEditing} />
                  )}
                />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} disabled={!isEditing} />
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
                        <SelectItem value="Missouri (MO)">
                          Missouri (MO)
                        </SelectItem>
                        <SelectItem value="New York (NY)">
                          New York (NY)
                        </SelectItem>
                        <SelectItem value="California (CA)">
                          California (CA)
                        </SelectItem>
                        <SelectItem value="Texas (TX)">Texas (TX)</SelectItem>
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
                        <SelectItem value="Canada">Canada</SelectItem>
                        <SelectItem value="UK">UK</SelectItem>
                        <SelectItem value="Australia">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div>
                <Label htmlFor="zipCode">Zip Code</Label>
                <Controller
                  name="zipCode"
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
          <div className="mt-8 space-y-6">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Change Password
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Click here to change your password.
              </p>
              <Button variant="outline" className="mt-2">
                Change Password
              </Button>
            </div>
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
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
