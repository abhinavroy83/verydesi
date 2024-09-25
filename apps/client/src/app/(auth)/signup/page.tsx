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
import { motion } from "framer-motion";

export default function RefinedSignUp() {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-extrabold text-center text-gray-800">
              Join Us
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              Create your account and start your journey
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="firstName"
                  className="text-sm font-semibold text-gray-700"
                >
                  First name
                </Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  required
                  className="rounded-md border-2 border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition-all duration-200"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="lastName"
                  className="text-sm font-semibold text-gray-700"
                >
                  Last name
                </Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  required
                  className="rounded-md border-2 border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition-all duration-200"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-semibold text-gray-700"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                required
                className="rounded-md border-2 border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition-all duration-200"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="phoneNumber"
                className="text-sm font-semibold text-gray-700"
              >
                Phone number
              </Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="+1 (555) 000-0000"
                required
                className="rounded-md border-2 border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition-all duration-200"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-semibold text-gray-700"
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                required
                className="rounded-md border-2 border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition-all duration-200"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="confirmPassword"
                className="text-sm font-semibold text-gray-700"
              >
                Confirm password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                required
                className="rounded-md border-2 border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition-all duration-200"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => setIsHovering(true)}
              onHoverEnd={() => setIsHovering(false)}
              className="w-full"
            >
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition-all duration-200 ease-in-out">
                Create Account
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovering ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-center text-sm text-gray-500"
            >
              Let's embark on this exciting journey together!
            </motion.div>
            <p className="text-xs text-center text-gray-500">
              By signing up, you agree to our{" "}
              <a
                href="#"
                className="text-purple-600 hover:text-purple-800 underline"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-purple-600 hover:text-purple-800 underline"
              >
                Privacy Policy
              </a>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
