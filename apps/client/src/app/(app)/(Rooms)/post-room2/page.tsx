"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  CalendarIcon,
  Upload,
  X,
  Home,
  DollarSign,
  Settings,
  User,
} from "lucide-react";
import { postroomschema } from "@/schemas";

type FormData = z.infer<typeof postroomschema>;

const formSections = [
  { id: 1, title: "Basic Info", icon: Home },
  { id: 2, title: "Pricing & Availability", icon: DollarSign },
  { id: 3, title: "Amenities & Policies", icon: Settings },
  { id: 4, title: "Photos & Contact", icon: User },
];

export default function Component() {
  const [step, setStep] = useState(1);
  const [images, setImages] = useState<File[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(postroomschema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    // Handle form submission here
  };

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

  return (
    <div className="flex min-h-screen bg-gray-100 mt-32 max-w-[1370px] lg:max-w-[1600px] mx-auto">
      <aside className="w-64 bg-white shadow-md">
        <nav className="p-6 space-y-2">
          {formSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setStep(section.id)}
              className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                step === section.id
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-gray-100"
              }`}
            >
              <section.icon className="w-5 h-5 mr-3" />
              {section.title}
            </button>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <Card className="w-full max-w-3xl mx-auto">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {step === 1 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" {...register("Title")} />
                    {errors.Title && (
                      <p className="text-red-500 text-sm">
                        {errors.Title.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" {...register("description")} />
                    {errors.description && (
                      <p className="text-red-500 text-sm">
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="property-type">Property Type</Label>
                    <Select {...register("propertyType")}>
                      <option value="">Select</option>
                      <option value="apartment">Apartment</option>
                      <option value="house">House</option>
                      <option value="condo">Condo</option>
                    </Select>
                    {errors.propertyType && (
                      <p className="text-red-500 text-sm">
                        {errors.propertyType.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stay-length">Stay Length</Label>
                    <Select {...register("stayLength")}>
                      <option value="">Select</option>
                      <option value="short">Short term (1-89 nights)</option>
                      <option value="long">Long term (90+ nights)</option>
                      <option value="both">Both</option>
                    </Select>
                    {errors.stayLength && (
                      <p className="text-red-500 text-sm">
                        {errors.stayLength.message}
                      </p>
                    )}
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (Month)</Label>
                    <div className="flex items-center space-x-2">
                      <span>$</span>
                      <Input
                        id="price"
                        type="number"
                        {...register("price", { valueAsNumber: true })}
                      />
                    </div>
                    {errors.price && (
                      <p className="text-red-500 text-sm">
                        {errors.price.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Availability</Label>
                    <div className="flex space-x-2">
                      <Input
                        type="date"
                        {...register("availableFrom")}
                        className="w-1/2"
                      />
                      <Input
                        type="date"
                        {...register("availableTo")}
                        className="w-1/2"
                      />
                    </div>
                    {errors.availableFrom && (
                      <p className="text-red-500 text-sm">
                        {errors.availableFrom.message}
                      </p>
                    )}
                    {errors.availableTo && (
                      <p className="text-red-500 text-sm">
                        {errors.availableTo.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="security-deposit">Security Deposit</Label>
                    <Select {...register("securityDeposit")}>
                      <option value="">Select Number</option>
                      <option value="1">1 month</option>
                      <option value="2">2 months</option>
                    </Select>
                    {errors.securityDeposit && (
                      <p className="text-red-500 text-sm">
                        {errors.securityDeposit.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="to-share">To share/furnished?</Label>
                    <Select {...register("toShare")}>
                      <option value="">Select</option>
                      <option value="shared">Shared</option>
                      <option value="furnished">Furnished</option>
                      <option value="both">Both</option>
                    </Select>
                    {errors.toShare && (
                      <p className="text-red-500 text-sm">
                        {errors.toShare.message}
                      </p>
                    )}
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <div className="space-y-2">
                    <Label>Utilities include</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "Water",
                        "Electricity",
                        "Wi-Fi",
                        "Gas",
                        "Air Conditioner",
                        "Dryer",
                      ].map((utility) => (
                        <div
                          key={utility}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={utility.toLowerCase()}
                            {...register("utilities")}
                            value={utility.toLowerCase()}
                          />
                          <Label htmlFor={utility.toLowerCase()}>
                            {utility}
                          </Label>
                        </div>
                      ))}
                    </div>
                    {errors.utilities && (
                      <p className="text-red-500 text-sm">
                        {errors.utilities.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Amenities include</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "Kitchen",
                        "Private Bathroom",
                        "Microwave",
                        "TV",
                        "Heater",
                        "Closet",
                        "Private Entrance",
                        "Swimming Pool",
                        "Parking",
                        "Laundry Service",
                        "Smoke Detector",
                        "Carbon Monoxide",
                        "First Aid",
                        "Fire Extinguisher",
                      ].map((amenity) => (
                        <div
                          key={amenity}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={amenity.toLowerCase().replace(" ", "-")}
                            {...register("amenities")}
                            value={amenity.toLowerCase().replace(" ", "-")}
                          />
                          <Label
                            htmlFor={amenity.toLowerCase().replace(" ", "-")}
                          >
                            {amenity}
                          </Label>
                        </div>
                      ))}
                    </div>
                    {errors.amenities && (
                      <p className="text-red-500 text-sm">
                        {errors.amenities.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Dietary Preferences</Label>
                    <div className="flex space-x-4">
                      {["Vegetarian", "Non-veg", "Both Ok"].map((pref) => (
                        <div key={pref} className="flex items-center space-x-2">
                          <Checkbox
                            id={pref.toLowerCase().replace(" ", "-")}
                            {...register("dietaryPreferences")}
                            value={pref.toLowerCase().replace(" ", "-")}
                          />
                          <Label htmlFor={pref.toLowerCase().replace(" ", "-")}>
                            {pref}
                          </Label>
                        </div>
                      ))}
                    </div>
                    {errors.dietaryPreferences && (
                      <p className="text-red-500 text-sm">
                        {errors.dietaryPreferences.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Smoking Policy</Label>
                    <div className="flex space-x-4">
                      {["No Smoking", "Smoking ok", "Smoke outside only"].map(
                        (policy) => (
                          <div
                            key={policy}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={policy.toLowerCase().replace(" ", "-")}
                              {...register("smokingPolicy")}
                              value={policy.toLowerCase().replace(" ", "-")}
                            />
                            <Label
                              htmlFor={policy.toLowerCase().replace(" ", "-")}
                            >
                              {policy}
                            </Label>
                          </div>
                        )
                      )}
                    </div>
                    {errors.smokingPolicy && (
                      <p className="text-red-500 text-sm">
                        {errors.smokingPolicy.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Pet Friendly</Label>
                    <div className="flex space-x-4">
                      {["No Pets", "Cats", "Small Dogs", "Any Pets"].map(
                        (pet) => (
                          <div
                            key={pet}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={pet.toLowerCase().replace(" ", "-")}
                              {...register("petPolicy")}
                              value={pet.toLowerCase().replace(" ", "-")}
                            />
                            <Label
                              htmlFor={pet.toLowerCase().replace(" ", "-")}
                            >
                              {pet}
                            </Label>
                          </div>
                        )
                      )}
                    </div>
                    {errors.petPolicy && (
                      <p className="text-red-500 text-sm">
                        {errors.petPolicy.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="open-house">Open House Schedule</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="open-house"
                        type="date"
                        {...register("openHouseDate")}
                      />
                      <CalendarIcon className="h-5 w-5 text-gray-500" />
                    </div>
                  </div>
                </>
              )}

              {step === 4 && (
                <>
                  <div className="space-y-2">
                    <Label>Add your photos (up to 5)</Label>
                    <div className="border-2 border-dashed border-gray-300 p-4 text-center rounded-lg">
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
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Your Details:</h3>
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" {...register("name")} />
                      {errors.name && (
                        <p className="text-red-500 text-sm">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" {...register("email")} />
                      {errors.email && (
                        <p className="text-red-500 text-sm">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" {...register("phone")} />
                      {errors.phone && (
                        <p className="text-red-500 text-sm">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" {...register("address")} />
                      {errors.address && (
                        <p className="text-red-500 text-sm">
                          {errors.address.message}
                        </p>
                      )}
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <Input {...register("city")} placeholder="City" />
                        {errors.city && (
                          <p className="text-red-500 text-sm">
                            {errors.city.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Input {...register("state")} placeholder="State" />
                        {errors.state && (
                          <p className="text-red-500 text-sm">
                            {errors.state.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Input
                          {...register("zipCode")}
                          placeholder="Zip Code"
                        />
                        {errors.zipCode && (
                          <p className="text-red-500 text-sm">
                            {errors.zipCode.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-between mt-6">
                <Button
                  type="button"
                  onClick={() =>
                    setStep((prevStep) => Math.max(prevStep - 1, 1))
                  }
                  disabled={step === 1}
                  variant="outline"
                >
                  Previous
                </Button>
                {step < 4 ? (
                  <Button
                    type="button"
                    onClick={() =>
                      setStep((prevStep) => Math.min(prevStep + 1, 4))
                    }
                  >
                    Next
                  </Button>
                ) : (
                  <Button type="submit">Submit</Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
