"use client";
import React from "react";
import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
function page() {
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    setExpandedSection(expandedSection === index ? null : index);
  };
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content:
        "By registering for an account, posting classifieds, creating business listings, or using any part of VeryDesi.com, you acknowledge that you have read, understood, and agree to abide by these Terms of Use.",
    },
    {
      title: "2. Eligibility",
      content:
        "To use VeryDesi.com, you must be at least 18 years old and have the legal authority to enter into these terms. By using this platform, you warrant that you meet this eligibility requirement.",
    },
    {
      title: "3. Account Registration and Responsibilities",
      content:
        "To participate in our services, including posting ads or connecting through social networking, you must create an account. You are responsible for maintaining the confidentiality of your username and password. Any activity conducted under your account is your responsibility. You agree to provide accurate, current, and complete information during registration and to update your information as necessary. You agree not to use the platform for any illegal or unauthorized purposes, including, but not limited to, impersonation, spamming, or uploading malware.",
    },
    {
      title: "4. User Conduct",
      content:
        "You are responsible for all content and activity on your account. By using VeryDesi.com, you agree to respect other users, post relevant content, and refrain from posting prohibited content such as defamatory, fraudulent, harmful, obscene, or otherwise illegal material.",
    },
    {
      title: "5. Classifieds and Business Listings",
      content:
        "All classifieds and business listings are created and managed by users. You are responsible for the accuracy, legality, and quality of any listings or ads you post. Payments for premium listings or services must be completed through authorized methods. VeryDesi.com is not responsible for disputes arising from classifieds transactions or business services listed.",
    },
    {
      title: "6. Social Networking Features",
      content:
        "VeryDesi.com offers social networking features. Users agree to responsible communication, respect for privacy, and grant VeryDesi.com a non-exclusive, worldwide, royalty-free license to use, display, modify, and distribute user-generated content.",
    },
    {
      title: "7. Prohibited Activities",
      content:
        "Users agree not to engage in activities that violate applicable laws, post false or misleading content, scrape or data mine the platform, introduce harmful software, or misrepresent affiliations.",
    },
    {
      title: "8. Intellectual Property",
      content:
        "All content and materials on VeryDesi.com are the intellectual property of VeryDesi.com unless stated otherwise. Users may not reproduce, distribute, or modify any part of the website without prior written consent.",
    },
    {
      title: "9. Third-Party Links",
      content:
        "VeryDesi.com may contain links to third-party websites or services. We are not responsible for the content, policies, or practices of these external sites.",
    },
    {
      title: "10. Termination of Use",
      content:
        "We reserve the right to terminate or suspend your account at any time, without notice, for any conduct that we deem inappropriate, unlawful, or in violation of these Terms of Use.",
    },
    {
      title: "11. Disclaimer of Warranties",
      content:
        'VeryDesi.com provides its services "as is" and "as available" without any warranties or guarantees of any kind, whether express or implied.',
    },
    {
      title: "12. Limitation of Liability",
      content:
        "To the maximum extent permitted by law, VeryDesi.com and its affiliates, officers, directors, employees, or agents will not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of the platform.",
    },
    {
      title: "13. Indemnification",
      content:
        "You agree to indemnify and hold harmless VeryDesi.com, its affiliates, officers, and employees from any claims, damages, liabilities, or expenses arising from your use of the platform, violation of these Terms of Use, or infringement of any third-party rights.",
    },
    {
      title: "14. Changes to the Terms of Use",
      content:
        "VeryDesi.com reserves the right to modify or update these Terms of Use at any time, with or without notice. Changes will be effective upon posting on the website.",
    },
    {
      title: "15. Governing Law",
      content:
        "These Terms of Use are governed by and construed in accordance with the laws of [Insert Jurisdiction]. Any disputes shall be subject to the exclusive jurisdiction of the courts in [Insert Jurisdiction].",
    },
    {
      title: "16. Contact Us",
      content:
        "If you have any questions or concerns regarding these Terms of Use, please contact us at: VeryDesi.com, Email: [support@verydesi.com], Phone: [Insert Phone Number], Address: [Insert Business Address]",
    },
  ];
  return (
    <div className="mt-[7rem] bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold sm:text-4xl md:text-5xl lg:text-3xl text-center text-black">
          Terms of Use
        </h1>
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <h2 className="text-lg leading-6 font-bold text-gray-900 mb-4 px-4 mt-7">
              Effective Date: [Insert Date]
            </h2>
            <p className="text-gray-700 mb-8 px-4 ">
              Welcome to VeryDesi.com. By accessing or using our website, you
              agree to comply with and be bound by the following Terms of Use.
              These terms govern your use of our social networking, business
              listings, and classifieds services. Please read them carefully. If
              you do not agree to these terms, please refrain from using the
              website.
            </p>
            <div className="space-y-4">
              {sections.map((section, index) => (
                <div
                  key={index}
                  className="border-t border-gray-200 px-4 py-5 sm:p-6"
                >
                  <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    {section.title}
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
