"use client";

import { useState } from "react";
import { X, User, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

export default function ContactForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    toast({
      title: "Contact request sent!",
      description: "We'll get back to you soon.",
    });
    setIsOpen(false);
    setFormData({ name: "", email: "", number: "" });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md"
        >
          Contact Us
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md p-0 bg-transparent border-none shadow-none">
        <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg">
          <DialogHeader className="p-6 border-b border-gray-200 dark:border-gray-700">
            <DialogTitle className="text-2xl font-semibold">
              Contact
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Name
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="pl-10"
                  placeholder="Your name"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="number"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Number
              </label>
              <div className="relative">
                <Phone
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input
                  id="number"
                  name="number"
                  type="tel"
                  value={formData.number}
                  onChange={handleInputChange}
                  className="pl-10"
                  placeholder="Your phone number"
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
