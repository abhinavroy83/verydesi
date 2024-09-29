"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HelpCircle, Send, User, Mail, Phone } from "lucide-react";

export default function Component() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 mt-[6rem] lg:mt-[2rem]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center">
            <HelpCircle className="mr-2 h-6 w-6 text-purple-600" />
            Help
          </CardTitle>
          <CardDescription className="text-center">
            Fill out the form below and we'll get back to you as soon as
            possible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="rounded-md border-2 border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition-all duration-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center">
                <Mail className="mr-2 h-4 w-4" />
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="rounded-md border-2 border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition-all duration-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center">
                <Phone className="mr-2 h-4 w-4" />
                Phone Number
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="123-456-7890"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="rounded-md border-2 border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition-all duration-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="How can we help you?"
                value={formData.description}
                onChange={handleInputChange}
                required
                className="rounded-md border-2 border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition-all duration-200"
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition-all duration-200 ease-in-out"
            onClick={handleSubmit}
          >
            <Send className="mr-2 h-4 w-4" />
            Send response
          </Button>
          <p className="text-sm text-center text-gray-500">
            Alternatively, you can reach out via email at{" "}
            <a
              href="mailto:verydesionline@gmail.com"
              className="text-blue-500 hover:underline"
            >
              verydesionline@gmail.com
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
