import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Dancing_Script } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { TopBar } from "@/components/layout/TopBar";
import { Header } from "@/components/layout/Header";
import { CategoriesBar } from "@/components/layout/CategoriesBar";
import { Footer } from "@/components/layout/Footer";
import { OrganizationWebSiteJsonLd } from "@/components/seo/JsonLd";
import { getNavLinks } from "@/lib/wp/nav";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://herbeautyhacks.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Her Beauty Hacks",
    template: "%s | Her Beauty Hacks",
  },
  description: "Beauty, fashion, skincare, and lifestyle tips — no one is you.",
  keywords: ["beauty", "lifestyle", "skincare", "fashion", "tips", "blog"],
  authors: [{ name: "Her Beauty Hacks" }],
  creator: "Her Beauty Hacks",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Her Beauty Hacks",
    title: "Her Beauty Hacks",
    description: "Beauty, fashion, skincare, and lifestyle tips — no one is you.",
    images: [{ url: "/logo-her-beauty-hacks.png", width: 512, height: 512, alt: "Her Beauty Hacks" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Her Beauty Hacks",
    description: "Beauty, fashion, skincare, and lifestyle tips — no one is you.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialNavLinks = await getNavLinks();

  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.variable} ${dancingScript.variable} font-sans antialiased`}
      >
        <OrganizationWebSiteJsonLd />
        <Providers>
          <div className="flex min-h-screen flex-col">
            <TopBar />
            <Header initialNavLinks={initialNavLinks} />
            <CategoriesBar />
            <main className="flex-1 w-full flex flex-col items-center">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
