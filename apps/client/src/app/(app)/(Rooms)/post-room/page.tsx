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

export default function Component() {
  const { register, control, handleSubmit, watch } = useForm<FormData>();
  const [images, setImages] = useState<File[]>([]);

  const onSubmit = (data: FormData) => {
    console.log(data, images);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(files);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-7xl mx-auto p-6 bg-white rounded-lg shadow"
    >
      <h1 className="text-2xl font-bold">Post Room In Portland</h1>
      <p className="text-sm text-gray-500">Your Account is belong Portland</p>

      <div>
        <Label>Posting type*</Label>
        <Controller
          name="postingType"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field} className="flex space-x-4">
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
        <Label htmlFor="title">Title*</Label>
        <Input id="title" {...register("title", { required: true })} />
      </div>

      <div>
        <Label htmlFor="description">Description*</Label>
        <Textarea
          id="description"
          {...register("description", { required: true })}
        />
      </div>

      <div>
        <Label htmlFor="propertyType">Property Type*</Label>
        <Select {...register("propertyType", { required: true })}>
          <option value="">Select</option>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="condo">Condo</option>
        </Select>
      </div>

      <div>
        <Label>Stay/Lease*</Label>
        <Controller
          name="stayLease"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field} className="flex space-x-4">
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
                <Label htmlFor="both">Both*</Label>
              </div>
            </RadioGroup>
          )}
        />
      </div>

      <div>
        <Label htmlFor="priceModel">Price Model*</Label>
        <Select {...register("priceModel", { required: true })}>
          <option value="">Select</option>
          <option value="monthly">Monthly</option>
          <option value="weekly">Weekly</option>
          <option value="daily">Daily</option>
        </Select>
      </div>

      <div>
        <Label htmlFor="rent">Rent*</Label>
        <div className="flex items-center space-x-2">
          <span>$</span>
          <Input
            type="number"
            id="rent"
            {...register("rent", { required: true, valueAsNumber: true })}
          />
          <Checkbox id="negotiable" {...register("negotiable")} />
          <Label htmlFor="negotiable">Negotiable</Label>
          <Checkbox id="hideRent" {...register("hideRent")} />
          <Label htmlFor="hideRent">Hide Rent</Label>
        </div>
      </div>

      <div>
        <Label>Availability*</Label>
        <div className="flex items-center space-x-2">
          <Input type="date" {...register("availabilityFrom")} />
          <span>to</span>
          <Input type="date" {...register("availabilityTo")} />
          <Checkbox id="immediate" {...register("immediate")} />
          <Label htmlFor="immediate">Immediate</Label>
        </div>
      </div>

      <div>
        <Label htmlFor="separateBathroom">Separate Bathroom*</Label>
        <Select {...register("separateBathroom", { required: true })}>
          <option value="">Select Number</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3+">3+</option>
        </Select>
      </div>

      <div>
        <Label htmlFor="deposit">Deposit</Label>
        <div className="flex items-center space-x-2">
          <span>$</span>
          <Input
            type="number"
            id="deposit"
            {...register("deposit", { valueAsNumber: true })}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="isRoomFurnished">Is room/ furnished?</Label>
        <Select {...register("isRoomFurnished")}>
          <option value="">Select</option>
          <option value="furnished">Furnished</option>
          <option value="unfurnished">Unfurnished</option>
          <option value="partially">Partially Furnished</option>
        </Select>
      </div>

      <div>
        <Label>Utilities Include</Label>
        <div className="grid grid-cols-2 gap-2">
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
        <Label>Amenities include</Label>
        <div className="grid grid-cols-2 gap-2">
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
        <Label>Dietary Preference</Label>
        <Controller
          name="dietaryPreference"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field} className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Vegetarian" id="vegetarian" />
                <Label htmlFor="vegetarian">Vegetarian</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Non-Veg" id="nonVeg" />
                <Label htmlFor="nonVeg">Non-Veg</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Both Ok" id="bothOk" />
                <Label htmlFor="bothOk">Both Ok</Label>
              </div>
            </RadioGroup>
          )}
        />
      </div>

      <div>
        <Label>Smoking Policy</Label>
        <Controller
          name="smokingPolicy"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field} className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="No Smoking" id="noSmoking" />
                <Label htmlFor="noSmoking">No Smoking</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Smoking is ok" id="smokingOk" />
                <Label htmlFor="smokingOk">Smoking is ok</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Smoke outside only" id="smokeOutside" />
                <Label htmlFor="smokeOutside">Smoke outside only</Label>
              </div>
            </RadioGroup>
          )}
        />
      </div>

      <div>
        <Label>Pet Friendly</Label>
        <Controller
          name="petFriendly"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field} className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="No Pets" id="noPets" />
                <Label htmlFor="noPets">No Pets</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Only Dogs" id="onlyDogs" />
                <Label htmlFor="onlyDogs">Only Dogs</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Only Cats" id="onlyCats" />
                <Label htmlFor="onlyCats">Only Cats</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Any Pet is Ok" id="anyPet" />
                <Label htmlFor="anyPet">Any Pet is Ok</Label>
              </div>
            </RadioGroup>
          )}
        />
      </div>

      <div>
        <Label>Open House Schedule</Label>
        <Controller
          name="openHouseDate"
          control={control}
          render={({ field }) => (
            <Calendar
              mode="single"
              selected={field.value}
              onSelect={field.onChange}
              className="rounded-md border"
            />
          )}
        />
      </div>

      <div>
        <Label>Add your photos below</Label>
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-300"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                clipRule="evenodd"
              />
            </svg>
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
        <h2 className="text-lg font-semibold">Your Details:</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register("name", { required: true })} />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email", { required: true })}
            />
          </div>
          <div>
            <Label htmlFor="phoneNumber">Phone Number*</Label>
            <Input
              id="phoneNumber"
              {...register("phoneNumber", { required: true })}
            />
          </div>
          <div>
            <Label htmlFor="address">Address*</Label>
            <Input id="address" {...register("address", { required: true })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input id="city" {...register("city")} />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input id="state" {...register("state")} />
            </div>
            <div>
              <Label htmlFor="zipCode">Enter zipcode</Label>
              <Input id="zipCode" {...register("zipCode")} />
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <Input id="country" {...register("country")} />
            </div>
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full">
        Add New Room
      </Button>
    </form>
  );
}
