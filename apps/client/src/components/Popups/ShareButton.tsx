"use client";

import { useState } from "react";
import { X, Check, Copy, Link, Facebook, Twitter, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

export default function ModernSharePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareLink = "http://localhost:3000";

  const shareOptions = [
    { name: "Copy Link", icon: Copy, color: "bg-gray-500", action: copyLink },
    {
      name: "Facebook",
      icon: Facebook,
      color: "bg-blue-600",
      action: () => shareVia("Facebook"),
    },
    {
      name: "Twitter",
      icon: Twitter,
      color: "bg-sky-500",
      action: () => shareVia("Twitter"),
    },
    {
      name: "WhatsApp",
      icon: Share2,
      color: "bg-green-500",
      action: () => shareVia("WhatsApp"),
    },
  ];

  function copyLink() {
    navigator.clipboard.writeText(shareLink).then(() => {
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "The link has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function shareVia(platform: string) {
    // Implement sharing logic for each platform
    console.log(`Sharing via ${platform}: ${shareLink}`);
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Share2 className="w-4 h-4 mr-2" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md p-0 bg-transparent border-none shadow-none font-sans">
        <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg">
          <DialogHeader className="p-6 border-b border-gray-200 dark:border-gray-700">
            <DialogTitle className="text-2xl font-semibold">Share</DialogTitle>
          </DialogHeader>
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-6 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <Link className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <span className="flex-grow text-sm text-gray-700 dark:text-gray-300 truncate">
                {shareLink}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="px-2"
                onClick={copyLink}
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {shareOptions.map((option) => (
                <Button
                  key={option.name}
                  className={`${option.color} text-white p-4 rounded-2xl flex items-center justify-center space-x-3 hover:opacity-90 transition-opacity`}
                  onClick={option.action}
                >
                  <option.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{option.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
