import type { Metadata } from "next";

import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How HerBeautyHacks uses cookies and similar technologies.",
};

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      updatedAt="February 14, 2026"
      intro="This Cookie Policy outlines how HerBeautyHacks uses cookies and similar technologies to operate and improve site experience."
      sections={[
        {
          heading: "What cookies are",
          paragraphs: [
            "Cookies are small text files stored on your device that help websites remember activity and preferences.",
            "We use both session-based and persistent cookies for essential site functionality and analytics.",
          ],
        },
        {
          heading: "How we use cookies",
          paragraphs: [
            "Essential cookies support navigation and basic site behavior.",
            "Analytics cookies help us understand content performance, page engagement, and technical issues.",
          ],
        },
        {
          heading: "Managing cookies",
          paragraphs: [
            "You can control cookie settings through your browser preferences and clear cookies at any time.",
            "Disabling some cookies may affect site functionality or personalization.",
          ],
        },
      ]}
    />
  );
}
