import type { NextConfig } from "next";

const wpUrl = process.env.NEXT_PUBLIC_WP_URL ?? "https://your-site.com";
const wpOrigin = wpUrl.replace(/\/$/, "");
const wpHost = process.env.NEXT_PUBLIC_WP_URL
  ? new URL(process.env.NEXT_PUBLIC_WP_URL).hostname
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
