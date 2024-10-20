import { z } from "zod";

export const passwordSchema = z.object({
  oldpassword: z
    .string()
    .min(8, "Current password must be at least 8 characters"),
  newpassword: z
    .string()
    .min(8, "Confirm password must be at least 8 characters"),
  confirmPassword: z
    .string()
    .min(8, "Confirm password must be at least 8 characters"),
});
