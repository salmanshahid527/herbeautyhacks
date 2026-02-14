import type { Metadata } from "next";

import { ContactPageClient } from "@/components/site/contact-page-client";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact HerBeautyHacks editorial team for inquiries and collaborations.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
