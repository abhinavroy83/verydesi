"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users, Home, Mail, Search, Badge } from "lucide-react";
import DashboardLayout from "@/components/Layout/Dashboardlayout";
import ProtectedRoute from "@/context/ProtectedRoute";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { date } from "zod";

export default function Dashboard() {
  const [duplicateroomdata, setduplicateroomdata] = useState([]);
  const { data: session } = useSession();
  console.log(session);
  const fetchduplicateroom = async () => {
    try {
      const res = await axios.get("https://apiv2.verydesi.com/room/duplicates");
      console.log(res.data);
      setduplicateroomdata(res.data);
    } catch (error) {
      console.log("error while fetching api ", error);
    }
  };
  useEffect(() => {
    fetchduplicateroom();
  }, []);
  return (
    <ProtectedRoute requiredPermission="view_dashboard">
      <DashboardLayout>
        <div className="space-y-6">
          {/* Welcome Message */}
          <Card>
            <CardHeader>
              <CardTitle>Welcome back, Admin!</CardTitle>
              <CardDescription>
                Here's what's happening with your dashboard today.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Stats Overview */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Total Users",
                icon: Users,
                value: "1,234",
                change: "+20.1% from last month",
              },
              {
                title: "Active Rooms",
                icon: Home,
                value: "324",
                change: "+15% from last month",
              },
              {
                title: "Pending Requests",
                icon: Mail,
                value: "45",
                change: "+12 since yesterday",
              },
            ].map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>You have 3 new notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="mb-4 flex items-start space-x-4 rounded-md border p-3"
                    >
                      <Avatar>
                        <AvatarImage src={`/placeholder-avatar-${i}.jpg`} />
                        <AvatarFallback>U{i}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          User {i} registered
                        </p>
                        <p className="text-sm text-muted-foreground">
                          2 hours ago
                        </p>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Perform common tasks quickly</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button>
                    <Users className="mr-2 h-4 w-4" />
                    Add User
                  </Button>
                  <Button>
                    <Home className="mr-2 h-4 w-4" />
                    New Room
                  </Button>
                </div>
                <div className="relative">
                  <Input placeholder="Search users..." />
                  <Button size="sm" className="absolute right-1 top-1">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle className="flex items-center text-2xl font-bold text-red-500 text-primary">
                      <Home className="mr-2 h-6 w-6 text-red-600" />
                      <span className=" text-red-600">
                        {duplicateroomdata.length} Repeating Rooms
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[250px] pr-4">
                      {duplicateroomdata.map((item, index) => (
                        <div
                          key={item._id}
                          className="mb-3 flex items-center justify-between rounded-lg bg-secondary p-3 transition-colors hover:bg-secondary/80"
                        >
                          <span className="text-lg font-medium">
                            {item.Title}{" "}
                            <span className=" font-bold text-red-600">
                              in {item.postingincity}
                            </span>
                          </span>
                          <span className=" px-4 py-2 bg-red-300 rounded-full">
                            {item.count}
                          </span>
                        </div>
                      ))}
                    </ScrollArea>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
