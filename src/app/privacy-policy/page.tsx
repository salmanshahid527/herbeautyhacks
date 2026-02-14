import type { Metadata } from "next";

import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How HerBeautyHacks collects, uses, and protects personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updatedAt="February 14, 2026"
      intro="This Privacy Policy explains how HerBeautyHacks collects and processes information when you visit our site, subscribe to newsletters, or contact us."
      sections={[
        {
          heading: "Information we collect",
          paragraphs: [
            "We may collect personal information you voluntarily provide, including your name and email address when you use our contact or newsletter forms.",
            "We also collect limited technical data such as browser type, pages visited, and referral sources to improve site performance and editorial experience.",
          ],
        },
        {
          heading: "How we use information",
          paragraphs: [
            "We use submitted details to respond to inquiries, deliver requested newsletters, and maintain site quality.",
            "We do not sell personal data. We may use anonymized analytics data to improve content relevance and user experience.",
          ],
        },
        {
          heading: "Data retention and rights",
          paragraphs: [
            "We retain contact and subscription data only as long as needed for communication and operational purposes.",
            "You can request removal of your personal data or unsubscribe at any time by contacting us at privacy@herbeautyhacks.com.",
          ],
        },
      ]}
    />
  );
}
