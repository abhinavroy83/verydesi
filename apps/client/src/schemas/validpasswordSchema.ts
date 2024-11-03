import { object, z } from "zod";

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

export const SinglepasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
