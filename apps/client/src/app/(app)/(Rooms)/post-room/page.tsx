"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { CalendarIcon, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Component() {
  const { register, control, handleSubmit } = useForm();
  const [date, setDate] = useState<Date>();
  const router = useRouter();
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 max-w-7xl mx-auto p-6 bg-white shadow-xl mt-[9rem] border rounded-lg"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Post Room in Portland</h2>
        <p className="text-sm text-gray-500">
          Your Account is Serving Portland
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="postingType">Posting Type</Label>
          <RadioGroup defaultValue="rooms" className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="rooms" id="rooms" />
              <Label htmlFor="rooms">Rooms</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="rental" id="rental" />
              <Label htmlFor="rental">Rental</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" {...register("title")} />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" {...register("description")} />
        </div>

        <div>
          <Label htmlFor="propertyType">Property Type</Label>
          <Select {...register("propertyType")}>
            <option value="">Select</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="condo">Condo</option>
          </Select>
        </div>

        <div>
          <Label>Stay Length</Label>
          <div className="flex space-x-4">
            <Checkbox id="shortTerm" {...register("stayLength.shortTerm")} />
            <Label htmlFor="shortTerm">Short Term (1-6 Months)</Label>
            <Checkbox id="longTerm" {...register("stayLength.longTerm")} />
            <Label htmlFor="longTerm">Long Term (6+ Months)</Label>
            <Checkbox id="both" {...register("stayLength.both")} />
            <Label htmlFor="both">Both</Label>
          </div>
        </div>

        <div>
          <Label htmlFor="priceModel">Price Model</Label>
          <Select {...register("priceModel")}>
            <option value="">Select</option>
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
          </Select>
        </div>

        <div>
          <Label htmlFor="rent">Rent</Label>
          <div className="flex items-center space-x-4">
            <Input
              type="number"
              id="rent"
              {...register("rent")}
              className="w-32"
            />
            <Checkbox id="negotiable" {...register("negotiable")} />
            <Label htmlFor="negotiable">Negotiable</Label>
            <Checkbox id="hideRent" {...register("hideRent")} />
            <Label htmlFor="hideRent">Hide Rent</Label>
          </div>
        </div>

        <div>
          <Label>Availability</Label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="availableFrom">Available from</Label>
              <Controller
                name="availableFrom"
                control={control}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`w-full justify-start text-left font-normal ${!field.value && "text-muted-foreground"}`}
                      >
                        {field.value ? field.value : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
            </div>
            <div>
              <Label htmlFor="availableTo">Available to</Label>
              <Controller
                name="availableTo"
                control={control}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`w-full justify-start text-left font-normal ${!field.value && "text-muted-foreground"}`}
                      >
                        {field.value ? field.value : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
            </div>
          </div>
          <div className="mt-2">
            <Checkbox id="immediate" {...register("immediate")} />
            <Label htmlFor="immediate">Immediate</Label>
          </div>
        </div>

        <div>
          <Label htmlFor="separateBathroom">Separate Bathroom</Label>
          <Select {...register("separateBathroom")}>
            <option value="">Select Number</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3+">3+</option>
          </Select>
        </div>

        <div>
          <Label htmlFor="deposit">Deposit</Label>
          <Input
            type="number"
            id="deposit"
            {...register("deposit")}
            className="w-32"
          />
        </div>

        <div>
          <Label htmlFor="furnished">Is room furnished?</Label>
          <Select {...register("furnished")}>
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
                  id={utility.toLowerCase()}
                  {...register(`utilities.${utility.toLowerCase()}`)}
                />
                <Label htmlFor={utility.toLowerCase()}>{utility}</Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label>Amenities Include</Label>
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
                  id={amenity.toLowerCase().replace(/\s/g, "-")}
                  {...register(
                    `amenities.${amenity.toLowerCase().replace(/\s/g, "_")}`
                  )}
                />
                <Label htmlFor={amenity.toLowerCase().replace(/\s/g, "-")}>
                  {amenity}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label>Dietary Preference</Label>
          <RadioGroup defaultValue="vegetarian">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="vegetarian" id="vegetarian" />
              <Label htmlFor="vegetarian">Vegetarian</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="non-veg" id="non-veg" />
              <Label htmlFor="non-veg">Non-Veg</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="both-ok" id="both-ok" />
              <Label htmlFor="both-ok">Both Ok</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label>Smoking Policy</Label>
          <RadioGroup defaultValue="no-smoking">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no-smoking" id="no-smoking" />
              <Label htmlFor="no-smoking">No Smoking</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="smoking-ok" id="smoking-ok" />
              <Label htmlFor="smoking-ok">Smoking is ok</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="outside-only" id="outside-only" />
              <Label htmlFor="outside-only">Smoke outside only</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label>Pet Friendly</Label>
          <RadioGroup defaultValue="no-pets">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no-pets" id="no-pets" />
              <Label htmlFor="no-pets">No Pets</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="only-dogs" id="only-dogs" />
              <Label htmlFor="only-dogs">Only Dogs</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="only-cats" id="only-cats" />
              <Label htmlFor="only-cats">Only Cats</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="any-pet-ok" id="any-pet-ok" />
              <Label htmlFor="any-pet-ok">Any Pet is Ok</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="openHouseSchedule">Open House Schedule</Label>
          <Input
            type="date"
            id="openHouseSchedule"
            {...register("openHouseSchedule")}
          />
        </div>

        <div>
          <Label>Add your photos below</Label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">
              <Upload
                className="mx-auto h-12 w-12 text-gray-300"
                aria-hidden="true"
              />
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

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Your Details:</h3>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              {...register("name")}
              defaultValue="aashna sagar"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              defaultValue="aashnasagar19@gmail.com"
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              {...register("phone")}
              defaultValue="6284380585"
            />
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              {...register("address")}
              placeholder="Enter a location"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input {...register("city")} placeholder="City" />
            <Input {...register("state")} placeholder="State" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input {...register("zipCode")} placeholder="Enter zipcode" />
            <Input {...register("country")} placeholder="Country" />
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full">
        Add New Room
      </Button>
    </form>
  );
}
