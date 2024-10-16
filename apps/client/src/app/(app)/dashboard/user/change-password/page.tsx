"use client";
import { useState } from "react";
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

type PasswordFormValues = z.infer<typeof passwordSchema>;

export default function Component() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
  });

  const OnSubmit = (data: PasswordFormValues) => {
    // Here you would typically handle the password update logic
    console.log("Password update submitted");
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
                <Label htmlFor="current-password">Current Password</Label>
                <div className="relative">
                  <Input
                    id="current-password"
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    {...register("currentPassword")}
                    className="pr-10"
                    required
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
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showNewPassword ? "text" : "password"}
                    {...register("newPassword")}
                    className="pr-10"
                    required
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
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  {...register("confirmPassword")}
                  required
                />
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div
              className="flex items-center p-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50"
              role="alert"
            >
              <AlertCircle className="flex-shrink-0 inline w-4 h-4 mr-3" />
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">Tip:</span> Use a strong, unique
                password that you don't use for other accounts.
              </div>
            </div>
            <Button type="submit" className="w-full sm:w-auto">
              <LockIcon className="w-4 h-4 mr-2" />
              Update Password
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
}
