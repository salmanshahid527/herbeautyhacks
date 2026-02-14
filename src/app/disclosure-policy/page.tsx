import type { Metadata } from "next";

import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Disclosure Policy",
  description: "HerBeautyHacks editorial and disclosure standards.",
};

export default function DisclosurePolicyPage() {
  return (
    <LegalPage
      title="Disclosure Policy"
      updatedAt="February 14, 2026"
      intro="HerBeautyHacks is committed to transparent editorial practices. This page explains how we disclose partnerships, sponsored work, and material connections."
      sections={[
        {
          heading: "Sponsored content",
          paragraphs: [
            "Any sponsored article, campaign, or integrated mention will be clearly labeled.",
            "Sponsorship does not grant control over our editorial voice, final review conclusions, or factual claims.",
          ],
        },
        {
          heading: "Product samples and gifts",
          paragraphs: [
            "We may receive products for editorial consideration. Receipt of products does not guarantee coverage.",
            "Our team discloses material relationships where needed to maintain reader trust and transparency.",
          ],
        },
        {
          heading: "Corrections and updates",
          paragraphs: [
            "If we identify outdated details or errors, we update content and revise timestamps when appropriate.",
            "For correction requests, contact editorial@herbeautyhacks.com.",
          ],
        },
      ]}
    />
  );
}
