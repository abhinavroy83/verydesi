"use client";
import React from "react";

function page() {
  return (
    <div className="mt-[7rem] bg-gray-100">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold sm:text-4xl md:text-5xl lg:text-3xl text-center text-black">
          Copyright Policy for VeryDesi.com{" "}
        </h1>
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <p className="text-[20px] text-black font-bold">
                Effective Date:
              </p>
              <p className="mt-4 text-sm text-gray-600">
                At VeryDesi.com, we respect the intellectual property rights of
                others and expect our users to do the same. This Copyright
                Policy outlines how we handle claims of copyright infringement
                and how you can report such claims if you believe your
                copyrighted material has been used without authorization.
              </p>
            </div>

            {[
              {
                title: "1. Content Ownership",
                content:
                  "Users of VeryDesi.com retain ownership of any content, such as text, images, and media, that they post, provided it is original and not in violation of anyone else's copyright. By posting content on VeryDesi.com, users grant us a non-exclusive, royalty-free, worldwide license to use, display, modify, and distribute the content on our platform. However, this license does not transfer ownership of the content to VeryDesi.com.",
              },
              {
                title: "2. Respecting Copyrighted Works",
                content:
                  "Users of VeryDesi.com must ensure that the content they upload—whether for social networking, business listings, or classifieds—does not infringe on the copyrights of others. This includes but is not limited to:",
                list: [
                  "Text, images, graphics, logos, videos, or other media.",
                  "Trademarks or service marks belonging to other parties.",
                ],
                footer:
                  "If you do not own or have explicit permission to use content that belongs to someone else, you must refrain from uploading it to the platform.",
              },
              {
                title: "3. Filing a Copyright Infringement Claim",
                content:
                  "If you believe that your copyrighted work has been uploaded to VeryDesi.com without your permission, you may submit a copyright infringement notification to us. Under the Digital Millennium Copyright Act (DMCA) or relevant copyright laws, your notification must include the following information:",
                list: [
                  "Your Contact Information: Your full name, mailing address, email address, and phone number.",
                  "Identification of the Infringed Work: A description of the copyrighted work that you claim has been infringed.",
                  "Identification of the Infringing Material: The URL or exact location on VeryDesi.com where the infringing material is found, with sufficient detail for us to identify and remove it.",
                  "A Statement of Good Faith: A statement that you have a good faith belief that the disputed use of the material is unauthorized by the copyright owner, its agent, or the law.",
                  "A Statement of Accuracy: A statement, made under penalty of perjury, that the information in the notification is accurate and that you are the copyright owner or authorized to act on the copyright owner's behalf.",
                  "Your Signature: A physical or electronic signature of the copyright owner or a person authorized to act on their behalf.",
                ],
                footer:
                  "Send your infringement notice to:\n\nVeryDesi.com\nEmail: support@verydesi.com\nAddress: [Insert Business Address]\n\nUpon receipt of a valid notice, we will take prompt action to remove or disable access to the infringing content and notify the user responsible for the content.",
              },
              {
                title: "4. Counter-Notification by User",
                content:
                  "If you believe that the material you posted was removed in error due to a copyright claim, you may file a counter-notification. The counter-notification must include:",
                list: [
                  "Your Contact Information: Full name, address, phone number, and email address.",
                  "Identification of the Removed Material: The specific content that was removed or disabled and the URL where it appeared before being removed.",
                  "A Statement of Good Faith: A statement that you have a good faith belief that the removal of the material was a mistake or that the content is not infringing.",
                  "Consent to Jurisdiction: A statement consenting to the jurisdiction of the federal court in your area or where you are located.",
                  "Your Signature: A physical or electronic signature.",
                ],
                footer:
                  "Submit the counter-notification to:\n\nVeryDesi.com\nEmail: support@verydesi.com\nAddress: [Insert Business Address]\n\nUpon receiving a valid counter-notification, we will forward it to the original complainant. If the complainant does not file legal action against you within 10 business days, we may restore the removed content.",
              },
              {
                title: "5. Termination of Repeat Infringers",
                content:
                  "In accordance with the DMCA and other applicable laws, VeryDesi.com will terminate the accounts of users who are found to be repeat infringers of copyright. We reserve the right to disable or permanently remove accounts without notice if we determine that the user has repeatedly violated intellectual property rights.",
              },
              {
                title: "6. User Responsibilities",
                content:
                  "As a user of VeryDesi.com, you are responsible for ensuring that the content you post does not violate any copyright, trademark, or other intellectual property rights of third parties. Violations of this policy may lead to removal of the content, suspension of account privileges, or account termination.",
              },
              {
                title: "7. Limitation of Liability",
                content:
                  "VeryDesi.com does not accept responsibility for content posted by users. We act as an intermediary, providing a platform for users to share and engage in social networking, business listings, and classifieds. While we take steps to address copyright infringement, we are not liable for any damages arising from the unauthorized use of copyrighted material on our platform.",
              },
              {
                title: "8. Modifications to the Copyright Policy",
                content:
                  "We may update this Copyright Policy from time to time. Changes will be posted on this page, and we encourage you to review the policy periodically to stay informed about how we handle copyright claims.",
              },
              {
                title: "9. Contact Information",
                content:
                  "For any questions or concerns about our Copyright Policy, please contact us at:",
                footer:
                  "VeryDesi.com\nEmail: support@verydesi.com\nPhone: [Insert Phone Number]\nAddress: [Insert Business Address]\n\nThis Copyright Policy protects both VeryDesi.com and its users while ensuring compliance with copyright laws and promoting the responsible use of intellectual property on the platform.",
              },
            ].map((section, index) => (
              <div
                key={index}
                className="border-t border-gray-200 px-4 py-5 sm:p-6"
              >
                <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  {section.title}
                </h2>
                <p className="mt-1 text-sm text-gray-600">{section.content}</p>
                {section.list && (
                  <ul className="list-disc list-inside mt-2 text-sm text-gray-600">
                    {section.list.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
                {section.footer && (
                  <p className="mt-4 text-sm text-gray-600 whitespace-pre-line">
                    {section.footer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default page;
