import { z } from "zod";

export const postroomschema = z.object({
  postingType: z.enum(["Rooms", "Rental"], {
    required_error: "Posting type is required",
  }),
  Title: z.string().min(1, { message: "Title is required" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  propertyType: z.enum(["apartment", "house", "condo"], {
    required_error: "Property type is required",
  }),
  stayLength: z.enum(["short", "long", "both"], {
    required_error: "Stay length is required",
  }),
  priceModel: z.enum(["monthly", "weekly", "daily"], {
    required_error: "Price model is required",
  }),
  price: z.number().min(1, { message: "Price is required" }),
  negotiable: z.boolean(),
  hideRent: z.boolean(),
  availableFrom: z.date({
    required_error: "Available from date is required",
  }),
  availableTo: z.date({
    required_error: "Available to date is required",
  }),
  immediate: z.boolean(),
  separateBathroom: z.enum(["1", "2", "3+"], {
    required_error: "Number of separate bathrooms is required",
  }),
  securityDeposit: z
    .number()
    .min(0, { message: "Security deposit must be 0 or more" }),
  toShare: z.enum(["furnished", "unfurnished", "partially"], {
    required_error: "Furnishing status is required",
  }),
  utilities: z
    .array(z.string())
    .min(1, { message: "Select at least one utility" }),
  amenities: z
    .array(z.string())
    .min(1, { message: "Select at least one amenity" }),
  dietaryPreferences: z
    .array(z.string())
    .min(1, { message: "Select at least one dietary preference" }),
  smokingPolicy: z
    .array(z.string())
    .min(1, { message: "Select at least one smoking policy" }),
  petPolicy: z
    .array(z.string())
    .min(1, { message: "Select at least one pet policy" }),
  openHouseDate: z.date().optional(),
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z.string().min(10, { message: "Phone number is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  zipCode: z.string().min(5, { message: "Zip code is required" }),
  country: z.string().min(1, { message: "Country is required" }),
});

export type FormData = z.infer<typeof postroomschema>;
