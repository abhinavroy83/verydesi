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
import { Users, Home, Mail, Search } from "lucide-react";
import DashboardLayout from "@/components/Layout/Dashboardlayout";

export default function Dashboard() {
  return (
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

        {/* Recent Activity and Quick Actions */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Activity */}
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
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
