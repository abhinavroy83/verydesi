"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const shareOptions = [
  {
    name: "WhatsApp",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    ),
    color: "bg-green-500 hover:bg-green-600",
  },
  {
    name: "Facebook",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    color: "bg-blue-600 hover:bg-blue-700",
  },
  {
    name: "Twitter",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
      </svg>
    ),
    color: "bg-sky-500 hover:bg-sky-600",
  },
  {
    name: "Copy Link",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
        <path d="M13.723 18.654l-3.61 3.609c-2.316 2.315-6.063 2.315-8.378 0-2.315-2.316-2.315-6.062 0-8.377L4.868 9.75a.75.75 0 011.06 1.06l-3.133 3.136c-1.732 1.732-1.732 4.53 0 6.262 1.732 1.731 4.53 1.731 6.261 0l3.61-3.61a.75.75 0 011.06 1.06l.001.001zm6.275-6.273l-3.61 3.609a.75.75 0 01-1.06-1.06l3.61-3.61c1.732-1.732 1.732-4.53 0-6.261-1.732-1.732-4.53-1.732-6.262 0l-3.136 3.136a.75.75 0 11-1.06-1.06l3.135-3.137c2.316-2.315 6.062-2.315 8.377 0 2.315 2.316 2.315 6.062 0 8.377l.001.001z" />
      </svg>
    ),
    color: "bg-gray-600 hover:bg-gray-700",
  },
];

export default function Component() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleShare = (option: string) => {
    // Implement sharing logic here
    console.log(`Sharing via ${option}`);
    setIsOpen(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <button
        onClick={toggleMenu}
        className="px-6 py-3 bg-white text-purple-600 rounded-full hover:bg-purple-100 transition-colors duration-300 flex items-center space-x-2 shadow-lg"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
        </svg>
        <span className="font-semibold">Share</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-100 opacity-50" />
              <button
                onClick={toggleMenu}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors duration-300"
                aria-label="Close menu"
              >
                <X className="w-6 h-6 hover:rotate-[360deg] transition-transform duration-300" />
              </button>
              <h2 className="text-2xl font-bold mb-6 text-center relative z-10">
                Share via
              </h2>
              <div className="grid grid-cols-2 gap-4 relative z-10">
                {shareOptions.map((option) => (
                  <motion.button
                    key={option.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`${option.color} text-white rounded-xl py-4 px-6 flex flex-col items-center justify-center space-y-2 transition-colors duration-300 shadow-lg`}
                    onClick={() => handleShare(option.name)}
                  >
                    {option.icon}
                    <span className="font-medium">{option.name}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
