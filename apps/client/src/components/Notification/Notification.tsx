"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, MessageSquare, Heart, UserPlus, X } from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "message",
    content: "You have a new message from Sarah",
    time: "2 minutes ago",
    icon: MessageSquare,
    color: "bg-blue-500",
  },
  {
    id: 2,
    type: "like",
    content: "John liked your post",
    time: "10 minutes ago",
    icon: Heart,
    color: "bg-red-500",
  },
  {
    id: 3,
    type: "friend",
    content: "Emma sent you a friend request",
    time: "1 hour ago",
    icon: UserPlus,
    color: "bg-green-500",
  },
];

export default function Notification() {
  const [visibleNotifications, setVisibleNotifications] =
    useState(notifications);

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden mt-[20rem]">
      <div className="bg-gray-200 text-black p-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-black flex items-center">
          <Bell className="mr-2" />
          Notifications
        </h2>
        <span className="bg-white text-black rounded-full px-2 py-1 text-sm font-semibold">
          {visibleNotifications.length}
        </span>
      </div>
      <AnimatePresence>
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
              <div className={`${notification.color} p-2 rounded-full mr-3`}>
                <notification.icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {notification.content}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {notification.time}
                </p>
              </div>
              <button
                // onClick={() => removeNotification(notification.id)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      {visibleNotifications.length === 0 && (
        <div className="p-4 text-center text-gray-500">
          No new notifications
        </div>
      )}
    </div>
  );
}