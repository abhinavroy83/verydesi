import { z } from "zod";

export const passwordSchema = z.object({
  currentPassword: z
    .string()
    .min(8, "Current password must be at least 8 characters"),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
  confirmPassword: z
    .string()
    .min(8, "Confirm password must be at least 8 characters"),
});
