import type { NextConfig } from "next";

const wpHost = process.env.NEXT_PUBLIC_WP_URL
  ? new URL(process.env.NEXT_PUBLIC_WP_URL).hostname
  : "your-site.com";

const nextConfig: NextConfig = {
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
