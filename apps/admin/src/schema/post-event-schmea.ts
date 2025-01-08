import { z } from "zod";

export const EventformSchema = z.object({
  eventpostingcity: z.string({ required_error: "PostingIn is required" }),
  eventTitle: z.string().min(2, {
    message: "Event title must be at least 2 characters.",
  }),
  eventType: z.string().min(1, {
    message: "Event type is required.",
  }),
  startDate: z
    .date({
      required_error: "Start date is required.",
      invalid_type_error: "Start date must be a valid date.",
    })
    .nullable(),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Please enter a valid time in HH:MM format",
  }),
  endDate: z
    .date({
      required_error: "End date is required.",
      invalid_type_error: "End date must be a valid date.",
    })
    .nullable(),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Please enter a valid time in HH:MM format",
  }),
  timeZone: z.string().min(1, {
    message: "Time zone is required.",
  }),
  repeatEvent: z.string().min(1, {
    message: "Repeat event option is required.",
  }),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .refine((desc) => desc.trim().split(/\s+/).length <= 1000, {
      message: "Description must not exceed 1000 words.",
    }),

  venueName: z.string().min(1, {
    message: "Venue name is required.",
  }),
  entryoption: z.string().min(1, {
    message: "Event type is required.",
  }),
  virtualurl: z.string().optional(),
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  eventprice: z.string().optional(),
  country: z.string().optional(),
  languages: z.array(z.string()).min(1, {
    message: "At least one language must be selected.",
  }),
  organization: z.string().min(1, { message: "Organization name is required" }),
  hostedBy: z.string().min(1, { message: "Hosted By is required" }),
  contactNumber: z.string().optional(),
  artists: z
    .array(
      z.object({
        name: z.string().min(1, { message: "Artist name is required" }),
      })
    )
    .min(1, { message: "At least one artist is required" }),
});

export type EventformData = z.infer<typeof EventformSchema>;
