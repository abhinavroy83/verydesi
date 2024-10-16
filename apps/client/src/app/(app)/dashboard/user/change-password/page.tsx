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
  const { data: session, status } = useSession();

  useEffect(() => {
    setPasswordsMatch(newPassword === confirmPassword);
  }, [newPassword, confirmPassword]);

  const OnSubmit = async (data: PasswordFormValues) => {
    const token = session?.accessToken;
    if (!token) {
      throw new Error("token not found");
    }
    if (passwordsMatch) {
      console.log(data);
      try {
        const res = await axios.patch(
          "http://apiv2.verydesi.com/auth/update-password",
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(res);
      } catch (error) {
        console.error("Error updating data:", error);
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto flex flex-col w-full">
        <div className="bg-gray-100 text-black p-4 rounded-t-lg items-center space-x-2 mb- flex justify-between w-full">
          <h2 className="text-2xl font-bold flex gap-1 items-center">
            <Lock className="mr-2" /> Update Password
          </h2>
        </div>
        <nav
          className="flex mb-4 text-sm text-gray-500 px-4"
          aria-label="Breadcrumb"
        >
          <ol className="inline-flex items-center space-x-1 md:space-x-3 mt-4">
            <li className="inline-flex items-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center hover:text-gray-700"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 mx-1" />
                <Link
                  href="/dashboard/user"
                  className="ml-1 hover:text-gray-700"
                >
                  Settings
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 mx-1" />
                <span className="ml-1 font-medium text-gray-700">
                  Update Password
                </span>
              </div>
            </li>
          </ol>
        </nav>
        <Card className="p-2 max-w-2xl w-full ml-4">
          <CardHeader>
            <CardDescription>
              Change your password to keep your account secure.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(OnSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="oldpassword">Current Password</Label>
                <div className="relative">
                  <Input
                    id="oldpassword"
                    type={showCurrentPassword ? "text" : "password"}
                    {...register("oldpassword")}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-600"
                  >
                    {showCurrentPassword ? (
                      <EyeOffIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.oldpassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.oldpassword.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="newpassword">New Password</Label>
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
                      <EyeOffIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.newpassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.newpassword.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
                {!passwordsMatch && (
                  <p className="text-red-500 text-sm mt-1">
                    Passwords do not match
                  </p>
                )}
              </div>
              <CardFooter className="flex flex-col space-y-4 px-0">
                <div
                  className="flex items-center p-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50"
                  role="alert"
                >
                  <AlertCircle className="flex-shrink-0 inline w-4 h-4 mr-3" />
                  <span className="sr-only">Info</span>
                  <div>
                    <span className="font-medium">Tip:</span> Use a strong,
                    unique password that you don't use for other accounts.
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full sm:w-auto"
                  disabled={!passwordsMatch}
                >
                  <LockIcon className="w-4 h-4 mr-2" />
                  Update Password
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
