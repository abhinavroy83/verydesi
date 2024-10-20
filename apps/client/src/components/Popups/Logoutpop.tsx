"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
export default function LogoutComponent() {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();
  const handleLogout = async () => {
    // Simulate logout action
    signOut({ callbackUrl: "/sign-in" });
    logout();
    console.log("Logging out...");
    // Here you would typically call your logout API or clear session data
    setShowLogoutDialog(false);
  };

  return (
    <div>
      <Button
        variant="outline"
        onClick={() => setShowLogoutDialog(true)}
        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-start w-full"
      >
        <LogOut className="mr-2 h-4 w-4" /> Log out
      </Button>

      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to logout? This will end your current
              session.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setShowLogoutDialog(false)}
            >
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={handleLogout}>
              Yes, Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
