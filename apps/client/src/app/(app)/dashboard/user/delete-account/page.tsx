"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, ChevronRight, Trash2Icon } from "lucide-react";
import { DashboardLayout } from "@/components/layout";
import Link from "next/link";

export default function Component() {
  const [password, setPassword] = useState("");
  const [reason, setReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the account deletion logic
    console.log("Account deletion submitted", {
      password,
      reason: reason === "other" ? customReason : reason,
    });
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col w-full py-4">
        <nav
          className="flex  mb-4 text-sm text-gray-500 px-4"
          aria-label="Breadcrumb"
        >
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
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
                  href="/dashboard/user"
                  className="ml-1 hover:text-gray-700"
                >
                  Settings
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 mx-1" />
                <span className="ml-1 font-medium text-gray-700">
                  Update Password
                </span>
              </div>
            </li>
          </ol>
        </nav>
        <Card className="p-4 max-w-2xl w-full lg:ml-3">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-red-600">
              Delete Account
            </CardTitle>
            <CardDescription>
              We're sorry to see you go. Please note that this action is
              irreversible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Confirm your password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">Reason for leaving</Label>
                <Select onValueChange={setReason} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="not-useful">
                      Not useful for me
                    </SelectItem>
                    <SelectItem value="too-complicated">
                      Too complicated to use
                    </SelectItem>
                    <SelectItem value="found-alternative">
                      Found a better alternative
                    </SelectItem>
                    <SelectItem value="privacy-concerns">
                      Privacy concerns
                    </SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {reason === "other" && (
                <div className="space-y-2">
                  <Label htmlFor="custom-reason">Please specify</Label>
                  <Textarea
                    id="custom-reason"
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    placeholder="Tell us more about why you're leaving..."
                    required
                  />
                </div>
              )}
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div
              className="flex items-center p-4 text-sm text-amber-800 border border-amber-300 rounded-lg bg-amber-50"
              role="alert"
            >
              <AlertCircle className="flex-shrink-0 inline w-4 h-4 mr-3" />
              <span className="sr-only">Warning</span>
              <div>
                <span className="font-medium">Warning:</span> This action cannot
                be undone. All your data will be permanently deleted.
              </div>
            </div>
            <Button
              type="submit"
              variant="destructive"
              className=" w-full sm:w-auto"
            >
              <Trash2Icon className="w-4 h-4 mr-2" />
              Permanently Delete Account
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
}
