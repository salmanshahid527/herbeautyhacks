import type { Metadata } from "next";
import Script from "next/script";
import { Plus_Jakarta_Sans, Dancing_Script } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { TopBar } from "@/components/layout/TopBar";
import { Header } from "@/components/layout/Header";
import { CategoriesBar } from "@/components/layout/CategoriesBar";
import { Footer } from "@/components/layout/Footer";
import { OrganizationWebSiteJsonLd } from "@/components/seo/JsonLd";
import { getNavLinks } from "@/lib/wp/nav";
import { getCategories } from "@/lib/wp/categories";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
  weight: ["400", "600"],
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
    url: siteUrl,
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
  verification: {
    google: "14B709F9ED0815745382AEBA337BB6C7",
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
  const [initialNavLinks, initialCategories] = await Promise.all([
    getNavLinks(),
    getCategories(),
  ]);

  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-YZLH5CBG9E";
  let wpOrigin: string | null = null;
  try {
    const wpUrl = process.env.NEXT_PUBLIC_WP_URL;
    if (wpUrl?.startsWith("http")) wpOrigin = new URL(wpUrl).origin;
  } catch {
    // ignore
  }

  return (
    <html lang="en">
      <head>
        {wpOrigin && (
          <link rel="preconnect" href={wpOrigin} crossOrigin="anonymous" />
        )}
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${plusJakartaSans.variable} ${dancingScript.variable} font-sans antialiased`}
      >
        {/* Google tag (gtag.js) - lazyOnload reduces main-thread blocking on mobile; analytics still record once loaded */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}');
          `}
        </Script>
        <OrganizationWebSiteJsonLd />
        <Providers>
          <div className="flex min-h-screen flex-col">
            <TopBar />
            <Header initialNavLinks={initialNavLinks} initialCategories={initialCategories} />
            <CategoriesBar initialCategories={initialCategories} />
            <main className="flex-1 w-full flex flex-col items-center overflow-x-hidden">{children}</main>
            <Footer initialCategories={initialCategories} />
          </div>
        </Providers>
      </body>
    </html>
  );
}
