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
import { HelpCircle, Send, User, Mail, Phone, ChevronRight } from "lucide-react";
import { DashboardLayout } from "@/components/layout";
import Link from "next/link";

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
    <DashboardLayout>
      <main className="flex-1 overflow-y-auto">
        <header className="bg-gray-100 text-black p-4">
          <h1 className="text-2xl font-semibold flex items-center">
            <HelpCircle className="mr-2" /> Help
          </h1>
        </header>
        <div className="container mx-auto lg:px-4">
          <nav
            className="flex text-sm text-gray-500 p-2 items-center"
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
                    href="/dashboard/help"
                    className="ml-1 hover:text-gray-700"
                  >
                    Help
                  </Link>
                </div>
              </li>
            </ol>
          </nav>
          <form className="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4 border">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <Input id="name" type="text" placeholder="Your name" />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <Input id="email" type="email" placeholder="Your email" />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phone"
              >
                Phone Number
              </label>
              <Input id="phone" type="tel" placeholder="Your phone number" />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <Textarea
                id="description"
                placeholder="Describe your issue"
                className="h-32"
              />
            </div>
            <div className="flex items-center justify-between">
              <Button className="bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Send response
              </Button>
            </div>
          </form>
          <p className="text-center text-sm text-red-500">
            **Alternatively, you can reach out via email at
            verydesionline@gmail.com
          </p>
        </div>
      </main>
    </DashboardLayout>
  );
}
