import { z } from "zod";

export const postroomschema = z.object({
  postingIn: z.string({ required_error: "PostingIn is required" }),
  postingType: z.enum(["Rooms", "Rental"], {
    required_error: "Posting type is required",
  }),
  Title: z.string().min(1, { message: "Title is required" }),
  description: z
    .string()
    .min(50, { message: "Description must be at least 50 characters" }),
  propertyType: z.enum(
    [
      "Room",
      "Shared Room",
      "Single Room",
      "Apartment",
      "Condo",
      "Town House",
      "Home",
      "House",
      "Basement",
    ],
    {
      required_error: "Property type is required",
    }
  ),
  stayLength: z.enum(["short", "long", "both"], {
    required_error: "Stay length is required",
  }),
  priceModel: z.enum(["monthly", "weekly", "daily"], {
    required_error: "Price model is required",
  }),
  price: z.number().min(1, { message: "Price is required" }),
  negotiable: z.boolean(),
  hideRent: z.boolean(),
  availableFrom: z.date().nullable(),
  availableTo: z.date().nullable(),
  immediate: z.boolean(),
  separateBathroom: z.string(),
  PreferredGender: z.enum(["Male", "Female", "Any"]),
  securityDeposit: z.number(),
  toShare: z.enum([
    "Furnished",
    "Unfurnished",
    "Furnished only with Bed",
    "Semi Furnished",
    "Fully Furnished",
  ]),
  utilities: z.array(z.string()),
  amenities: z.array(z.string()),
  dietaryPreferences: z.string(),
  smokingPolicy: z.string(),
  petPolicy: z.string(),
  openHouseDate: z.date().optional(),
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Email is required" }),
  phoneNumber: z.string().min(10, { message: "Phone number is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  zipCode: z.string().min(5, { message: "Zip code is required" }),
  country: z.string().min(1, { message: "Country is required" }),
});

export type FormData = z.infer<typeof postroomschema>;
