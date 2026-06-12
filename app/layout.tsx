import type { Metadata } from "next";
import Script from "next/script";
import { Plus_Jakarta_Sans, Dancing_Script } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Header } from "@/components/layout/Header";
import { CategoriesBar } from "@/components/layout/CategoriesBar";
import { Footer } from "@/components/layout/Footer";
import { OrganizationWebSiteJsonLd } from "@/components/seo/JsonLd";
import { getNavLinks } from "@/lib/wp/nav";
import { getCategories } from "@/lib/wp/categories";
import CookiesWrapper from '@/components/cookies/CookiesWrapper';


const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
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

const GROW_INITIALIZER = `!(function(){window.growMe||((window.growMe=function(e){window.growMe._.push(e);}),(window.growMe._=[]));var e=document.createElement("script");(e.type="text/javascript"),(e.src="https://faves.grow.me/main.js"),(e.defer=!0),e.setAttribute("data-grow-faves-site-id","U2l0ZTowMzEwODE1Zi0zNzM1LTRmMzUtYTI4OC03MzNkOTI1OTRiNzE=");var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t);})();`;

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
<script
  data-grow-initializer=""
  suppressHydrationWarning
  dangerouslySetInnerHTML={{ __html: GROW_INITIALIZER }}
/>

        {wpOrigin && (
          <link rel="preconnect" href={wpOrigin} crossOrigin="anonymous" />
        )}
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
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
    
            <Header initialNavLinks={initialNavLinks} initialCategories={initialCategories} />
            <CategoriesBar initialCategories={initialCategories} />
            <main className="flex-1 w-full flex flex-col items-center overflow-x-hidden">{children}</main>
            <Footer initialCategories={initialCategories} />
                <CookiesWrapper />

          </div>
        </Providers>
      </body>
    </html>
  );
}
