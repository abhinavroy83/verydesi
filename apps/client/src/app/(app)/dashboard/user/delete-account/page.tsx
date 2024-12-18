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
import axios from "axios";
import { useSession } from "next-auth/react";
import ConfirmationPopup from "@/components/Popups/confirmpopups";

export default function Component() {
  const [password, setPassword] = useState("");
  const [reason, setReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const { data: session, status } = useSession();

  const handleSubmit = async () => {
    const token = session?.accessToken;
    if (!token) {
      throw new Error("token not found");
    }
    try {
      const res = await axios({
        method: "delete",
        url: "https://apiv2.verydesi.com/auth/delete-account",
        data: { password },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      console.log("Account deletion submitted", {
        password,
        reason: reason === "other" ? customReason : reason,
      });
    } catch (error) {
      console.error("Error during account deletion:", error);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex-1 overflow-y-auto font-sans">
        <div className="bg-gray-100 text-black p-4 rounded-t-lg flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h2 className="text-2xl font-bold flex gap-1 items-center">
            <Trash2Icon className="mr-2" /> Delete Account
          </h2>
        </div>
        <div className="mx-auto px-4 md:px-6 lg:px-8 lg:py-6 py-2">
          <nav
            className="flex  mb-4 text-sm text-gray-500 px-1"
            aria-label="Breadcrumb"
          >
            <ol className="inline-flex items-center space-x-[-1px]">
              <li className="inline-flex items-center">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center hover:text-gray-700 hover:underline"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4" />
                  <Link
                    href="/dashboard/user"
                    className="ml-1 hover:text-gray-700 hover:underline"
                  >
                    Settings
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 mx-1" />
                  <span className="ml-1 text-sm text-gray-500 hover:underline cursor-pointer">
                    Delete Account
                  </span>
                </div>
              </li>
            </ol>
          </nav>
          <Card className="w-full max-w-2xl">
            <CardHeader>
              {/* <CardTitle className="text-2xl font-bold text-red-600">
              Delete Account
            </CardTitle> */}
              <CardDescription>
                We're sorry to see you go. Please note that this action is
                irreversible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
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
                  <span className="font-medium">Warning:</span> This action
                  cannot be undone. All your data will be permanently deleted.
                </div>
              </div>
              <ConfirmationPopup
                buttonText={
                  <span className="flex items-center">
                    <Trash2Icon className="w-4 h-4 mr-2" />
                    Permanently Delete Account
                  </span>
                }
                title="Confirm Account Deletion"
                description="Are you sure you want to delete your account? This action cannot be undone."
                onConfirm={handleSubmit}
                variant="destructive"
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
