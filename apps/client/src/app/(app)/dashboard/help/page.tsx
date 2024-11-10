"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  HelpCircle,
  Send,
  User,
  Mail,
  Phone,
  ChevronRight,
} from "lucide-react"
import { DashboardLayout } from "@/components/layout"
import Link from "next/link"

export default function Component() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData)
  }

  return (
    <DashboardLayout>
      <main className="flex-1 overflow-y-auto font-sans">
        <header className="bg-gray-100 text-black p-4">
          <h1 className="text-xl md:text-2xl font-semibold flex items-center">
            <HelpCircle className="mr-2 h-5 w-5 md:h-6 md:w-6" /> Help
          </h1>
        </header>
        <div className="mx-auto px-4 md:px-6 lg:px-8 lg:py-6 py-2">
          <nav
            className="flex text-sm text-gray-500 mb-4 items-center"
            aria-label="Breadcrumb"
          >
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
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
                    href="/dashboard/help"
                    className="ml-1 text-sm md:text-base hover:text-gray-700 hover:underline"
                  >
                    Help
                  </Link>
                </div>
              </li>
            </ol>
          </nav>
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">Need Help?</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Your phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe your issue"
                    className="min-h-[120px]"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-green-800 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm md:text-base"
                >
                  Send response
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-center text-xs md:text-sm text-red-500">
                Alternatively, you can reach out via email at verydesionline@gmail.com
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
    </DashboardLayout>
  )
}