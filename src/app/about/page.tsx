import type { Metadata } from "next";

import { AboutPage } from "@/components/site/about-page";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about the HerBeautyHacks editorial mission and approach.",
};

export default function AboutPageRoute() {
  return <AboutPage />;
}
