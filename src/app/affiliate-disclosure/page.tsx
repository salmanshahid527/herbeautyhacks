import type { Metadata } from "next";

import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description: "Disclosure of affiliate relationships at HerBeautyHacks.",
};

export default function AffiliateDisclosurePage() {
  return (
    <LegalPage
      title="Affiliate Disclosure"
      updatedAt="February 14, 2026"
      intro="HerBeautyHacks may participate in affiliate programs. This means we may earn a commission if you purchase products through qualifying links, at no extra cost to you."
      sections={[
        {
          heading: "How affiliate links work",
          paragraphs: [
            "When you click an affiliate link and complete a purchase, the retailer may pay us a small commission.",
            "Affiliate relationships do not influence our editorial standards, and we do not accept compensation in exchange for guaranteed positive coverage.",
          ],
        },
        {
          heading: "Editorial independence",
          paragraphs: [
            "Our recommendations prioritize utility, repeatability, and reader value. We may feature non-affiliate products where relevant.",
            "All opinions are based on editorial review criteria, not commission potential.",
          ],
        },
        {
          heading: "Questions",
          paragraphs: [
            "If you have questions about affiliate relationships, contact partnerships@herbeautyhacks.com.",
          ],
        },
      ]}
    />
  );
}
