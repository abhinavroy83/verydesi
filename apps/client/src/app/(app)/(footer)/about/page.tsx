"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Globe,
  Users,
  Building,
  Calendar,
  Briefcase,
  Film,
  Tag,
  Shield,
  MapPin,
  Heart,
  ArrowRight,
} from "lucide-react";
function page() {
  return (
    <div className="mt-[7rem]">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-30 bg-[#232f3f]">
        <div className="container px-4 md:px-6  mx-auto">
          <div className="flex flex-col items-center space-y-7 text-center">
            <div className="space-y-7">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-4xl/none text-white">
                About VeryDesi.com
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl dark:text-gray-400">
                VeryDesi.com is your gateway to the world of the Indian and
                South Asian diaspora. Whether you are looking to connect with
                people, discover local businesses, explore exciting events, or
                find jobs and services, VeryDesi.com is the one-stop platform
                that brings the community together.
              </p>
            </div>
            <Button className="bg-white text-black hover:bg-gray-100 p-5 text-[18px]">
              Join Our Community
            </Button>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 mx-auto">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-4xl text-center mb-8">
            Our Mission
          </h2>
          <p className="max-w-[900px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-300 mx-auto text-center">
            At VeryDesi.com, our mission is to unite and empower the Indian and
            South Asian community worldwide. We provide a comprehensive platform
            that connects individuals, promotes local businesses, showcases
            cultural events, and offers a wide range of services to meet the
            unique needs of our diverse diaspora.
          </p>
          <div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 justify-center ">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-6 h-6 mr-2 text-primary" />
                    Connect
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  Unite with the global South Asian community
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building className="w-6 h-6 mr-2 text-primary" />
                    Promote
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  Support and grow South Asian-owned businesses
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-6 h-6 mr-2 text-primary" />
                    Celebrate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  Experience rich cultural events and traditions
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-4xl text-center mb-8">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[
              {
                title: "Social Networking",
                icon: Users,
                description:
                  "Join a vibrant community of Indians and South Asians living across the globe. Share stories, make friends, and celebrate your culture.",
              },
              {
                title: "Business Listings",
                icon: Building,
                description:
                  "Discover and support South Asian-owned businesses in your area. From restaurants to professional services, find trusted local businesses.",
              },
              {
                title: "Events",
                icon: Calendar,
                description:
                  "Stay informed about cultural festivals, concerts, workshops, and community gatherings. Experience your heritage through engaging activities.",
              },
              {
                title: "Jobs",
                icon: Briefcase,
                description:
                  "Find job opportunities or hire talent within the Indian and South Asian community. Connect with diverse, qualified candidates across multiple sectors.",
              },
              {
                title: "Entertainment",
                icon: Film,
                description:
                  "Stay connected with the latest in Bollywood, Tollywood, music, and South Asian pop culture. Get updates on movies, TV shows, and streaming content.",
              },
              {
                title: "Services",
                icon: Tag,
                description:
                  "Access a directory of trusted service providers catering to the community's needs. Find everything from legal services to home tutors.",
              },
              {
                title: "Classifieds",
                icon: Tag,
                description:
                  "Post or browse classifieds for buying, selling, or offering services within the community. Find housing, sell items, or offer your skills.",
              },
            ].map((item, index) => (
              <Card key={index} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <item.icon className="w-6 h-6 mr-2 text-primary" />
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p>{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-4xl text-center mb-8">
            Why Choose VeryDesi.com
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {[
              {
                title: "Tailored for the South Asian Diaspora",
                icon: Heart,
                description:
                  "We understand the cultural nuances, needs, and interests of the Indian and South Asian community, providing solutions that resonate with your cultural identity.",
              },
              {
                title: "Local and Global Connectivity",
                icon: MapPin,
                description:
                  "Connect locally with your community while offering a global reach. Feel at home, no matter where you are in the world.",
              },
              {
                title: "Safe and User-Friendly",
                icon: Shield,
                description:
                  "Enjoy a secure platform with robust privacy features and an easy-to-use interface, accessible for users of all tech levels.",
              },
              {
                title: "Community-Driven",
                icon: Users,
                description:
                  "Our platform grows and evolves through the participation and contributions of our users, creating a supportive space that enriches lives across the diaspora.",
              },
            ].map((item, index) => (
              <Card key={index} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <item.icon className="w-6 h-6 mr-2 text-primary" />
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p>{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-[#232f3f] text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-7">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Join the VeryDesi.com Community!
              </h2>
              <p className="max-w-[900px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                From social networking and classifieds to discovering businesses
                and events, VeryDesi.com offers a world of possibilities.
                Whether you're seeking connection, entertainment, or
                opportunity, our platform is here to meet your needs and
                celebrate the rich culture of the Indian and South Asian
                diaspora.
              </p>
              <p className="max-w-[900px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Start exploring today and experience the best of what
                VeryDesi.com has to offer!
              </p>
            </div>
            <div className="w-full max-w-sm space-y-7">
              <Button className="bg-white text-black hover:bg-gray-100 p-5 text-[18px]">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default page;
