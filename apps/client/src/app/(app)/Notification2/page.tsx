"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Megaphone, X } from "lucide-react";

export default function Component() {
  //   const [visibleNotifications, setVisibleNotifications] =
  //     useState(notifications);

  //   const removeNotification = (id) => {
  //     setVisibleNotifications(
  //       visibleNotifications.filter((notif) => notif.id !== id)
  //     );
  //   };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <Bell className="mr-2" />
          Notifications
        </h2>
        <span className="bg-white text-purple-600 rounded-full px-2 py-1 text-sm font-semibold">
          {/* {visibleNotifications.length} */}
        </span>
      </div>
      {/* <AnimatePresence>
        {visibleNotifications.length > 0 ? (
          visibleNotifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="border-b border-gray-200 last:border-b-0"
            >
              <div className="p-4 flex items-start">
                <div className="bg-purple-100 p-2 rounded-full mr-3">
                  <Bell className="w-5 h-5 text-purple-600" />
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
                  onClick={() => removeNotification(notification.id)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="p-8 text-center"
          >
            <div className="w-24 h-24 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
              <Megaphone className="w-12 h-12 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No notifications
            </h3>
            <p className="text-gray-500">
              Currently, there are no notifications available.
              <br />
              Check back later for updates.
            </p>
          </motion.div>
        )}
      </AnimatePresence> */}
    </div>
  );
}
