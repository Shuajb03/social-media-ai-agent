import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uploads.postiz.com",
      },
    ],
  },
};

export default nextConfig;
