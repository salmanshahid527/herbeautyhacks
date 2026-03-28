import type { NextConfig } from "next";
import { normalizeWpSiteRoot } from "./lib/wp/env";

const wpOrigin = normalizeWpSiteRoot(process.env.NEXT_PUBLIC_WP_URL);
const wpHost = process.env.NEXT_PUBLIC_WP_URL
  ? new URL(normalizeWpSiteRoot(process.env.NEXT_PUBLIC_WP_URL)).hostname
  : "your-site.com";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async rewrites() {
    return [
      {
        source: "/wp-content/:path*",
        destination: `${wpOrigin}/wp-content/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: wpHost,
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: wpHost,
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "secure.gravatar.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
