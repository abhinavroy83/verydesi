import { z } from "zod";

export const EventformSchema = z.object({
  eventpostingcity: z.string({ required_error: "PostingIn is required" }),
  eventTitle: z.string().min(2, {
    message: "Event title must be at least 2 characters.",
  }),
  eventType: z.string().min(1, {
    message: "Event type is required.",
  }),

  startDate: z.date({
    required_error: "Start date is required.",
    invalid_type_error: "Start date must be a valid date.",
  }),
  startTime: z.string().min(1, {
    message: "Start time is required.",
  }),
  endDate: z.date({
    required_error: "End date is required.",
    invalid_type_error: "End date must be a valid date.",
  }),
  endTime: z.string().min(1, {
    message: "End time is required.",
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
    .max(500, {
      message: "Description must not be longer than 30 characters.",
    }),
  venueName: z.string().min(1, {
    message: "Venue name is required.",
  }),
  entryoption: z.string().min(1, {
    message: "Event type is required.",
  }),
  virtualurl: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  zipCode: z.string().optional(),
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
  images: z.array(z.string()).max(5, "You can upload a maximum of 5 images"),
});

export type EventformData = z.infer<typeof EventformSchema>;
