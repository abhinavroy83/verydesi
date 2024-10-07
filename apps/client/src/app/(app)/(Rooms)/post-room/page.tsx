"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Upload } from "lucide-react";

type FormData = {
  postingType: "Rooms" | "Rental";
  title: string;
  description: string;
  propertyType: string;
  stayLease: "Short term" | "Long term" | "Both";
  priceModel: string;
  rent: number;
  negotiable: boolean;
  hideRent: boolean;
  availabilityFrom: string;
  availabilityTo: string;
  immediate: boolean;
  separateBathroom: string;
  deposit: number;
  isRoomFurnished: string;
  utilities: string[];
  amenities: string[];
  dietaryPreference: "Vegetarian" | "Non-Veg" | "Both Ok";
  smokingPolicy: "No Smoking" | "Smoking is ok" | "Smoke outside only";
  petFriendly: "No Pets" | "Only Dogs" | "Only Cats" | "Any Pet is Ok";
  openHouseDate: Date;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

export default function RoomPostingForm() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const [images, setImages] = useState<File[]>([]);

  const onSubmit = (data: FormData) => {
    console.log(data, images);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(files);
  };

  return (
    <div className="max-w-[1370px] lg:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-full p-5 mx-auto bg-white rounded-xl shadow-2xl space-y-8 mt-[9rem] border"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Post Room in Portland
          </h1>
          <p className="text-sm text-gray-500">
            Your account is set to Portland
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <Label className="text-lg font-semibold">
              Posting type<span className="text-red-500">*</span>
            </Label>
            <Controller
              name="postingType"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field} className="flex space-x-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Rooms" id="rooms" />
                    <Label htmlFor="rooms">Rooms</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Rental" id="rental" />
                    <Label htmlFor="rental">Rental</Label>
                  </div>
                </RadioGroup>
              )}
            />
          </div>

          <div>
            <Label htmlFor="title" className="text-lg font-semibold">
              Title<span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              className="mt-1"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="description" className="text-lg font-semibold">
              Description<span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              className="mt-1"
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="propertyType" className="text-lg font-semibold">
              Property Type<span className="text-red-500">*</span>
            </Label>
            <Select
              {...register("propertyType", {
                required: "Property Type is required",
              })}
            >
              <option value="">Select</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="condo">Condo</option>
            </Select>
            {errors.propertyType && (
              <p className="mt-1 text-sm text-red-500">
                {errors.propertyType.message}
              </p>
            )}
          </div>

          <div>
            <Label className="text-lg font-semibold">
              Stay/Lease<span className="text-red-500">*</span>
            </Label>
            <Controller
              name="stayLease"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  className="flex flex-wrap space-x-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Short term" id="shortTerm" />
                    <Label htmlFor="shortTerm">Short term(Days/6Months)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Long term" id="longTerm" />
                    <Label htmlFor="longTerm">Long term(6+ Months)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Both" id="both" />
                    <Label htmlFor="both">
                      Both<span className="text-red-500">*</span>
                    </Label>
                  </div>
                </RadioGroup>
              )}
            />
          </div>

          <div>
            <Label htmlFor="priceModel" className="text-lg font-semibold">
              Price Model<span className="text-red-500">*</span>
            </Label>
            <Select
              {...register("priceModel", {
                required: "Price Model is required",
              })}
            >
              <option value="">Select</option>
              <option value="monthly">Monthly</option>
              <option value="weekly">Weekly</option>
              <option value="daily">Daily</option>
              {errors.priceModel && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.priceModel.message}
                </p>
              )}
            </Select>
          </div>

          <div>
            <Label htmlFor="rent" className="text-lg font-semibold">
              Rent<span className="text-red-500">*</span>
            </Label>
            <div className="flex flex-wrap items-center space-x-4 mt-1">
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-300 text-gray-500 text-sm">
                  $
                </span>
                <Input
                  type="number"
                  id="rent"
                  className="rounded-l-none"
                  {...register("rent", {
                    required: "Price Model is required",
                    valueAsNumber: true,
                  })}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="negotiable" {...register("negotiable")} />
                <Label htmlFor="negotiable">Negotiable</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="hideRent" {...register("hideRent")} />
                <Label htmlFor="hideRent">Hide Rent</Label>
              </div>
            </div>
            {errors.rent && (
              <p className="mt-1 text-sm text-red-500">{errors.rent.message}</p>
            )}
          </div>

          <div>
            <Label className="text-lg font-semibold">
              Availability<span className="text-red-500">*</span>
            </Label>
            <div className="flex flex-wrap items-center space-x-4 mt-1">
              <Input type="date" {...register("availabilityFrom")} />
              <span>to</span>
              <Input type="date" {...register("availabilityTo")} />
              <div className="flex items-center space-x-2 mt-2">
                <Checkbox id="immediate" {...register("immediate")} />
                <Label htmlFor="immediate">Immediate</Label>
              </div>
            </div>
            {errors.rent && (
              <p className="mt-1 text-sm text-red-500">{errors.rent.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="separateBathroom" className="text-lg font-semibold">
              Separate Bathroom<span className="text-red-500">*</span>
            </Label>
            <Select
              {...register("separateBathroom", {
                required: "Title is required",
              })}
            >
              <option value="">Select Number</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3+">3+</option>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="deposit" className="text-lg font-semibold">
              Deposit
            </Label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-300 text-gray-500 text-sm">
                $
              </span>
              <Input
                type="number"
                id="rent"
                className="rounded-l-none"
                {...register("rent", {
                  required: "Title is required",
                  valueAsNumber: true,
                })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="isRoomFurnished" className="text-lg font-semibold">
              Is room furnished?
            </Label>
            <Select {...register("isRoomFurnished")}>
              <option value="">Select</option>
              <option value="furnished">Furnished</option>
              <option value="unfurnished">Unfurnished</option>
              <option value="partially">Partially Furnished</option>
            </Select>
          </div>

          <div>
            <Label className="text-lg font-semibold">Utilities Include</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
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
              ].map((utility) => (
                <div key={utility} className="flex items-center space-x-2">
                  <Checkbox
                    id={utility}
                    value={utility}
                    {...register("utilities")}
                  />
                  <Label htmlFor={utility}>{utility}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-lg font-semibold">Amenities include</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
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
              ].map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox
                    id={amenity}
                    value={amenity}
                    {...register("amenities")}
                  />
                  <Label htmlFor={amenity}>{amenity}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-lg font-semibold">Dietary Preference</Label>
            <Controller
              name="dietaryPreference"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field} className="flex space-x-4 mt-2">
                  {["Vegetarian", "Non-Veg", "Both Ok"].map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={option}
                        id={option.toLowerCase()}
                      />
                      <Label htmlFor={option.toLowerCase()}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            />
          </div>

          <div>
            <Label className="text-lg font-semibold">Smoking Policy</Label>
            <Controller
              name="smokingPolicy"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  className="flex flex-wrap space-x-4 mt-2"
                >
                  {["No Smoking", "Smoking is ok", "Smoke outside only"].map(
                    (option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={option}
                          id={option.toLowerCase().replace(/\s/g, "")}
                        />
                        <Label
                          htmlFor={option.toLowerCase().replace(/\s/g, "")}
                        >
                          {option}
                        </Label>
                      </div>
                    )
                  )}
                </RadioGroup>
              )}
            />
          </div>

          <div>
            <Label className="text-lg font-semibold">Pet Friendly</Label>
            <Controller
              name="petFriendly"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  className="flex flex-wrap space-x-4 mt-2"
                >
                  {["No Pets", "Only Dogs", "Only Cats", "Any Pet is Ok"].map(
                    (option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={option}
                          id={option.toLowerCase().replace(/\s/g, "")}
                        />
                        <Label
                          htmlFor={option.toLowerCase().replace(/\s/g, "")}
                        >
                          {option}
                        </Label>
                      </div>
                    )
                  )}
                </RadioGroup>
              )}
            />
          </div>

          <div>
            <Label className="text-lg font-semibold">Open House Schedule</Label>
            <Controller
              name="openHouseDate"
              control={control}
              render={({ field }) => (
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  className="rounded-md border mt-2"
                />
              )}
            />
          </div>

          <div>
            <Label className="text-lg font-semibold">Add your photos</Label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-300" />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      multiple
                      onChange={handleImageUpload}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Your Details:</h2>
            <div className="space-y-4">
              {[
                { name: "name", label: "Name", type: "text" },
                { name: "email", label: "Email", type: "email" },
                { name: "phoneNumber", label: "Phone Number", type: "tel" },
                { name: "address", label: "Address", type: "text" },
              ].map((field) => (
                <div key={field.name}>
                  <Label htmlFor={field.name} className="text-lg font-semibold">
                    {field.label}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id={field.name}
                    type={field.type}
                    {...register(field.name as keyof FormData, {
                      required: "Title is required",
                    })}
                    className="mt-1"
                  />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "city", label: "City" },
                  { name: "state", label: "State" },
                  { name: "zipCode", label: "Zipcode" },
                  { name: "country", label: "Country" },
                ].map((field) => (
                  <div key={field.name}>
                    <Label
                      htmlFor={field.name}
                      className="text-lg font-semibold"
                    >
                      {field.label}
                    </Label>
                    <Input
                      id={field.name}
                      {...register(field.name as keyof FormData)}
                      className="mt-1"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full">
          Add New Room
        </Button>
      </form>
    </div>
  );
}
