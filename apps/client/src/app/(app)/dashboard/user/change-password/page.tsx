"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertCircle,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  ChevronRight,
  Lock,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout";
import Link from "next/link";
import { passwordSchema } from "@/schemas";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

type PasswordFormValues = z.infer<typeof passwordSchema>;

export default function Component() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
  });

  const newPassword = watch("newpassword");
  const confirmPassword = watch("confirmPassword");
  const { data: session } = useSession();

  useEffect(() => {
    setPasswordsMatch(newPassword === confirmPassword);
  }, [newPassword, confirmPassword]);

  const onsubmit = async (data: PasswordFormValues) => {
    const token = session?.accessToken;

    if (!token) {
      return console.error("Token not found");
    }

    if (passwordsMatch) {
      try {
        const res = await axios.patch(
          "https://apiv2.verydesi.com/auth/update-password",
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success(res.data.message);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            console.error("Server responded with:", error.response.data);
            toast.error(
              error.response.data.message || "Error updating password"
            );
          } else if (error.request) {
            console.error("No response received:", error.request);
            toast.error("No response from server");
          } else {
            console.error("Error setting up request:", error.message);
            toast.error("An error occurred while updating the password");
          }
        } else {
          console.error("Unexpected error:", error);
          toast.error("An unexpected error occurred");
        }
      }
    } else {
      toast.error("Passwords do not match");
    }
  };

  return (
    <DashboardLayout>
      <div className="flex-1 overflow-y-auto font-sans">
        <div className="bg-gray-100 text-black p-4 rounded-t-lg flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h2 className="text-xl sm:text-2xl font-bold flex items-center mb-2 sm:mb-0">
            <Lock className="mr-2 h-5 w-5 sm:h-6 sm:w-6" /> Update Password
          </h2>
        </div>
        <div className="mx-auto px-4 md:px-6 lg:px-8 lg:py-6 py-2">
          <nav
            className="flex mb-4 text-sm text-gray-500"
            aria-label="Breadcrumb"
          >
            <ol className="inline-flex items-center space-x-1">
              <li className="inline-flex items-center">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center text-sm md:text-base hover:text-gray-700 hover:underline"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 mx-1" />
                  <Link
                    href="/dashboard/user"
                    className="ml-1 text-sm md:text-base hover:text-gray-700 hover:underline"
                  >
                    Settings
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 mx-1" />
                  <span className="ml-1 text-sm md:text-base text-gray-500 hover:underline cursor-pointer">
                    Update Password
                  </span>
                </div>
              </li>
            </ol>
          </nav>
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl mb-2">
                Change Password
              </CardTitle>
              <CardDescription>
                Change your password to keep your account secure.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="oldpassword" className="text-sm sm:text-base">
                    Current Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="oldpassword"
                      type={showCurrentPassword ? "text" : "password"}
                      {...register("oldpassword")}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-600"
                    >
                      {showCurrentPassword ? (
                        <EyeOffIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                      ) : (
                        <EyeIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                      )}
                    </button>
                  </div>
                  {errors.oldpassword && (
                    <p className="text-red-500 text-xs sm:text-sm mt-1">
                      {errors.oldpassword.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newpassword" className="text-sm sm:text-base">
                    New Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="newpassword"
                      type={showNewPassword ? "text" : "password"}
                      {...register("newpassword")}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-600"
                    >
                      {showNewPassword ? (
                        <EyeOffIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                      ) : (
                        <EyeIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                      )}
                    </button>
                  </div>
                  {errors.newpassword && (
                    <p className="text-red-500 text-xs sm:text-sm mt-1">
                      {errors.newpassword.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-sm sm:text-base"
                  >
                    Confirm New Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    {...register("confirmPassword")}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs sm:text-sm mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                  {!passwordsMatch && (
                    <p className="text-red-500 text-xs sm:text-sm mt-1">
                      Passwords do not match
                    </p>
                  )}
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div
                className="flex items-center p-4 text-xs sm:text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50"
                role="alert"
              >
                <AlertCircle className="flex-shrink-0 inline w-4 h-4 mr-3" />
                <span className="sr-only">Info</span>
                <div>
                  <span className="font-medium">Tip:</span> Use a strong, unique
                  password that you don't use for other accounts.
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-green-800 hover:bg-green-700"
                disabled={!passwordsMatch}
                onClick={handleSubmit(onsubmit)}
              >
                <LockIcon className="w-4 h-4 mr-2" />
                Update Password
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
