"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Megaphone, X, LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import useAuthStore from "@/store/useAuthStore";
import axios from "axios";

interface NotificationData {
  id: number;
  content: string;
  time: string;
  icon: LucideIcon;
  color: string;
}

interface NotificationProps {
  isOpen: boolean;
}

export default function Component(
  { isOpen }: NotificationProps = { isOpen: false }
) {
  const { currentCity } = useAuthStore();
  const [visibleNotifications, setVisibleNotifications] = useState<
    NotificationData[]
  >([]);
  const [isNotification, setIsNotification] = useState<boolean>(false);

  const fetchNotifications = async (): Promise<void> => {
    try {
      const res = await axios.get<{
        generalMessage: string;
        areaMessage: string;
      }>(
        `https://apiv2.verydesi.com/room/room-addedIn-last-24hours/${currentCity}`
      );

      setVisibleNotifications([
        {
          id: Date.now(),
          content: res.data.generalMessage,
          time: "Just now",
          icon: Megaphone,
          color: "bg-purple-500",
        },
        {
          id: Date.now() + 1,
          content: res.data.areaMessage,
          time: "Just now",
          icon: Megaphone,
          color: "bg-blue-500",
        },
      ]);

      setIsNotification(true);
    } catch (error) {
      console.error("Error fetching notifications", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [currentCity]);

  const removeNotification = (id: number) => {
    setVisibleNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50 z-50">
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg bg-white shadow-lg rounded-lg overflow-hidden font-sans">
        <div className="bg-gray-200 text-black p-4 flex justify-between items-center">
          <h2 className="text-xl sm:text-2xl font-bold text-black flex items-center">
            <Bell className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
            Notifications
          </h2>
          <span className="bg-white text-black rounded-full px-2 py-1 text-sm font-semibold">
            {visibleNotifications.length}
          </span>
        </div>
        <div className="max-h-[60vh] overflow-y-auto">
          <AnimatePresence>
            {isNotification && visibleNotifications.length > 0 ? (
              <>
                {visibleNotifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-b border-gray-200 last:border-b-0"
                  >
                    <div className="p-4 flex items-start">
                      <div
                        className={`${notification.color} p-2 rounded-full mr-3 flex-shrink-0`}
                      >
                        <notification.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm sm:text-base font-medium text-gray-900 break-words">
                          {notification.content}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">
                          {notification.time}
                        </p>
                      </div>
                      <button
                        className="text-gray-400 hover:text-gray-600 transition-colors duration-200 ml-2"
                        onClick={() => removeNotification(notification.id)}
                        aria-label="Close notification"
                      >
                        <X className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </>
            ) : (
              <Card className="m-4">
                <CardHeader />
                <CardContent className="flex flex-col items-center text-center">
                  <div className="relative w-12 h-12 sm:w-16 sm:h-16 mb-4">
                    <Megaphone className="w-full h-full text-gray-300" />
                    <div className="absolute top-0 right-0 w-2 h-2 sm:w-3 sm:h-3 bg-purple-500 rounded-full" />
                    <div className="absolute bottom-0 left-0 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-500 rounded-full" />
                  </div>
                  <h2 className="text-base sm:text-lg font-semibold mb-2">
                    No notifications
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Currently, there are no notifications available.
                    <br />
                    Check back later for updates.
                  </p>
                </CardContent>
              </Card>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
