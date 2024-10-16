"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lock, Mail, ArrowRight, CheckCircle } from "lucide-react";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

interface FormData {
  email: string;
}

export default function Component() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = async (data: FormData) => {
    console.log(data.email); // logs the email from the form
    try {
      const res = await axios.post(
        "http://apiv2.verydesi.com/auth/forgot-password",
        data
      );

      if (res.data.status === false) {
        return toast.error("User not found");
      }

      console.log(res);
      setIsSubmitted(true);
      toast.success(res.data.msg);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.status === 401) {
          toast.error("Unauthorized request, please try again.");
        } else if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An error occurred while sending reset email.");
        }
      } else {
        toast.error("Something went wrong.");
      }
      console.error("Error:", error);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Forgot Password
          </CardTitle>
          <CardDescription className="text-center">
            Don't worry. We'll send you reset instructions.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center">
                <Lock className="w-16 h-16 text-blue-500" />
              </div>
            </motion.div>
          </div>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...register("email", { required: "Email is required" })}
                    className="pl-10"
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600"
              >
                Send Reset Link
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="text-center space-y-4"
            >
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
              <p className="text-lg font-semibold">Reset Link Sent!</p>
              <p className="text-sm text-gray-500">
                Check your email for the password reset link. It may take a few
                minutes to arrive.
              </p>
            </motion.div>
          )}
        </CardContent>
        <CardFooter>
          <p className="text-sm text-center text-gray-500 w-full">
            Remember your password?{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Log in
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
