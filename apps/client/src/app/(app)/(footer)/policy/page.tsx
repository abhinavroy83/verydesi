"use client";
import React from "react";
import { useState, useCallback } from "react";
import { ChevronDownIcon } from "lucide-react";
type Section = {
  title: string;
  content: string | string[];
  color: string;
};
const sections: Section[] = [
  {
    title: "1. Information We Collect",
    content: [
      "a. Personal Information: Name, email address, phone number, location, profile photos, ad photos, and payment details (for premium services).",
      "b. Non-Personal Information: Browser type, device information, IP address, pages visited, referring/exit pages, and date and time of visits.",
      "c. Cookies and Tracking Technologies: We use cookies, web beacons, and similar technologies to enhance your experience, monitor traffic, and personalize content.",
    ],
    color: "bg-blue-100 hover:bg-blue-200",
  },
  {
    title: "2. How We Use Your Information",
    content: [
      "Create and manage your account",
      "Facilitate communication between users",
      "Provide customer support",
      "Send newsletters and updates",
      "Display personalized advertisements",
      "Improve website functionality and user experience",
      "Prevent fraud and ensure security",
      "Enable transactions for premium services",
    ],
    color: "bg-green-100 hover:bg-green-200",
  },
  {
    title: "3. Information Sharing",
    content:
      "We do not sell your personal information. However, we may share your data with trusted third parties under specific circumstances: service providers, other users (for public listings), legal requirements, and business transfers.",
    color: "bg-yellow-100 hover:bg-yellow-200",
  },
  {
    title: "4. Your Choices",
    content: [
      "Profile Settings: Modify your profile visibility and personal information through your account settings.",
      "Marketing Communications: Opt out of receiving promotional emails by following the unsubscribe link.",
      "Cookies: Adjust your cookie settings in your browser to limit tracking.",
    ],
    color: "bg-purple-100 hover:bg-purple-200",
  },
  {
    title: "5. Security",
    content:
      "We implement industry-standard encryption and security protocols to protect your personal information. However, no method of transmission over the Internet is completely secure.",
    color: "bg-red-100 hover:bg-red-200",
  },
  {
    title: "6. Children's Privacy",
    content:
      "VeryDesi.com is not intended for users under the age of 13. We do not knowingly collect personal information from children under 13.",
    color: "bg-pink-100 hover:bg-pink-200",
  },
  {
    title: "7. Third-Party Links",
    content:
      "Our website may contain links to third-party websites. We are not responsible for the privacy practices of these sites.",
    color: "bg-indigo-100 hover:bg-indigo-200",
  },
  {
    title: "8. Changes to this Privacy Policy",
    content:
      'We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the "Effective Date" will be updated accordingly.',
    color: "bg-teal-100 hover:bg-teal-200",
  },
  {
    title: "9. Contact Us",
    content:
      "If you have any questions or concerns, please contact us at: VeryDesi.com, Email: support@verydesi.com, Phone: (503) 898-0503‬, Address: 1155 SW Morrison St, Portland, OR 97205",
    color: "bg-orange-100 hover:bg-orange-200",
  },
];
function page() {
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  const toggleSection = useCallback((index: number) => {
    setExpandedSection((prev) => (prev === index ? null : index));
  }, []);
  return (
    <div className="mt-[7rem]">
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 mb-8 text-center">
            Effective Date: September 24, 2024
          </p>
          <p className="text-lg text-gray-700 mb-8">
            At VeryDesi.com, your privacy is our top priority. This Privacy
            Policy outlines how we collect, use, disclose, and safeguard your
            information when you visit our website, interact with our social
            networking features, or use our classifieds services.
          </p>
          <div className="space-y-6">
            {sections.map((section, index) => (
              <div
                key={index}
                className={`${section.color} rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out`}
              >
                <button
                  onClick={() => toggleSection(index)}
                  className="w-full px-6 py-4 text-left focus:outline-none"
                >
                  <h3 className="text-xl font-semibold text-gray-900 flex justify-between items-center">
                    {section.title}
                    <ChevronDownIcon
                      className={`h-6 w-6 text-gray-700 transform transition-transform duration-300 ${
                        expandedSection === index ? "rotate-180" : ""
                      }`}
                    />
                  </h3>
                </button>
                <div
                  className={`px-6 py-4 transition-all duration-300 ease-in-out ${
                    expandedSection === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  } overflow-hidden`}
                >
                  {Array.isArray(section.content) ? (
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      {section.content.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-700">{section.content}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
