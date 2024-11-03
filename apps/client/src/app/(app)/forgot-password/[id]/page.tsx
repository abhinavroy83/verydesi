"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
import { useForm } from "react-hook-form";
import { SinglepasswordSchema } from "@/schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";

type PasswordFormValues = z.infer<typeof SinglepasswordSchema>;

export default function Component() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams();
  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(SinglepasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = async (data: PasswordFormValues) => {
    try {
      await axios.post(`https://apiv2.verydesi.com/auth/reset-password/${id}`, {
        password: data.password,
      });
      setIsSubmitted(true);
    } catch (error) {
      setError("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Reset Password
          </CardTitle>
          <CardDescription className="text-center">
            Don&apos;t worry. You can update your password here.
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
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <Input
                        type="password"
                        placeholder="Enter password"
                        {...field}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <Input
                        type="password"
                        placeholder="Confirm password"
                        {...field}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600"
                >
                  Reset Password
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </Form>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="text-center space-y-4"
            >
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
              <p className="text-lg font-semibold">
                Password Reset Successful!
              </p>
              <p className="text-sm text-gray-500">
                Your password has been successfully updated. You can now log in
                with your new password.
              </p>
            </motion.div>
          )}
        </CardContent>
        <CardFooter>
          <p className="text-sm text-center text-gray-500 w-full">
            Remember your password?{" "}
            <Link href="/sign-up" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
