import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";

import { SiteShell } from "@/components/site/site-shell";
import { Providers } from "@/app/providers";
import "@/app/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://herbeautyhacks.com"),
  title: {
    default: "HerBeautyHacks | Editorial Beauty Site",
    template: "%s | HerBeautyHacks",
  },
  description:
    "HerBeautyHacks is a modern beauty editorial site covering skincare, makeup, haircare, wellness, style, and practical routines.",
  openGraph: {
    title: "HerBeautyHacks",
    description: "Modern beauty editorial guides, routines, and curated product picks.",
    url: "https://herbeautyhacks.com",
    siteName: "HerBeautyHacks",
    type: "website",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfairDisplay.variable}`}>
        <Providers>
          <SiteShell>{children}</SiteShell>
        </Providers>
      </body>
    </html>
  );
}
